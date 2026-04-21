import { useTranslation } from 'react-i18next';
import EntryItem from '../shared/EntryItem';
import { getMonths } from '../../utils/constants';
import { getMonthEntries } from '../../utils/format';

export default function Entries({ entries, currentMonth, currentYear, householdId, user, onEdit, onDelete }) {
  const { t } = useTranslation();
  const months = getMonths(t);
  const me = getMonthEntries(entries, currentMonth, currentYear);

  return (
    <div className="page">
      <div className="section-title">
        {t('entries.title')} — {months[currentMonth]} {currentYear}
      </div>
      {me.length === 0 ? (
        <div className="empty-state">
          <div className="es-icon">🧾</div>
          <div className="es-text">{t('entries.empty')}</div>
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
