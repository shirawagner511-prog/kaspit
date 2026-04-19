import { useState, useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth } from './firebase/config';
import { useAuth } from './hooks/useAuth';
import { useEntries } from './hooks/useEntries';
import { useHousehold } from './hooks/useHousehold';
import { useAutoRecurring } from './hooks/useAutoRecurring';
import { deleteEntry } from './firebase/db';
import { DEFAULT_CATEGORIES } from './utils/constants';

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

  return (
    <>
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
      {page === 'settings'  && <Settings  {...pageProps} />}

      <BottomNav activePage={page} onNavigate={setPage} />

      <button className="fab" onClick={() => setModalOpen(true)}>
        <span>+</span> הוסיפי פעולה
      </button>

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
