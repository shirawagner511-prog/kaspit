import { useTranslation } from 'react-i18next';
import { LayoutDashboard, ListOrdered, Scale, TrendingUp, Settings } from 'lucide-react';

const TAB_META = {
  dashboard: { Icon: LayoutDashboard, key: 'nav.dashboard' },
  entries:   { Icon: ListOrdered,     key: 'nav.entries' },
  breakeven: { Icon: Scale,           key: 'nav.breakeven' },
  insights:  { Icon: TrendingUp,      key: 'nav.insights' },
  settings:  { Icon: Settings,        key: 'nav.settings' },
};

function NavBtn({ id, activePage, onNavigate, t }) {
  const { Icon, key } = TAB_META[id];
  return (
    <button
      className={`nav-item${activePage === id ? ' active' : ''}`}
      onClick={() => onNavigate(id)}
    >
      <Icon size={20} strokeWidth={1.8} />
      <span className="nav-label">{t(key)}</span>
    </button>
  );
}

export default function BottomNav({ activePage, onNavigate, onAdd }) {
  const { t } = useTranslation();
  const left  = ['dashboard', 'entries'];
  const right = ['breakeven', 'insights', 'settings'];
  return (
    <nav className="bottom-nav">
      {left.map((id)  => <NavBtn key={id} id={id} activePage={activePage} onNavigate={onNavigate} t={t} />)}
      <div className="nav-add-wrap">
        <button className="nav-add-btn" onClick={onAdd} aria-label={t('dashboard.addEntry')}>
          <span>+</span>
        </button>
      </div>
      {right.map((id) => <NavBtn key={id} id={id} activePage={activePage} onNavigate={onNavigate} t={t} />)}
    </nav>
  );
}
