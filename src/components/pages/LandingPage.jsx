import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function WordMark({ size = 32 }) {
  return (
    <span dir="ltr" style={{ fontFamily: 'Georgia, serif', fontSize: size, lineHeight: 1, userSelect: 'none' }}>
      <span style={{ fontWeight: 700, color: 'var(--accent)' }}>B</span>
      <span style={{ fontWeight: 400, color: 'var(--text)' }}>udgi</span>
    </span>
  );
}

const STEPS = [
  { icon: '📝', title: 'מתעדים', body: 'כותבים "קפה 18" בוואטסאפ לקיקי — ונגמר. אפשר גם לצלם קבלה.' },
  { icon: '🏠', title: 'מסנכרנים', body: 'שני בני זוג רואים את אותו תקציב בזמן אמת, מכל מכשיר.' },
  { icon: '📊', title: 'מבינים', body: 'הדשבורד מראה כמה נשאר, מה חרג, ואיפה אפשר לחסוך.' },
];

const FAQS = [
  { q: 'האם צריך להתחבר לחשבון הבנק?', a: 'בכלל לא. Budgi עובד על תיעוד ידני — פרטיותך שמורה.' },
  { q: 'האם הנתונים שלי מאובטחים?', a: 'הנתונים מוצפנים ב-Firebase של Google. לא נמכרו ולא ישוכרו לצד שלישי לעולם.' },
  { q: 'מה ההבדל בין גרסה חינמית לפרמיום?', a: 'גרסה חינמית: מעקב מלא לבית יחיד. פרמיום: בית משותף עם בן/בת זוג, ייבוא CSV, ותובנות מתקדמות.' },
  { q: 'האם קיקי (הבוט) עובד מכל טלפון?', a: 'כן — כל מכשיר עם WhatsApp. לא צריך להוריד כלום נוסף.' },
  { q: 'איך מייצאים את הנתונים?', a: 'בהגדרות → ייצוא CSV. הקובץ נפתח ב-Excel וב-Google Sheets.' },
];

