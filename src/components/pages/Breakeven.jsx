import { useState } from 'react';
import { MONTHS_HE } from '../../utils/constants';
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

export default function Breakeven({ entries, currentMonth, currentYear }) {
  const [isSep, setIsSep] = useState(false);

  const sf = computeSmartFixed(entries);
  const sepEntries = [...new Map(
    entries.filter((e) => e.type !== 'income' && e.fixed === 'sep').map((e) => [e.name, e])
  ).values()];
  const savEntries = [...new Map(
    entries.filter((e) => e.type === 'saving' && e.fixed === 'fixed').map((e) => [e.name, e])
  ).values()];

  const fT = sf.reduce((s, e) => s + e.avgAmount, 0);
  const sT = sepEntries.reduce((s, e) => s + e.amount, 0);
  const savT = savEntries.reduce((s, e) => s + e.amount, 0);
  const active = (isSep ? fT + sT : fT) + savT;

  const me = getMonthEntries(entries, currentMonth, currentYear);
  const mInc = me.filter((e) => e.type === 'income').reduce((s, e) => s + e.amount, 0);

  if (sf.length === 0 && sepEntries.length === 0) {
    return (
      <div className="page">
        <div className="section-title">תחשיב Break-Even</div>
        <div className="empty-state">
          <div className="es-icon">⚖️</div>
          <div className="es-text">הוסיפי הוצאות קבועות כדי לראות Break-Even</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="section-title">תחשיב Break-Even</div>

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

      <div className="be-card">
        <div className="be-title">📌 הוצאות קבועות (ממוצע חודשי)</div>
        {sf.map((e) => (
          <div key={e.name} className="be-row">
            <div className="name">
              {e.name}
              {e.occurrences > 1 && <span style={{ fontSize: 10, color: 'var(--text3)' }}> ×{e.occurrences} חודשים</span>}
            </div>
            <div className="val" style={{ color: 'var(--danger)' }}>−{formatAmount(e.avgAmount)}</div>
          </div>
        ))}
        <div className="be-total">
          <div className="name">סה"כ קבועות</div>
          <div className="val">₪{Math.round(fT).toLocaleString()}</div>
        </div>
      </div>

      {savEntries.length > 0 && (
        <div className="be-card">
          <div className="be-title">💰 חיסכונות קבועים</div>
          {savEntries.map((e) => (
            <div key={e.name} className="be-row">
              <div className="name">{e.name}</div>
              <div className="val" style={{ color: 'var(--accent)' }}>−{formatAmount(e.amount)}</div>
            </div>
          ))}
        </div>
      )}

      {sepEntries.length > 0 && (
        <div className="be-card" style={isSep ? {} : { opacity: .4 }}>
          <div className="be-title">⚠️ ספטמבר+ (מעון)</div>
          {sepEntries.map((e) => (
            <div key={e.name} className="be-row">
              <div className="name">{e.name}</div>
              <div className="val" style={{ color: 'var(--danger)' }}>−{formatAmount(e.amount)}</div>
            </div>
          ))}
          <div className="be-total">
            <div className="name">תוספת ספטמבר</div>
            <div className="val">₪{Math.round(sT).toLocaleString()}</div>
          </div>
        </div>
      )}

      <div className="section-title">🎯 יעדי הכנסה</div>
      <div className={`target-row ${isSep ? 'sep-mode' : 'breakeven'}`}>
        <div className="tname">Break-Even{isSep ? ' (ספטמבר)' : ''}</div>
        <div className="tval">₪{Math.round(active).toLocaleString()}</div>
      </div>
      <div className="target-row surplus">
        <div className="tname">פלוס 10%</div>
        <div className="tval">₪{Math.ceil(active * 1.1).toLocaleString()}</div>
      </div>
      <div className="target-row surplus">
        <div className="tname">פלוס 20%</div>
        <div className="tval">₪{Math.ceil(active * 1.2).toLocaleString()}</div>
      </div>

      {mInc > 0 && (
        <div className="be-card" style={{ marginTop: 14 }}>
          <div className="be-title">📊 {MONTHS_HE[currentMonth]} — מצב עכשווי</div>
          <div className="be-row">
            <div className="name">הכנסה</div>
            <div className="val" style={{ color: 'var(--accent2)' }}>₪{Math.round(mInc).toLocaleString()}</div>
          </div>
          <div className="be-row">
            <div className="name">Break-Even</div>
            <div className="val">₪{Math.round(active).toLocaleString()}</div>
          </div>
          <div className="be-total">
            <div className="name">מצב</div>
            <div className="val" style={{ color: mInc >= active ? 'var(--accent2)' : 'var(--danger)' }}>
              {mInc >= active ? '✅ +' : '⚠️ −'}₪{Math.abs(Math.round(mInc - active)).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
