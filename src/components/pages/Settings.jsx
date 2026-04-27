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

  const sections = [
    { key: 'household', icon: '🏠', label: t('settings.household') },
    { key: 'budgets',   icon: '📊', label: t('settings.budgets') },
    { key: 'goals',     icon: '🎯', label: t('settings.savingsGoal') },
    { key: 'cats',      icon: '🏷️', label: t('settings.categories') },
    { key: 'kiki',      icon: '🤖', label: 'Kiki' },
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

      {/* ── Household ── */}
      <AccordionHeader skey="household" icon="🏠" label={t('settings.household')} />
      <AccordionBody skey="household">
        {household ? (
          <>
            <div className="be-card" style={{ margin: 0, border: 'none', padding: '4px 0', boxShadow: 'none' }}>
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
            <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />
            <button className="settings-item" onClick={exportCSV} style={{ borderRadius: 'var(--radius-sm)', marginBottom: 0 }}>
              <div className="si-left">
                <div className="si-icon" style={{ background: 'rgba(93,211,179,.15)' }}>📤</div>
                <div><div className="si-title">{t('settings.exportCsv')}</div><div className="si-sub">{t('settings.exportCsvSub')}</div></div>
              </div>
              <div className="si-arrow">›</div>
            </button>
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

      {/* ── Kiki ── */}
      <AccordionHeader skey="kiki" icon="🤖" label="Kiki" />
      <AccordionBody skey="kiki">
        <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 16, lineHeight: 1.7 }}>
          {t('settings.kikiDesc')}<br/>
          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{t('settings.kikiExample')}</span>
        </div>
        {savedPhone && !editingPhone ? (
          <div className="be-row" style={{ borderBottom: 'none' }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.8px' }}>{t('settings.kikiPhoneSaved')}</div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 15, color: 'var(--accent)', direction: 'ltr' }}>{savedPhone.slice(0, 4) + '•••••' + savedPhone.slice(-3)}</div>
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
        <div style={{ height: 1, background: 'var(--border)', margin: '16px 0' }} />
        <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>{t('settings.kikiApiKey')}</div>
        {savedApiKey && !editingApiKey ? (
          <div className="be-row" style={{ borderBottom: 'none' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, color: 'var(--accent)', direction: 'ltr' }}>
              {savedApiKey.slice(0, 12)}{'•'.repeat(12)}{savedApiKey.slice(-4)}
            </div>
            <button onClick={() => setEditingApiKey(true)} style={{ background: 'var(--surface2)', border: '0.5px solid var(--border)', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans,Heebo,sans-serif', color: 'var(--text2)' }}>
              {t('settings.edit')}
            </button>
          </div>
        ) : (
          <>
            <div className="form-group">
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