export default function LandingPage({ onEnter }) {
  const { i18n } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);

  const isHe = i18n.language !== 'en';

  function toggleLang() {
    const next = isHe ? 'en' : 'he';
    i18n.changeLanguage(next);
    localStorage.setItem('budgi-lang', next);
    document.body.dir = next === 'he' ? 'rtl' : 'ltr';
  }

  return (
    <div dir={isHe ? 'rtl' : 'ltr'} style={{ background: 'var(--bg)', minHeight: '100dvh', color: 'var(--text)', fontFamily: 'Heebo, sans-serif' }}>

      {/* ── Nav ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(245,242,236,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 20px', maxWidth: 900, margin: '0 auto',
      }}>
        <WordMark size={26} />
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button onClick={toggleLang} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: 'var(--text2)', fontFamily: 'inherit' }}>
            {isHe ? 'EN' : 'עב'}
          </button>
          <button onClick={onEnter} style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            {isHe ? 'כניסה' : 'Sign in'}
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px' }}>

        {/* ── Hero ── */}
        <section style={{ textAlign: 'center', padding: '64px 0 56px' }}>
          <div style={{ display: 'inline-block', background: 'var(--accent-soft)', color: 'var(--accent)', borderRadius: 99, padding: '4px 14px', fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
            {isHe ? 'בלי בנק. בלי אקסל. בלי בלגן.' : 'No bank. No spreadsheet. No stress.'}
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 7vw, 56px)', fontWeight: 800, lineHeight: 1.15, margin: '0 0 20px', letterSpacing: '-0.5px' }}>
            {isHe ? (
              <>לדעת כמה נשאר<br />החודש — <span style={{ color: 'var(--accent)' }}>סוף סוף</span></>
            ) : (
              <>Know exactly what's<br />left this month — <span style={{ color: 'var(--accent)' }}>finally</span></>
            )}
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text2)', maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.65 }}>
            {isHe
              ? 'Budgi הוא אפליקציית תקציב משפחתי ישראלית — מתעדת הוצאות דרך WhatsApp, מסנכרנת בין בני זוג, ומראה בדיוק איפה הכסף הולך.'
              : 'Budgi is a family budget app — log expenses via WhatsApp, sync with your partner, and see exactly where your money goes.'}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={onEnter}
              style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(31,95,64,0.25)' }}
            >
              {isHe ? 'התחילי בחינם' : 'Start for free'}
            </button>
            <a
              href="#how"
              style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none' }}
            >
              {isHe ? 'איך זה עובד?' : 'How it works'}
            </a>
          </div>
        </section>

        {/* ── Mock phone card ── */}
        <section style={{ display: 'flex', justifyContent: 'center', marginBottom: 72 }}>
          <div style={{ width: '100%', maxWidth: 380, background: 'var(--surface)', borderRadius: 20, border: '1px solid var(--border)', padding: 24, boxShadow: 'var(--shadow-md)' }}>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 16, fontFamily: 'DM Mono, monospace' }}>
              {isHe ? 'מאי 2025' : 'May 2025'}
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 4 }}>{isHe ? 'הוצאות החודש' : 'Spent this month'}</div>
              <div style={{ fontSize: 38, fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--expense)' }}>₪4,820</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              {[
                { label: isHe ? 'הכנסות' : 'Income', val: '₪18,000', color: 'var(--accent)' },
                { label: isHe ? 'נשאר' : 'Remaining', val: '₪13,180', color: 'var(--text)' },
              ].map(({ label, val, color }) => (
                <div key={label} style={{ background: 'var(--bg)', borderRadius: 10, padding: '10px 12px' }}>
                  <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 18, fontFamily: 'DM Mono, monospace', fontWeight: 500, color }}>{val}</div>
                </div>
              ))}
            </div>
            {[
              { name: isHe ? 'סופר' : 'Groceries', cat: isHe ? 'מזון' : 'Food', amount: '-₪340', color: 'var(--expense)' },
              { name: isHe ? 'שכר דירה' : 'Rent', cat: isHe ? 'דיור' : 'Housing', amount: '-₪4,200', color: 'var(--expense)' },
              { name: isHe ? 'משכורת' : 'Salary', cat: isHe ? 'הכנסה' : 'Income', amount: '+₪12,000', color: 'var(--accent)' },
            ].map((r) => (
              <div key={r.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{r.cat}</div>
                </div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 14, color: r.color }}>{r.amount}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how" style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>
            {isHe ? 'איך זה עובד?' : 'How it works'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 20px' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.6 }}>{s.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WhatsApp highlight ── */}
        <section style={{ background: 'var(--accent)', borderRadius: 20, padding: '40px 32px', marginBottom: 80, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
          <div style={{ fontSize: 40 }}>💬</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>
            {isHe ? 'קיקי — הבוט שלכם ב-WhatsApp' : 'Kiki — your WhatsApp bot'}
          </h3>
          <p style={{ fontSize: 15, opacity: 0.88, maxWidth: 480, lineHeight: 1.65, margin: 0 }}>
            {isHe
              ? 'שלחו לקיקי הודעה כמו "סופר 340" — והיא תוסיף את הפעולה לתקציב שניות לאחר מכן. אפשר גם לצלם קבלה.'
              : 'Send Kiki a message like "groceries 340" — she adds it to your budget instantly. Photo receipts work too.'}
          </p>
          <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '14px 20px', fontFamily: 'DM Mono, monospace', fontSize: 14, textAlign: 'start', width: '100%', maxWidth: 340 }}>
            <div style={{ opacity: 0.7, marginBottom: 8 }}>You → קיקי</div>
            <div style={{ marginBottom: 6 }}>קפה 18</div>
            <div style={{ marginBottom: 6 }}>סופר 340 שקל</div>
            <div style={{ opacity: 0.7, marginTop: 8 }}>קיקי → You</div>
            <div>✦ נרשם! קפה ₪18</div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>
            {isHe ? 'מחיר' : 'Pricing'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {/* Free */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 24px' }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{isHe ? 'חינמי' : 'Free'}</div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 32, fontWeight: 500, marginBottom: 20 }}>₪0</div>
              {[
                isHe ? 'מעקב הוצאות והכנסות' : 'Expense & income tracking',
                isHe ? 'קטגוריות ותקציבים' : 'Categories & budgets',
                isHe ? 'בוט WhatsApp (קיקי)' : 'WhatsApp bot (Kiki)',
                isHe ? 'ייצוא CSV' : 'CSV export',
              ].map((f) => (
                <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10, fontSize: 14, color: 'var(--text2)' }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0 }}>✓</span>{f}
                </div>
              ))}
              <button onClick={onEnter} style={{ width: '100%', marginTop: 20, background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 0', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', color: 'var(--text)' }}>
                {isHe ? 'התחילי' : 'Get started'}
              </button>
            </div>
            {/* Premium */}
            <div style={{ background: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: 16, padding: '28px 24px', color: '#fff' }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{isHe ? 'פרמיום' : 'Premium'}</div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 32, fontWeight: 500, marginBottom: 4 }}>₪19.90</div>
              <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 20 }}>{isHe ? 'לחודש' : 'per month'}</div>
              {[
                isHe ? 'הכל בחינמי, ועוד:' : 'Everything in Free, plus:',
                isHe ? 'בית משותף עם בן/בת זוג' : 'Shared household with partner',
                isHe ? 'ייבוא CSV חכם (AI)' : 'Smart CSV import (AI)',
                isHe ? 'תובנות מתקדמות' : 'Advanced insights',
                isHe ? 'חיובים קבועים אוטומטיים' : 'Auto recurring entries',
              ].map((f, i) => (
                <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10, fontSize: 14, opacity: i === 0 ? 0.75 : 1, fontWeight: i === 0 ? 400 : 500 }}>
                  {i > 0 && <span style={{ flexShrink: 0 }}>✓</span>}{f}
                </div>
              ))}
              <button onClick={onEnter} style={{ width: '100%', marginTop: 20, background: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', color: 'var(--accent)' }}>
                {isHe ? 'נסי 7 ימים חינם' : 'Try free for 7 days'}
              </button>
            </div>
          </div>
        </section>

        {/* ── Trust badges ── */}
        <section style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, marginBottom: 80 }}>
          {[
            { icon: '🔒', text: isHe ? 'ללא חיבור לבנק' : 'No bank connection' },
            { icon: '🇮🇱', text: isHe ? 'נבנה בישראל' : 'Made in Israel' },
            { icon: '📴', text: isHe ? 'עובד גם אופליין' : 'Works offline' },
            { icon: '🗑', text: isHe ? 'מחיקת נתונים בכל עת' : 'Delete data anytime' },
          ].map(({ icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text2)' }}>
              <span>{icon}</span><span>{text}</span>
            </div>
          ))}
        </section>

        {/* ── FAQ ── */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 32 }}>
            {isHe ? 'שאלות נפוצות' : 'FAQ'}
          </h2>
          {FAQS.map((f, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--border)' }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', padding: '16px 0', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', color: 'var(--text)', textAlign: 'start', gap: 12 }}
              >
                <span>{f.q}</span>
                <span style={{ color: 'var(--text3)', fontSize: 20, flexShrink: 0, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, paddingBottom: 16 }}>{f.a}</div>
              )}
            </div>
          ))}
        </section>

        {/* ── Final CTA ── */}
        <section style={{ textAlign: 'center', padding: '40px 0 80px' }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}>
            {isHe ? 'מוכנות להתחיל?' : 'Ready to start?'}
          </h2>
          <p style={{ color: 'var(--text2)', marginBottom: 28, fontSize: 15 }}>
            {isHe ? 'חינמי. בלי כרטיס אשראי. פחות מדקה להרשמה.' : 'Free. No credit card. Under a minute to sign up.'}
          </p>
          <button
            onClick={onEnter}
            style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 10, padding: '15px 40px', fontSize: 17, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(31,95,64,0.25)' }}
          >
            {isHe ? 'התחילי בחינם' : 'Start for free'}
          </button>
        </section>

      </div>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '24px 20px', textAlign: 'center', color: 'var(--text3)', fontSize: 13 }}>
        <WordMark size={18} />
        <div style={{ marginTop: 10 }}>
          {isHe ? '© 2025 Budgi · פרטי · ללא פרסומות · נבנה למשפחות אמיתיות' : '© 2025 Budgi · Private · No ads · Built for real families'}
        </div>
      </footer>

    </div>
  );
}
