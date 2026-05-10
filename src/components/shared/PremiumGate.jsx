import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Crown, MessageCircle, Users } from 'lucide-react';

const BOT_URL = import.meta.env.VITE_BOT_URL || 'https://kaspit-production.up.railway.app';

const FEATURE_LABELS = {
  kiki:       { he: 'Budgi Bot — הוספת הוצאות בוואטסאפ', en: 'Budgi Bot — add expenses via WhatsApp' },
  sharing:    { he: 'בית משותף עם שותף/ה', en: 'Household sharing with partner' },
  breakeven:  { he: 'ניתוח נקודת איזון', en: 'Break-Even Analysis' },
  insights:   { he: 'תובנות ומגמות', en: 'Insights & Trends' },
  import:     { he: 'ייבוא CSV חכם', en: 'Smart CSV Import' },
  accounts:   { he: 'חשבונות בנק נוספים', en: 'More Bank Accounts' },
  recurring:  { he: 'חיובים קבועים אוטומטיים', en: 'Auto-Recurring Entries' },
  categories: { he: 'קטגוריות מותאמות', en: 'Custom Categories' },
};

const FEATURE_ICONS = { kiki: MessageCircle, sharing: Users };
const TOP_FEATURES = ['kiki', 'sharing', 'breakeven', 'insights'];

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
      const idToken = await user.getIdToken();
      const res = await fetch(`${BOT_URL}/braintree/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ nonce }),
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
        <div style={{ width: '100%', maxWidth: 300, background: 'var(--surface2)', borderRadius: 10, padding: '10px 14px', marginTop: 4 }}>
          {TOP_FEATURES.map((key) => {
            const Icon = FEATURE_ICONS[key];
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: '0.5px solid var(--border)' }}>
                {Icon ? <Icon size={15} color="var(--accent)" strokeWidth={1.8} /> : <span style={{ color: 'var(--accent)', fontSize: 13 }}>✓</span>}
                <span style={{ fontSize: 13, color: 'var(--text2)' }}>{FEATURE_LABELS[key][lang]}</span>
              </div>
            );
          })}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
            <span style={{ color: 'var(--accent)', fontSize: 13 }}>···</span>
            <span style={{ fontSize: 12, color: 'var(--text3)' }}>{lang === 'he' ? 'ועוד' : 'and more'}</span>
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

      {showModal && createPortal(
        <div
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(28,25,23,0.55)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
        >
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', width: 'min(96vw, 420px)', overflow: 'hidden' }}>
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
        </div>,
        document.body
      )}
    </>
  );
}
