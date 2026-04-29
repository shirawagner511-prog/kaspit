import { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase/config';
import { getMonths } from '../../utils/constants';
import { RefreshCw, LogOut, Languages } from 'lucide-react';

export default function Header({ user, currentMonth, currentYear, onMonthChange, isPremium, subStatus, trialDaysLeft, onNavigate }) {
  const { t, i18n } = useTranslation();
  function toggleLang() {
    const next = i18n.language === 'he' ? 'en' : 'he';
    i18n.changeLanguage(next);
    localStorage.setItem('budgi-lang', next);
  }
  const [menuOpen, setMenuOpen] = useState(false);
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
    <div className="app-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div className="app-logo" dir="ltr" style={{ gap: 0 }}>
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
  );
}
