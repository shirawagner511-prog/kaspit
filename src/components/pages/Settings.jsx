import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getHousehold, getHouseholdMembers, getUserData, saveCustomCategories, saveBudgets, saveSavingsGoal, saveUserPhone, saveHouseholdApiKey, updateEntry } from '../../firebase/db';
import { CATEGORY_VALUES } from '../../utils/constants';
import { formatAmount } from '../../utils/format';

export default function Settings({ entries, householdId, user, customCategories, allCategories, budgets = {}, savingsGoal = null }) {
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
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [savedPhone, setSavedPhone] = useState('');
  const [editingPhone, setEditingPhone] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [savedApiKey, setSavedApiKey] = useState('');
  const [editingApiKey, setEditingApiKey] = useState(false);
  const [apiKeySaved, setApiKeySaved] = useState(false);
  const [deletingCat, setDeletingCat] = useState(null); // { value, label, count }
  const [transferTo, setTransferTo] = useState('');

  useEffect(() => {
    if (!householdId) return;
    getHousehold(householdId).then((h) => {
      setHousehold(h);
      if (h?.anthropicApiKey) { setApiKey(h.anthropicApiKey); setSavedApiKey(h.anthropicApiKey); }
      if (h?.members?.length) getHouseholdMembers(h.members).then(setMembers).catch(console.error);
    }).catch(console.error);
  }, [householdId]);

  useEffect(() => {
    if (!user?.uid) return;
    getUserData(user.uid).then((d) => {
      if (d?.phoneNumber) { setPhoneNumber(d.phoneNumber); setSavedPhone(d.phoneNumber); }
    }).catch(console.error);
  }, [user?.uid]);

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

  async function handleSavePhone() {
    const phone = phoneNumber.trim();
    if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
      setPhoneError('המספר חייב להתחיל ב-+ ולכלול קידומת מדינה, למשל +972501234567');
      return;
    }
    setPhoneError('');
    setSaving(true);
    try {
      await saveUserPhone(user.uid, phone);
      setSavedPhone(phone);
      setEditingPhone(false);
    } finally { setSaving(false); }
  }

  async function handleSaveApiKey() {
    const key = apiKey.trim();
    if (!key.startsWith('sk-ant-')) {
      return;
    }
    setSaving(true);
    try {
      await saveHouseholdApiKey(householdId, key);
      setSavedApiKey(key);
      setEditingApiKey(false);
      setApiKeySaved(true);
      setTimeout(() => setApiKeySaved(false), 3000);
    } finally { setSaving(false); }
  }

  const tabs = [
    { key: 'household', label: `🏠 ${t('settings.household')}` },
    { key: 'kiki',      label: `🤖 Kiki` },
    { key: 'budgets',   label: `📊 ${t('settings.budgets')}` },
    { key: 'goals',     label: `🎯 ${t('settings.savingsGoal')}` },
    { key: 'cats',      label: `🏷️ ${t('settings.categories')}` },
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
          <div className="section-title">{t('settings.household')}</div>
          <div className="be-card">
            <div className="be-title">🏠 {household.name}</div>
            <div className="be-row">
              <div className="name">{t('settings.inviteCode')}</div>
              <div className="val" style={{ color: 'var(--accent)', letterSpacing: 3 }}>{household.inviteCode}</div>
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
          <div className="section-title">{t('settings.exportData')}</div>
          <button className="settings-item" onClick={exportCSV}>
            <div className="si-left">
              <div className="si-icon" style={{ background: 'rgba(93,211,179,.15)' }}>📤</div>
              <div><div className="si-title">{t('settings.exportCsv')}</div><div className="si-sub">{t('settings.exportCsvSub')}</div></div>
            </div>
            <div className="si-arrow">›</div>
          </button>
          <div className="section-title">{t('settings.language')}</div>
          <div className="be-card" style={{ display: 'flex', gap: 8 }}>
            {[{ code: 'he', label: 'עברית' }, { code: 'en', label: 'English' }].map(({ code, label }) => (
              <button
                key={code}
                onClick={() => { i18n.changeLanguage(code); localStorage.setItem('budgi-lang', code); }}
                style={{
                  flex: 1, padding: '10px 0', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  background: i18n.language === code ? 'var(--accent)' : 'var(--surface2)',
                  color: i18n.language === code ? 'white' : 'var(--text2)',
                  border: '1px solid ' + (i18n.language === code ? 'var(--accent)' : 'var(--border)'),
                  fontFamily: 'DM Sans, Heebo, sans-serif',
                }}
              >{label}</button>
            ))}
          </div>
        </>
      )}

      {section === 'kiki' && (
        <>
          <div className="section-title">{t('settings.kiki')}</div>
          <div className="be-card">
            <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 16, lineHeight: 1.7 }}>
              {t('settings.kikiDesc')}<br/>
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{t('settings.kikiExample')}</span>
            </div>
            {savedPhone && !editingPhone ? (
              <div className="be-row" style={{ borderBottom: 'none' }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.8px' }}>{t('settings.kikiPhoneSaved')}</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 15, color: 'var(--accent)', direction: 'ltr' }}>{savedPhone}</div>
                </div>
                <button onClick={() => setEditingPhone(true)} style={{ background: 'var(--surface2)', border: '0.5px solid var(--border)', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans,Heebo,sans-serif', color: 'var(--text2)' }}>
                  {t('settings.edit')}
                </button>
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label className="form-label">{t('settings.kikiPhone')}</label>
                  <input className="form-input" dir="ltr" placeholder="+972501234567" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value); setPhoneError(''); }} type="tel" />
                  {phoneError
                    ? <div style={{ fontSize: 11, color: 'var(--expense)', marginTop: 4 }}>{phoneError}</div>
                    : <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>{t('settings.kikiPhoneFormat')}</div>
                  }
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="submit-btn" onClick={handleSavePhone} disabled={saving || !phoneNumber.trim()} style={{ margin: 0, flex: 1 }}>
                    {saving ? t('settings.saving') : t('settings.savePhone')}
                  </button>
                  {savedPhone && <button onClick={() => { setEditingPhone(false); setPhoneNumber(savedPhone); setPhoneError(''); }} style={{ background: 'var(--surface2)', border: '0.5px solid var(--border)', borderRadius: 8, padding: '0 16px', fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans,Heebo,sans-serif', color: 'var(--text2)' }}>{t('settings.cancel')}</button>}
                </div>
              </>
            )}
          </div>

          <div className="be-card" style={{ marginTop: 12 }}>
            <div className="be-title" style={{ marginBottom: 10 }}>{t('settings.kikiApiKey')}</div>
            {savedApiKey && !editingApiKey ? (
              <div className="be-row" style={{ borderBottom: 'none' }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.8px' }}>{t('settings.kikiApiKeySaved')}</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, color: 'var(--accent)', direction: 'ltr' }}>
                    {savedApiKey.slice(0, 12)}{'•'.repeat(12)}{savedApiKey.slice(-4)}
                  </div>
                </div>
                <button onClick={() => setEditingApiKey(true)} style={{ background: 'var(--surface2)', border: '0.5px solid var(--border)', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans,Heebo,sans-serif', color: 'var(--text2)' }}>
                  {t('settings.edit')}
                </button>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 12, lineHeight: 1.7 }}>{t('settings.kikiApiKeyDesc')}</div>
                {[
                  { n: '1', key: 'kikiStep1', link: 'console.anthropic.com', url: 'https://console.anthropic.com' },
                  { n: '2', key: 'kikiStep2' },
                  { n: '3', key: 'kikiStep3' },
                  { n: '4', key: 'kikiStep4' },
                ].map((s) => (
                  <div key={s.n} className="be-row" style={{ alignItems: 'flex-start', gap: 12, paddingTop: 8, paddingBottom: 8 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{s.n}</div>
                    <div style={{ fontSize: 13, color: 'var(--text2)' }}>
                      {t(`settings.${s.key}`)}{s.url && <> — <a href={s.url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>{s.link}</a></>}
                    </div>
                  </div>
                ))}
                <div className="form-group" style={{ marginTop: 12 }}>
                  <input className="form-input" dir="ltr" placeholder="sk-ant-..." value={apiKey} onChange={(e) => setApiKey(e.target.value)} type="password" />
                  {apiKey && !apiKey.startsWith('sk-ant-') && (
                    <div style={{ fontSize: 11, color: 'var(--expense)', marginTop: 4 }}>{t('settings.errorApiKey')}</div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="submit-btn" onClick={handleSaveApiKey} disabled={saving || !apiKey.trim() || !apiKey.startsWith('sk-ant-')} style={{ margin: 0, flex: 1 }}>
                    {apiKeySaved ? t('settings.saved') : saving ? t('settings.saving') : t('settings.saveKey')}
                  </button>
                  {savedApiKey && <button onClick={() => { setEditingApiKey(false); setApiKey(savedApiKey); }} style={{ background: 'var(--surface2)', border: '0.5px solid var(--border)', borderRadius: 8, padding: '0 16px', fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans,Heebo,sans-serif', color: 'var(--text2)' }}>{t('settings.cancel')}</button>}
                </div>
              </>
            )}
          </div>

          <div className="be-card" style={{ marginTop: 12 }}>
            <div className="be-title" style={{ marginBottom: 10 }}>{t('settings.kikiHowTitle')}</div>
            {[
              { n: '1', key: 'kikiStepSaveKey' },
              { n: '2', key: 'kikiStepSavePhone' },
              { n: '3', key: 'kikiStepSaveContact', sub: '+1 415 523 8886' },
              { n: '4', key: 'kikiStepJoin' },
              { n: '5', key: 'kikiStepSend' },
            ].map((s) => (
              <div key={s.n} className="be-row" style={{ alignItems: 'flex-start', gap: 12, paddingTop: 8, paddingBottom: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: 13, color: 'var(--text2)' }}>{t(`settings.${s.key}`)}</div>
                  {s.sub && <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 700, direction: 'ltr', marginTop: 2 }}>{s.sub}</div>}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {section === 'budgets' && (
        <>
          <div className="section-title">{t('settings.budgetsTitle')}</div>
          <div className="be-card">
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
          </div>
        </>
      )}

      {section === 'goals' && (
        <>
          <div className="section-title">{t('settings.savingsGoal')}</div>
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
          </div>
        </>
      )}

      {section === 'cats' && (
        <>
          <div className="section-title">{t('settings.categories')}</div>
          <div className="be-card">
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <input className="form-input" placeholder="😀" value={newCatIcon} onChange={(e) => setNewCatIcon(e.target.value)} style={{ width: 60, textAlign: 'center', fontSize: 20 }} maxLength={2} />
              <input className="form-input" placeholder={t('settings.addCategoryPlaceholder')} value={newCatName} onChange={(e) => setNewCatName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()} style={{ flex: 1 }} />
              <button className="btn-primary" onClick={handleAddCategory} disabled={saving || !newCatName.trim()} style={{ padding: '0 16px', fontSize: 13, width: 'auto' }}>{t('settings.addCategoryBtn')}</button>
            </div>
            {customCategories.length === 0 ? (
              <div style={{ color: 'var(--text3)', fontSize: 13, textAlign: 'center', padding: '8px 0' }}>{t('settings.noCats')}</div>
            ) : customCategories.map((c) => (
              <div key={c.value} className="be-row" style={{ alignItems: 'center' }}>
                <div className="name">{c.icon} {c.label}</div>
                <button
                  onClick={() => startDeleteCategory(c)}
                  style={{ background: 'var(--surface3)', border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer', color: 'var(--accent3)', fontSize: 12, fontWeight: 700, padding: '4px 12px', fontFamily: 'Heebo,sans-serif', flexShrink: 0 }}
                >
                  {t('settings.deleteCategory')}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

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
