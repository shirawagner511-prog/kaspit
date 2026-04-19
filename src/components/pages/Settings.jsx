import { useState, useEffect } from 'react';
import { getHousehold } from '../../firebase/db';

export default function Settings({ entries, householdId, user }) {
  const [household, setHousehold] = useState(null);

  useEffect(() => {
    if (householdId) getHousehold(householdId).then(setHousehold).catch(console.error);
  }, [householdId]);

  function exportCSV() {
    const rows = [['תאריך', 'שם', 'סכום', 'קטגוריה', 'סוג', 'קבוע/משתנה', 'הוסף על ידי']];
    entries.forEach((e) => rows.push([e.date, e.name, e.amount, e.category, e.type, e.fixed, e.addedBy || '']));
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['\uFEFF' + rows.map((r) => r.join(',')).join('\n')], { type: 'text/csv;charset=utf-8;' }));
    a.download = 'kaspit.csv';
    a.click();
  }

  return (
    <div className="page">
      {household && (
        <>
          <div className="section-title">הבית המשותף</div>
          <div className="be-card">
            <div className="be-title">🏠 {household.name}</div>
            <div className="be-row">
              <div className="name">קוד הזמנה לשיתוף</div>
              <div className="val" style={{ color: 'var(--accent)', letterSpacing: 3 }}>{household.inviteCode}</div>
            </div>
            <div className="be-row" style={{ borderBottom: 'none' }}>
              <div className="name">חברי הבית</div>
              <div className="val">{household.members?.length || 1} משתמשים</div>
            </div>
          </div>
        </>
      )}

      <div className="section-title">ייצוא נתונים</div>
      <button className="settings-item" onClick={exportCSV}>
        <div className="si-left">
          <div className="si-icon" style={{ background: 'rgba(93,211,179,.15)' }}>📤</div>
          <div>
            <div className="si-title">ייצוא ל-CSV</div>
            <div className="si-sub">שמירת כל הנתונים</div>
          </div>
        </div>
        <div className="si-arrow">›</div>
      </button>

      <div className="section-title">חיבורים עתידיים</div>
      <div className="settings-item" style={{ opacity: .5, pointerEvents: 'none' }}>
        <div className="si-left">
          <div className="si-icon" style={{ background: 'rgba(124,106,247,.15)' }}>🏦</div>
          <div><div className="si-title">חיבור לחשבון בנק</div><div className="si-sub">בקרוב</div></div>
        </div>
        <div className="si-arrow">🔒</div>
      </div>
      <div className="settings-item" style={{ opacity: .5, pointerEvents: 'none' }}>
        <div className="si-left">
          <div className="si-icon" style={{ background: 'rgba(247,160,90,.15)' }}>📱</div>
          <div><div className="si-title">סנכרון ביט / פייבוקס</div><div className="si-sub">בקרוב</div></div>
        </div>
        <div className="si-arrow">🔒</div>
      </div>
    </div>
  );
}
