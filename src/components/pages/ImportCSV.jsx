import { useState, useRef } from 'react';
import { addEntry } from '../../firebase/db';
import { formatAmount } from '../../utils/format';

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

async function parseCSVWithClaude(csvText, apiKey, existingEntries, customCategories) {
  const allCats = [
    ...DEFAULT_CATEGORIES,
    ...customCategories.filter((c) => !DEFAULT_CATEGORIES.some((d) => d.value === c.value)),
  ];
  const catList = allCats.map((c) => `${c.value} = ${c.label}`).join('\n');

  const existingSummary = existingEntries.slice(0, 200).map((e) =>
    `${e.date}|${e.amount}|${e.name}`
  ).join('\n');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: `You are a bank CSV parser. Parse this bank statement CSV and return JSON only.

Available categories:
${catList}

Existing entries in the app (date|amount|name) — mark as duplicate if date+amount match:
${existingSummary || 'none'}

CSV content:
${csvText}

Return JSON array only, no markdown:
[
  {
    "name": "transaction name",
    "amount": 123.45,
    "date": "YYYY-MM-DD",
    "category": "category_value",
    "type": "expense" or "income",
    "fixed": "fixed" or "variable",
    "isDuplicate": true or false
  }
]

Rules:
- Positive amounts = income, negative = expense (use absolute value for amount)
- Skip header rows, totals, balance rows
- isDuplicate = true if same date AND same amount exists in the existing entries list
- Supermarket/grocery store = groceries, NOT home/rent`,
      }],
    }),
  });

  const data = await res.json();
  const raw = data.content[0].text.trim().replace(/^```json\s*/, '').replace(/```$/, '');
  return JSON.parse(raw);
}

