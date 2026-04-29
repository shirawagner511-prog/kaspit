import 'dotenv/config';
import express from 'express';
import { getHouseholdByPhone, addEntryToFirestore, getHouseholdCategories } from './firestore.js';
import { parseMessage, parseReceiptImage } from './claude.js';
import { sendReply } from './whatsapp.js';
import { generateClientToken, createSubscription, cancelSubscription, parseWebhook } from './braintree.js';
import { upsertSubscription, getUidByCustomerId } from './subscriptions.js';

const app = express();
const ALLOWED_ORIGINS = [
  'https://shirawagner511-prog.github.io',
  'http://localhost:5173',
];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('ngrok-skip-browser-warning', '1');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true, bot: 'קיקי' }));

app.get('/braintree/client-token', async (_req, res) => {
  try {
    const clientToken = await generateClientToken();
    res.json({ clientToken });
  } catch (err) {
    console.error('client-token error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/braintree/subscribe', async (req, res) => {
  const { uid, email, nonce } = req.body;
  if (!uid || !email || !nonce) return res.status(400).json({ error: 'Missing uid, email or nonce' });
  try {
    const { customerId, subscriptionId } = await createSubscription(email, nonce);
    await upsertSubscription(uid, {
      uid,
      plan: 'premium',
      status: 'active',
      braintreeCustomerId: customerId,
      braintreeSubscriptionId: subscriptionId,
      updatedAt: new Date().toISOString(),
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('subscribe error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/braintree/cancel', async (req, res) => {
  const { uid, subscriptionId } = req.body;
  if (!uid || !subscriptionId) return res.status(400).json({ error: 'Missing uid or subscriptionId' });
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

app.post('/webhook', async (req, res) => {
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
    console.log('looking up household for phone:', phone);
    const userData = await getHouseholdByPhone(phone);
    console.log('userData:', userData);
    if (!userData) {
      await sendReply(from, 'היי! לא מצאתי חשבון מקושר למספר הזה 🤔\nפתחי את כספית ← הגדרות ← 🤖 קיקי, ורשמי את מספר הטלפון שלך.');
      return;
    }

    const { householdId, anthropicApiKey } = userData;

    if (!anthropicApiKey) {
      await sendReply(from, 'היי! כדי שקיקי תעבוד צריך מפתח API אישי 🔑\nפתחי את כספית ← הגדרות ← 🤖 קיקי ← עקבי אחרי ההוראות.');
      return;
    }

    const customCategories = await getHouseholdCategories(householdId);
    const today = new Date().toISOString().split('T')[0];

    let parsed;
    if (numMedia > 0 && mediaUrl && mediaType?.startsWith('image/')) {
      parsed = await parseReceiptImage(mediaUrl, mediaType, customCategories, today, anthropicApiKey);
    } else if (body) {
      console.log('parsing message:', body);
      parsed = await parseMessage(body, customCategories, today, anthropicApiKey);
      console.log('parsed:', JSON.stringify(parsed));
    } else {
      await sendReply(from, 'שלחי לי הודעת טקסט או תמונה של קבלה 📸');
      return;
    }

    const { entries = [], reply } = parsed;

    if (entries.length === 0) {
      await sendReply(from, reply || 'לא הצלחתי להבין 🤔 נסי שוב בצורה כמו: "קפה 18 שקל"');
      return;
    }

    for (const entry of entries) {
      if (entry.category) entry.category = entry.category.toLowerCase();
      await addEntryToFirestore(householdId, entry, 'קיקי 🤖');
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
app.listen(port, () => console.log(`קיקי מוכנה! http://localhost:${port}`));
