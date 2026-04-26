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

export default function AddEntryModal({ open, onClose, householdId, user, entry, allCategories = [], customCategories = [] }) {
  const { t } = useTranslation();
  const isEdit = !!entry;

  const [type, setType] = useState('expense');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('housing');
  const [date, setDate] = useState(today());
  const [fixed, setFixed] = useState('fixed');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [addingCat, setAddingCat] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('');

  const FIXED_OPTIONS = [
    { value: 'fixed',     label: t('addEntry.fixedDesc') },
    { value: 'bimonthly', label: t('addEntry.bimonthlyDesc') },
    { value: 'variable',  label: t('addEntry.variableDesc') },
    { value: 'sep',       label: t('addEntry.sepDesc') },
  ];

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
      setFixed(entry.fixed || 'fixed');
      setNote(entry.note || '');
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
    setCategory('housing'); setFixed('fixed');
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
      const data = { name: name.trim(), amount: parseFloat(amount), category, date, fixed, type, note: note.trim() };
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

        <div className="form-group">
          <label className="form-label">{t('addEntry.type')}</label>
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

        <div className="form-group">
          <label className="form-label">{t('addEntry.name')}</label>
          <input className="form-input" placeholder={NAME_PLACEHOLDERS[type]} value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">{t('addEntry.amount')}</label>
          <input className="form-input" type="number" inputMode="decimal" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">{t('addEntry.category')}</label>
          <select className="form-input" value={category} onChange={(e) => setCategory(e.target.value)}>
            {visibleCategories.map((c) => (
              <option key={c.value} value={c.value}>{c.icon} {c.label}</option>
            ))}
          </select>
          {!addingCat ? (
            <button
              type="button"
              onClick={() => setAddingCat(true)}
              style={{ marginTop: 6, background: 'none', border: 'none', color: 'var(--accent)', fontSize: 12, cursor: 'pointer', padding: 0 }}
            >
              {t('addEntry.addNewCategory')}
            </button>
          ) : (
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              <input className="form-input" placeholder="😀" value={newCatIcon} onChange={(e) => setNewCatIcon(e.target.value)} style={{ width: 52, textAlign: 'center', fontSize: 18 }} maxLength={2} />
              <input className="form-input" placeholder={t('addEntry.categoryNamePlaceholder')} value={newCatName} onChange={(e) => setNewCatName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()} style={{ flex: 1 }} autoFocus />
              <button type="button" onClick={handleAddCategory} style={{ background: 'var(--accent)', border: 'none', color: '#fff', borderRadius: 8, padding: '0 12px', cursor: 'pointer', fontSize: 13 }}>✓</button>
              <button type="button" onClick={() => setAddingCat(false)} style={{ background: 'var(--surface3)', border: 'none', color: 'var(--text2)', borderRadius: 8, padding: '0 10px', cursor: 'pointer', fontSize: 13 }}>✕</button>
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">{t('addEntry.date')}</label>
          <input className="form-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        {type !== 'income' && (
          <div className="form-group">
            <label className="form-label">{t('addEntry.character')}</label>
            <select className="form-input" value={fixed} onChange={(e) => setFixed(e.target.value)}>
              {FIXED_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        )}

        <div className="form-group">
          <label className="form-label">{t('addEntry.note')}</label>
          <input className="form-input" placeholder={t('addEntry.notePlaceholder')} value={note} onChange={(e) => setNote(e.target.value)} />
        </div>

        <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? t('addEntry.saving2') : isEdit ? t('addEntry.saveChanges') : t('addEntry.addNew')}
        </button>
      </div>
    </div>
  );
}
