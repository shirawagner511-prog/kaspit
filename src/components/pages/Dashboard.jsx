import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addEntry } from '../../firebase/db';
import EntryItem from '../shared/EntryItem';
import CategoryIcon from '../shared/CategoryIcon';
import { getMonths } from '../../utils/constants';
import { formatAmount, getMonthEntries } from '../../utils/format';

const PIE_COLORS = [
  '#7c6af7','#5dd3b3','#f7a05a','#f76a6a','#a78bfa',
  '#34d399','#fb923c','#f472b6','#60a5fa','#facc15',
];

function DonutChart({ slices, onSliceClick, total }) {
  const [hovered, setHovered] = useState(null);
  const r = 54, cx = 64, cy = 64, baseStroke = 28;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const activeSlice = hovered !== null ? slices[hovered] : null;

  return (
    <svg width={148} height={148} viewBox="0 0 148 148" style={{ cursor: 'pointer', overflow: 'visible' }}>
      <circle cx={74} cy={74} r={r} fill="none" stroke="var(--surface3)" strokeWidth={baseStroke} />
      {slices.map((s, i) => {
        const dash = (s.pct / 100) * circ;
        const isHovered = hovered === i;
        const sw = isHovered ? baseStroke + 6 : baseStroke;
        const el = (
          <circle
            key={i}
            cx={74} cy={74} r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={sw}
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={circ * 0.25 - offset}
            style={{ transition: 'stroke-width .15s, opacity .15s', opacity: hovered !== null && !isHovered ? 0.45 : 1, cursor: 'pointer' }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSliceClick(i)}
          />
        );
        offset += dash;
        return el;
      })}
      {activeSlice ? (
        <>
          <text x={74} y={68} textAnchor="middle" fill="var(--text)" fontSize={11} fontFamily="DM Sans,Heebo,sans-serif" fontWeight="600">{activeSlice.name}</text>
          <text x={74} y={84} textAnchor="middle" fill={activeSlice.color} fontSize={14} fontFamily="DM Mono,monospace" fontWeight="500">{Math.round(activeSlice.pct)}%</text>
        </>
      ) : (
        <>
          <text x={74} y={72} textAnchor="middle" fill="var(--expense)" fontSize={15} fontFamily="DM Mono,monospace" fontWeight="600">
            {total != null ? `₪${Math.round(total).toLocaleString()}` : ''}
          </text>
        </>
      )}
    </svg>
  );
}

function computeSmartFixed(entries) {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - 6);
  const cutoffStr = cutoff.toISOString().slice(0, 7);

  const byName = {};
  entries.forEach((e) => {
    if (e.type === 'expense' && e.fixed === 'fixed' && e.date >= cutoffStr) {
      if (!byName[e.name]) byName[e.name] = { amounts: [], months: new Set(), category: e.category };
      byName[e.name].amounts.push(e.amount);
      byName[e.name].months.add(e.date.slice(0, 7));
    }
  });
  return Object.entries(byName)
    .filter(([, data]) => data.months.size >= 3)
    .map(([name, data]) => ({
      name,
      category: data.category,
      avgAmount: data.amounts.reduce((s, a) => s + a, 0) / data.amounts.length,
    }));
}

function computeAccountBalance(account, entries) {
  const linked = entries.filter(
    (e) => e.accountId === account.id && e.date >= account.initialBalanceDate
  );
  return (account.initialBalance || 0) + linked.reduce((sum, e) => {
    if (e.type === 'income') return sum + e.amount;
    return sum - e.amount;
  }, 0);
}

