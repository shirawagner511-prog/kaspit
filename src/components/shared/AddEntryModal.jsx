import { useState } from 'react';
import { addEntry } from '../../firebase/db';

const CATEGORIES = [
  { value: 'housing',   label: '🏠 דיור' },
  { value: 'kids',      label: '👶 ילדים' },
  { value: 'food',      label: '🛒 מזון' },
  { value: 'transport', label: '🚗 תחבורה' },
  { value: 'health',    label: '💊 בריאות' },
  { value: 'savings',   label: '💰 חיסכון' },
  { value: 'income',    label: '💳 הכנסה' },
  { value: 'other',     label: '📦 אחר' },
];

const FIXED_OPTIONS = [
  { value: 'fixed',    label: '📌 קבועה (כל חודש)' },
  { value: 'variable', label: '🔄 משתנה' },
  { value: 'sep',      label: '⚠️ ספטמבר+' },
];

const today = () => new Date().toISOString().split('T')[0];

export default function AddEntryModal({ open, onClose, householdId, user }) {
  const [type, setType] = useState('expense');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('housing');
  const [date, setDate] = useState(today());
  const [fixed, setFixed] = useState('fixed');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!name.trim() || !amount || !date) {
      alert('יש למלא שם, סכום ותאריך');
      return;
    }
    setLoading(true);
    try {
      await addEntry(householdId, {
        name: name.trim(),
        amount: parseFloat(amount),
        category,
        date,
        fixed,
        type,
        note: note.trim(),
      }, user);
      handleClose();
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setName(''); setAmount(''); setNote('');
    setType('expense'); setDate(today());
    onClose();
  }

  return (
    <div className={`modal-overlay${open ? ' open' : ''}`} onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="modal">
        <div className="modal-title">
          פעולה חדשה
          <button className="modal-close" onClick={handleClose}>✕</button>
        </div>

        <div className="form-group">
          <label className="form-label">סוג</label>
          <div className="type-toggle">
            {['expense', 'income', 'saving'].map((t) => (
              <button
                key={t}
                className={`type-btn${type === t ? ` active ${t}` : ''}`}
                onClick={() => setType(t)}
              >
                {t === 'expense' ? 'הוצאה' : t === 'income' ? 'הכנסה' : 'חיסכון'}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">שם</label>
          <input className="form-input" placeholder="למשל: משכנתא, מטפלת..." value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">סכום (₪)</label>
          <input className="form-input" type="number" inputMode="decimal" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">קטגוריה</label>
          <select className="form-input" value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">תאריך</label>
          <input className="form-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">אופי</label>
          <select className="form-input" value={fixed} onChange={(e) => setFixed(e.target.value)}>
            {FIXED_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">הערה</label>
          <input className="form-input" placeholder="הערה קצרה..." value={note} onChange={(e) => setNote(e.target.value)} />
        </div>

        <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? 'שומרת...' : 'הוסיפי ✦'}
        </button>
      </div>
    </div>
  );
}
