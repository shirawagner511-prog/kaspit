const TABS = [
  { id: 'dashboard', icon: '🏠', label: 'ראשי' },
  { id: 'entries',   icon: '📋', label: 'פעולות' },
  { id: 'breakeven', icon: '⚖️', label: 'תחשיב' },
  { id: 'insights',  icon: '📈', label: 'מגמות' },
  { id: 'settings',  icon: '⚙️', label: 'הגדרות' },
];

export default function BottomNav({ activePage, onNavigate }) {
  return (
    <nav className="bottom-nav">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`nav-item${activePage === tab.id ? ' active' : ''}`}
          onClick={() => onNavigate(tab.id)}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
