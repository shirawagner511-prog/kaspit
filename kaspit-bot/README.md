# קיקי — בוט כספית לוואטסאפ

קיקי היא עוזרת חכמה שמקבלת הודעות WhatsApp ומעדכנת את כספית אוטומטית.

## התקנה

### 1. התקנת חבילות

```bash
cd kaspit-bot
npm install
```

### 2. הגדרת משתני סביבה

```bash
cp .env.example .env
```

מלאי את הקובץ `.env`:

#### Twilio
1. כנסי ל-[twilio.com](https://twilio.com) → צרי חשבון חינמי
2. WhatsApp Sandbox: Console → Messaging → Try it out → Send a WhatsApp message
3. העתיקי את `Account SID` ו-`Auth Token`

#### Anthropic
1. כנסי ל-[console.anthropic.com](https://console.anthropic.com)
2. צרי API Key

#### Firebase Admin SDK
1. Firebase Console → Project Settings → Service Accounts
2. לחצי "Generate new private key" → הורידי JSON
3. העתיקי את `project_id`, `client_email`, `private_key` ל-`.env`

### 3. חשיפה לאינטרנט (לפיתוח)

```bash
npm install -g ngrok
ngrok http 3000
```

העתיקי את ה-URL (למשל `https://abc123.ngrok.io/webhook`) ל-Twilio Sandbox → "When a message comes in".

### 4. הפעלה

```bash
npm start
```

## שימוש

- שלחי לקיקי: **"קיקי, קפה 18 שקל"**
- שלחי לקיקי: **"שכר דירה 3500 ₪, קבוע"**
- שלחי לקיקי: **תמונה של קבלה** ← קיקי תחלץ את כל הפריטים

## רישום מספר טלפון

בכספית ← הגדרות ← 🤖 קיקי ← הכניסי את מספר הטלפון שלך.

## פריסה לשרת (Production)

מומלץ: Railway, Render, או Fly.io — כולם חינמיים לפרויקטים קטנים.

```bash
# Railway (לדוגמה)
npm install -g @railway/cli
railway login
railway init
railway up
```

אחרי הפריסה עדכני את ה-Webhook URL ב-Twilio ל-URL של השרת החדש.
