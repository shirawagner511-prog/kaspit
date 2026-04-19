import { useState, useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth } from './firebase/config';
import { useAuth } from './hooks/useAuth';
import { useEntries } from './hooks/useEntries';

import LoginScreen from './components/auth/LoginScreen';
import HouseholdSetup from './components/auth/HouseholdSetup';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import AddEntryModal from './components/shared/AddEntryModal';
import Dashboard from './components/pages/Dashboard';
import Entries from './components/pages/Entries';
import Breakeven from './components/pages/Breakeven';
import Insights from './components/pages/Insights';
import Settings from './components/pages/Settings';

export default function App() {
  const { user, householdId, setHouseholdId, loading } = useAuth();
  const entries = useEntries(householdId);

  const [page, setPage] = useState('dashboard');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Handle Google redirect result
  useEffect(() => {
    getRedirectResult(auth).catch((e) => console.error('Redirect error:', e));
  }, []);

  if (loading) {
    return <div className="loading-screen">טוענת...</div>;
  }

  if (!user) {
    return <LoginScreen />;
  }

  if (!householdId) {
    return <HouseholdSetup user={user} onComplete={setHouseholdId} />;
  }

  const pageProps = { entries, currentMonth, currentYear, householdId, user };

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
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        householdId={householdId}
        user={user}
      />
    </>
  );
}
