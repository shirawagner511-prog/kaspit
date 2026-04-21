import { useState, useEffect } from 'react';
import { getHousehold, saveCustomCategories, saveBudgets, saveSavingsGoal, saveUserPhone, saveUserApiKey } from '../../firebase/db';
import { DEFAULT_CATEGORIES } from '../../utils/constants';
import { formatAmount } from '../../utils/format';

export default function Settings({ entries, householdId, user, customCategories, allCategories, budgets = {}, savingsGoal = null }) {
  const [household, setHousehold] = useState(null);
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('');
  const [saving, setSaving] = useState(false);
  const [localBudgets, setLocalBudgets] = useState({});
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalSaved, setGoalSaved] = useState('');
  const [section, setSection] = useState('household');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneSaved, setPhoneSaved] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiKeySaved, setApiKeySaved] = useState(false);

  useEffect(() => {
    if (householdId) getHousehold(householdId).then(setHousehold).catch(console.error);
  }, [householdId]);

  useEffect(() => { setLocalBudgets(budgets); }, [budgets]);
  useEffect(() => {
    if (savingsGoal) {
      setGoalName(savingsGoal.name || '');
      setGoalTarget(savingsGoal.target?.toString() || '');
      setGoalSaved(savingsGoal.saved?.toString() || '');
    }
  }, [savingsGoal]);

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

  async function handleDeleteCategory(value) {
    await saveCustomCategories(householdId, customCategories.filter((c) => c.value !== value));
  }

  async function handleSaveBudgets() {
    setSaving(true);
    try { await saveBudgets(householdId, localBudgets); }
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

  async function handleSaveApiKey() {
    if (!apiKey.trim()) return;
    setSaving(true);
    try {
      await saveUserApiKey(user.uid, apiKey.trim());
      setApiKeySaved(true);
      setTimeout(() => setApiKeySaved(false), 3000);
    } finally { setSaving(false); }
  }

  async function handleSavePhone() {
    if (!phoneNumber.trim()) return;
    setSaving(true);
    try {
      await saveUserPhone(user.uid, phoneNumber.trim());
      setPhoneSaved(true);
      setTimeout(() => setPhoneSaved(false), 3000);
    } finally { setSaving(false); }
  }

  const tabs = [
    { key: 'household', label: '🏠 בית' },
    { key: 'kiki',      label: '🤖 קיקי' },
    { key: 'budgets',   label: '📊 תקציב' },
    { key: 'goals',     label: '🎯 יעדים' },
    { key: 'cats',      label: '🏷️ קטגוריות' },
  ];

  return (
    <div className="page">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setSection(t.key)}
            style={{
              background: section === t.key ? 'var(--accent)' : 'var(--surface2)',
              border: '1px solid ' + (section === t.key ? 'var(--accent)' : 'var(--border)'),
              color: section === t.key ? 'white' : 'var(--text2)',
              borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600,
              cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Heebo,sans-serif',
            }}
          >{t.label}</button>
        ))}
      </div>

      {section === 'household' && household && (
        <>
          <div className="section-title">הבית המשותף</div>
          <div className="be-card">
            <div className="be-title">🏠 {household.name}</div>
            <div className="be-row">
              <div className="name">קוד הזמנה לשיתוף</div>
              <div className="val" style={{ color: 'var(--accent)', letterSpacing: 3 }}>{household.inviteCode}</div>
            </div>
            <div className="be-row" style={{ borderBottom: 'none' }}>
              <div className="name">חברי הבית</div>
              <div className="val">{household.members?.length || 1} משתמשים</div>
            </div>
          </div>
          <div className="section-title">ייצוא נתונים</div>
          <button className="settings-item" onClick={exportCSV}>
            <div className="si-left">
              <div className="si-icon" style={{ background: 'rgba(93,211,179,.15)' }}>📤</div>
              <div><div className="si-title">ייצוא ל-CSV</div><div className="si-sub">שמירת כל הנתונים</div></div>
            </div>
            <div className="si-arrow">›</div>
          </button>
        </>
      )}

      {section === 'kiki' && (
        <>
          <div className="section-title">קיקי — העוזרת בוואטסאפ</div>
          <div className="be-card">
            <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 16, lineHeight: 1.7 }}>
              שלחי הודעות לקיקי בוואטסאפ וכל הוצאה תירשם אוטומטית ✦<br/>
              לדוגמה: <span style={{ color: 'var(--accent)', fontWeight: 600 }}>"קיקי, קפה 18 שקל"</span>
            </div>
            <div className="form-group">
              <label className="form-label">מספר הטלפון שלך (עם קידומת מדינה)</label>
              <input
                className="form-input"
                dir="ltr"
                placeholder="+972501234567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="tel"
              />
              <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>
                זה המספר שממנו תשלחי הודעות לקיקי
              </div>
            </div>
            <button className="submit-btn" onClick={handleSavePhone} disabled={saving || !phoneNumber.trim()}>
              {phoneSaved ? '✓ נשמר!' : saving ? 'שומרת...' : 'שמרי מספר ✦'}
            </button>
          </div>
          <div className="be-card" style={{ marginTop: 12 }}>
            <div className="be-title" style={{ marginBottom: 10 }}>🔑 מפתח API אישי (חובה לשימוש בקיקי)</div>
            <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 12, lineHeight: 1.7 }}>
              קיקי עובדת עם Claude AI. כל משתמש צריך מפתח API אישי — חינמי לחלוטין ל-3-6 חודשים.
            </div>
            {[
              { n: '1', t: 'כנסי לאתר', link: 'console.anthropic.com', url: 'https://console.anthropic.com' },
              { n: '2', t: 'לחצי "Sign up" → הירשמי עם מייל' },
              { n: '3', t: 'אחרי הכניסה: לחצי על "API Keys" בתפריט השמאלי' },
              { n: '4', t: 'לחצי "Create Key" → העתיקי את המפתח (מתחיל ב-sk-ant-)' },
              { n: '5', t: 'הדביקי אותו כאן למטה ושמרי' },
            ].map((s) => (
              <div key={s.n} className="be-row" style={{ alignItems: 'flex-start', gap: 12, paddingTop: 8, paddingBottom: 8 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{s.n}</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>
                  {s.t}{s.url && <> — <a href={s.url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>{s.link}</a></>}
                </div>
              </div>
            ))}
            <div className="form-group" style={{ marginTop: 12 }}>
              <input
                className="form-input"
                dir="ltr"
                placeholder="sk-ant-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                type="password"
              />
            </div>
            <button className="submit-btn" onClick={handleSaveApiKey} disabled={saving || !apiKey.trim()}>
              {apiKeySaved ? '✓ נשמר!' : saving ? 'שומרת...' : 'שמרי מפתח ✦'}
            </button>
          </div>

          <div className="be-card" style={{ marginTop: 12 }}>
            <div className="be-title" style={{ marginBottom: 10 }}>איך מתחילים עם קיקי?</div>
            {[
              { n: '1', t: 'שמרי מפתח API למעלה' },
              { n: '2', t: 'רשמי את מספר הטלפון שלך למעלה' },
              { n: '3', t: 'שמרי את מספר קיקי בוואטסאפ:', sub: '+1 415 523 8886' },
              { n: '4', t: 'שלחי לקיקי את הקוד: join method-strike' },
              { n: '5', t: 'שלחי לקיקי: "קפה 18 שקל" — וזהו ✦' },
            ].map((s) => (
              <div key={s.n} className="be-row" style={{ alignItems: 'flex-start', gap: 12, paddingTop: 8, paddingBottom: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: 13, color: 'var(--text2)' }}>{s.t}</div>
                  {s.sub && <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 700, direction: 'ltr', marginTop: 2 }}>{s.sub}</div>}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {section === 'budgets' && (
        <>
          <div className="section-title">תקציב חודשי לפי קטגוריה</div>
          <div className="be-card">
            {expenseCategories.map((c) => (
              <div key={c.value} className="be-row" style={{ alignItems: 'center', gap: 8 }}>
                <div className="name" style={{ flex: 1 }}>{c.icon} {c.label}</div>
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="ללא מגבלה"
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
              {saving ? 'שומרת...' : 'שמרי תקציב ✦'}
            </button>
          </div>
        </>
      )}

      {section === 'goals' && (
        <>
          <div className="section-title">יעד חיסכון</div>
          <div className="be-card">
            {savingsGoal?.target > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                  <span>{savingsGoal.name}</span>
                  <span style={{ color: 'var(--accent2)' }}>{formatAmount(savingsGoal.saved || 0)} / {formatAmount(savingsGoal.target)}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill safe" style={{ width: `${Math.min(((savingsGoal.saved||0)/savingsGoal.target)*100,100)}%` }} />
                </div>
              </div>
            )}
            <div className="form-group">
              <label className="form-label">שם היעד</label>
              <input className="form-input" placeholder="למשל: חופשה, רכב, דירה..." value={goalName} onChange={(e) => setGoalName(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">סכום יעד (₪)</label>
              <input className="form-input" type="number" inputMode="numeric" placeholder="0" value={goalTarget} onChange={(e) => setGoalTarget(e.target.value)} dir="ltr" />
            </div>
            <div className="form-group">
              <label className="form-label">כבר חסכתי (₪)</label>
              <input className="form-input" type="number" inputMode="numeric" placeholder="0" value={goalSaved} onChange={(e) => setGoalSaved(e.target.value)} dir="ltr" />
            </div>
            <button className="submit-btn" onClick={handleSaveGoal} disabled={saving || !goalTarget}>
              {saving ? 'שומרת...' : 'שמרי יעד ✦'}
            </button>
          </div>
        </>
      )}

      {section === 'cats' && (
        <>
          <div className="section-title">קטגוריות מותאמות אישית</div>
          <div className="be-card">
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <input className="form-input" placeholder="😀" value={newCatIcon} onChange={(e) => setNewCatIcon(e.target.value)} style={{ width: 60, textAlign: 'center', fontSize: 20 }} maxLength={2} />
              <input className="form-input" placeholder="שם קטגוריה חדשה..." value={newCatName} onChange={(e) => setNewCatName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()} style={{ flex: 1 }} />
              <button className="btn-primary" onClick={handleAddCategory} disabled={saving || !newCatName.trim()} style={{ padding: '0 16px', fontSize: 13, width: 'auto' }}>+ הוסיפי</button>
            </div>
            {customCategories.length === 0 ? (
              <div style={{ color: 'var(--text3)', fontSize: 13, textAlign: 'center', padding: '8px 0' }}>אין עדיין קטגוריות מותאמות</div>
            ) : customCategories.map((c) => (
              <div key={c.value} className="be-row" style={{ alignItems: 'center' }}>
                <div className="name">{c.icon} {c.label}</div>
                <button
                  onClick={() => handleDeleteCategory(c.value)}
                  style={{ background: 'var(--surface3)', border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer', color: 'var(--accent3)', fontSize: 12, fontWeight: 700, padding: '4px 12px', fontFamily: 'Heebo,sans-serif', flexShrink: 0 }}
                >
                  מחקי
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
