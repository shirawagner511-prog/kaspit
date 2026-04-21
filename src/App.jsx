import { useState, useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth } from './firebase/config';
import { useAuth } from './hooks/useAuth';
import { useEntries } from './hooks/useEntries';
import { useHousehold } from './hooks/useHousehold';
import { useAutoRecurring } from './hooks/useAutoRecurring';
import { deleteEntry } from './firebase/db';
import { DEFAULT_CATEGORIES } from './utils/constants';

import { LayoutDashboard, ListOrdered, Scale, TrendingUp, FolderInput, Settings as SettingsIcon } from 'lucide-react';
import LoginScreen from './components/auth/LoginScreen';
import HouseholdSetup from './components/auth/HouseholdSetup';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import AddEntryModal from './components/shared/AddEntryModal';
import ConfirmDialog from './components/shared/ConfirmDialog';
import Dashboard from './components/pages/Dashboard';
import Entries from './components/pages/Entries';
import Breakeven from './components/pages/Breakeven';
import Insights from './components/pages/Insights';
import Settings from './components/pages/Settings';
import ImportCSV from './components/pages/ImportCSV';

export default function App() {
  const { user, householdId, setHouseholdId, loading } = useAuth();
  const entries = useEntries(householdId);
  const { budgets, savingsGoal, customCategories } = useHousehold(householdId);

  const allCategories = [
    ...DEFAULT_CATEGORIES,
    ...customCategories.filter((c) => !DEFAULT_CATEGORIES.some((d) => d.value === c.value)),
  ];

  const [page, setPage] = useState('dashboard');
  const [modalOpen, setModalOpen] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    getRedirectResult(auth).catch((e) => console.error('Redirect error:', e));
  }, []);

  async function handleDeleteConfirmed() {
    try {
      await deleteEntry(householdId, deleteId);
    } catch (e) {
      alert('שגיאה במחיקה: ' + e.message);
    } finally {
      setDeleteId(null);
    }
  }

  useAutoRecurring(entries, currentMonth, currentYear, householdId, user);

  if (loading) return <div className="loading-screen"><div className="loading-spinner" /></div>;
  if (!user) return <LoginScreen />;
  if (!householdId) return <HouseholdSetup user={user} onComplete={setHouseholdId} />;

  const pageProps = {
    entries, currentMonth, currentYear, householdId, user,
    allCategories, customCategories, budgets, savingsGoal,
    onEdit: setEditEntry,
    onDelete: setDeleteId,
  };

  const navItems = [
    { key: 'dashboard', Icon: LayoutDashboard, label: 'ראשי' },
    { key: 'entries',   Icon: ListOrdered,     label: 'פעולות' },
    { key: 'breakeven', Icon: Scale,           label: 'נקודת איזון' },
    { key: 'insights',  Icon: TrendingUp,      label: 'תובנות' },
    { key: 'import',    Icon: FolderInput,     label: 'ייבוא CSV' },
    { key: 'settings',  Icon: SettingsIcon,    label: 'הגדרות' },
  ];

  return (
    <>
      <nav className="desktop-sidebar">
        <div className="desktop-sidebar-title">BUDGI</div>
        {navItems.map(({ key, Icon, label }) => (
          <button
            key={key}
            className={`desktop-sidebar-item${page === key ? ' active' : ''}`}
            onClick={() => setPage(key)}
            style={{ background: 'none', border: 'none', fontFamily: 'DM Sans,Heebo,sans-serif', width: '100%', textAlign: 'right' }}
          >
            <Icon size={16} strokeWidth={1.8} /> {label}
          </button>
        ))}
        <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '0.5px solid var(--border)', fontSize: 13, color: 'var(--text3)' }}>
          {user?.displayName}
        </div>
      </nav>

      <div className="app-shell">
        <Header
          user={user}
          currentMonth={currentMonth}
          currentYear={currentYear}
          onMonthChange={(m, y) => { setCurrentMonth(m); setCurrentYear(y); }}
        />

        {page === 'dashboard' && <Dashboard {...pageProps} />}
        {page === 'entries'   && <Entries   {...pageProps} />}
        {page === 'breakeven' && <Breakeven {...pageProps} />}
        {page === 'insights'  && <Insights  {...pageProps} />}
        {page === 'import'    && <ImportCSV  {...pageProps} />}
        {page === 'settings'  && <Settings  {...pageProps} />}

        <BottomNav activePage={page} onNavigate={setPage} />

        <button className="fab" onClick={() => setModalOpen(true)}>
          <span>+</span> הוסיפי פעולה
        </button>
      </div>

      <AddEntryModal
        open={modalOpen || !!editEntry}
        onClose={() => { setModalOpen(false); setEditEntry(null); }}
        householdId={householdId}
        user={user}
        entry={editEntry}
        allCategories={allCategories}
        customCategories={customCategories}
      />

      <ConfirmDialog
        open={!!deleteId}
        message="למחוק את הפעולה?"
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
