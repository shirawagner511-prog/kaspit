import EntryItem from '../shared/EntryItem';
import { deleteEntry } from '../../firebase/db';
import { MONTHS_HE } from '../../utils/constants';
import { getMonthEntries } from '../../utils/format';

export default function Entries({ entries, currentMonth, currentYear, householdId, user }) {
  const me = getMonthEntries(entries, currentMonth, currentYear);

  async function handleDelete(id) {
    if (!confirm('למחוק?')) return;
    await deleteEntry(householdId, id);
  }

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
            <EntryItem key={e.id} entry={e} showDelete={true} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
