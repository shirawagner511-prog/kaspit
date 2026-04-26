import { useTranslation } from 'react-i18next';
import { LayoutDashboard, ListOrdered, Scale, TrendingUp, Settings } from 'lucide-react';

export default function BottomNav({ activePage, onNavigate }) {
  const { t } = useTranslation();
  const TABS = [
    { id: 'dashboard', Icon: LayoutDashboard, label: t('nav.dashboard') },
    { id: 'entries',   Icon: ListOrdered,     label: t('nav.entries') },
    { id: 'breakeven', Icon: Scale,           label: t('nav.breakeven') },
    { id: 'insights',  Icon: TrendingUp,      label: t('nav.insights') },
    { id: 'settings',  Icon: Settings,        label: t('nav.settings') },
  ];
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
