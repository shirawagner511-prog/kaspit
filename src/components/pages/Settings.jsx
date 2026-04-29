import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getHousehold, getHouseholdMembers, saveCustomCategories, saveBudgets, saveSavingsGoal, updateEntry, joinHousehold } from '../../firebase/db';
import { CATEGORY_VALUES } from '../../utils/constants';
import { formatAmount } from '../../utils/format';

const BOT_URL = import.meta.env.VITE_BOT_URL || 'https://kaspit-production.up.railway.app';

function SubscriptionSection({ t, i18n, isPremium, subStatus, trialDaysLeft, subscription, user, subLoading, setSubLoading }) {
  const lang = i18n.language === 'he' ? 'he' : 'en';
  const [upgradeStep, setUpgradeStep] = useState(null); // null | 'compare' | 'pay'
  const [dropinReady, setDropinReady] = useState(false);
  const dropinRef = useRef(null);
  const instanceRef = useRef(null);

  const clientTokenRef = useRef(null);

  // Pre-load script + token when component mounts (not on click)
  useEffect(() => {
    if (isPremium) return;
    async function preload() {
      if (!window.braintree) {
        await new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://js.braintreegateway.com/web/dropin/1.43.0/js/dropin.min.js';
          s.onload = resolve; s.onerror = reject;
          document.head.appendChild(s);
        });
      }
      if (!clientTokenRef.current) {
        const res = await fetch(`${BOT_URL}/braintree/client-token`);
        const { clientToken } = await res.json();
        clientTokenRef.current = clientToken;
      }
    }
    preload().catch(console.error);
  }, [isPremium]);

  useEffect(() => {
    if (upgradeStep !== 'pay') return;
    let cancelled = false;
    async function init() {
      if (!window.braintree) {
        await new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://js.braintreegateway.com/web/dropin/1.43.0/js/dropin.min.js';
          s.onload = resolve; s.onerror = reject;
          document.head.appendChild(s);
        });
      }
      if (!clientTokenRef.current) {
        const res = await fetch(`${BOT_URL}/braintree/client-token`);
        const { clientToken } = await res.json();
        clientTokenRef.current = clientToken;
      }
      if (cancelled || !dropinRef.current) return;
      instanceRef.current = await window.braintree.dropin.create({
        authorization: clientTokenRef.current,
        container: dropinRef.current,
        locale: lang === 'he' ? 'he_IL' : 'en_US',
      });
      if (!cancelled) setDropinReady(true);
    }
    const t = setTimeout(() => init().catch(console.error), 50);
    return () => clearTimeout(t);
    return () => {
      cancelled = true;
      if (instanceRef.current) { instanceRef.current.teardown().catch(() => {}); instanceRef.current = null; }
      setDropinReady(false);
    };
  }, [upgradeStep]);

  async function handlePay() {
    if (!instanceRef.current) return;
    setSubLoading(true);
    try {
      const { nonce } = await instanceRef.current.requestPaymentMethod();
      const res = await fetch(`${BOT_URL}/braintree/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, email: user.email, nonce }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setUpgradeStep(null);
      window.location.reload();
    } catch (e) {
      alert(e.message);
      setSubLoading(false);
    }
  }

  async function handleCancel() {
    if (!subscription?.braintreeSubscriptionId) return;
    if (!window.confirm(lang === 'he' ? 'לבטל את המנוי?' : 'Cancel subscription?')) return;
    setSubLoading(true);
    try {
      const res = await fetch(`${BOT_URL}/braintree/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, subscriptionId: subscription.braintreeSubscriptionId }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      window.location.reload();
    } catch (e) {
      alert((lang === 'he' ? 'שגיאה: ' : 'Error: ') + e.message);
      setSubLoading(false);
    }
  }

  const statusColor = isPremium ? 'var(--accent)' : 'var(--text3)';
  const statusLabel = subStatus === 'active'
    ? (lang === 'he' ? 'פרמיום' : 'Premium')
    : subStatus === 'trial'
    ? (lang === 'he' ? `ניסיון חינם — ${trialDaysLeft} ימים נותרו` : `Free trial — ${trialDaysLeft} days left`)
    : subStatus === 'past_due'
    ? (lang === 'he' ? 'תשלום נכשל' : 'Payment failed')
    : subStatus === 'cancelled'
    ? (lang === 'he' ? 'בוטל' : 'Cancelled')
    : (lang === 'he' ? 'חינמי' : 'Free');

  return (
    <div style={{ marginTop: 8, padding: '16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
      <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
        {lang === 'he' ? 'מנוי' : 'Subscription'}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: statusColor }}>{statusLabel}</div>
          {subStatus === 'active' && subscription?.currentPeriodEnd && (
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>
              {lang === 'he' ? 'חידוש: ' : 'Renews: '}
              {new Date(subscription.currentPeriodEnd).toLocaleDateString(lang === 'he' ? 'he-IL' : 'en-US')}
            </div>
          )}
        </div>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, color: 'var(--text2)' }}>
          {isPremium ? '₪19.90/mo' : (lang === 'he' ? 'חינם' : 'Free')}
        </div>
      </div>

      {subStatus === 'active' ? (
        <button onClick={handleCancel} disabled={subLoading} style={{ width: '100%', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 0', fontSize: 14, cursor: 'pointer', fontFamily: 'Heebo,sans-serif', color: 'var(--text2)', opacity: subLoading ? 0.7 : 1 }}>
          {subLoading ? '...' : (lang === 'he' ? 'ביטול מנוי' : 'Cancel subscription')}
        </button>
      ) : subStatus !== 'active' ? (
        <button onClick={() => setUpgradeStep('compare')} style={{ width: '100%', background: 'var(--accent)', border: 'none', borderRadius: 8, padding: '10px 0', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Heebo,sans-serif', color: 'white' }}>
          {lang === 'he' ? 'שדרג לפרמיום — $5.50/חודש' : 'Upgrade to Premium — $5.50/mo'}
        </button>
      ) : null}

      {/* Step 1: Plan comparison */}
      {upgradeStep === 'compare' && (
        <div className="modal-overlay open" style={{ alignItems: 'center', padding: 16 }} onClick={(e) => e.target === e.currentTarget && setUpgradeStep(null)}>
          <div className="modal" style={{ borderRadius: 12, maxHeight: '85vh' }}>
            <div className="modal-title">
              {lang === 'he' ? '✦ בחר מסלול' : '✦ Choose a plan'}
              <button className="modal-close" onClick={() => setUpgradeStep(null)}>✕</button>
            </div>
            <div className="modal-body" style={{ paddingTop: 12, overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                {[
                  { label: lang === 'he' ? 'ניסיון' : 'Trial', price: lang === 'he' ? 'חינם' : 'Free', color: 'var(--surface2)', border: 'var(--border)', accent: false, features: lang === 'he'
                    ? ['✓ הכנסות והוצאות', '✓ דשבורד ותרשימים', '✓ עד 2 חשבונות', '✗ שיתוף משותף', '✗ תובנות', '✗ נקודת איזון', '✗ קטגוריות מותאמות', '✗ קיקי WhatsApp']
                    : ['✓ Income & expenses', '✓ Dashboard & charts', '✓ Up to 2 accounts', '✗ Household sharing', '✗ Insights', '✗ Break-even', '✗ Custom categories', '✗ Kiki WhatsApp'] },
                  { label: lang === 'he' ? 'פרמיום' : 'Premium', price: '$5.50/mo', color: '#f0fdf4', border: 'var(--accent)', accent: true, features: lang === 'he'
                    ? ['✓ הכנסות והוצאות', '✓ דשבורד ותרשימים', '✓ חשבונות ללא הגבלה', '✓ שיתוף משותף', '✓ תובנות', '✓ נקודת איזון', '✓ קטגוריות מותאמות', '✓ קיקי WhatsApp']
                    : ['✓ Income & expenses', '✓ Dashboard & charts', '✓ Unlimited accounts', '✓ Household sharing', '✓ Insights', '✓ Break-even', '✓ Custom categories', '✓ Kiki WhatsApp'] },
                ].map((plan) => (
                  <div key={plan.label} style={{ background: plan.color, border: `1.5px solid ${plan.border}`, borderRadius: 10, padding: '10px 8px' }}>
                    <div style={{ fontWeight: 700, fontSize: 13, fontFamily: 'Heebo,sans-serif', color: plan.accent ? 'var(--accent)' : 'var(--text)', marginBottom: 1 }}>{plan.label}</div>
                    <div style={{ fontFamily: 'DM Mono,monospace', fontSize: 11, color: 'var(--text2)', marginBottom: 7 }}>{plan.price}</div>
                    {plan.features.map((f, i) => (
                      <div key={i} style={{ fontSize: 11, color: f.startsWith('✗') ? 'var(--text3)' : 'var(--text)', lineHeight: 1.65, fontFamily: 'Heebo,sans-serif' }}>{f}</div>
                    ))}
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11, color: 'var(--text3)', textAlign: 'center', marginBottom: 4 }}>
                {lang === 'he' ? 'בטל בכל עת · ללא התחייבות' : 'Cancel anytime · No commitment'}
              </p>
            </div>
            <div className="modal-footer">
              <button onClick={() => setUpgradeStep('pay')} style={{ flex: 1, height: 44, background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontSize: 15, fontWeight: 700, fontFamily: 'Heebo,sans-serif', cursor: 'pointer' }}>
                {lang === 'he' ? 'המשך לתשלום →' : 'Continue to payment →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Card form */}
      {upgradeStep === 'pay' && (
        <div className="modal-overlay open" style={{ alignItems: 'center', padding: 16 }} onClick={(e) => e.target === e.currentTarget && setUpgradeStep(null)}>
          <div className="modal" style={{ borderRadius: 12 }}>
            <div className="modal-title">
              <button onClick={() => setUpgradeStep('compare')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--text2)', padding: '0 4px' }}>←</button>
              {lang === 'he' ? 'פרטי תשלום' : 'Payment details'}
              <button className="modal-close" onClick={() => setUpgradeStep(null)}>✕</button>
            </div>
            <div className="modal-body" style={{ paddingTop: 16, minHeight: 180 }}>
              <p style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 14, textAlign: 'center' }}>
                {lang === 'he' ? '$5.50/חודש · בטל בכל עת' : '$5.50/month · Cancel anytime'}
              </p>
              {!dropinReady && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '24px 0', color: 'var(--text3)', fontSize: 13, fontFamily: 'Heebo,sans-serif' }}>
                  <div style={{ width: 28, height: 28, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  {lang === 'he' ? 'טוען טופס תשלום...' : 'Loading payment form...'}
                </div>
              )}
              <div ref={dropinRef} />
            </div>
            <div className="modal-footer">
              <button onClick={handlePay} disabled={subLoading || !dropinReady} style={{ flex: 1, height: 44, background: (subLoading || !dropinReady) ? 'var(--surface3)' : 'var(--accent)', color: (subLoading || !dropinReady) ? 'var(--text3)' : '#fff', border: 'none', borderRadius: 'var(--radius)', fontSize: 15, fontWeight: 700, fontFamily: 'Heebo,sans-serif', cursor: (subLoading || !dropinReady) ? 'wait' : 'pointer' }}>
                {subLoading ? (lang === 'he' ? 'מעבד...' : 'Processing...') : (lang === 'he' ? 'שלם $5.50 לחודש' : 'Pay $5.50/month')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Settings({ entries, householdId, user, customCategories, allCategories, budgets = {}, savingsGoal = null, onJoinHousehold, onNavigate, isPremium, subStatus, trialDaysLeft, subscription }) {
  const { t, i18n } = useTranslation();
  const [household, setHousehold] = useState(null);
  const [members, setMembers] = useState([]);
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('');
  const [saving, setSaving] = useState(false);
  const [localBudgets, setLocalBudgets] = useState({});
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalSaved, setGoalSaved] = useState('');
  const [section, setSection] = useState('household');
  const [deletingCat, setDeletingCat] = useState(null);
  const [transferTo, setTransferTo] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [joinError, setJoinError] = useState('');
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  useEffect(() => {
    if (!householdId) return;
    getHousehold(householdId).then((h) => {
      setHousehold(h);
      if (h?.members?.length) getHouseholdMembers(h.members).then(setMembers).catch(console.error);
    }).catch(console.error);
  }, [householdId]);

  useEffect(() => { setLocalBudgets(budgets); }, [budgets]);
  useEffect(() => {
    if (savingsGoal) {
      setGoalName(savingsGoal.name || '');
      setGoalTarget(savingsGoal.target?.toString() || '');
      setGoalSaved(savingsGoal.saved?.toString() || '');
    }
  }, [savingsGoal]);

  async function handleJoinHousehold() {
    if (!joinCode.trim()) return;
    setJoinLoading(true); setJoinError('');
    try {
      const newHouseholdId = await joinHousehold(user, joinCode.trim());
      setJoinSuccess(true);
      onJoinHousehold(newHouseholdId);
    } catch (e) {
      setJoinError(e.message || t('household.errorJoin'));
    } finally { setJoinLoading(false); }
  }

  async function handleAddCategory() {
    if (!newCatName.trim()) return;
    if (customCategories.some((c) => c.label === newCatName.trim())) {
      alert('קטגוריה עם שם זה כבר קיימת');
      return;
    }
    const value = 'custom_' + newCatName.trim().replace(/\s+/g, '_') + '_' + Date.now();
    const newCat = { value, label: newCatName.trim(), icon: newCatIcon.trim() || '🏷️' };
    setSaving(true);
    try {
      await saveCustomCategories(householdId, [...customCategories, newCat]);
      setNewCatName(''); setNewCatIcon('');
    } finally { setSaving(false); }
  }

  function startDeleteCategory(cat) {
    const count = entries.filter((e) => e.category === cat.value).length;
    if (count > 0) {
      setTransferTo('other');
      setDeletingCat({ ...cat, count });
    } else {
      saveCustomCategories(householdId, customCategories.filter((c) => c.value !== cat.value));
    }
  }

  async function confirmDeleteCategory() {
    setSaving(true);
    try {
      const affected = entries.filter((e) => e.category === deletingCat.value);
      await Promise.all(affected.map((e) => updateEntry(householdId, e.id, { category: transferTo })));
      await saveCustomCategories(householdId, customCategories.filter((c) => c.value !== deletingCat.value));
      setDeletingCat(null);
    } finally { setSaving(false); }
  }

  async function handleSaveBudgets() {
    setSaving(true);
    try {
      const cleaned = Object.fromEntries(
        Object.entries(localBudgets).filter(([, v]) => v !== undefined && !isNaN(v))
      );
      await saveBudgets(householdId, cleaned);
    }
    finally { setSaving(false); }
  }

  async function handleSaveGoal() {
    if (!goalTarget) return;
    setSaving(true);
    try {
      await saveSavingsGoal(householdId, {
        name: goalName || 'יעד חיסכון',
        target: parseFloat(goalTarget),
        saved: parseFloat(goalSaved) || 0,
      });
    } finally { setSaving(false); }
  }

  function exportCSV() {
    const rows = [['תאריך', 'שם', 'סכום', 'קטגוריה', 'סוג', 'קבוע/משתנה', 'הוסף על ידי']];
    const catMap = Object.fromEntries(allCategories.map((c) => [c.value, c.label]));
    entries.forEach((e) => rows.push([e.date, e.name, e.amount, catMap[e.category] || e.category, e.type, e.fixed, e.addedBy || '']));
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['\uFEFF' + rows.map((r) => r.join(',')).join('\n')], { type: 'text/csv;charset=utf-8;' }));
    a.download = 'kaspit.csv';
    a.click();
  }

  const expenseCategories = allCategories.filter((c) => !['income', 'savings'].includes(c.value));

  const sections = [
    { key: 'household', icon: '🏠', label: t('settings.household') },
    { key: 'budgets',   icon: '📊', label: t('settings.budgets') },
    { key: 'goals',     icon: '🎯', label: t('settings.savingsGoal') },
    { key: 'cats',      icon: '🏷️', label: t('settings.categories') },
  ];

  function AccordionHeader({ skey, icon, label }) {
    const open = section === skey;
    return (
      <button
        onClick={() => setSection(open ? null : skey)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: open ? 'var(--accent-soft)' : 'var(--surface)',
          border: '1px solid ' + (open ? 'rgba(31,95,64,.25)' : 'var(--border)'),
          borderRadius: open ? 'var(--radius) var(--radius) 0 0' : 'var(--radius)',
          padding: '13px 16px', cursor: 'pointer', fontFamily: 'DM Sans,Heebo,sans-serif',
          marginBottom: open ? 0 : 8,
          transition: 'background var(--d) var(--ease), border-color var(--d) var(--ease)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600, color: open ? 'var(--accent)' : 'var(--text)' }}>
          <span style={{ fontSize: 16 }}>{icon}</span>{label}
        </span>
        <span style={{ fontSize: 12, color: open ? 'var(--accent)' : 'var(--text3)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--d) var(--ease)' }}>▼</span>
      </button>
    );
  }

  function AccordionBody({ skey, children }) {
    if (section !== skey) return null;
    return (
      <div style={{
        border: '1px solid rgba(31,95,64,.25)', borderTop: 'none',
        borderRadius: '0 0 var(--radius) var(--radius)',
        padding: '16px', background: 'var(--surface)', marginBottom: 8,
      }}>
        {children}
      </div>
    );
  }

  return (
    <div className="page">

      <SubscriptionSection
        t={t}
        i18n={i18n}
        isPremium={isPremium}
        subStatus={subStatus}
        trialDaysLeft={trialDaysLeft}
        subscription={subscription}
        user={user}
        subLoading={subLoading}
        setSubLoading={setSubLoading}
      />

      {/* ── Household ── */}
      <AccordionHeader skey="household" icon="🏠" label={t('settings.household')} />
      <AccordionBody skey="household">
        {household ? (
          <>
            <div className="be-card" style={{ margin: 0, border: 'none', padding: '4px 0', boxShadow: 'none' }}>
              <div className="be-title">🏠 {household.name}</div>
              <div className="be-row">
                <div className="name">{t('settings.inviteCode')}</div>
                {isPremium ? (
                  <div className="val" style={{ color: 'var(--accent)', letterSpacing: 3 }}>{household.inviteCode}</div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text3)', fontSize: 12 }}>
                    🔒 {t('settings.inviteCodeLocked')}
                  </div>
                )}
              </div>
              <div className="be-row" style={{ borderBottom: 'none' }}>
                <div className="name" style={{ fontWeight: 600 }}>{t('settings.members')}</div>
                <div className="val" style={{ color: 'var(--text3)', fontSize: 13 }}>{t('settings.membersCount', { count: household.members?.length || 1 })}</div>
              </div>
              {(members.length > 0 ? members : (household.members || []).map((uid) => ({ uid }))).map((m, i, arr) => (
                <div key={m.uid} className="be-row" style={{ borderBottom: i === arr.length - 1 ? 'none' : undefined, paddingRight: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--accent-dim)', border: '0.5px solid rgba(45,106,79,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: 'var(--accent)', flexShrink: 0 }}>
                      {(m.displayName || m.email || '?').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, color: 'var(--text)' }}>{m.displayName || m.email || t('settings.user')}</div>
                      {m.email && m.displayName && <div style={{ fontSize: 11, color: 'var(--text3)' }}>{m.email}</div>}
                    </div>
                  </div>
                  {m.uid === user?.uid && <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600 }}>{t('settings.you')}</div>}
                </div>
              ))}
            </div>
            <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />
            <button className="settings-item" onClick={exportCSV} style={{ borderRadius: 'var(--radius-sm)', marginBottom: 4 }}>
              <div className="si-left">
                <div className="si-icon" style={{ background: 'rgba(93,211,179,.15)' }}>📤</div>
                <div><div className="si-title">{t('settings.exportCsv')}</div><div className="si-sub">{t('settings.exportCsvSub')}</div></div>
              </div>
              <div className="si-arrow">›</div>
            </button>
            <button className="settings-item" onClick={() => onNavigate?.('import')} style={{ borderRadius: 'var(--radius-sm)', marginBottom: 0 }}>
              <div className="si-left">
                <div className="si-icon" style={{ background: 'rgba(93,211,179,.15)' }}>📥</div>
                <div><div className="si-title">{t('settings.importCsv') || 'ייבוא CSV'}</div><div className="si-sub">{t('settings.importCsvSub') || 'ייבא פעולות מקובץ'}</div></div>
              </div>
              <div className="si-arrow">›</div>
            </button>
            <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />
            <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>{t('settings.joinOtherTitle')}</div>
            <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 10 }}>{t('settings.joinOtherDesc')}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                className="form-input"
                placeholder={t('household.joinPlaceholder')}
                value={joinCode}
                onChange={(e) => { setJoinCode(e.target.value.toUpperCase()); setJoinError(''); setJoinSuccess(false); }}
                maxLength={6}
                style={{ flex: 1, textAlign: 'center', letterSpacing: 4, fontSize: 18, direction: 'ltr' }}
              />
              <button
                className="btn-primary"
                onClick={handleJoinHousehold}
                disabled={joinLoading || !joinCode.trim()}
                style={{ padding: '0 16px', fontSize: 13, width: 'auto', flexShrink: 0 }}
              >
                {joinLoading ? '...' : t('household.joinBtn')}
              </button>
            </div>
            {joinError && <div style={{ fontSize: 12, color: 'var(--expense)', marginTop: 6 }}>{joinError}</div>}
            {joinSuccess && <div style={{ fontSize: 12, color: 'var(--accent)', marginTop: 6 }}>{t('settings.joinSuccess')}</div>}
          </>
        ) : <div style={{ color: 'var(--text3)', fontSize: 13 }}>...</div>}
      </AccordionBody>

      {/* ── Budgets ── */}
      <AccordionHeader skey="budgets" icon="📊" label={t('settings.budgets')} />
      <AccordionBody skey="budgets">
        {expenseCategories.map((c) => (
          <div key={c.value} className="be-row" style={{ alignItems: 'center', gap: 8 }}>
            <div className="name" style={{ flex: 1 }}>{c.icon} {c.label}</div>
            <input
              type="number"
              inputMode="numeric"
              placeholder={t('settings.noLimit')}
              value={localBudgets[c.value] || ''}
              onChange={(e) => setLocalBudgets((b) => ({ ...b, [c.value]: e.target.value ? parseFloat(e.target.value) : undefined }))}
              style={{
                width: 110, background: 'var(--surface3)', border: '1px solid var(--border)',
                borderRadius: 8, padding: '6px 10px', color: 'var(--text)',
                fontFamily: 'Heebo,sans-serif', fontSize: 14, textAlign: 'left', direction: 'ltr',
              }}
            />
          </div>
        ))}
        <button className="submit-btn" style={{ marginTop: 16 }} onClick={handleSaveBudgets} disabled={saving}>
          {saving ? t('settings.saving') : t('settings.saveBudget')}
        </button>
      </AccordionBody>

      {/* ── Savings Goal ── */}
      <AccordionHeader skey="goals" icon="🎯" label={t('settings.savingsGoal')} />
      <AccordionBody skey="goals">
        {savingsGoal?.target > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
              <span>{savingsGoal.name}</span>
              <span style={{ color: 'var(--accent)' }}>{formatAmount(savingsGoal.saved || 0)} / {formatAmount(savingsGoal.target)}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill safe" style={{ width: `${Math.min(((savingsGoal.saved||0)/savingsGoal.target)*100,100)}%` }} />
            </div>
          </div>
        )}
        <div className="form-group">
          <label className="form-label">{t('settings.goalName')}</label>
          <input className="form-input" placeholder={t('settings.goalNamePlaceholder')} value={goalName} onChange={(e) => setGoalName(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">{t('settings.goalTarget')}</label>
          <input className="form-input" type="number" inputMode="numeric" placeholder="0" value={goalTarget} onChange={(e) => setGoalTarget(e.target.value)} dir="ltr" />
        </div>
        <div className="form-group">
          <label className="form-label">{t('settings.goalSaved')}</label>
          <input className="form-input" type="number" inputMode="numeric" placeholder="0" value={goalSaved} onChange={(e) => setGoalSaved(e.target.value)} dir="ltr" />
        </div>
        <button className="submit-btn" onClick={handleSaveGoal} disabled={saving || !goalTarget}>
          {saving ? t('settings.saving') : t('settings.saveGoal')}
        </button>
      </AccordionBody>

      {/* ── Categories ── */}
      <AccordionHeader skey="cats" icon="🏷️" label={t('settings.categories')} />
      <AccordionBody skey="cats">
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'stretch' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <input
              className="form-input"
              value={newCatIcon}
              onChange={(e) => setNewCatIcon(e.target.value)}
              maxLength={2}
              style={{ width: 48, textAlign: 'center', fontSize: 22, padding: '0 4px', height: '100%', boxSizing: 'border-box', cursor: 'text' }}
              title={t('settings.iconHint')}
            />
            {!newCatIcon && (
              <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, pointerEvents: 'none', opacity: 0.35 }}>🏷️</span>
            )}
          </div>
          <input className="form-input" placeholder={t('settings.addCategoryPlaceholder')} value={newCatName} onChange={(e) => setNewCatName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()} style={{ flex: 1 }} />
          <button className="btn-primary" onClick={handleAddCategory} disabled={saving || !newCatName.trim()} style={{ padding: '0 16px', fontSize: 13, width: 'auto', flexShrink: 0 }}>{t('settings.addCategoryBtn')}</button>
        </div>
        {customCategories.length === 0 ? (
          <div style={{ color: 'var(--text3)', fontSize: 13, textAlign: 'center', padding: '8px 0' }}>{t('settings.noCats')}</div>
        ) : customCategories.map((c) => (
          <div key={c.value} className="be-row" style={{ alignItems: 'center' }}>
            <div className="name">{c.icon} {c.label}</div>
            <button
              onClick={() => startDeleteCategory(c)}
              style={{ background: 'var(--surface3)', border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer', color: 'var(--expense)', fontSize: 12, fontWeight: 700, padding: '4px 12px', fontFamily: 'Heebo,sans-serif', flexShrink: 0 }}
            >
              {t('settings.deleteCategory')}
            </button>
          </div>
        ))}
      </AccordionBody>


      {deletingCat && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div className="be-card" style={{ width: '100%', maxWidth: 400, margin: 0 }}>
            <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>{t('settings.deleteCatTitle')}</div>
            <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 16 }}>
              {t('settings.deleteCatDesc', { count: deletingCat.count, label: deletingCat.label })}
            </div>
            <select className="form-input" value={transferTo} onChange={(e) => setTransferTo(e.target.value)} style={{ marginBottom: 16 }}>
              {allCategories.filter((c) => c.value !== deletingCat.value).map((c) => (
                <option key={c.value} value={c.value}>{c.icon ? `${c.icon} ` : ''}{c.label}</option>
              ))}
            </select>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="submit-btn" onClick={confirmDeleteCategory} disabled={saving} style={{ margin: 0, flex: 1 }}>
                {saving ? t('settings.saving') : t('settings.deleteCatConfirm')}
              </button>
              <button onClick={() => setDeletingCat(null)} style={{ flex: 1, background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 0', fontFamily: 'Heebo,sans-serif', fontSize: 14, cursor: 'pointer', color: 'var(--text2)' }}>
                {t('settings.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
