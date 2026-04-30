import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { addEntry, updateEntry, saveCustomCategories } from '../../firebase/db';
import { CATEGORY_VALUES } from '../../utils/constants';

const INCOME_CATEGORIES = ['income', 'other'];
const SAVING_CATEGORIES = ['savings', 'other'];

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

function computeUntil(dateStr, months) {
  const [y, m] = dateStr.split('-').map(Number);
  const total = y * 12 + (m - 1) + (months - 1);
  return `${Math.floor(total / 12)}-${String(total % 12 + 1).padStart(2, '0')}`;
}

function getDefaultCategory(type) {
  if (type === 'income') return 'income';
  if (type === 'saving') return 'savings';
  return 'housing';
}

function filterCategories(allCategories, type) {
  if (type === 'income') {
    return allCategories.filter((c) => INCOME_CATEGORIES.includes(c.value) || !CATEGORY_VALUES.includes(c.value));
  }
  if (type === 'saving') {
    return allCategories.filter((c) => SAVING_CATEGORIES.includes(c.value) || !CATEGORY_VALUES.includes(c.value));
  }
  return allCategories.filter((c) => !['income', 'savings'].includes(c.value));
}

export default function AddEntryModal({ open, onClose, householdId, user, entry, allCategories = [], customCategories = [], accounts = [], onDelete }) {
  const { t } = useTranslation();
  const isEdit = !!entry;

  const [type, setType] = useState('expense');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('housing');
  const [date, setDate] = useState(today());
  const [fixed, setFixed] = useState('variable');
  const [note, setNote] = useState('');
  const [accountId, setAccountId] = useState('');
  const [recurringMonths, setRecurringMonths] = useState('');
  const [loading, setLoading] = useState(false);
  const [addingCat, setAddingCat] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('');

  const FIXED_OPTIONS = [
    { value: 'fixed',     label: t('addEntry.fixedDesc') },
    { value: 'bimonthly', label: t('addEntry.bimonthlyDesc'), expenseOnly: true },
    { value: 'variable',  label: t('addEntry.variableDesc') },
    { value: 'sep',       label: t('addEntry.sepDesc'),       expenseOnly: true },
  ].filter((o) => !o.expenseOnly || type === 'expense');

  const NAME_PLACEHOLDERS = {
    expense: t('addEntry.namePlaceholderExpense'),
    income:  t('addEntry.namePlaceholderIncome'),
    saving:  t('addEntry.namePlaceholderSaving'),
  };

  useEffect(() => {
    if (entry) {
      setType(entry.type || 'expense');
      setName(entry.name || '');
      setAmount(entry.amount?.toString() || '');
      setCategory(entry.category || 'housing');
      setDate(entry.date || today());
      setFixed(entry.fixed || 'variable');
      setNote(entry.note || '');
      setAccountId(entry.accountId || '');
      setRecurringMonths(entry.recurringMonths?.toString() || '');
    } else {
      resetFields();
    }
  }, [entry, open]);

  function handleTypeChange(tp) {
    setType(tp);
    setCategory(getDefaultCategory(tp));
  }

  async function handleAddCategory() {
    if (!newCatName.trim()) return;
    const value = 'custom_' + newCatName.trim().replace(/\s+/g, '_') + '_' + Date.now();
    const newCat = { value, label: newCatName.trim(), icon: newCatIcon.trim() || '🏷️' };
    await saveCustomCategories(householdId, [...customCategories, newCat]);
    setCategory(value);
    setNewCatName('');
    setNewCatIcon('');
    setAddingCat(false);
  }

  function resetFields() {
    setName(''); setAmount(''); setNote('');
    setType('expense'); setDate(today());
    setCategory('housing'); setFixed('variable'); setAccountId(''); setRecurringMonths('');
  }

  const visibleCategories = filterCategories(allCategories, type);

  async function handleSubmit() {
    if (!name.trim() || !amount || !date) {
      alert(t('addEntry.errorRequired'));
      return;
    }
    if (parseFloat(amount) <= 0) {
      alert(t('addEntry.errorZero'));
      return;
    }
    setLoading(true);
    try {
      const rm = recurringMonths ? parseInt(recurringMonths) : null;
      const data = {
        name: name.trim(), amount: parseFloat(amount), category, date, fixed, type,
        note: note.trim(), accountId: accountId || null,
        recurringMonths: rm,
        recurringUntil: (rm && rm > 1) ? computeUntil(date, rm) : null,
      };
      if (isEdit) {
        await updateEntry(householdId, entry.id, data);
      } else {
        await addEntry(householdId, data, user);
      }
      handleClose();
    } catch (e) {
      alert(t('addEntry.errorSave') + e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    resetFields();
    onClose();
  }

  return (
    <div className={`modal-overlay${open ? ' open' : ''}`} onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="modal">
        <div className="modal-title">
          {isEdit ? t('addEntry.editTitle') : t('addEntry.title')}
          <button className="modal-close" onClick={handleClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Type toggle */}
          <div className="form-group">
            <div className="type-toggle">
              {['expense', 'income', 'saving'].map((tp) => (
                <button
                  key={tp}
                  className={`type-btn${type === tp ? ` active ${tp}` : ''}`}
                  onClick={() => handleTypeChange(tp)}
                >
                  {tp === 'expense' ? t('addEntry.expense') : tp === 'income' ? t('addEntry.income') : t('addEntry.saving')}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="form-group">
            <label className="form-label">{t('addEntry.name')}</label>
            <input className="form-input" placeholder={NAME_PLACEHOLDERS[type]} value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          {/* Amount + Date on one row */}
          <div style={{ display: 'flex', gap: 8 }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">{t('addEntry.amount')}</label>
              <input className="form-input" type="number" inputMode="decimal" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ fontFamily: 'DM Mono,monospace' }} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">{t('addEntry.date')}</label>
              <input className="form-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>

          {/* Category + Fixed on one row */}
          <div style={{ display: 'flex', gap: 8 }}>
            <div className="form-group" style={{ flex: 1.6 }}>
              <label className="form-label">{t('addEntry.category')}</label>
              <select className="form-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                {visibleCategories.map((c) => (
                  <option key={c.value} value={c.value}>{c.icon} {c.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">{t('addEntry.character')}</label>
              <select className="form-input" value={fixed} onChange={(e) => setFixed(e.target.value)}>
                {FIXED_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              {(fixed === 'fixed' || fixed === 'bimonthly') && (
                <>
                  <div style={{ fontSize: 10, color: 'var(--accent)', marginTop: 4, lineHeight: 1.4 }}>
                    ✦ {t('addEntry.recurringHint')}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5 }}>
                    <span style={{ fontSize: 10, color: 'var(--text2)', whiteSpace: 'nowrap' }}>{t('addEntry.paymentsLabel')}</span>
                    <input
                      type="number" min="1" max="36"
                      className="form-input"
                      style={{ width: 52, padding: '4px 6px', fontSize: 12, textAlign: 'center', fontFamily: 'DM Mono,monospace' }}
                      placeholder="∞"
                      value={recurringMonths}
                      onChange={(e) => setRecurringMonths(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Add category inline */}
          {addingCat ? (
            <div style={{ display: 'flex', gap: 6, marginTop: -4, marginBottom: 10 }}>
              <input className="form-input" placeholder="😀" value={newCatIcon} onChange={(e) => setNewCatIcon(e.target.value)} style={{ width: 46, textAlign: 'center', fontSize: 18, padding: '8px 4px' }} maxLength={2} />
              <input className="form-input" placeholder={t('addEntry.categoryNamePlaceholder')} value={newCatName} onChange={(e) => setNewCatName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()} style={{ flex: 1 }} autoFocus />
              <button type="button" onClick={handleAddCategory} style={{ background: 'var(--accent)', border: 'none', color: '#fff', borderRadius: 8, padding: '0 12px', cursor: 'pointer', fontSize: 13 }}>✓</button>
              <button type="button" onClick={() => setAddingCat(false)} style={{ background: 'var(--surface3)', border: 'none', color: 'var(--text2)', borderRadius: 8, padding: '0 10px', cursor: 'pointer', fontSize: 13 }}>✕</button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setAddingCat(true)}
              style={{ marginTop: -4, marginBottom: 10, background: 'none', border: 'none', color: 'var(--accent)', fontSize: 12, cursor: 'pointer', padding: 0, display: 'block' }}
            >
              {t('addEntry.addNewCategory')}
            </button>
          )}

          {/* Note */}
          <div className="form-group">
            <label className="form-label">{t('addEntry.note')}</label>
            <input className="form-input" placeholder={t('addEntry.notePlaceholder')} value={note} onChange={(e) => setNote(e.target.value)} />
          </div>

          {/* Account */}
          {accounts.length > 0 && (
            <div className="form-group">
              <label className="form-label">{t('accounts.nav')}</label>
              <select className="form-input" value={accountId} onChange={(e) => setAccountId(e.target.value)}>
                <option value="">{t('accounts.noAccount')}</option>
                {accounts.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {isEdit && onDelete && (
            <button
              onClick={() => { handleClose(); onDelete(entry.id); }}
              style={{ flex: '0 0 auto', padding: '0 20px', height: 44, background: 'var(--expense)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontSize: 14, fontWeight: 600, fontFamily: 'DM Sans,Heebo,sans-serif', cursor: 'pointer' }}
            >
              {t('addEntry.delete')}
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ flex: 1, height: 44, background: loading ? 'var(--surface3)' : 'var(--accent)', color: loading ? 'var(--text3)' : '#fff', border: 'none', borderRadius: 'var(--radius)', fontSize: 15, fontWeight: 600, fontFamily: 'DM Sans,Heebo,sans-serif', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? t('addEntry.saving2') : isEdit ? t('addEntry.saveChanges') : t('addEntry.addNew')}
          </button>
        </div>
      </div>
    </div>
  );
}
