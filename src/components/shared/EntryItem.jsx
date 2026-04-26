import {
  Home, ShoppingCart, Car, Baby, Pill, BookOpen, Shirt, UtensilsCrossed,
  Gamepad2, Dumbbell, Smartphone, Plane, ShoppingBag, Shield, PawPrint,
  PiggyBank, Package, Zap, Droplets, Gift, TrendingUp, Fuel, Trash2,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatAmount } from '../../utils/format';

const CAT_ICONS = {
  housing: Home, rent: Home,
  food: ShoppingCart, groceries: ShoppingCart,
  transport: Car,
  kids: Baby,
  health: Pill, pharma: Pill,
  education: BookOpen,
  clothing: Shirt, fashion: Shirt,
  dining: UtensilsCrossed, restaurants: UtensilsCrossed,
  leisure: Gamepad2, entertainment: Gamepad2,
  sport: Dumbbell,
  telecom: Smartphone, subscriptions: Smartphone,
  travel: Plane,
  shopping: ShoppingBag,
  insurance: Shield,
  pets: PawPrint,
  savings: PiggyBank,
  income: TrendingUp,
  other: Package,
  electricity: Zap,
  water: Droplets,
  gifts: Gift,
  fuel: Fuel,
};

export default function EntryItem({ entry, showDelete, onDelete, onEdit }) {
  const { t } = useTranslation();
  const TAG_MAP = {
    fixed:     <span className="tag fixed">{t('entryItem.fixed')}</span>,
    bimonthly: <span className="tag bimonthly">{t('entryItem.bimonthly')}</span>,
    variable:  <span className="tag var">{t('entryItem.variable')}</span>,
    sep:       <span className="sep-badge">{t('entryItem.sep')}</span>,
  };
  const isIn = entry.type === 'income';
  const [year, month, day] = (entry.date || '').split('-');
  const dateStr = day ? `${parseInt(day)}/${parseInt(month)}` : '';
  const Icon = CAT_ICONS[entry.category] || Package;

  return (
    <div className="expense-item" onClick={() => onEdit?.(entry)} style={{ cursor: onEdit ? 'pointer' : 'default' }}>
      <div className={`expense-icon cat-${entry.category}`}>
        <Icon size={16} strokeWidth={1.8} />
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
          <button className="delete-btn" onClick={() => onDelete(entry.id)}>
            <Trash2 size={14} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  );
}
