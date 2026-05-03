import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCycleWindow } from '../../utils/format';
import { getMonths } from '../../utils/constants';

const DAYS = Array.from({ length: 28 }, (_, i) => i + 1);

export default function CyclePicker({ onSelect }) {
  const { t, i18n } = useTranslation();
  const isHe = i18n.language === 'he';
  const [selected, setSelected] = useState(1);
  const months = getMonths(t);

  const now = new Date();
  const { start, end } = getCycleWindow(now.getMonth(), now.getFullYear(), selected);
  const fmtDate = (str) => {
    const [y, m, d] = str.split('-').map(Number);
    return `${d} ${months[m - 1]}`;
  };

  return (
    <div className="currency-picker-screen">
      <div className="currency-picker-card">
        <div className="currency-picker-header">
          <h2>{isHe ? 'מתי מתחיל ה״חודש״ שלך?' : 'When does your month start?'}</h2>
          <p>{isHe ? 'בחר את היום בחודש שממנו תרצה למדוד הכנסות והוצאות' : 'Choose the day you want to track from each month'}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, margin: '8px 0 16px' }}>
          {DAYS.map((d) => {
            const isSelected = selected === d;
            const isSalary = d === 10;
            return (
              <div key={d} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <button
                  onClick={() => setSelected(d)}
                  style={{
                    width: '100%', aspectRatio: '1', border: isSelected ? '2px solid var(--accent)' : '1.5px solid var(--border)',
                    borderRadius: 10, background: isSelected ? 'var(--accent)' : isSalary ? 'var(--accent-soft)' : 'var(--surface)',
                    color: isSelected ? '#fff' : 'var(--text)',
                    fontFamily: 'DM Mono,monospace', fontSize: 14, fontWeight: isSelected ? 700 : 400,
                    cursor: 'pointer', transition: 'all .15s',
                  }}
                >
                  {d}
                </button>
                {isSalary && (
                  <span style={{ fontSize: 8, color: 'var(--accent)', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    {isHe ? 'משכורת' : 'salary'}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div style={{
          background: 'var(--accent-soft)', border: '1px solid rgba(45,106,79,.2)',
          borderRadius: 10, padding: '10px 14px', marginBottom: 20,
          fontSize: 13, color: 'var(--accent)', fontWeight: 600, textAlign: 'center',
        }}>
          {isHe
            ? `החודש הנוכחי: ${fmtDate(start)} — ${fmtDate(end)}`
            : `This cycle: ${fmtDate(start)} — ${fmtDate(end)}`}
        </div>

        <div className="currency-actions">
          <button className="btn-primary" onClick={() => onSelect(selected)}>
            {isHe ? 'המשך' : 'Continue'}
          </button>
          <button className="btn-secondary" onClick={() => onSelect(1)}>
            {isHe ? 'דלג (1 לחודש)' : 'Skip (1st of month)'}
          </button>
        </div>
      </div>
    </div>
  );
}
