import { useState } from 'react';
import { addEntry } from '../../firebase/db';
import EntryItem from '../shared/EntryItem';
import { MONTHS_HE, CAT_ICONS, CAT_NAMES } from '../../utils/constants';
import { formatAmount, getMonthEntries } from '../../utils/format';

function computeSmartFixed(entries) {
  const byName = {};
  entries.forEach((e) => {
    if (e.type === 'expense' && e.fixed === 'fixed') {
      if (!byName[e.name]) byName[e.name] = { amounts: [], category: e.category };
      byName[e.name].amounts.push(e.amount);
    }
  });
  return Object.entries(byName).map(([name, data]) => ({
    name,
    category: data.category,
    avgAmount: data.amounts.reduce((s, a) => s + a, 0) / data.amounts.length,
    occurrences: data.amounts.length,
  }));
}

export default function Dashboard({ entries, currentMonth, currentYear, householdId, user }) {
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const me = getMonthEntries(entries, currentMonth, currentYear);
  const totalIn = me.filter((e) => e.type === 'income').reduce((s, e) => s + e.amount, 0);
  const totalOut = me.filter((e) => e.type !== 'income').reduce((s, e) => s + e.amount, 0);
  const balance = totalIn - totalOut;
  const pct = totalIn > 0 ? Math.min((totalOut / totalIn) * 100, 100) : totalOut > 0 ? 100 : 0;
  const fixedTotal = me.filter((e) => e.type !== 'income' && e.fixed === 'fixed').reduce((s, e) => s + e.amount, 0);
  const variableTotal = me.filter((e) => e.type !== 'income' && e.fixed === 'variable').reduce((s, e) => s + e.amount, 0);
  const savingsTotal = me.filter((e) => e.type === 'saving').reduce((s, e) => s + e.amount, 0);

  const smartFixed = computeSmartFixed(entries);
  const suggested = smartFixed.filter(
    (s) => !me.some((e) => e.type !== 'income' && e.fixed === 'fixed' && e.name === s.name)
  );

  const byCategory = {};
  me.filter((e) => e.type !== 'income').forEach((e) => {
    byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
  });
  const sortedCats = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);

  const bc = pct < 70 ? 'safe' : pct < 90 ? 'warn' : 'danger';

  async function quickAddFixed(name, amount, category) {
    await addEntry(householdId, {
      name, amount, category,
      date: new Date().toISOString().split('T')[0],
      fixed: 'fixed', type: 'expense', note: 'הוזן אוטומטית',
    }, user);
  }

  return (
    <div className="page">
      {suggested.length > 0 && (
        <div className="alert info" style={{ cursor: 'pointer' }} onClick={() => setSuggestionsOpen((o) => !o)}>
          💡
          <div>
            <strong>יש {suggested.length} הוצאות קבועות שלא הוזנו החודש</strong>
            {suggestionsOpen && (
              <div style={{ marginTop: 8 }}>
                {suggested.map((s) => (
                  <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid rgba(124,106,247,.2)' }}>
                    <span>{s.name} <small style={{ color: 'var(--text3)' }}>(ממוצע {formatAmount(s.avgAmount)})</small></span>
                    <button
                      onClick={(e) => { e.stopPropagation(); quickAddFixed(s.name, s.avgAmount, s.category); }}
                      style={{ background: 'var(--accent)', border: 'none', color: 'white', borderRadius: 6, padding: '3px 10px', fontSize: 11, fontFamily: 'Heebo,sans-serif', cursor: 'pointer' }}
                    >+ הוסיפי</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="summary-card">
        <div className="label">יתרה — {MONTHS_HE[currentMonth]}</div>
        <div className={`amount ${balance >= 0 ? 'green' : 'red'}`}>
          {balance < 0 ? '−' : ''}{formatAmount(balance)}
        </div>
        <div className="sub">הכנסות {formatAmount(totalIn)} · הוצאות {formatAmount(totalOut)}</div>
      </div>

      {(totalIn > 0 || totalOut > 0) && (
        <div className="progress-section">
          <div className="progress-label">
            <span>ניצול תקציב</span><span>{Math.round(pct)}%</span>
          </div>
          <div className="progress-bar">
            <div className={`progress-fill ${bc}`} style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      <div className="cards-row">
        <div className="mini-card"><div className="label">קבועות</div><div className="val red">{formatAmount(fixedTotal)}</div></div>
        <div className="mini-card"><div className="label">משתנות</div><div className="val orange">{formatAmount(variableTotal)}</div></div>
        <div className="mini-card"><div className="label">חיסכונות</div><div className="val" style={{ color: 'var(--accent)' }}>{formatAmount(savingsTotal)}</div></div>
        <div className="mini-card"><div className="label">הכנסות</div><div className="val green">{formatAmount(totalIn)}</div></div>
      </div>

      {sortedCats.length > 0 && (
        <>
          <div className="section-title">לפי קטגוריה</div>
          <div className="expense-list">
            {sortedCats.map(([cat, amt]) => {
              const p = totalOut > 0 ? Math.round((amt / totalOut) * 100) : 0;
              return (
                <div key={cat} className="expense-item">
                  <div className={`expense-icon cat-${cat}`}>{CAT_ICONS[cat] || '📦'}</div>
                  <div className="expense-info">
                    <div className="expense-name">{CAT_NAMES[cat] || cat}</div>
                    <div className="progress-bar" style={{ marginTop: 6, height: 4 }}>
                      <div className="progress-fill safe" style={{ width: `${p}%` }} />
                    </div>
                  </div>
                  <div className="expense-amount out">{formatAmount(amt)}</div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {me.length > 0 ? (
        <>
          <div className="section-title">אחרונות</div>
          <div className="expense-list">
            {me.slice(0, 5).map((e) => <EntryItem key={e.id} entry={e} showDelete={false} />)}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <div className="es-icon">💸</div>
          <div className="es-text">עוד אין פעולות לחודש זה<br />לחצי + להוסיף</div>
        </div>
      )}
    </div>
  );
}
