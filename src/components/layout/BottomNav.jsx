import { LayoutDashboard, ListOrdered, Scale, TrendingUp, Settings } from 'lucide-react';

const TABS = [
  { id: 'dashboard', Icon: LayoutDashboard, label: 'ראשי' },
  { id: 'entries',   Icon: ListOrdered,     label: 'פעולות' },
  { id: 'breakeven', Icon: Scale,           label: 'תחשיב' },
  { id: 'insights',  Icon: TrendingUp,      label: 'מגמות' },
  { id: 'settings',  Icon: Settings,        label: 'הגדרות' },
];

export default function BottomNav({ activePage, onNavigate }) {
  return (
    <nav className="bottom-nav">
      {TABS.map(({ id, Icon, label }) => (
        <button
          key={id}
          className={`nav-item${activePage === id ? ' active' : ''}`}
          onClick={() => onNavigate(id)}
        >
          <Icon size={20} strokeWidth={1.8} />
          <span className="nav-label">{label}</span>
        </button>
      ))}
    </nav>
  );
}
