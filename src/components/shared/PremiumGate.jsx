import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Crown } from 'lucide-react';

const BOT_URL = import.meta.env.VITE_BOT_URL || 'https://kaspit-bot.up.railway.app';

const FEATURE_LABELS = {
  breakeven: { he: 'ניתוח נקודת איזון', en: 'Break-Even Analysis' },
  insights:  { he: 'תובנות ומגמות', en: 'Insights & Trends' },
  import:    { he: 'ייבוא CSV חכם', en: 'Smart CSV Import' },
  accounts:  { he: 'חשבונות בנק נוספים', en: 'More Bank Accounts' },
  sharing:   { he: 'בית משותף', en: 'Household Sharing' },
  recurring: { he: 'חיובים קבועים אוטומטיים', en: 'Auto-Recurring Entries' },
  categories:{ he: 'קטגוריות מותאמות', en: 'Custom Categories' },
};

export default function PremiumGate({ feature, user, isPremium, children }) {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const lang = i18n.language === 'he' ? 'he' : 'en';

  if (isPremium) return children;

  const featureLabel = FEATURE_LABELS[feature]?.[lang] || feature;

  async function handleUpgrade() {
    if (!user?.uid || !user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`${BOT_URL}/stripe/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, email: user.email }),
      });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch (e) {
      alert(t('premium.errorCheckout') + e.message);
      setLoading(false);
    }
  }

  return (
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
            ? 'שדרגי לפרמיום כדי לגשת לפיצ\'ר הזה ולכל שאר הכלים המתקדמים.'
            : 'Upgrade to Premium to access this feature and all advanced tools.'}
        </div>
      </div>
      <div style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'DM Mono, monospace', background: 'var(--surface2)', padding: '4px 12px', borderRadius: 6 }}>
        {lang === 'he' ? '₪19.90 לחודש' : '₪19.90 / month'}
      </div>
      <button
        onClick={handleUpgrade}
        disabled={loading}
        style={{
          background: 'var(--accent)',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: 15,
          fontFamily: 'DM Sans, Heebo, sans-serif',
          fontWeight: 600,
          cursor: loading ? 'wait' : 'pointer',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading
          ? (lang === 'he' ? 'מעבירה...' : 'Redirecting...')
          : (lang === 'he' ? 'שדרגי לפרמיום' : 'Upgrade to Premium')}
      </button>
    </div>
  );
}
