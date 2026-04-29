import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Crown } from 'lucide-react';

const BOT_URL = import.meta.env.VITE_BOT_URL || 'https://kaspit-production.up.railway.app';

const FEATURE_LABELS = {
  breakeven:  { he: 'ניתוח נקודת איזון', en: 'Break-Even Analysis' },
  insights:   { he: 'תובנות ומגמות', en: 'Insights & Trends' },
  import:     { he: 'ייבוא CSV חכם', en: 'Smart CSV Import' },
  accounts:   { he: 'חשבונות בנק נוספים', en: 'More Bank Accounts' },
  sharing:    { he: 'בית משותף', en: 'Household Sharing' },
  recurring:  { he: 'חיובים קבועים אוטומטיים', en: 'Auto-Recurring Entries' },
  categories: { he: 'קטגוריות מותאמות', en: 'Custom Categories' },
};

export default function PremiumGate({ feature, user, isPremium, children }) {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'he' ? 'he' : 'en';

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dropinReady, setDropinReady] = useState(false);
  const dropinRef = useRef(null);
  const instanceRef = useRef(null);

  if (isPremium) return children;

  const featureLabel = FEATURE_LABELS[feature]?.[lang] || feature;

  useEffect(() => {
    if (!showModal) return;
    let cancelled = false;

    async function init() {
      if (!window.braintree) {
        await new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://js.braintreegateway.com/web/dropin/1.43.0/js/dropin.min.js';
          s.onload = resolve;
          s.onerror = reject;
          document.head.appendChild(s);
        });
      }

      const res = await fetch(`${BOT_URL}/braintree/client-token`);
      const { clientToken } = await res.json();
      if (cancelled) return;

      instanceRef.current = await window.braintree.dropin.create({
        authorization: clientToken,
        container: dropinRef.current,
        locale: lang === 'he' ? 'he_IL' : 'en_US',
      });
      if (!cancelled) setDropinReady(true);
    }

    const t = setTimeout(() => init().catch(console.error), 50);

    return () => { clearTimeout(t);
      cancelled = true;
      if (instanceRef.current) {
        instanceRef.current.teardown().catch(() => {});
        instanceRef.current = null;
      }
      setDropinReady(false);
    };
  }, [showModal]);

  async function handleSubmit() {
    if (!instanceRef.current) return;
    setLoading(true);
    try {
      const { nonce } = await instanceRef.current.requestPaymentMethod();
      const res = await fetch(`${BOT_URL}/braintree/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, email: user.email, nonce }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setShowModal(false);
      window.location.reload();
    } catch (e) {
      alert(e.message);
      setLoading(false);
    }
  }

  return (
    <>
      <div className="page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 320, gap: 16, textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Crown size={24} color="var(--accent)" strokeWidth={1.5} />
        </div>
        <div>
          <div style={{ fontFamily: 'Lora, serif', fontSize: 20, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>
            {lang === 'he' ? `${featureLabel} — תכונה פרמיום` : `${featureLabel} — Premium Feature`}
          </div>
          <div style={{ fontSize: 14, color: 'var(--text3)', maxWidth: 280, lineHeight: 1.6 }}>
            {lang === 'he'
              ? "שדרג לפרמיום כדי לגשת לפיצ'ר הזה ולכל שאר הכלים המתקדמים."
              : 'Upgrade to Premium to access this feature and all advanced tools.'}
          </div>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'DM Mono, monospace', background: 'var(--surface2)', padding: '4px 12px', borderRadius: 6 }}>
          {lang === 'he' ? '$5.50 לחודש' : '$5.50 / month'}
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{ background: 'var(--accent)', color: 'white', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 15, fontFamily: 'DM Sans, Heebo, sans-serif', fontWeight: 600, cursor: 'pointer' }}
        >
          {lang === 'he' ? 'שדרג לפרמיום' : 'Upgrade to Premium'}
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay open" style={{ alignItems: 'center', padding: '16px', overflowY: 'auto' }} onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal" style={{ borderRadius: 'var(--radius-lg)', maxHeight: 'none', position: 'relative', margin: 'auto' }}>
            <div className="modal-title">
              {lang === 'he' ? 'שדרג לפרמיום' : 'Upgrade to Premium'}
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 12 }}>
                {lang === 'he' ? 'הכנס פרטי כרטיס אשראי — $5.50/חודש, בטל בכל עת.' : 'Enter card details — $5.50/month, cancel anytime.'}
              </p>
              <div ref={dropinRef} />
            </div>
            <div className="modal-footer">
              <button
                onClick={handleSubmit}
                disabled={loading || !dropinReady}
                style={{ flex: 1, height: 44, background: (loading || !dropinReady) ? 'var(--surface3)' : 'var(--accent)', color: (loading || !dropinReady) ? 'var(--text3)' : '#fff', border: 'none', borderRadius: 'var(--radius)', fontSize: 15, fontWeight: 600, fontFamily: 'DM Sans, Heebo, sans-serif', cursor: (loading || !dropinReady) ? 'wait' : 'pointer' }}
              >
                {loading
                  ? (lang === 'he' ? 'מעבד...' : 'Processing...')
                  : (lang === 'he' ? 'שלם $5.50/חודש' : 'Pay $5.50/month')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
