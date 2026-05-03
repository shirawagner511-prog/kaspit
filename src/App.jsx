import { useState, useEffect, lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { getRedirectResult } from 'firebase/auth';
import { auth } from './firebase/config';
import { useAuth } from './hooks/useAuth';
import { useEntries } from './hooks/useEntries';
import { useHousehold } from './hooks/useHousehold';
import { useAccounts } from './hooks/useAccounts';
import { useAutoRecurring } from './hooks/useAutoRecurring';
import { useSubscription } from './hooks/useSubscription';
import { deleteEntry, saveCurrency, saveCycleDay } from './firebase/db';
import { getDefaultCategories } from './utils/constants';

import { LayoutDashboard, ListOrdered, Scale, TrendingUp, Landmark, Settings as SettingsIcon, MessageCircle } from 'lucide-react';
import LoginScreen from './components/auth/LoginScreen';
import HouseholdSetup from './components/auth/HouseholdSetup';
import WelcomeScreen from './components/auth/WelcomeScreen';
import CurrencyPicker from './components/auth/CurrencyPicker';
import CyclePicker from './components/auth/CyclePicker';
import VerifyEmailScreen from './components/auth/VerifyEmailScreen';
import OnboardingTour from './components/shared/OnboardingTour';
import Loader from './components/shared/Loader';
import ScrollToTop from './components/shared/ScrollToTop';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import AddEntryModal from './components/shared/AddEntryModal';
import ConfirmDialog from './components/shared/ConfirmDialog';

const Dashboard = lazy(() => import('./components/pages/Dashboard'));
const Entries   = lazy(() => import('./components/pages/Entries'));
const Breakeven = lazy(() => import('./components/pages/Breakeven'));
const Insights  = lazy(() => import('./components/pages/Insights'));
const Settings  = lazy(() => import('./components/pages/Settings'));
const ImportCSV = lazy(() => import('./components/pages/ImportCSV'));
const Accounts  = lazy(() => import('./components/pages/Accounts'));
const BudgiBot  = lazy(() => import('./components/pages/BudgiBot'));

export default function App() {
  const { t, i18n } = useTranslation();
  const { user, householdId, setHouseholdId, loading } = useAuth();
  const entries = useEntries(householdId);
  const { budgets, savingsGoal, customCategories, memberUids, currency: householdCurrency, cycleStartDay: householdCycleDay } = useHousehold(householdId);
  const accounts = useAccounts(householdId);
  const { isPremium: _isPremium, status: subStatus, trialDaysLeft, subscription } = useSubscription(user);
  const isPremium = _isPremium || localStorage.getItem('budgi-beta') === '1';

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
  const [showWelcome, setShowWelcome] = useState(false);
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);
  const [currency, setCurrency] = useState(() => localStorage.getItem('budgi-currency') || 'ILS');
  const [tourDone, setTourDone] = useState(() => localStorage.getItem('budgi-tour-done') === '1');
  const [cycleStartDay, setCycleStartDay] = useState(() => parseInt(localStorage.getItem('budgi-cycle-day') || '1'));
  const [showCyclePicker, setShowCyclePicker] = useState(false);

  useEffect(() => {
    getRedirectResult(auth).catch((e) => console.error('Redirect error:', e));
  }, []);

  useEffect(() => {
    if (householdCurrency) {
      setCurrency(householdCurrency);
      localStorage.setItem('budgi-currency', householdCurrency);
      localStorage.setItem('budgi-currency-chosen', '1');
    }
  }, [householdCurrency]);

  useEffect(() => {
    const alreadyChosen = localStorage.getItem('budgi-currency-chosen') === '1';
    if (householdId && !alreadyChosen && !showCurrencyPicker && !showWelcome) {
      setShowCurrencyPicker(true);
    }
  }, [householdId, showCurrencyPicker, showWelcome]);

  useEffect(() => {
    if (householdCycleDay) {
      setCycleStartDay(householdCycleDay);
      localStorage.setItem('budgi-cycle-day', householdCycleDay);
    }
  }, [householdCycleDay]);

  useEffect(() => {
    const alreadyChosen = localStorage.getItem('budgi-cycle-chosen') === '1';
    if (householdId && !alreadyChosen && !showCyclePicker && !showCurrencyPicker && !showWelcome) {
      setShowCyclePicker(true);
    }
  }, [householdId, showCyclePicker, showCurrencyPicker, showWelcome]);

  async function handleCurrencySelect(cur) {
    setCurrency(cur);
    localStorage.setItem('budgi-currency', cur);
    localStorage.setItem('budgi-currency-chosen', '1');
    if (householdId) {
      await saveCurrency(householdId, cur);
    }
    setShowCurrencyPicker(false);
  }

  async function handleCycleSelect(day) {
    setCycleStartDay(day);
    localStorage.setItem('budgi-cycle-day', day);
    localStorage.setItem('budgi-cycle-chosen', '1');
    if (householdId) await saveCycleDay(householdId, day);
    setShowCyclePicker(false);
  }

  useEffect(() => {
    const dir = i18n.language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('lang', i18n.language);
    document.body.setAttribute('dir', dir);
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

  useAutoRecurring(entries, currentMonth, currentYear, householdId, user, isPremium, cycleStartDay);

  if (loading) return <Loader fullscreen />;
  if (!user) return <LoginScreen onNewUser={() => { setShowWelcome(true); }} />;
  if (user && !user.emailVerified && !user.email?.endsWith('@budgi.internal')) return <VerifyEmailScreen user={user} />;
  if (showWelcome) return <WelcomeScreen onContinue={() => { setShowWelcome(false); if (!householdId) setShowCurrencyPicker(true); }} />;
  if (showCurrencyPicker && !householdId) return <CurrencyPicker onSelect={(cur) => { setCurrency(cur); localStorage.setItem('budgi-currency', cur); localStorage.setItem('budgi-currency-chosen', '1'); setShowCurrencyPicker(false); }} />;
  if (!householdId) return <HouseholdSetup user={user} onComplete={(hid) => { setHouseholdId(hid); if (currency !== 'ILS') saveCurrency(hid, currency); }} />;
  if (showCurrencyPicker) return <CurrencyPicker onSelect={handleCurrencySelect} />;
  if (showCyclePicker) return <CyclePicker onSelect={handleCycleSelect} />;

  function handleResetOnboarding() {
    localStorage.removeItem('budgi-tour-done');
    localStorage.removeItem('budgi-currency-chosen');
    localStorage.removeItem('budgi-cycle-chosen');
    setTourDone(false);
    setShowWelcome(true);
    setShowCurrencyPicker(false);
    setPage('dashboard');
  }

  const pageProps = {
    entries, currentMonth, currentYear, householdId, user, memberUids,
    allCategories, customCategories, budgets, savingsGoal, accounts,
    isPremium, subStatus, trialDaysLeft, subscription, currency, cycleStartDay,
    onEdit: setEditEntry,
    onDelete: setDeleteId,
    onNavigate: setPage,
    onJoinHousehold: setHouseholdId,
    onResetOnboarding: handleResetOnboarding,
  };

  const navItems = [
    { key: 'dashboard', Icon: LayoutDashboard, label: t('nav.dashboard') },
    { key: 'entries',   Icon: ListOrdered,     label: t('nav.entries') },
    { key: 'breakeven', Icon: Scale,           label: t('nav.breakeven') },
    { key: 'insights',  Icon: TrendingUp,      label: t('nav.insights') },
    { key: 'bot',       Icon: MessageCircle,   label: 'Budgi Bot' },
    { key: 'accounts',  Icon: Landmark,        label: t('accounts.nav') },
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
          isPremium={isPremium}
          subStatus={subStatus}
          trialDaysLeft={trialDaysLeft}
          onNavigate={setPage}
          cycleStartDay={cycleStartDay}
        />

        <Suspense fallback={<Loader />}>
          {page === 'dashboard' && <Dashboard {...pageProps} />}
          {page === 'entries'   && <Entries   {...pageProps} />}
          {page === 'breakeven' && <Breakeven {...pageProps} />}
          {page === 'insights'  && <Insights  {...pageProps} />}
          {page === 'bot'       && <BudgiBot user={user} />}
          {page === 'import'    && <ImportCSV  {...pageProps} />}
          {page === 'accounts'  && <Accounts  {...pageProps} />}
          {page === 'settings'  && <Settings  {...pageProps} />}
        </Suspense>

        <BottomNav activePage={page} onNavigate={setPage} isPremium={isPremium} subStatus={subStatus} />
      </div>

      <ScrollToTop />

      {!(modalOpen || !!editEntry || !!deleteId) && ['dashboard','entries'].includes(page) && createPortal(
        <button className="fab" data-tour="fab" onClick={() => setModalOpen(true)}>
          {t('dashboard.addEntry')}
        </button>,
        document.body
      )}

      {!tourDone && householdId && page === 'dashboard' && (
        <OnboardingTour onDone={() => setTourDone(true)} />
      )}

      {createPortal(
        <>
          <AddEntryModal
            open={modalOpen || !!editEntry}
            onClose={() => { setModalOpen(false); setEditEntry(null); }}
            householdId={householdId}
            user={user}
            entry={editEntry}
            allCategories={allCategories}
            customCategories={customCategories}
            accounts={accounts}
            onDelete={(id) => { setEditEntry(null); setModalOpen(false); setDeleteId(id); }}
          />
          <ConfirmDialog
            open={!!deleteId}
            message={t('misc.confirmDelete')}
            onConfirm={handleDeleteConfirmed}
            onCancel={() => setDeleteId(null)}
          />
        </>,
        document.body
      )}
    </>
  );
}
