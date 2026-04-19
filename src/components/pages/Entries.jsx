import EntryItem from '../shared/EntryItem';
import { MONTHS_HE } from '../../utils/constants';
import { getMonthEntries } from '../../utils/format';

export default function Entries({ entries, currentMonth, currentYear, householdId, user, onEdit, onDelete }) {
  const me = getMonthEntries(entries, currentMonth, currentYear);

  return (
    <div className="page">
      <div className="section-title">
        כל הפעולות — {MONTHS_HE[currentMonth]} {currentYear}
      </div>
      {me.length === 0 ? (
        <div className="empty-state">
          <div className="es-icon">🧾</div>
          <div className="es-text">אין עדיין פעולות<br />לחצי + להוסיף</div>
        </div>
      ) : (
        <div className="expense-list">
          {me.map((e) => (
            <EntryItem key={e.id} entry={e} showDelete={true} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
