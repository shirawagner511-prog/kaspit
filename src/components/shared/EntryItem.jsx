import { CAT_ICONS } from '../../utils/constants';
import { formatAmount } from '../../utils/format';

const TAG_MAP = {
  fixed:     <span className="tag fixed">קבועה</span>,
  bimonthly: <span className="tag bimonthly">דו-חודשית</span>,
  variable:  <span className="tag var">משתנה</span>,
  sep:       <span className="sep-badge">ספטמ׳+</span>,
};

export default function EntryItem({ entry, showDelete, onDelete, onEdit }) {
  const isIn = entry.type === 'income';
  const [year, month, day] = (entry.date || '').split('-');
  const dateStr = day ? `${parseInt(day)}/${parseInt(month)}` : '';

  return (
    <div className="expense-item" onClick={() => onEdit?.(entry)} style={{ cursor: onEdit ? 'pointer' : 'default' }}>
      <div className={`expense-icon cat-${entry.category}`}>
        {CAT_ICONS[entry.category] || '📦'}
      </div>
      <div className="expense-info">
        <div className="expense-name">{entry.name}</div>
        <div className="expense-meta">
          {TAG_MAP[entry.fixed]}
          <span className="chip">{dateStr}</span>
          {entry.addedBy && (
            <span className="chip">{entry.addedBy.split(' ')[0]}</span>
          )}
        </div>
      </div>
      <div className={`expense-amount ${isIn ? 'in' : 'out'}`}>
        {isIn ? '+' : '−'}{formatAmount(entry.amount)}
      </div>
      {showDelete && (
        <div style={{ display: 'flex', gap: 4 }} onClick={(e) => e.stopPropagation()}>
          <button className="delete-btn" onClick={() => onDelete(entry.id)} title="מחיקה">🗑</button>
        </div>
      )}
    </div>
  );
}
