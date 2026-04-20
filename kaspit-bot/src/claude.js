import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const DEFAULT_CATEGORIES = [
  { value: 'groceries', label: 'מכולת וסופר' },
  { value: 'restaurants', label: 'מסעדות וקפה' },
  { value: 'transport', label: 'תחבורה' },
  { value: 'fuel', label: 'דלק' },
  { value: 'health', label: 'בריאות ורפואה' },
  { value: 'pharma', label: 'בית מרקחת' },
  { value: 'fashion', label: 'ביגוד והנעלה' },
  { value: 'home', label: 'בית וריהוט' },
  { value: 'education', label: 'חינוך' },
  { value: 'kids', label: 'ילדים' },
  { value: 'entertainment', label: 'בילויים ופנאי' },
  { value: 'subscriptions', label: 'מנויים ואינטרנט' },
  { value: 'insurance', label: 'ביטוחים' },
  { value: 'electricity', label: 'חשמל ומים' },
  { value: 'rent', label: 'שכירות ומשכנתא' },
  { value: 'gifts', label: 'מתנות' },
  { value: 'travel', label: 'נסיעות וחופשות' },
  { value: 'other', label: 'אחר' },
  { value: 'income', label: 'הכנסה' },
  { value: 'savings', label: 'חיסכון' },
];

function buildSystemPrompt(customCategories) {
  const allCats = [
    ...DEFAULT_CATEGORIES,
    ...customCategories.filter((c) => !DEFAULT_CATEGORIES.some((d) => d.value === c.value)),
  ];
  const catList = allCats.map((c) => `${c.value} = ${c.label}`).join('\n');

  return `אתה עוזר פיננסי חכם בשם קיקי. המשתמש שולח לך הודעות בעברית על הוצאות והכנסות, או תמונות של קבלות.
עליך לחלץ את המידע ולהחזיר JSON בלבד (ללא טקסט נוסף).

הקטגוריות הזמינות:
${catList}

פורמט התשובה (JSON בלבד):
{
  "entries": [
    {
      "name": "שם ההוצאה/הכנסה",
      "amount": 123.45,
      "category": "category_value",
      "type": "expense" | "income" | "saving",
      "fixed": "fixed" | "variable",
      "date": "YYYY-MM-DD",
      "note": "הערה אופציונלית"
    }
  ],
  "reply": "תשובה קצרה ויפה לשלוח למשתמש בעברית עם ✦ (לא יותר מ-2 שורות)"
}

חוקים:
- אם אין תאריך → השתמש בתאריך היום
- אם לא ברור אם קבוע/משתנה → variable
- אם מדובר בהכנסה → type: income, category: income
- אם מדובר בחיסכון → type: saving, category: savings
- אם יש כמה פריטים בקבלה — החזר כולם ב-entries
- אם אין מספיק מידע → entries: [], reply: שאלה למשתמש

מיפוי קטגוריות — חובה לעקוב:
- סופר / מכולת / שוק / רמי לוי / שופרסל / ויקטורי / מגה / יינות ביתן / אושר עד → groceries
- מסעדה / קפה / בית קפה / פיצה / סושי / מזון מהיר / וולט / טוויגי / wolt → restaurants
- רכבת / אוטובוס / מונית / אובר / גט / תחבורה ציבורית → transport
- דלק / סונול / פז / דור אלון / תחנת דלק → fuel
- רופא / קופת חולים / תרופה / בית חולים / פיזיו / אופטיקה → health
- בית מרקחת / סופר פארם / yes פארם → pharma
- בגד / נעל / זארה / H&M / פוקס / אדידס / נייקי → fashion
- איקאה / רהיט / כלי בית / שיפוץ / ממד / חשמל (מוצר) → home
- שכירות / משכנתא / ארנונה / ועד בית → rent, fixed
- חשמל / מים / גז / חברת חשמל → electricity, fixed
- ביטוח / מגדל / הראל / כלל / מנורה → insurance, fixed
- נטפליקס / ספוטיפיי / אמזון / מנוי / אינטרנט / סלולר → subscriptions
- גן / בית ספר / חוג / צהרון / פעוטון → kids
- קולנוע / כרטיס / בילוי / אטרקציה / ספורט / חדר כושר → entertainment
- טיול / מלון / טיסה / airbnb / booking → travel
- מתנה / פרח / כרטיס ברכה → gifts`;
}

export async function parseMessage(text, customCategories = [], today = null, apiKey = null) {
  const todayStr = today || new Date().toISOString().split('T')[0];
  const claude = apiKey ? new Anthropic({ apiKey }) : client;

  const response = await claude.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system: buildSystemPrompt(customCategories),
    messages: [
      {
        role: 'user',
        content: `תאריך היום: ${todayStr}\n\n${text}`,
      },
    ],
  });

  const raw = response.content[0].text.trim().replace(/^```json\s*/,'').replace(/```$/,'');
  return JSON.parse(raw);
}

export async function parseReceiptImage(imageUrl, mediaType, customCategories = [], today = null, apiKey = null) {
  const todayStr = today || new Date().toISOString().split('T')[0];
  const claude = apiKey ? new Anthropic({ apiKey }) : client;

  // Fetch image and convert to base64
  const imgResponse = await fetch(imageUrl, {
    headers: { Authorization: `Basic ${Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64')}` },
  });
  const buffer = await imgResponse.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');

  const response = await claude.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system: buildSystemPrompt(customCategories),
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: mediaType || 'image/jpeg', data: base64 },
          },
          {
            type: 'text',
            text: `תאריך היום: ${todayStr}\nזוהי קבלה. חלץ את כל הפריטים הרלוונטיים.`,
          },
        ],
      },
    ],
  });

  const raw = response.content[0].text.trim().replace(/^```json\s*/,'').replace(/```$/,'');
  return JSON.parse(raw);
}
