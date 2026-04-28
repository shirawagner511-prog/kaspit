import 'dotenv/config';
import express from 'express';
import { getHouseholdByPhone, addEntryToFirestore, getHouseholdCategories } from './firestore.js';
import { parseMessage, parseReceiptImage } from './claude.js';
import { sendReply } from './whatsapp.js';
import { createCheckoutSession, createPortalSession, constructWebhookEvent } from './stripe.js';
import { upsertSubscription, getUidByCustomerId } from './subscriptions.js';

const app = express();
app.use((req, res, next) => { res.setHeader('ngrok-skip-browser-warning', '1'); next(); });

// Stripe webhook needs raw body — must be registered before express.json()
app.post('/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = constructWebhookEvent(req.body, sig);
  } catch (err) {
    console.error('Stripe webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    const { type, data } = event;

    if (type === 'checkout.session.completed') {
      const session = data.object;
      const uid = session.metadata?.uid;
      if (uid) {
        await upsertSubscription(uid, {
          uid,
          plan: 'premium',
          status: 'active',
          stripeCustomerId: session.customer,
          stripeSubscriptionId: session.subscription,
          updatedAt: new Date().toISOString(),
        });
      }
    }

    if (type === 'customer.subscription.updated') {
      const sub = data.object;
      const uid = await getUidByCustomerId(sub.customer);
      if (uid) {
        await upsertSubscription(uid, {
          status: sub.status === 'active' ? 'active' : sub.status,
          stripeSubscriptionId: sub.id,
          currentPeriodEnd: new Date(sub.current_period_end * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    }

    if (type === 'customer.subscription.deleted') {
      const sub = data.object;
      const uid = await getUidByCustomerId(sub.customer);
      if (uid) {
        await upsertSubscription(uid, {
          plan: 'free',
          status: 'cancelled',
          stripeSubscriptionId: sub.id,
          updatedAt: new Date().toISOString(),
        });
      }
    }

    if (type === 'invoice.payment_failed') {
      const invoice = data.object;
      const uid = await getUidByCustomerId(invoice.customer);
      if (uid) {
        await upsertSubscription(uid, {
          status: 'past_due',
          updatedAt: new Date().toISOString(),
        });
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook handler error:', err);
    res.status(500).json({ error: 'Handler failed' });
  }
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true, bot: 'קיקי' }));

app.post('/stripe/create-checkout', async (req, res) => {
  const { uid, email } = req.body;
  if (!uid || !email) return res.status(400).json({ error: 'Missing uid or email' });
  try {
    const { url } = await createCheckoutSession(uid, email);
    res.json({ url });
  } catch (err) {
    console.error('Checkout session error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/stripe/create-portal', async (req, res) => {
  const { stripeCustomerId } = req.body;
  if (!stripeCustomerId) return res.status(400).json({ error: 'Missing stripeCustomerId' });
  try {
    const url = await createPortalSession(stripeCustomerId);
    res.json({ url });
  } catch (err) {
    console.error('Portal session error:', err);
    res.status(500).json({ error: err.message });
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
