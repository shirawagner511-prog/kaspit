import { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { signOut, signInWithPopup, GoogleAuthProvider, updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase/config';
import { getMonths } from '../../utils/constants';
import { getUserData, saveUserEmail } from '../../firebase/db';
import { RefreshCw, LogOut, Languages, UserPen } from 'lucide-react';

export default function Header({ user, currentMonth, currentYear, onMonthChange, isPremium, subStatus, trialDaysLeft, onNavigate }) {
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

  const isGoogle = user?.providerData?.[0]?.providerId === 'google.com';

  async function openProfile() {
    setMenuOpen(false);
    setDisplayName(user?.displayName || '');
    setCurrentPw(''); setNewPw(''); setProfileMsg('');
    if (!isGoogle && user?.uid) {
      const data = await getUserData(user.uid);
      setRecoveryEmail(data?.email || '');
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
      setProfileMsg(lang === 'he' ? '✓ הפרטים עודכנו' : '✓ Details updated');
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
        {subStatus === 'active' && (
          <button onClick={() => onNavigate('settings')} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 20, padding: '5px 14px', fontSize: 14, fontWeight: 700, fontFamily: 'Heebo,sans-serif', cursor: 'pointer', letterSpacing: 0.3 }}>
            ✦ Pro
          </button>
        )}
        {subStatus === 'trial' && (
          <button
            onClick={() => onNavigate('settings')}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: trialDaysLeft <= 7 ? '#fff1f2' : '#fffbeb',
              color: trialDaysLeft <= 7 ? 'var(--expense)' : '#92400e',
              border: `1.5px solid ${trialDaysLeft <= 7 ? '#fca5a5' : '#fcd34d'}`,
              borderRadius: 20, padding: '5px 14px',
              fontSize: 14, fontWeight: 700, fontFamily: 'Heebo,sans-serif',
              cursor: 'pointer', whiteSpace: 'nowrap',
            }}
          >
            {trialDaysLeft <= 7 ? '⚠ ' : '⏳ '}
            {i18n.language === 'he' ? `ניסיון · ${trialDaysLeft} ימים` : `Trial · ${trialDaysLeft}d`}
          </button>
        )}
      </div>
      <div className="header-right">
        <button
          onClick={toggleLang}
          title={i18n.language === 'he' ? 'Switch to English' : 'עברית'}
          style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-pill)', padding: '6px 10px',
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4,
            fontSize: 11, fontWeight: 600, color: 'var(--text2)',
            boxShadow: 'var(--shadow-xs)', transition: 'border-color var(--d) var(--ease)',
          }}
        >
          <Languages size={13} />
          {i18n.language === 'he' ? 'EN' : 'עב'}
        </button>
        <select className="month-selector" value={value} onChange={handleChange}>
          {MONTH_OPTIONS.map((o) => (
            <option key={`${o.year}-${o.month}`} value={`${o.year}-${o.month}`}>
              {o.label}
            </option>
          ))}
        </select>

        <div ref={menuRef} style={{ position: 'relative' }}>
          <button className="avatar" onClick={() => setMenuOpen((o) => !o)}>
            {user?.displayName?.charAt(0) || '?'}
          </button>
          {menuOpen && (
            <div style={{
              position: 'absolute', top: 40, left: 0,
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
    {profileOpen && (
      <div className="modal-overlay open" style={{ alignItems: 'center', padding: 16 }} onClick={(e) => e.target === e.currentTarget && setProfileOpen(false)}>
        <div className="modal" style={{ borderRadius: 12, maxWidth: 400, width: '100%' }}>
          <div className="modal-title">
            {lang === 'he' ? 'עדכון פרטים' : 'Edit profile'}
            <button className="modal-close" onClick={() => setProfileOpen(false)}>✕</button>
          </div>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 4 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
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
              <div style={{ fontSize: 12, color: 'var(--text3)', background: 'var(--surface2)', borderRadius: 8, padding: '10px 12px' }}>
                {lang === 'he' ? '🔒 חשבון Google — המייל מנוהל דרך Google' : '🔒 Google account — email managed by Google'}
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>{lang === 'he' ? 'מייל לשחזור חשבון' : 'Recovery email'}</div>
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
            {profileMsg && (
              <div style={{ fontSize: 13, color: profileMsg.startsWith('✓') ? 'var(--accent)' : 'var(--expense)', fontWeight: 500 }}>
                {profileMsg}
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button onClick={() => setProfileOpen(false)} style={{ flex: 1, height: 44, background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 14, cursor: 'pointer', fontFamily: 'Heebo,sans-serif', color: 'var(--text2)' }}>
              {lang === 'he' ? 'ביטול' : 'Cancel'}
            </button>
            <button onClick={handleProfileSave} disabled={profileSaving} style={{ flex: 2, height: 44, background: 'var(--accent)', border: 'none', borderRadius: 'var(--radius)', fontSize: 15, fontWeight: 700, fontFamily: 'Heebo,sans-serif', color: '#fff', cursor: profileSaving ? 'wait' : 'pointer', opacity: profileSaving ? 0.7 : 1 }}>
              {profileSaving ? (lang === 'he' ? 'שומר...' : 'Saving...') : (lang === 'he' ? 'שמור שינויים' : 'Save changes')}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
