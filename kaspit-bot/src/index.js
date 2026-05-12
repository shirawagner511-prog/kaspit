import 'dotenv/config';
import express from 'express';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { startReminderCron } from './cron.js';
import { getHouseholdByPhone, getUserByPendingPhone, confirmWhatsappLink, addEntryToFirestore, getHouseholdCategories, checkAndIncrementAiUsage } from './firestore.js';
import { parseMessage, parseReceiptImage } from './claude.js';
import { sendReply } from './whatsapp.js';
import { generateClientToken, createSubscription, cancelSubscription, parseWebhook } from './braintree.js';
import twilio from 'twilio';
import { upsertSubscription, getUidByCustomerId } from './subscriptions.js';
import serviceAccount from './serviceAccount.js';

const REQUIRED_ENV = ['TWILIO_AUTH_TOKEN', 'TWILIO_ACCOUNT_SID', 'TWILIO_WHATSAPP_NUMBER', 'ANTHROPIC_API_KEY', 'FIREBASE_PROJECT_ID'];
for (const v of REQUIRED_ENV) {
  if (!process.env[v]) { console.error(`Missing required env var: ${v}`); process.exit(1); }
}

initializeApp({ credential: cert(serviceAccount) });
const adminAuth = getAuth();

const app = express();
const ALLOWED_ORIGINS = [
  'https://shirawagner511-prog.github.io',
  'http://localhost:5173',
];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('ngrok-skip-browser-warning', '1');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true, bot: 'Budgi Bot' }));

app.get('/braintree/client-token', async (_req, res) => {
  try {
    const clientToken = await generateClientToken();
    res.json({ clientToken });
  } catch (err) {
    console.error('client-token error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/braintree/subscribe', verifyFirebaseToken, async (req, res) => {
  const { nonce } = req.body;
  const uid = req.uid;
  const email = req.userEmail;
  if (!nonce) return res.status(400).json({ error: 'Missing nonce' });
  try {
    const { customerId, subscriptionId, paidThroughDate } = await createSubscription(email, nonce);
    await upsertSubscription(uid, {
      uid,
      plan: 'premium',
      status: 'active',
      braintreeCustomerId: customerId,
      braintreeSubscriptionId: subscriptionId,
      currentPeriodEnd: paidThroughDate || null,
      updatedAt: new Date().toISOString(),
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('subscribe error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/braintree/cancel', verifyFirebaseToken, async (req, res) => {
  const { subscriptionId } = req.body;
  const uid = req.uid;
  if (!subscriptionId) return res.status(400).json({ error: 'Missing subscriptionId' });
  try {
    await cancelSubscription(subscriptionId);
    await upsertSubscription(uid, {
      plan: 'free',
      status: 'cancelled',
      updatedAt: new Date().toISOString(),
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('cancel error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/braintree/webhook', async (req, res) => {
  try {
    const notification = await parseWebhook(req.body.bt_signature, req.body.bt_payload);
    const { kind, subscription } = notification;

    if (kind === 'subscription_went_active' || kind === 'subscription_charged_successfully') {
      const uid = await getUidByCustomerId(subscription.paymentMethodGlobalId || subscription.id);
      if (uid) await upsertSubscription(uid, { status: 'active', plan: 'premium', updatedAt: new Date().toISOString() });
    }

    if (kind === 'subscription_canceled') {
      const uid = await getUidByCustomerId(subscription.id);
      if (uid) await upsertSubscription(uid, { status: 'cancelled', plan: 'free', updatedAt: new Date().toISOString() });
    }

    if (kind === 'subscription_went_past_due') {
      const uid = await getUidByCustomerId(subscription.id);
      if (uid) await upsertSubscription(uid, { status: 'past_due', updatedAt: new Date().toISOString() });
    }

    res.sendStatus(200);
  } catch (err) {
    console.error('Braintree webhook error:', err);
    res.sendStatus(500);
  }
});

async function verifyFirebaseToken(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Missing authorization token' });
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    req.uid = decoded.uid;
    req.userEmail = decoded.email || '';
    next();
  } catch {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
}

function validateTwilioSignature(req, res, next) {
  const signature = req.headers['x-twilio-signature'] || '';
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers['host'];
  const url = `${proto}://${host}/webhook`;
  const valid = twilio.validateRequest(process.env.TWILIO_AUTH_TOKEN, signature, url, req.body);
  if (!valid) { console.warn('Invalid Twilio signature'); return res.sendStatus(403); }
  next();
}

app.post('/webhook', validateTwilioSignature, async (req, res) => {
  // Respond to Twilio immediately to avoid timeout
  res.sendStatus(200);

  const from = req.body.From; // e.g. "whatsapp:+972501234567"
  const body = (req.body.Body || '').trim();
  const numMedia = parseInt(req.body.NumMedia || '0', 10);
  const mediaUrl = req.body.MediaUrl0;
  const mediaType = req.body.MediaContentType0;

  // Normalize phone: strip "whatsapp:" prefix
  const phone = from.replace('whatsapp:', '');
  console.log('from:', from, 'phone:', phone);

  try {
    // Auto-link: if this number is pending connection, complete the link
    const pending = await getUserByPendingPhone(phone);
    if (pending) {
      await confirmWhatsappLink(pending.uid, phone);
      await sendReply(from, '✅ Budgi Bot מחובר בהצלחה!\n\nעכשיו שלח לי הוצאות כמו:\n• "קפה 18"\n• "סופר 340 שקל"\n• תמונת קבלה 📸');
      return;
    }

    const userData = await getHouseholdByPhone(phone);
    if (!userData) {
      await sendReply(from, 'היי! לא מצאתי חשבון מקושר למספר הזה.\nפתח את Budgi ← הגדרות ← Budgi Bot ורשום את המספר שלך.');
      return;
    }

    const { householdId, uid } = userData;

    const allowed = await checkAndIncrementAiUsage(uid);
    if (!allowed) {
      await sendReply(from, `⚠️ הגעת למגבלת ${30} הודעות יומית לקיקי. נסי שוב מחר 🙏`);
      return;
    }

    const customCategories = await getHouseholdCategories(householdId);
    const today = new Date().toISOString().split('T')[0];

    let parsed;
    if (numMedia > 0 && mediaUrl && mediaType?.startsWith('image/')) {
      parsed = await parseReceiptImage(mediaUrl, mediaType, customCategories, today);
    } else if (body) {
      parsed = await parseMessage(body, customCategories, today);
    } else {
      await sendReply(from, 'שלח לי הודעת טקסט או תמונה של קבלה 📸');
      return;
    }

    const { entries = [], reply } = parsed;

    if (entries.length === 0) {
      await sendReply(from, reply || 'לא הצלחתי להבין 🤔 נסה שוב בצורה כמו: "קפה 18"');
      return;
    }

    for (const entry of entries) {
      if (entry.category) entry.category = entry.category.toLowerCase();
      await addEntryToFirestore(householdId, entry, 'Budgi Bot 🤖');
    }

    await sendReply(from, reply || `✦ נרשם! ${entries.length > 1 ? `${entries.length} פעולות` : entries[0].name}`);
  } catch (err) {
    console.error('Webhook error message:', err.message);
    console.error('Webhook error stack:', err.stack);
    try {
      await sendReply(from, 'אוי, משהו השתבש 😅 נסי שוב עוד רגע.');
    } catch {}
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`קיקי מוכנה! http://localhost:${port}`);
  startReminderCron();
});
