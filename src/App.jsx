import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { getRedirectResult } from 'firebase/auth';
import { auth } from './firebase/config';
import { useAuth } from './hooks/useAuth';
import { useEntries } from './hooks/useEntries';
import { useHousehold } from './hooks/useHousehold';
import { useAutoRecurring } from './hooks/useAutoRecurring';
import { deleteEntry } from './firebase/db';
import { getDefaultCategories } from './utils/constants';

import { LayoutDashboard, ListOrdered, Scale, TrendingUp, FolderInput, Settings as SettingsIcon } from 'lucide-react';
import LoginScreen from './components/auth/LoginScreen';
import HouseholdSetup from './components/auth/HouseholdSetup';
import Loader from './components/shared/Loader';
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
  const { t, i18n } = useTranslation();
  const { user, householdId, setHouseholdId, loading } = useAuth();
  const entries = useEntries(householdId);
  const { budgets, savingsGoal, customCategories } = useHousehold(householdId);

  const defaultCategories = getDefaultCategories(t);
  const allCategories = [
    ...defaultCategories,
    ...customCategories.filter((c) => !defaultCategories.some((d) => d.value === c.value)),
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

  useEffect(() => {
    const dir = i18n.language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', i18n.language);
  }, [i18n.language]);

  async function handleDeleteConfirmed() {
    try {
      await deleteEntry(householdId, deleteId);
    } catch (e) {
      alert(t('misc.errorDelete') + e.message);
    } finally {
      setDeleteId(null);
    }
  }

  useAutoRecurring(entries, currentMonth, currentYear, householdId, user);

  if (loading) return <Loader fullscreen />;
  if (!user) return <LoginScreen />;
  if (!householdId) return <HouseholdSetup user={user} onComplete={setHouseholdId} />;

  const pageProps = {
    entries, currentMonth, currentYear, householdId, user,
    allCategories, customCategories, budgets, savingsGoal,
    onEdit: setEditEntry,
    onDelete: setDeleteId,
  };

  const navItems = [
    { key: 'dashboard', Icon: LayoutDashboard, label: t('nav.dashboard') },
    { key: 'entries',   Icon: ListOrdered,     label: t('nav.entries') },
    { key: 'breakeven', Icon: Scale,           label: t('nav.breakeven') },
    { key: 'insights',  Icon: TrendingUp,      label: t('nav.insights') },
    { key: 'import',    Icon: FolderInput,     label: 'CSV' },
    { key: 'settings',  Icon: SettingsIcon,    label: t('nav.settings') },
  ];

  return (
    <>
      <nav className="desktop-sidebar">
        <div className="desktop-sidebar-title" dir="ltr">
          <span><span style={{ fontWeight: 700, color: 'var(--accent)' }}>B</span>udgi</span>
        </div>
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
      </div>

      {createPortal(
        <button className="fab" onClick={() => setModalOpen(true)}>
          <span>+</span> {t('dashboard.addEntry')}
        </button>,
        document.body
      )}

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
        message={t('misc.confirmDelete')}
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