export default function Dashboard({ entries, currentMonth, currentYear, householdId, user, onEdit, onDelete, allCategories = [], budgets = {}, savingsGoal = null, accounts = [], onNavigate, isPremium, subStatus, trialDaysLeft, cycleStartDay = 1 }) {
  const { t } = useTranslation();
  const months = getMonths(t);
  const accountsTotal = accounts.reduce((sum, a) => sum + computeAccountBalance(a, entries), 0);
  const catMap = Object.fromEntries(allCategories.map((c) => [c.value, c]));
  const getName = (cat) => {
    if (!cat) return '';
    const found = catMap[cat.toLowerCase()] || catMap[cat];
    if (found) return found.label;
    if (cat.startsWith('custom_')) {
      const parts = cat.split('_');
      const withoutTimestamp = parts[parts.length - 1].match(/^\d{10,}$/) ? parts.slice(0, -1) : parts;
      return withoutTimestamp.slice(1).join('_') || cat;
    }
    return cat;
  };
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [suggestionsDismissed, setSuggestionsDismissed] = useState(false);
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [drilldown, setDrilldown] = useState(null);
  const [catDrilldown, setCatDrilldown] = useState(null);
  const [trialNudgeDismissed, setTrialNudgeDismissed] = useState(() => localStorage.getItem('budgi-trial-nudge-dismissed') === '1');

  function dismissTrialNudge() {
    localStorage.setItem('budgi-trial-nudge-dismissed', '1');
    setTrialNudgeDismissed(true);
  }

  const me = getMonthEntries(entries, currentMonth, currentYear, cycleStartDay);
  const totalIn = me.filter((e) => e.type === 'income').reduce((s, e) => s + e.amount, 0);
  const totalOut = me.filter((e) => e.type !== 'income').reduce((s, e) => s + e.amount, 0);
  const balance = totalIn - totalOut;

  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const prevMe = getMonthEntries(entries, prevMonth, prevYear, cycleStartDay);
  const prevBalance = prevMe.filter((e) => e.type === 'income').reduce((s, e) => s + e.amount, 0)
                   - prevMe.filter((e) => e.type !== 'income').reduce((s, e) => s + e.amount, 0);
  const balanceDiff = prevBalance !== 0 ? Math.round(((balance - prevBalance) / Math.abs(prevBalance)) * 100) : null;
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
      await addEntry(householdId, { name, amount, category, date, fixed: 'fixed', type: 'expense', note: t('misc.autoAdded') }, user);
    } catch (e) {
      alert(t('dashboard.errorAdd') + e.message);
    }
  }

  return (
    <div className="page">
      {exceededBudgets.length > 0 && (
        <div className="alert" style={{ flexDirection: 'column', gap: 6 }}>
          <strong>⚠️ {t('dashboard.overBudget', { count: exceededBudgets.length })}</strong>
          {exceededBudgets.map(([cat, amt]) => (
            <div key={cat} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><CategoryIcon category={cat} size={13} /> {getName(cat)}</span>
              <span>{formatAmount(amt)} / {formatAmount(budgets[cat])} ({Math.round((amt/budgets[cat])*100)}%)</span>
            </div>
          ))}
        </div>
      )}

      {subStatus === 'trial' && trialDaysLeft !== null && trialDaysLeft <= 7 && !trialNudgeDismissed && (
        <div style={{ background: trialDaysLeft <= 3 ? '#fef2f2' : '#fffbeb', border: `1.5px solid ${trialDaysLeft <= 3 ? 'var(--expense)' : '#fbbf24'}`, borderRadius: 14, padding: '12px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Heebo,sans-serif', fontWeight: 700, fontSize: 14, color: trialDaysLeft <= 3 ? 'var(--expense)' : '#92400e', marginBottom: 2 }}>
              {t('dashboard.trialEndingSoon', { days: trialDaysLeft })}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>{t('dashboard.trialEndingHint')}</div>
          </div>
          <button onClick={() => onNavigate?.('settings')} style={{ background: trialDaysLeft <= 3 ? 'var(--expense)' : '#d97706', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontSize: 13, fontFamily: 'Heebo,sans-serif', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {t('dashboard.trialUpgradeBtn')}
          </button>
          <button onClick={dismissTrialNudge} style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 4 }}>×</button>
        </div>
      )}

      {!isPremium && (
        <div style={{ background: 'var(--surface)', border: '1.5px solid var(--accent)', borderRadius: 14, padding: '14px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 20 }}>💬</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Heebo,sans-serif', fontWeight: 700, fontSize: 14, color: 'var(--accent)', marginBottom: 2 }}>{t('dashboard.kikiPromoTitle')}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.4 }}>{t('dashboard.kikiPromoSub')}</div>
          </div>
          <button onClick={() => onNavigate?.('settings')} style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontSize: 13, fontFamily: 'Heebo,sans-serif', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {t('dashboard.kikiPromoBtn')}
          </button>
        </div>
      )}

      {isPremium && suggested.length > 0 && !suggestionsDismissed && (
        <div className="alert info" style={{ cursor: 'pointer', alignItems: 'flex-start' }} onClick={() => setSuggestionsOpen((o) => !o)}>
          💡
          <div style={{ flex: 1 }}>
            <strong>{t('dashboard.suggestedMsg', { count: suggested.length })}</strong>
            {suggestionsOpen && (
              <div style={{ marginTop: 8 }}>
                {suggested.map((s) => (
                  <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid rgba(124,106,247,.2)' }}>
                    <span>{s.name} <small style={{ color: 'var(--text3)' }}>({t('dashboard.suggestedAvg')} {formatAmount(s.avgAmount)})</small></span>
                    <button
                      onClick={(e) => { e.stopPropagation(); quickAddFixed(s.name, s.avgAmount, s.category); }}
                      style={{ background: 'var(--accent)', border: 'none', color: 'white', borderRadius: 6, padding: '3px 10px', fontSize: 11, fontFamily: 'Heebo,sans-serif', cursor: 'pointer' }}
                    >{t('dashboard.suggestedAdd')}</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setSuggestionsDismissed(true); }}
            style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: 16, lineHeight: 1, padding: '0 0 0 4px', flexShrink: 0 }}
          >×</button>
        </div>
      )}

      <div className="summary-card">
        <div className="label">{t('dashboard.balance')} — {months[currentMonth]}</div>
        <div className={`amount ${balance >= 0 ? 'green' : 'red'}`}>
          {balance < 0 ? '−' : ''}{formatAmount(balance)}
        </div>
        {balanceDiff !== null && (
          <div style={{ marginTop: 8 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              background: 'rgba(255,255,255,0.15)', borderRadius: 20,
              padding: '4px 12px', fontSize: 13, fontFamily: 'Heebo,sans-serif', fontWeight: 600,
              color: balanceDiff >= 0 ? '#a7f3d0' : '#fca5a5',
            }}>
              {balanceDiff >= 0 ? '▲' : '▼'} {Math.abs(balanceDiff)}% {t('dashboard.vsLastMonth')}
            </span>
          </div>
        )}
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

      <div data-tour="summary-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 16px' }}>
          <div style={{ fontSize: 12, color: 'var(--text3)', fontFamily: 'Heebo,sans-serif', marginBottom: 6 }}>{t('dashboard.expenses')}</div>
          <div style={{ fontSize: 22, fontFamily: 'DM Mono,monospace', fontWeight: 600, color: 'var(--expense)', direction: 'ltr', textAlign: 'right' }}>
            ₪ {totalOut.toLocaleString('he-IL', { maximumFractionDigits: 0 })}
          </div>
        </div>
        <div style={{ background: 'var(--accent)', border: 'none', borderRadius: 14, padding: '14px 16px' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', fontFamily: 'Heebo,sans-serif', marginBottom: 6 }}>{t('dashboard.income')}</div>
          <div style={{ fontSize: 22, fontFamily: 'DM Mono,monospace', fontWeight: 600, color: '#fff', direction: 'ltr', textAlign: 'right' }}>
            ₪ {totalIn.toLocaleString('he-IL', { maximumFractionDigits: 0 })}
          </div>
        </div>
      </div>

      {totalBudget > 0 && (
        <div className="progress-section">
          <div className="progress-label">
            <span>{t('dashboard.budgetUtil')}</span>
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
            <span>🎯 {savingsGoal.name || t('dashboard.savingsGoal')}</span>
            <span>{formatAmount(savingsGoal.saved || 0)} / {formatAmount(savingsGoal.target)}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill safe" style={{ width: `${Math.min(((savingsGoal.saved||0)/savingsGoal.target)*100,100)}%` }} />
          </div>
        </div>
      )}

      {accounts.length > 0 && (
        <div className="card" style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span className="label">{t('accounts.title')}</span>
            {onNavigate && (
              <button onClick={() => onNavigate('accounts')} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: 12, cursor: 'pointer', padding: 0 }}>
                {t('accounts.nav')} ›
              </button>
            )}
          </div>
          {accounts.map((a) => {
            const bal = computeAccountBalance(a, entries);
            return (
              <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '0.5px solid var(--border)', fontSize: 13 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: a.color, display: 'inline-block' }} />
                  {a.name}
                </span>
                <span style={{ fontFamily: 'DM Mono, monospace', color: bal >= 0 ? 'var(--accent)' : 'var(--danger)', fontWeight: 500 }}>
                  {formatAmount(Math.abs(bal))}
                </span>
              </div>
            );
          })}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, fontWeight: 600 }}>
            <span className="label">{t('accounts.total')}</span>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 16, color: accountsTotal >= 0 ? 'var(--accent)' : 'var(--danger)' }}>
              {formatAmount(Math.abs(accountsTotal))}
            </span>
          </div>
        </div>
      )}

      <div className="cards-row">
        {[
          { key: 'fixed',    label: t('dashboard.fixed'),        val: fixedTotal,    color: 'red',            filter: (e) => e.type !== 'income' && e.fixed === 'fixed' },
          { key: 'variable', label: t('dashboard.variable'),     val: variableTotal, color: 'orange',         filter: (e) => e.type !== 'income' && e.fixed === 'variable' },
          { key: 'saving',   label: t('dashboard.savingsLabel'), val: savingsTotal,  color: 'var(--accent)',  filter: (e) => e.type === 'saving' },
          { key: 'income',   label: t('dashboard.incomeLabel'),  val: totalIn,       color: 'var(--accent2)', filter: (e) => e.type === 'income' },
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
          <div className="section-title">{t('dashboard.byCategory')}</div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 4px' }}>
            <DonutChart
              total={totalOut}
              slices={sortedCats.map(([cat, amt], i) => ({
                pct: totalOut > 0 ? (amt / totalOut) * 100 : 0,
                color: PIE_COLORS[i % PIE_COLORS.length],
                name: getName(cat),
              }))}
              onSliceClick={(i) => {
                const cat = sortedCats[i][0];
                setCatDrilldown((d) => d === cat ? null : cat);
              }}
            />
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
                  <div className={`expense-icon cat-${cat}`}><CategoryIcon category={cat} size={16} /></div>
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
          <div className="section-title">{t('dashboard.recent')}</div>
          <div className="expense-list">
            {me.slice(0, 5).map((e) => (
              <EntryItem key={e.id} entry={e} showDelete={true} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <div className="es-icon">💸</div>
          <div className="es-text">{t('dashboard.noEntries')}<br />{t('dashboard.noEntriesHint')}</div>
        </div>
      )}
    </div>
  );
}
