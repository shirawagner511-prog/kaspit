import { useState } from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import { MONTHS_HE } from '../../utils/constants';
import { formatAmount } from '../../utils/format';

function buildRecurringSummary(entries, currentMonth, currentYear) {
  const byName = {};
  entries.forEach((e) => {
    if (e.fixed !== 'fixed' && e.fixed !== 'bimonthly' && e.fixed !== 'sep') return;
    if (!byName[e.name]) {
      byName[e.name] = { name: e.name, category: e.category, fixed: e.fixed, type: e.type, amounts: [], lastDate: e.date };
    }
    byName[e.name].amounts.push(e.amount);
    if (e.date > byName[e.name].lastDate) byName[e.name].lastDate = e.date;
  });

  const monthEntryNames = new Set(
    entries
      .filter((e) => {
        const [y, m] = (e.date || '').split('-').map(Number);
        return m - 1 === currentMonth && y === currentYear;
      })
      .map((e) => e.name)
  );

  return Object.values(byName).map((r) => ({
    ...r,
    avgAmount: r.amounts.reduce((s, a) => s + a, 0) / r.amounts.length,
    paidThisMonth: monthEntryNames.has(r.name),
  }));
}

export default function Breakeven({ entries, currentMonth, currentYear, allCategories = [] }) {
  const [isSep, setIsSep] = useState(false);
  const catMap = Object.fromEntries(allCategories.map((c) => [c.value, c]));
  const getIcon = (cat) => catMap[cat]?.icon || '📦';

  const summary = buildRecurringSummary(entries, currentMonth, currentYear);
  const fixed = summary.filter((r) => r.fixed === 'fixed' && r.type !== 'income');
  const fixedIncome = summary.filter((r) => r.fixed === 'fixed' && r.type === 'income');
  const bimonthly = summary.filter((r) => r.fixed === 'bimonthly' && r.type !== 'income');
  const sep = summary.filter((r) => r.fixed === 'sep');
  const savings = [...new Map(
    entries.filter((e) => e.type === 'saving' && e.fixed === 'fixed').map((e) => [e.name, e])
  ).values()];

  const fTotal = fixed.reduce((s, r) => s + r.avgAmount, 0);
  const bTotal = bimonthly.reduce((s, r) => s + r.avgAmount / 2, 0);
  const sTotal = sep.reduce((s, r) => s + r.avgAmount, 0);
  const savTotal = savings.reduce((s, e) => s + e.amount, 0);
  const activeTotal = fTotal + bTotal + savTotal + (isSep ? sTotal : 0);

  const monthIncome = entries
    .filter((e) => {
      const [y, m] = (e.date || '').split('-').map(Number);
      return e.type === 'income' && m - 1 === currentMonth && y === currentYear;
    })
    .reduce((s, e) => s + e.amount, 0);

  if (summary.length === 0 && savings.length === 0) {
    return (
      <div className="page">
        <div className="section-title">הוצאות קבועות ו-Break-Even</div>
        <div className="empty-state">
          <div className="es-icon">⚖️</div>
          <div className="es-text">הוסיפי הוצאות קבועות כדי לראות את הסיכום</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="section-title">סיכום הוצאות קבועות — {MONTHS_HE[currentMonth]}</div>

      {fixedIncome.length > 0 && (
        <div className="be-card">
          <div className="be-title">💳 הכנסות קבועות</div>
          {fixedIncome.map((r) => (
            <div key={r.name} className="be-row">
              <div className="name" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>{getIcon(r.category)}</span>
                <span>{r.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className="val" style={{ color: 'var(--accent2)' }}>+{formatAmount(r.avgAmount)}</div>
                {r.paidThisMonth ? <CheckCircle2 size={16} color="var(--accent)" /> : <Clock size={16} color="var(--text3)" />}
              </div>
            </div>
          ))}
          <div className="be-total">
            <div className="name">סה"כ הכנסות קבועות</div>
            <div className="val" style={{ color: 'var(--accent2)' }}>{formatAmount(fixedIncome.reduce((s, r) => s + r.avgAmount, 0))}</div>
          </div>
        </div>
      )}

      {fixed.length > 0 && (
        <div className="be-card">
          <div className="be-title">📌 חודשיות</div>
          {fixed.map((r) => (
            <div key={r.name} className="be-row">
              <div className="name" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>{getIcon(r.category)}</span>
                <span>{r.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className="val" style={{ color: 'var(--danger)' }}>−{formatAmount(r.avgAmount)}</div>
                {r.paidThisMonth ? <CheckCircle2 size={16} color="var(--text3)" /> : <Clock size={16} color="var(--text3)" />}
              </div>
            </div>
          ))}
          <div className="be-total">
            <div className="name">סה"כ חודשיות</div>
            <div className="val">{formatAmount(fTotal)}</div>
          </div>
        </div>
      )}

      {bimonthly.length > 0 && (
        <div className="be-card">
          <div className="be-title">📆 דו-חודשיות (ממוצע חודשי)</div>
          {bimonthly.map((r) => (
            <div key={r.name} className="be-row">
              <div className="name" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>{getIcon(r.category)}</span>
                <span>{r.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className="val" style={{ color: 'var(--danger)' }}>−{formatAmount(r.avgAmount / 2)}/חודש</div>
                {r.paidThisMonth ? <CheckCircle2 size={16} color="var(--text3)" /> : <Clock size={16} color="var(--text3)" />}
              </div>
            </div>
          ))}
          <div className="be-total">
            <div className="name">תוספת ממוצעת חודשית</div>
            <div className="val">{formatAmount(bTotal)}</div>
          </div>
        </div>
      )}

      {savings.length > 0 && (
        <div className="be-card">
          <div className="be-title">💰 חיסכונות קבועים</div>
          {savings.map((e) => (
            <div key={e.name} className="be-row">
              <div className="name">{e.name}</div>
              <div className="val" style={{ color: 'var(--accent)' }}>−{formatAmount(e.amount)}</div>
            </div>
          ))}
        </div>
      )}

      {sep.length > 0 && (
        <>
          <div className="toggle-row">
            <div>
              <div className="toggle-label">מצב ספטמבר (מעון)</div>
              <div className="toggle-sub">הוסיפי הוצאות מעון לתחשיב</div>
            </div>
            <label className="toggle">
              <input type="checkbox" checked={isSep} onChange={(e) => setIsSep(e.target.checked)} />
              <span className="toggle-slider" />
            </label>
          </div>
          <div className="be-card" style={isSep ? {} : { opacity: .4 }}>
            <div className="be-title">⚠️ ספטמבר+ (מעון)</div>
            {sep.map((r) => (
              <div key={r.name} className="be-row">
                <div className="name">{r.name}</div>
                <div className="val" style={{ color: 'var(--danger)' }}>−{formatAmount(r.avgAmount)}</div>
              </div>
            ))}
            <div className="be-total">
              <div className="name">תוספת ספטמבר</div>
              <div className="val">{formatAmount(sTotal)}</div>
            </div>
          </div>
        </>
      )}

      <div className="section-title">🎯 Break-Even</div>
      <div className="be-card">
        <div className="be-row">
          <div className="name">קבועות חודשיות</div>
          <div className="val">{formatAmount(fTotal)}</div>
        </div>
        {bimonthly.length > 0 && (
          <div className="be-row">
            <div className="name">דו-חודשיות (ממוצע)</div>
            <div className="val">{formatAmount(bTotal)}</div>
          </div>
        )}
        {savTotal > 0 && (
          <div className="be-row">
            <div className="name">חיסכונות</div>
            <div className="val">{formatAmount(savTotal)}</div>
          </div>
        )}
        <div className="be-total">
          <div className="name">Break-Even{isSep ? ' (ספטמבר)' : ''}</div>
          <div className="val">₪{Math.round(activeTotal).toLocaleString()}</div>
        </div>
      </div>

      <div className={`target-row breakeven`}>
        <div className="tname">Break-Even</div>
        <div className="tval">₪{Math.round(activeTotal).toLocaleString()}</div>
      </div>
      <div className="target-row surplus">
        <div className="tname">פלוס 10%</div>
        <div className="tval">₪{Math.ceil(activeTotal * 1.1).toLocaleString()}</div>
      </div>
      <div className="target-row surplus">
        <div className="tname">פלוס 20%</div>
        <div className="tval">₪{Math.ceil(activeTotal * 1.2).toLocaleString()}</div>
      </div>

      {monthIncome > 0 && (
        <div className="be-card" style={{ marginTop: 14 }}>
          <div className="be-title">📊 {MONTHS_HE[currentMonth]} — מצב עכשווי</div>
          <div className="be-row">
            <div className="name">הכנסה</div>
            <div className="val" style={{ color: 'var(--accent2)' }}>{formatAmount(monthIncome)}</div>
          </div>
          <div className="be-row">
            <div className="name">Break-Even</div>
            <div className="val">{formatAmount(activeTotal)}</div>
          </div>
          <div className="be-total">
            <div className="name">מצב</div>
            <div className="val" style={{ color: monthIncome >= activeTotal ? 'var(--accent2)' : 'var(--danger)' }}>
              {monthIncome >= activeTotal ? '✅ +' : '⚠️ −'}{formatAmount(Math.abs(monthIncome - activeTotal))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
