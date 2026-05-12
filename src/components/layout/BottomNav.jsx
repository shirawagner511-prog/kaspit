import { useTranslation } from 'react-i18next';
import { LayoutDashboard, ListOrdered, TrendingUp, MessageCircle, Settings, Crown } from 'lucide-react';

export default function BottomNav({ activePage, onNavigate, isPremium, subStatus }) {
  const { t } = useTranslation();
  const TABS = [
    { id: 'dashboard', Icon: LayoutDashboard, label: t('nav.dashboard') },
    { id: 'entries',   Icon: ListOrdered,     label: t('nav.entries') },
    { id: 'insights',  Icon: TrendingUp,      label: t('nav.insights') },
    { id: 'bot',       Icon: MessageCircle,   label: 'Bot' },
    { id: 'settings',  Icon: Settings,        label: t('nav.settings') },
  ];
  return (
    <nav className="bottom-nav" data-tour="nav">
      {TABS.map(({ id, Icon, label }) => (
        <button
          key={id}
          className={`nav-item${activePage === id ? ' active' : ''}`}
          onClick={() => onNavigate(id)}
        >
          <span style={{ position: 'relative', display: 'inline-flex' }}>
            <Icon size={20} strokeWidth={1.8} />
            {id === 'settings' && !isPremium && subStatus !== 'active' && subStatus !== 'trial' && (
              <Crown size={10} strokeWidth={2} color="#f59e0b" style={{ position: 'absolute', top: -4, right: -6 }} />
            )}
          </span>
          <span className="nav-label" style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {label}
            {id === 'settings' && (subStatus === 'active' || subStatus === 'trial') && (
              <span style={{ fontSize: 9, fontWeight: 700, background: 'var(--accent)', color: '#fff', borderRadius: 6, padding: '1px 5px', lineHeight: 1.4, letterSpacing: 0.2 }}>Pro</span>
            )}
          </span>
        </button>
      ))}
    </nav>
  );
}
