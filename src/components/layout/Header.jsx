import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { signOut, signInWithPopup, GoogleAuthProvider, updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { getCycleWindow } from '../../utils/format';
import { auth, googleProvider } from '../../firebase/config';
import { getMonths } from '../../utils/constants';
import { getUserData, saveUserEmail, saveCurrency, saveCycleDay, saveNotificationPrefs, getNotificationPrefs } from '../../firebase/db';
import { registerForPush } from '../../firebase/notifications';
import { RefreshCw, LogOut, Languages, UserPen } from 'lucide-react';

const CURRENCIES = [
  { code: 'ILS', symbol: '₪',   cc: 'il', name: 'שקל' },
  { code: 'USD', symbol: '$',   cc: 'us', name: 'דולר' },
  { code: 'EUR', symbol: '€',   cc: 'eu', name: 'אירו' },
  { code: 'GBP', symbol: '£',   cc: 'gb', name: 'לירה' },
  { code: 'AED', symbol: 'د.إ', cc: 'ae', name: 'דירהם' },
  { code: 'CAD', symbol: 'CA$', cc: 'ca', name: 'CAD' },
  { code: 'AUD', symbol: 'A$',  cc: 'au', name: 'AUD' },
  { code: 'CHF', symbol: 'Fr',  cc: 'ch', name: 'פרנק' },
  { code: 'JPY', symbol: '¥',   cc: 'jp', name: 'ין' },
  { code: 'TRY', symbol: '₺',   cc: 'tr', name: 'לירה טורקית' },
];

function FlagImg({ cc }) {
  return <img src={`https://flagcdn.com/w20/${cc}.png`} width={20} height={15} alt={cc} style={{ borderRadius: 2, objectFit: 'cover', flexShrink: 0 }} />;
}

function CurrencyDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = CURRENCIES.find((c) => c.code === value) || CURRENCIES[0];

  useEffect(() => {
    function handler(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 8, cursor: 'pointer', fontFamily: 'DM Mono,monospace', fontSize: 14,
          color: 'var(--text)',
        }}
      >
        <FlagImg cc={selected.cc} />
        <span style={{ flex: 1, textAlign: 'start' }}>{selected.symbol} {selected.code}</span>
        <span style={{ fontSize: 11, color: 'var(--text3)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}>▼</span>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', insetInlineStart: 0, insetInlineEnd: 0,
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
          zIndex: 400, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,.1)',
        }}>
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => { onChange(c.code); setOpen(false); }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', background: c.code === value ? 'var(--accent-soft)' : 'transparent',
                border: 'none', borderBottom: '0.5px solid var(--border)', cursor: 'pointer',
                fontFamily: 'DM Mono,monospace', fontSize: 13, color: c.code === value ? 'var(--accent)' : 'var(--text)',
                textAlign: 'start',
              }}
            >
              <FlagImg cc={c.cc} />
              <span style={{ fontWeight: c.code === value ? 700 : 400 }}>{c.symbol} {c.code}</span>
              <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'Heebo,sans-serif', marginInlineStart: 'auto' }}>{c.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header({ user, currentMonth, currentYear, onMonthChange, isPremium, subStatus, trialDaysLeft, onNavigate, cycleStartDay = 1, householdId, currency = 'ILS' }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'he' ? 'he' : 'en';
  function toggleLang() {
    const next = i18n.language === 'he' ? 'en' : 'he';
    i18n.changeLanguage(next);
    localStorage.setItem('budgi-lang', next);
  }
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');
  const [successToast, setSuccessToast] = useState(false);
  const [localCurrency, setLocalCurrency] = useState(currency);
  const [localCycleDay, setLocalCycleDay] = useState(cycleStartDay);
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [notifTime, setNotifTime] = useState('20:00');

  const isGoogle = user?.providerData?.[0]?.providerId === 'google.com';

  async function openProfile() {
    setMenuOpen(false);
    setDisplayName(user?.displayName || '');
    setCurrentPw(''); setNewPw(''); setProfileMsg('');
    setLocalCurrency(currency);
    setLocalCycleDay(cycleStartDay);
    if (user?.uid) {
      const [data, prefs] = await Promise.all([
        !isGoogle ? getUserData(user.uid) : Promise.resolve(null),
        getNotificationPrefs(user.uid).catch(() => ({})),
      ]);
      if (data) setRecoveryEmail(data?.email || '');
      setNotifEnabled(prefs.enabled || false);
      setNotifTime(prefs.time || '20:00');
    }
    setProfileOpen(true);
  }

  async function handleProfileSave() {
    setProfileSaving(true);
    setProfileMsg('');
    try {
      if (displayName.trim() && displayName.trim() !== user.displayName) {
        await updateProfile(auth.currentUser, { displayName: displayName.trim() });
      }
      if (!isGoogle && recoveryEmail.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(recoveryEmail.trim())) throw new Error(lang === 'he' ? 'כתובת מייל לא תקינה' : 'Invalid email address');
        await saveUserEmail(user.uid, recoveryEmail.trim());
      }
      if (!isGoogle && newPw) {
        if (newPw.length < 6) throw new Error(lang === 'he' ? 'סיסמה חייבת להכיל לפחות 6 תווים' : 'Password must be at least 6 characters');
        if (!currentPw) throw new Error(lang === 'he' ? 'יש להזין סיסמה נוכחית לאימות' : 'Current password required to change password');
        const cred = EmailAuthProvider.credential(auth.currentUser.email, currentPw);
        await reauthenticateWithCredential(auth.currentUser, cred);
        await updatePassword(auth.currentUser, newPw);
        setCurrentPw(''); setNewPw('');
      }
      if (householdId) {
        const saves = [];
        if (localCurrency !== currency) {
          saves.push(saveCurrency(householdId, localCurrency));
          localStorage.setItem('budgi-currency', localCurrency);
          localStorage.setItem('budgi-currency-chosen', '1');
        }
        if (localCycleDay !== cycleStartDay) {
          saves.push(saveCycleDay(householdId, localCycleDay));
          localStorage.setItem('budgi-cycle-day', localCycleDay);
          localStorage.setItem('budgi-cycle-chosen', '1');
        }
        let token = null;
        if (notifEnabled) {
          try {
            token = await registerForPush();
          } catch (e) {
            const msg = e.message === 'permission_denied'
              ? (lang === 'he' ? 'נדרש אישור להתראות בהגדרות המכשיר' : 'Enable notifications in device settings')
              : e.message === 'notifications_unsupported' || e.message === 'messaging_unsupported' || e.message === 'sw_unsupported'
              ? (lang === 'he' ? 'התראות לא נתמכות בדפדפן זה' : 'Notifications not supported in this browser')
              : (lang === 'he' ? 'שגיאה ברישום התראות: ' : 'Push registration error: ') + e.message;
            setProfileMsg(msg);
            setProfileSaving(false);
            return;
          }
        }
        saves.push(saveNotificationPrefs(user.uid, { enabled: notifEnabled, time: notifTime, token }));
        await Promise.all(saves);
      }
      setProfileOpen(false);
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 2500);
    } catch (e) {
      const msg = e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential'
        ? (lang === 'he' ? 'סיסמה נוכחית שגויה' : 'Incorrect current password')
        : e.message;
      setProfileMsg(msg);
    } finally {
      setProfileSaving(false);
    }
  }
  const months = getMonths(t);
  const MONTH_OPTIONS = useMemo(() => {
    const options = [];
    const now = new Date();
    const startYear = now.getFullYear() - 3;
    const endYear = now.getFullYear() + 1;
    for (let y = endYear; y >= startYear; y--) {
      const mEnd = y === endYear ? now.getMonth() + 1 : 11;
      for (let m = mEnd; m >= 0; m--) {
        options.push({ month: m, year: y, label: `${months[m]} ${y}` });
      }
    }
    return options;
  }, [months]);
  const menuRef = useRef(null);
  const value = `${currentYear}-${currentMonth}`;

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleSwitchUser() {
    setMenuOpen(false);
    await signOut(auth);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try { await signInWithPopup(auth, provider); } catch {}
  }

  function handleChange(e) {
    const [y, m] = e.target.value.split('-').map(Number);
    onMonthChange(m, y);
  }

  return (
    <>
    <div className="app-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div className="app-logo" dir="ltr" style={{ gap: 0, cursor: 'pointer' }} onClick={() => onNavigate('dashboard')}>
          <span style={{ fontWeight: 700, color: 'var(--accent)' }}>B</span><span style={{ fontWeight: 400, color: 'var(--text)' }}>udgi</span>
        </div>
        {(subStatus === 'active' || subStatus === 'trial') && (
          <button
            onClick={() => onNavigate('settings')}
            className="header-sub-badge"
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              background: 'var(--accent)', color: '#fff', border: 'none',
              borderRadius: 20, padding: subStatus === 'trial' ? '3px 12px' : '5px 14px',
              cursor: 'pointer', lineHeight: 1.2,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'Heebo,sans-serif', letterSpacing: 0.3 }}>✦ Pro</span>
            {subStatus === 'trial' && (
              <span style={{ fontSize: 10, fontWeight: 400, opacity: 0.85 }}>
                {i18n.language === 'he' ? `ניסיון · ${trialDaysLeft} ימים` : `Trial · ${trialDaysLeft}d`}
              </span>
            )}
          </button>
        )}
      </div>
      <div className="header-right">
        {(subStatus === 'active' || subStatus === 'trial') && (
          <button
            onClick={() => onNavigate('settings')}
            className="header-avatar-pro"
            style={{
              position: 'relative', width: 34, height: 34, borderRadius: '50%',
              background: 'var(--accent)', color: '#fff',
              border: '2.5px solid var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700, fontFamily: 'Heebo,sans-serif',
              cursor: 'pointer', flexShrink: 0,
              boxShadow: '0 0 0 2px var(--bg)',
            }}
          >
            {(user?.displayName || user?.email || '?')[0].toUpperCase()}
            <span style={{
              position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)',
              fontSize: 8, fontWeight: 800, background: 'var(--accent)', color: '#fff',
              borderRadius: 4, padding: '1px 4px', letterSpacing: 0.3, whiteSpace: 'nowrap',
              border: '1.5px solid var(--bg)',
            }}>Pro</span>
          </button>
        )}
        <button
          onClick={toggleLang}
          title={i18n.language === 'he' ? 'Switch to English' : 'עברית'}
          className="header-lang-btn"
          style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-pill)', padding: '6px 10px',
            cursor: 'pointer', alignItems: 'center', gap: 4,
            fontSize: 11, fontWeight: 600, color: 'var(--text2)',
            boxShadow: 'var(--shadow-xs)', transition: 'border-color var(--d) var(--ease)',
          }}
        >
          <Languages size={13} />
          {i18n.language === 'he' ? 'EN' : 'עב'}
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <select className="month-selector" data-tour="month-nav" value={value} onChange={handleChange}>
            {MONTH_OPTIONS.map((o) => (
              <option key={`${o.year}-${o.month}`} value={`${o.year}-${o.month}`}>
                {o.label}
              </option>
            ))}
          </select>
          {cycleStartDay !== 1 && (() => {
            const { start, end } = getCycleWindow(currentMonth, currentYear, cycleStartDay);
            const fmt = (s) => { const [, m, d] = s.split('-'); return `${parseInt(d)}/${parseInt(m)}`; };
            return (
              <span style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: 0.2, direction: 'ltr' }}>
                {fmt(start)} – {fmt(end)}
              </span>
            );
          })()}
        </div>

        <div ref={menuRef} style={{ position: 'relative' }}>
          <button className="avatar" onClick={() => setMenuOpen((o) => !o)}>
            {user?.displayName?.charAt(0) || '?'}
          </button>
          {menuOpen && (
            <div style={{
              position: 'absolute', top: 40, insetInlineEnd: 0,
              background: 'var(--surface)', border: '0.5px solid var(--border)',
              borderRadius: 'var(--radius)', minWidth: 180, zIndex: 300,
              overflow: 'hidden',
            }}>
              <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{user?.displayName}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{user?.email}</div>
              </div>
              <button
                onClick={openProfile}
                style={{
                  width: '100%', padding: '11px 14px', background: 'none',
                  border: 'none', borderBottom: '0.5px solid var(--border)',
                  color: 'var(--text2)', fontSize: 13,
                  fontWeight: 500, cursor: 'pointer', textAlign: 'right',
                  fontFamily: 'DM Sans,Heebo,sans-serif', display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                <UserPen size={14} /> {lang === 'he' ? 'עדכון פרטים' : 'Edit profile'}
              </button>
              <button
                onClick={handleSwitchUser}
                style={{
                  width: '100%', padding: '11px 14px', background: 'none',
                  border: 'none', borderBottom: '0.5px solid var(--border)',
                  color: 'var(--text2)', fontSize: 13,
                  fontWeight: 500, cursor: 'pointer', textAlign: 'right',
                  fontFamily: 'DM Sans,Heebo,sans-serif', display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                <RefreshCw size={14} /> {t('header.switchUser')}
              </button>
              <button
                onClick={() => { setMenuOpen(false); signOut(auth); }}
                style={{
                  width: '100%', padding: '11px 14px', background: 'none',
                  border: 'none', color: 'var(--expense)', fontSize: 13,
                  fontWeight: 500, cursor: 'pointer', textAlign: 'right',
                  fontFamily: 'DM Sans,Heebo,sans-serif', display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                <LogOut size={14} /> {t('header.signOut')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    {profileOpen && createPortal(
      <div
        onClick={(e) => e.target === e.currentTarget && setProfileOpen(false)}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(28,25,23,0.55)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
        }}
      >
        <div style={{
          width: 'min(96vw, 480px)', maxHeight: '94vh', minHeight: 0,
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12,
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
        }}>
          <div className="modal-title" style={{ flexShrink: 0 }}>
            {lang === 'he' ? 'עדכון פרטים' : 'Edit profile'}
            <button className="modal-close" onClick={() => setProfileOpen(false)}>✕</button>
          </div>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 12, overflowY: 'auto', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 2 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                {(user?.displayName || '?').charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{user?.displayName}</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>{user?.email}</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>{lang === 'he' ? 'שם תצוגה' : 'Display name'}</div>
              <input className="form-input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </div>
            {isGoogle ? (
              <div>
                <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>{lang === 'he' ? 'אימייל' : 'Email'}</div>
                <input className="form-input" value={user?.email || ''} readOnly style={{ color: 'var(--text3)', cursor: 'default' }} />
                <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>
                  {lang === 'he' ? 'מנוהל דרך Google' : 'Managed by Google'}
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>{lang === 'he' ? 'אימייל' : 'Email'}</div>
                <input className="form-input" type="email" value={recoveryEmail} onChange={(e) => setRecoveryEmail(e.target.value)} placeholder="email@example.com" inputMode="email" autoComplete="email" />
              </div>
            )}
            {!isGoogle && (
              <>
                <div style={{ height: 1, background: 'var(--border)' }} />
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)' }}>{lang === 'he' ? 'שינוי סיסמה' : 'Change password'}</div>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>{lang === 'he' ? 'סיסמה נוכחית (נדרש לשינוי סיסמה)' : 'Current password (required to change password)'}</div>
                  <input className="form-input" type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} placeholder="••••••" autoComplete="current-password" />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>{lang === 'he' ? 'סיסמה חדשה (אופציונלי)' : 'New password (optional)'}</div>
                  <input className="form-input" type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="••••••" autoComplete="new-password" />
                </div>
              </>
            )}
            <div style={{ height: 1, background: 'var(--border)' }} />

            {/* Currency */}
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>{lang === 'he' ? 'מטבע' : 'Currency'}</div>
              <CurrencyDropdown value={localCurrency} onChange={setLocalCurrency} />
            </div>

            {/* Cycle start day */}
            <div>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 8 }}>{lang === 'he' ? 'תאריך תחילת חודש' : 'Billing cycle start day'}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
                {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => {
                  const isSel = localCycleDay === d;
                  return (
                    <button
                      key={d}
                      onClick={() => setLocalCycleDay(d)}
                      style={{
                        padding: '5px 0', border: isSel ? '2px solid var(--accent)' : '1px solid var(--border)',
                        borderRadius: 5, background: isSel ? 'var(--accent)' : 'var(--surface)',
                        color: isSel ? '#fff' : 'var(--text)',
                        fontFamily: 'DM Mono,monospace', fontSize: 10, fontWeight: isSel ? 700 : 400, cursor: 'pointer',
                      }}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notifications */}
            <div>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 8 }}>{lang === 'he' ? 'תזכורת יומית' : 'Daily reminder'}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: notifEnabled ? 10 : 0 }}>
                <span style={{ fontSize: 13 }}>{lang === 'he' ? 'שלח תזכורת' : 'Send reminder'}</span>
                <button
                  onClick={() => setNotifEnabled((v) => !v)}
                  style={{
                    width: 44, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer',
                    background: notifEnabled ? 'var(--accent)' : 'var(--surface3)',
                    position: 'relative', flexShrink: 0,
                  }}
                >
                  <span style={{
                    position: 'absolute', top: 3, width: 20, height: 20, borderRadius: '50%',
                    background: '#fff', transition: 'inset-inline-start .2s',
                    insetInlineStart: notifEnabled ? 21 : 3,
                    boxShadow: '0 1px 3px rgba(0,0,0,.2)',
                  }} />
                </button>
              </div>
              {notifEnabled && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <label style={{ fontSize: 12, color: 'var(--text2)', flexShrink: 0 }}>{lang === 'he' ? 'שעה' : 'Time'}</label>
                  <input
                    type="time"
                    className="form-input"
                    value={notifTime}
                    onChange={(e) => setNotifTime(e.target.value)}
                    style={{ width: 110, direction: 'ltr', textAlign: 'center' }}
                  />
                </div>
              )}
            </div>

            {profileMsg && (
              <div style={{ fontSize: 13, color: 'var(--expense)', fontWeight: 500 }}>{profileMsg}</div>
            )}
          </div>
          <div className="modal-footer" style={{ flexShrink: 0 }}>
            <button onClick={() => setProfileOpen(false)} style={{ flex: 1, height: 44, background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 14, cursor: 'pointer', fontFamily: 'Heebo,sans-serif', color: 'var(--text2)' }}>
              {lang === 'he' ? 'ביטול' : 'Cancel'}
            </button>
            <button onClick={handleProfileSave} disabled={profileSaving} style={{ flex: 2, height: 44, background: 'var(--accent)', border: 'none', borderRadius: 'var(--radius)', fontSize: 15, fontWeight: 700, fontFamily: 'Heebo,sans-serif', color: '#fff', cursor: profileSaving ? 'wait' : 'pointer', opacity: profileSaving ? 0.7 : 1 }}>
              {profileSaving ? (lang === 'he' ? 'שומר...' : 'Saving...') : (lang === 'he' ? 'שמור שינויים' : 'Save changes')}
            </button>
          </div>
        </div>
      </div>,
      document.body
    )}

    {successToast && (
      <div style={{
        position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, pointerEvents: 'none',
      }}>
        <div style={{
          background: 'var(--accent)', color: '#fff', borderRadius: 14,
          padding: '16px 28px', fontSize: 16, fontFamily: 'Heebo,sans-serif', fontWeight: 700,
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          display: 'flex', alignItems: 'center', gap: 10,
          animation: 'fadeInScale .2s ease',
        }}>
          <span style={{ fontSize: 20 }}>✓</span>
          {lang === 'he' ? 'הפרטים עודכנו בהצלחה' : 'Details updated successfully'}
        </div>
      </div>
    )}
    </>
  );
}