export default function ImportCSV({ entries, householdId, user, customCategories, allCategories }) {
  const [step, setStep] = useState('upload'); // upload | parsing | review | done
  const [parsed, setParsed] = useState([]);
  const [selected, setSelected] = useState({});
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState('');
  const [importedCount, setImportedCount] = useState(0);
  const fileRef = useRef();

  const userApiKey = user?.anthropicApiKey;

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setError('');
    setStep('parsing');

    try {
      const text = await file.text();
      const transactions = await parseCSVWithClaude(text, userApiKey || import.meta.env.VITE_ANTHROPIC_API_KEY, entries, customCategories);

      // Pre-select all non-duplicates
      const sel = {};
      transactions.forEach((t, i) => { sel[i] = !t.isDuplicate; });
      setParsed(transactions);
      setSelected(sel);
      setStep('review');
    } catch (err) {
      setError('שגיאה בקריאת הקובץ: ' + err.message);
      setStep('upload');
    }
  }

  async function handleImport() {
    setImporting(true);
    const toImport = parsed.filter((_, i) => selected[i]);
    let count = 0;
    for (const t of toImport) {
      try {
        await addEntry(householdId, {
          name: t.name,
          amount: t.amount,
          date: t.date,
          category: t.category,
          type: t.type,
          fixed: t.fixed,
          note: 'יובא מ-CSV',
        }, user);
        count++;
      } catch {}
    }
    setImportedCount(count);
    setImporting(false);
    setStep('done');
  }

  const selectedCount = Object.values(selected).filter(Boolean).length;

  if (step === 'upload') return (
    <div className="page">
      <div className="section-title">ייבוא מהבנק</div>
      <div className="be-card">
        <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 16, lineHeight: 1.7 }}>
          הורידי קובץ CSV מאתר הבנק שלך והעלי אותו כאן — כספית תזהה את התנועות אוטומטית, תקטלג אותן, ותאפשר לך לבחור מה לייבא.
        </div>

        {[
          { bank: 'פועלים', steps: 'כניסה לחשבון → תנועות בחשבון → ייצוא לאקסל/CSV' },
          { bank: 'לאומי', steps: 'כניסה לחשבון → פעולות בחשבון → הורדת קובץ' },
          { bank: 'דיסקונט', steps: 'כניסה לחשבון → תנועות → ייצוא' },
          { bank: 'מזרחי', steps: 'כניסה לחשבון → תנועות → הורד כ-CSV' },
        ].map((b) => (
          <div key={b.bank} className="be-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
            <div style={{ fontWeight: 700, fontSize: 13 }}>{b.bank}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>{b.steps}</div>
          </div>
        ))}

        {error && <div className="alert" style={{ marginTop: 12 }}>{error}</div>}

        <button
          className="submit-btn"
          style={{ marginTop: 16 }}
          onClick={() => fileRef.current.click()}
        >
          📂 בחרי קובץ CSV
        </button>
        <input ref={fileRef} type="file" accept=".csv,.xls,.xlsx" style={{ display: 'none' }} onChange={handleFile} />
      </div>
    </div>
  );

  if (step === 'parsing') return (
    <div className="page">
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div className="loading-spinner" style={{ margin: '0 auto 16px' }} />
        <div style={{ color: 'var(--text2)', fontSize: 14 }}>קיקי קוראת את הקובץ...</div>
      </div>
    </div>
  );

  if (step === 'done') return (
    <div className="page">
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✦</div>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>יובאו {importedCount} פעולות!</div>
        <div style={{ color: 'var(--text2)', fontSize: 14 }}>חזרי לדשבורד לראות את הנתונים</div>
      </div>
    </div>
  );

  // Review step
  const duplicates = parsed.filter((t) => t.isDuplicate);
  const newItems = parsed.filter((t) => !t.isDuplicate);

  return (
    <div className="page">
      <div className="section-title">בחרי מה לייבא</div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button
          onClick={() => setSelected(Object.fromEntries(parsed.map((_, i) => [i, !parsed[i].isDuplicate])))}
          style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: 'var(--text2)', cursor: 'pointer', fontFamily: 'Heebo,sans-serif' }}
        >
          בחר חדשים בלבד
        </button>
        <button
          onClick={() => setSelected(Object.fromEntries(parsed.map((_, i) => [i, true])))}
          style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: 'var(--text2)', cursor: 'pointer', fontFamily: 'Heebo,sans-serif' }}
        >
          בחר הכל
        </button>
        <button
          onClick={() => setSelected(Object.fromEntries(parsed.map((_, i) => [i, false])))}
          style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: 'var(--text2)', cursor: 'pointer', fontFamily: 'Heebo,sans-serif' }}
        >
          בטל הכל
        </button>
      </div>

      {duplicates.length > 0 && (
        <div className="alert info" style={{ marginBottom: 12, fontSize: 12 }}>
          🔁 {duplicates.length} תנועות זוהו ככפילויות ולא סומנו — תוכלי לסמן אותן ידנית אם תרצי
        </div>
      )}

      <div className="expense-list" style={{ marginBottom: 80 }}>
        {parsed.map((t, i) => (
          <div
            key={i}
            className="expense-item"
            style={{
              cursor: 'pointer',
              opacity: t.isDuplicate && !selected[i] ? 0.5 : 1,
              borderColor: selected[i] ? 'var(--accent)' : undefined,
              background: selected[i] ? 'rgba(124,106,247,.08)' : undefined,
            }}
            onClick={() => setSelected((s) => ({ ...s, [i]: !s[i] }))}
          >
            <input
              type="checkbox"
              checked={!!selected[i]}
              onChange={() => {}}
              style={{ width: 18, height: 18, accentColor: 'var(--accent)', flexShrink: 0 }}
            />
            <div className="expense-icon" style={{ background: 'var(--surface3)', fontSize: 16 }}>
              {t.type === 'income' ? '💰' : '💸'}
            </div>
            <div className="expense-info">
              <div className="expense-name">{t.name}</div>
              <div className="expense-meta">{t.date} · {allCategories.find((c) => c.value === t.category)?.label || t.category}</div>
              {t.isDuplicate && <div style={{ fontSize: 10, color: 'var(--accent3)', marginTop: 2 }}>⚠️ כנראה כפילות</div>}
            </div>
            <div className={`expense-amount ${t.type === 'income' ? 'in' : 'out'}`}>
              {t.type === 'income' ? '+' : '-'}{formatAmount(t.amount)}
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 480, background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '12px 16px', zIndex: 50 }}>
        <button
          className="submit-btn"
          onClick={handleImport}
          disabled={importing || selectedCount === 0}
          style={{ margin: 0 }}
        >
          {importing ? 'מייבא...' : `ייבאי ${selectedCount} פעולות ✦`}
        </button>
      </div>
    </div>
  );
}
