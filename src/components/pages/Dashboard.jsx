import { useState } from 'react';
import { addEntry } from '../../firebase/db';
import EntryItem from '../shared/EntryItem';
import { MONTHS_HE } from '../../utils/constants';
import { formatAmount, getMonthEntries } from '../../utils/format';

const PIE_COLORS = [
  '#7c6af7','#5dd3b3','#f7a05a','#f76a6a','#a78bfa',
  '#34d399','#fb923c','#f472b6','#60a5fa','#facc15',
];

function DonutChart({ slices }) {
  const r = 54, cx = 64, cy = 64, stroke = 28;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg width={128} height={128} viewBox="0 0 128 128">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--surface3)" strokeWidth={stroke} />
      {slices.map((s, i) => {
        const dash = (s.pct / 100) * circ;
        const el = (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={stroke}
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={circ * 0.25 - offset}
            style={{ transition: 'stroke-dasharray .4s' }}
          />
        );
        offset += dash;
        return el;
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" fill="var(--text1)" fontSize={11} fontFamily="Heebo,sans-serif">הוצאות</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="var(--text1)" fontSize={11} fontFamily="Heebo,sans-serif">לפי קטגוריה</text>
    </svg>
  );
}

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

export default function Dashboard({ entries, currentMonth, currentYear, householdId, user, onEdit, onDelete, allCategories = [], budgets = {}, savingsGoal = null }) {
  const catMap = Object.fromEntries(allCategories.map((c) => [c.value, c]));
  const getIcon = (cat) => catMap[cat?.toLowerCase()]?.icon || catMap[cat]?.icon || '📦';
  const getName = (cat) => catMap[cat?.toLowerCase()]?.label || catMap[cat]?.label || cat;
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [drilldown, setDrilldown] = useState(null);
  const [catDrilldown, setCatDrilldown] = useState(null);

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

  const exceededBudgets = sortedCats.filter(([cat, amt]) => budgets[cat] && amt > budgets[cat]);
  const totalBudget = Object.values(budgets).reduce((s, v) => s + v, 0);
  const savedThisMonth = me.filter((e) => e.type === 'saving').reduce((s, e) => s + e.amount, 0);

  async function quickAddFixed(name, amount, category) {
    const d = new Date();
    const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    try {
      await addEntry(householdId, { name, amount, category, date, fixed: 'fixed', type: 'expense', note: 'הוזן אוטומטית' }, user);
    } catch (e) {
      alert('שגיאה בהוספה: ' + e.message);
    }
  }

  return (
    <div className="page">
      {exceededBudgets.length > 0 && (
        <div className="alert" style={{ flexDirection: 'column', gap: 6 }}>
          <strong>⚠️ חריגה מתקציב ב-{exceededBudgets.length} קטגוריות</strong>
          {exceededBudgets.map(([cat, amt]) => (
            <div key={cat} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span>{getIcon(cat)} {getName(cat)}</span>
              <span>{formatAmount(amt)} / {formatAmount(budgets[cat])} ({Math.round((amt/budgets[cat])*100)}%)</span>
            </div>
          ))}
        </div>
      )}

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
        <div className="sub">
          <span
            style={{ cursor: totalIn > 0 ? 'pointer' : 'default', textDecoration: totalIn > 0 ? 'underline dotted' : 'none' }}
            onClick={() => totalIn > 0 && setIncomeOpen((o) => !o)}
          >
            הכנסות {formatAmount(totalIn)} {totalIn > 0 ? (incomeOpen ? '▴' : '▾') : ''}
          </span>
          {' · '}הוצאות {formatAmount(totalOut)}
        </div>
        {incomeOpen && (
          <div style={{ marginTop: 12, borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 10, textAlign: 'right' }}>
            {me.filter((e) => e.type === 'income').map((e) => (
              <div key={e.id} onClick={() => onEdit(e)} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', cursor: 'pointer', fontSize: 13 }}>
                <span style={{ color: 'var(--accent2)', fontWeight: 600 }}>+{formatAmount(e.amount)}</span>
                <span style={{ color: 'var(--text2)' }}>{e.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {(totalIn > 0 || totalOut > 0) && (
        <div className="progress-section">
          <div className="progress-label">
            <span>ניצול הכנסה</span><span>{Math.round(pct)}%</span>
          </div>
          <div className="progress-bar">
            <div className={`progress-fill ${bc}`} style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      {totalBudget > 0 && (
        <div className="progress-section">
          <div className="progress-label">
            <span>ניצול תקציב</span>
            <span style={{ color: totalOut > totalBudget ? 'var(--danger)' : 'var(--text2)' }}>
              {formatAmount(totalOut)} / {formatAmount(totalBudget)}
            </span>
          </div>
          <div className="progress-bar">
            <div className={`progress-fill ${totalOut/totalBudget < 0.7 ? 'safe' : totalOut/totalBudget < 0.9 ? 'warn' : 'danger'}`} style={{ width: `${Math.min((totalOut/totalBudget)*100,100)}%` }} />
          </div>
        </div>
      )}

      {savingsGoal?.target > 0 && (
        <div className="progress-section">
          <div className="progress-label">
            <span>🎯 {savingsGoal.name || 'יעד חיסכון'}</span>
            <span>{formatAmount(savingsGoal.saved || 0)} / {formatAmount(savingsGoal.target)}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill safe" style={{ width: `${Math.min(((savingsGoal.saved||0)/savingsGoal.target)*100,100)}%` }} />
          </div>
        </div>
      )}

      <div className="cards-row">
        {[
          { key: 'fixed',    label: 'קבועות',   val: fixedTotal,    color: 'red',              filter: (e) => e.type !== 'income' && e.fixed === 'fixed' },
          { key: 'variable', label: 'משתנות',   val: variableTotal, color: 'orange',           filter: (e) => e.type !== 'income' && e.fixed === 'variable' },
          { key: 'saving',   label: 'חיסכונות', val: savingsTotal,  color: 'var(--accent)',    filter: (e) => e.type === 'saving' },
          { key: 'income',   label: 'הכנסות',   val: totalIn,       color: 'var(--accent2)',   filter: (e) => e.type === 'income' },
        ].map(({ key, label, val, color, filter }) => (
          <div
            key={key}
            className={`mini-card${drilldown === key ? ' active' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => setDrilldown((d) => d === key ? null : key)}
          >
            <div className="label">{label}</div>
            <div className="val" style={{ color }}>{formatAmount(val)}</div>
          </div>
        ))}
      </div>

      {drilldown && (() => {
        const filters = {
          fixed:    (e) => e.type !== 'income' && e.fixed === 'fixed',
          variable: (e) => e.type !== 'income' && e.fixed === 'variable',
          saving:   (e) => e.type === 'saving',
          income:   (e) => e.type === 'income',
        };
        const items = me.filter(filters[drilldown]);
        return items.length === 0 ? null : (
          <div className="expense-list" style={{ marginTop: 4 }}>
            {items.map((e) => (
              <EntryItem key={e.id} entry={e} showDelete={true} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        );
      })()}

      {sortedCats.length > 0 && (
        <>
          <div className="section-title">לפי קטגוריה</div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 4px' }}>
            <DonutChart slices={sortedCats.map(([, amt], i) => ({
              pct: totalOut > 0 ? (amt / totalOut) * 100 : 0,
              color: PIE_COLORS[i % PIE_COLORS.length],
            }))} />
          </div>
          <div className="expense-list">
            {sortedCats.map(([cat, amt], i) => {
              const p = totalOut > 0 ? Math.round((amt / totalOut) * 100) : 0;
              const isOpen = catDrilldown === cat;
              const catItems = me.filter((e) => e.category === cat && e.type !== 'income');
              const color = PIE_COLORS[i % PIE_COLORS.length];
              const budget = budgets[cat];
              const budgetPct = budget ? Math.min((amt / budget) * 100, 100) : null;
              const budgetColor = budgetPct === null ? color : budgetPct < 70 ? 'var(--accent2)' : budgetPct < 90 ? 'var(--accent3)' : 'var(--danger)';
              return (
                <div key={cat}>
                <div
                  className="expense-item"
                  style={{ cursor: 'pointer', borderColor: budgetPct >= 100 ? 'rgba(240,101,128,.4)' : undefined }}
                  onClick={() => setCatDrilldown(isOpen ? null : cat)}
                >
                  <div className={`expense-icon cat-${cat}`} style={{ background: `${color}22`, color }}>{getIcon(cat)}</div>
                  <div className="expense-info">
                    <div className="expense-name">{getName(cat)} {isOpen ? '▴' : '▾'}</div>
                    <div className="progress-bar" style={{ marginTop: 6, height: 4 }}>
                      <div style={{ height: '100%', width: `${budget ? budgetPct : p}%`, background: budgetColor, borderRadius: 4, transition: 'width .4s' }} />
                    </div>
                    {budget && <div style={{ fontSize: 10, color: budgetColor, marginTop: 2 }}>
                      {formatAmount(amt)} / {formatAmount(budget)} ({Math.round(budgetPct)}%)
                    </div>}
                  </div>
                  <div style={{ textAlign: 'left', minWidth: 64 }}>
                    <div className="expense-amount out">{formatAmount(amt)}</div>
                    <div style={{ fontSize: 11, color, fontWeight: 700, textAlign: 'left' }}>{p}%</div>
                  </div>
                </div>
                {isOpen && (
                  <div style={{ paddingRight: 52, paddingBottom: 4 }}>
                    {catItems.map((e) => (
                      <EntryItem key={e.id} entry={e} showDelete={true} onEdit={onEdit} onDelete={onDelete} />
                    ))}
                  </div>
                )}
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
            {me.slice(0, 5).map((e) => (
              <EntryItem key={e.id} entry={e} showDelete={true} onEdit={onEdit} onDelete={onDelete} />
            ))}
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
