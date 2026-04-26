import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Landmark, Trash2 } from 'lucide-react';
import { saveHouseholdAccounts } from '../../firebase/db';
import { formatAmount } from '../../utils/format';

const COLORS = ['#2D6A4F', '#1A6B8A', '#7C3AED', '#C0392B', '#E67E22', '#78716C'];

function computeBalance(account, entries) {
  const linked = entries.filter(
    (e) => e.accountId === account.id && e.date >= account.initialBalanceDate
  );
  return (account.initialBalance || 0) + linked.reduce((sum, e) => {
    if (e.type === 'income') return sum + e.amount;
    return sum - e.amount;
  }, 0);
}

function formatDate(isoDate) {
  if (!isoDate) return '';
  const [y, m, d] = isoDate.slice(0, 10).split('-');
  return `${d}/${m}/${y}`;
}

export default function Accounts({ accounts = [], entries = [], householdId }) {
  const { t } = useTranslation();
  const [resetId, setResetId] = useState(null);
  const [resetVal, setResetVal] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newBalance, setNewBalance] = useState('');
  const [newColor, setNewColor] = useState(COLORS[0]);
  const [saving, setSaving] = useState(false);

  async function handleAdd() {
    if (!newName.trim() || newBalance === '') return;
    setSaving(true);
    try {
      const newAccount = {
        id: 'acc_' + Date.now(),
        name: newName.trim(),
        initialBalance: parseFloat(newBalance) || 0,
        initialBalanceDate: new Date().toISOString().slice(0, 10),
        color: newColor,
        createdAt: new Date().toISOString(),
      };
      await saveHouseholdAccounts(householdId, [...accounts, newAccount]);
      setNewName(''); setNewBalance(''); setNewColor(COLORS[0]); setShowAdd(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleReset(accountId) {
    const val = parseFloat(resetVal);
    if (isNaN(val)) return;
    const updated = accounts.map((a) =>
      a.id === accountId
        ? { ...a, initialBalance: val, initialBalanceDate: new Date().toISOString().slice(0, 10) }
        : a
    );
    await saveHouseholdAccounts(householdId, updated);
    setResetId(null); setResetVal('');
  }

  async function handleDelete(accountId) {
    await saveHouseholdAccounts(householdId, accounts.filter((a) => a.id !== accountId));
    setDeleteId(null);
  }

  const total = accounts.reduce((sum, a) => sum + computeBalance(a, entries), 0);

  return (
    <div className="page">
      <div className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Landmark size={18} strokeWidth={1.8} />
        {t('accounts.title')}
      </div>

      {accounts.length === 0 ? (
        <div className="empty-state">
          <div className="es-icon"><Landmark size={32} strokeWidth={1.4} /></div>
          <div className="es-text">{t('accounts.empty')}<br /><small>{t('accounts.emptyHint')}</small></div>
        </div>
      ) : (
        <>
          <div className="expense-list">
            {accounts.map((account) => {
              const balance = computeBalance(account, entries);
              const isResetting = resetId === account.id;
              const isDeleting = deleteId === account.id;
              return (
                <div key={account.id} className="expense-item" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: account.color, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div className="expense-name">{account.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text3)' }}>
                        {t('accounts.lastUpdated')}: {formatDate(account.initialBalanceDate)}
                      </div>
                    </div>
                    <div style={{ textAlign: 'left', minWidth: 80 }}>
                      <div style={{ color: balance >= 0 ? 'var(--accent)' : 'var(--danger)', fontFamily: 'DM Mono, monospace', fontWeight: 600 }}>
                        {formatAmount(Math.abs(balance))}
                      </div>
                    </div>
                    <button
                      onClick={() => { setResetId(isResetting ? null : account.id); setResetVal(String(Math.round(balance))); }}
                      style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: 'var(--text2)', whiteSpace: 'nowrap' }}
                    >
                      {t('accounts.resetBalance')}
                    </button>
                    <button
                      onClick={() => setDeleteId(isDeleting ? null : account.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', padding: 4 }}
                    >
                      <Trash2 size={14} strokeWidth={1.8} />
                    </button>
                  </div>

                  {isResetting && (
                    <div style={{ display: 'flex', gap: 8, paddingRight: 24 }}>
                      <input
                        className="form-input"
                        type="number"
                        inputMode="decimal"
                        value={resetVal}
                        onChange={(e) => setResetVal(e.target.value)}
                        style={{ flex: 1 }}
                        autoFocus
                      />
                      <button onClick={() => handleReset(account.id)} style={{ background: 'var(--accent)', border: 'none', color: '#fff', borderRadius: 8, padding: '0 14px', cursor: 'pointer', fontSize: 13 }}>
                        {t('accounts.save')}
                      </button>
                      <button onClick={() => setResetId(null)} style={{ background: 'var(--surface3)', border: 'none', color: 'var(--text2)', borderRadius: 8, padding: '0 10px', cursor: 'pointer', fontSize: 13 }}>
                        {t('accounts.cancel')}
                      </button>
                    </div>
                  )}

                  {isDeleting && (
                    <div style={{ display: 'flex', gap: 8, paddingRight: 24, alignItems: 'center', fontSize: 13, color: 'var(--text2)' }}>
                      <span style={{ flex: 1 }}>{t('accounts.confirmDelete')}</span>
                      <button onClick={() => handleDelete(account.id)} style={{ background: 'var(--danger)', border: 'none', color: '#fff', borderRadius: 8, padding: '4px 14px', cursor: 'pointer', fontSize: 13 }}>
                        {t('accounts.delete')}
                      </button>
                      <button onClick={() => setDeleteId(null)} style={{ background: 'var(--surface3)', border: 'none', color: 'var(--text2)', borderRadius: 8, padding: '4px 10px', cursor: 'pointer', fontSize: 13 }}>
                        {t('accounts.cancel')}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: '1px solid var(--border)', marginTop: 4 }}>
            <span style={{ fontWeight: 600, color: 'var(--text)' }}>{t('accounts.total')}</span>
            <span style={{ fontFamily: 'DM Mono, monospace', fontWeight: 600, fontSize: 18, color: total >= 0 ? 'var(--accent)' : 'var(--danger)' }}>
              {formatAmount(Math.abs(total))}
            </span>
          </div>
        </>
      )}

      {showAdd ? (
        <div className="expense-item" style={{ flexDirection: 'column', gap: 10, marginTop: 12 }}>
          <input
            className="form-input"
            placeholder={t('accounts.addNamePlaceholder')}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            autoFocus
          />
          <input
            className="form-input"
            type="number"
            inputMode="decimal"
            placeholder={t('accounts.addBalance')}
            value={newBalance}
            onChange={(e) => setNewBalance(e.target.value)}
          />
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setNewColor(c)}
                style={{
                  width: 24, height: 24, borderRadius: '50%', background: c,
                  border: newColor === c ? '2px solid var(--text)' : '2px solid transparent',
                  cursor: 'pointer', padding: 0, flexShrink: 0,
                }}
              />
            ))}
            <div style={{ flex: 1 }} />
            <button onClick={handleAdd} disabled={saving} style={{ background: 'var(--accent)', border: 'none', color: '#fff', borderRadius: 8, padding: '6px 16px', cursor: 'pointer', fontSize: 13 }}>
              {saving ? '...' : t('accounts.save')}
            </button>
            <button onClick={() => setShowAdd(false)} style={{ background: 'var(--surface3)', border: 'none', color: 'var(--text2)', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 13 }}>
              {t('accounts.cancel')}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          style={{ marginTop: 16, width: '100%', background: 'none', border: '1px dashed var(--border)', borderRadius: 10, padding: '12px 0', color: 'var(--accent)', fontSize: 14, cursor: 'pointer', fontFamily: 'DM Sans, Heebo, sans-serif' }}
        >
          + {t('accounts.add')}
        </button>
      )}
    </div>
  );
}
