import 'dotenv/config';
import express from 'express';
import { getHouseholdByPhone, addEntryToFirestore, getHouseholdCategories } from './firestore.js';
import { parseMessage, parseReceiptImage } from './claude.js';
import { sendReply } from './whatsapp.js';

const app = express();
app.use((req, res, next) => { res.setHeader('ngrok-skip-browser-warning', '1'); next(); });
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true, bot: 'קיקי' }));

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
    const householdId = await getHouseholdByPhone(phone);
    console.log('householdId:', householdId);
    if (!householdId) {
      await sendReply(from, 'היי! לא מצאתי חשבון מקושר למספר הזה 🤔\nפתחי את כספית ← הגדרות ← בית, ורשמי את מספר הטלפון שלך.');
      return;
    }

    const customCategories = await getHouseholdCategories(householdId);
    const today = new Date().toISOString().split('T')[0];

    let parsed;
    if (numMedia > 0 && mediaUrl && mediaType?.startsWith('image/')) {
      parsed = await parseReceiptImage(mediaUrl, mediaType, customCategories, today);
    } else if (body) {
      console.log('parsing message:', body);
      parsed = await parseMessage(body, customCategories, today);
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
