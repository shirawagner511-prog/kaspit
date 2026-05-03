import { useTranslation } from 'react-i18next';
import CategoryIcon from '../shared/CategoryIcon';
import { getMonths } from '../../utils/constants';
import { formatAmount, getMonthEntries } from '../../utils/format';
import PremiumGate from '../shared/PremiumGate';

function computeTrends(entries, currentMonth, currentYear, cycleStartDay = 1) {
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const prev = getMonthEntries(entries, prevMonth, prevYear, cycleStartDay);
  const curr = getMonthEntries(entries, currentMonth, currentYear, cycleStartDay);
  const cats = [...new Set([...prev, ...curr].filter((e) => e.type !== 'income').map((e) => e.category))];
  return cats
    .map((cat) => {
      const pA = prev.filter((e) => e.category === cat && e.type !== 'income').reduce((s, e) => s + e.amount, 0);
      const cA = curr.filter((e) => e.category === cat && e.type !== 'income').reduce((s, e) => s + e.amount, 0);
      return { cat, prev: pA, curr: cA, diff: cA - pA };
    })
    .filter((t) => t.prev > 0 || t.curr > 0)
    .sort((a, b) => b.curr - a.curr);
}

export default function Insights({ entries, currentMonth, currentYear, allCategories = [], isPremium, user, cycleStartDay = 1 }) {
  if (!isPremium) return <PremiumGate feature="insights" user={user} isPremium={isPremium}>{null}</PremiumGate>;
  const { t } = useTranslation();
  const months = getMonths(t);
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
  const trends = computeTrends(entries, currentMonth, currentYear, cycleStartDay);
  const prevLabel = currentMonth === 0 ? months[11] : months[currentMonth - 1];

  const monthTotals = [];
  for (let i = 5; i >= 0; i--) {
    let m = currentMonth - i, y = currentYear;
    if (m < 0) { m += 12; y--; }
    const tot = getMonthEntries(entries, m, y, cycleStartDay).filter((e) => e.type !== 'income').reduce((s, e) => s + e.amount, 0);
    monthTotals.push({ label: months[m].slice(0, 3), total: tot, isCurrent: m === currentMonth && y === currentYear });
  }
  const maxTotal = Math.max(...monthTotals.map((m) => m.total), 1);

  return (
    <div className="page">
      <div className="section-title">{t('insights.title')}</div>
      <div className="alert info">
        {months[currentMonth]} / {prevLabel}
      </div>

      {trends.length === 0 ? (
        <div className="empty-state">
          <div className="es-icon">📈</div>
          <div className="es-text">{t('insights.twoMonthsMin')}</div>
        </div>
      ) : (
        <div className="expense-list">
          {trends.map((t) => {
            const arrow = t.diff > 0 ? '↑' : t.diff < 0 ? '↓' : '→';
            const color = t.diff > 0 ? 'var(--danger)' : t.diff < 0 ? 'var(--accent2)' : 'var(--text2)';
            const pct = t.prev > 0 ? Math.round(Math.abs(t.diff / t.prev) * 100) : null;
            return (
              <div key={t.cat} className="expense-item">
                <div className={`expense-icon cat-${t.cat}`}><CategoryIcon category={t.cat} size={16} /></div>
                <div className="expense-info">
                  <div className="expense-name">{getName(t.cat)}</div>
                  <div className="expense-meta">
                    <span style={{ color: 'var(--text2)' }}>{prevLabel}: {formatAmount(t.prev)}</span>
                    {pct !== null && <span className="chip">{arrow} {pct}%</span>}
                  </div>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color }}>{formatAmount(t.curr)}</div>
                  <div style={{ fontSize: 11, color }}>{arrow}{t.diff !== 0 ? ' ' + formatAmount(Math.abs(t.diff)) : ''}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="section-title">{t('insights.last6')}</div>
      <div className="be-card">
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80, paddingBottom: 4 }}>
          {monthTotals.map((m) => {
            const h = Math.max(Math.round((m.total / maxTotal) * 72), 2);
            return (
              <div key={m.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ height: h, width: '100%', borderRadius: '4px 4px 0 0', background: m.isCurrent ? 'var(--accent)' : 'var(--surface3)' }} />
                <div style={{ fontSize: 10, color: m.isCurrent ? 'var(--accent)' : 'var(--text3)', fontWeight: m.isCurrent ? 700 : 400 }}>{m.label}</div>
              </div>
            );
          })}
        </div>
        {monthTotals.map((m) => (
          <div key={m.label} className="be-row">
            <div className="name">{m.label}</div>
            <div className="val">{formatAmount(m.total)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
