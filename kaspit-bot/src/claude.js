import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const DEFAULT_CATEGORIES = [
  { value: 'housing',   label: 'דיור' },
  { value: 'food',      label: 'מזון וסופר' },
  { value: 'transport', label: 'תחבורה' },
  { value: 'kids',      label: 'ילדים' },
  { value: 'health',    label: 'בריאות' },
  { value: 'education', label: 'חינוך' },
  { value: 'clothing',  label: 'ביגוד' },
  { value: 'coffee',    label: 'קפה' },
  { value: 'dining',    label: 'מסעדות' },
  { value: 'leisure',   label: 'פנאי ובילויים' },
  { value: 'sport',     label: 'ספורט' },
  { value: 'telecom',   label: 'תקשורת' },
  { value: 'travel',    label: 'נסיעות' },
  { value: 'shopping',  label: 'קניות' },
  { value: 'insurance', label: 'ביטוח' },
  { value: 'pets',      label: 'חיות מחמד' },
  { value: 'savings',   label: 'חיסכון' },
  { value: 'income',    label: 'הכנסה' },
  { value: 'other',     label: 'אחר' },
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
  "reply": "תשובה קצרה בעברית עם ✦ שמאשרת את הרישום. אל תשאלי שאלות ואל תבקשי אישור — פשוט אשרי שנרשם."
}

חוקים:
- אם אין תאריך → השתמש בתאריך היום
- אם לא ברור אם קבוע/משתנה → variable
- אם מדובר בהכנסה → type: income, category: income
- אם מדובר בחיסכון → type: saving, category: savings
- אם יש כמה פריטים בקבלה — החזר כולם ב-entries
- אם אין מספיק מידע → entries: [], reply: שאלה למשתמש

מיפוי קטגוריות — חובה לעקוב:
- סופר / מכולת / שוק / רמי לוי / שופרסל / ויקטורי / מגה / יינות ביתן / אושר עד → food
- מוצר מזון כלשהו: חלב / קוטג' / גבינה / לחם / ביצים / עוף / בשר / ירקות / פירות / שוקולד / חטיף / שתייה / קפה (מוצר) / תה / דגנים / פסטה / אורז / שמן / רוטב / יוגורט / גלידה / כל מוצר אוכל → food, variable
- קפה / בית קפה / אספרסו / קפוצ'ינו / לאטה / פרדוסו / נס קפה / קפה שחור / ג'ו / ארומה / קפה ג'ו / coffee / café → coffee, variable
- מסעדה / פיצה / סושי / מזון מהיר / וולט / טוויגי / wolt / deliveroo → dining
- רכבת / אוטובוס / מונית / אובר / גט / תחבורה ציבורית / דלק / סונול / פז / רב-קו → transport
- רופא / קופת חולים / תרופה / בית חולים / פיזיו / אופטיקה / בית מרקחת / סופר פארם / super-pharm → health
- בגד / נעל / זארה / H&M / פוקס / אדידס / נייקי / ביגוד / אופנה → clothing
- איקאה / רהיט / כלי בית / שיפוץ / ממד / קניות כלליות → shopping
- שכירות / משכנתא / ארנונה / ועד בית / חשמל / מים / גז / חברת חשמל / אינטרנט ביתי → housing, fixed
- ביטוח / מגדל / הראל / כלל / מנורה → insurance, fixed
- נטפליקס / ספוטיפיי / אמזון פריים / מנוי דיגיטלי / סלולר / פלאפון / HOT / yes / 012 → telecom
- גן / בית ספר / חוג / צהרון / פעוטון / מעון → kids
- קולנוע / כרטיס הופעה / בילוי / אטרקציה / פארק → leisure
- חדר כושר / ספורט / ריצה / אימון / פילאטיס / יוגה → sport
- טיול / מלון / טיסה / airbnb / booking / נופש → travel
- מתנה / פרח / כרטיס ברכה → shopping
- כלב / חתול / וטרינר / מזון לחיות / ממליה → pets

כלל ברירת מחדל חשוב:
- housing משמשת אך ורק לחשבונות דיור (שכירות, משכנתא, חשמל, מים, ארנונה). אל תשתמש בה לשום דבר אחר.
- כל מוצר מזון / קנייה בסופר / פריט אוכל שלא ציינת לו קטגוריה → food, variable
- כל קנייה שאינה ברורה לקטגוריה → other, variable — לא housing`;
}

export async function parseMessage(text, customCategories = [], today = null) {
  const todayStr = today || new Date().toISOString().split('T')[0];
  const claude = client;

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

export async function parseReceiptImage(imageUrl, mediaType, customCategories = [], today = null) {
  const todayStr = today || new Date().toISOString().split('T')[0];
  const claude = client;

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
