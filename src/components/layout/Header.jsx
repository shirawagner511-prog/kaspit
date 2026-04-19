import { useState, useRef, useEffect } from 'react';
import { signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase/config';
import { MONTHS_HE } from '../../utils/constants';

function buildMonthOptions() {
  const options = [];
  const now = new Date();
  const startYear = now.getFullYear() - 3;
  const endYear = now.getFullYear() + 1;
  for (let y = endYear; y >= startYear; y--) {
    const mEnd = y === endYear ? now.getMonth() + 1 : 11;
    for (let m = mEnd; m >= 0; m--) {
      options.push({ month: m, year: y, label: `${MONTHS_HE[m]} ${y}` });
    }
  }
  return options;
}

const MONTH_OPTIONS = buildMonthOptions();

export default function Header({ user, currentMonth, currentYear, onMonthChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
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
      <div className="app-logo">כספית ✦</div>
      <div className="header-right">
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
              background: 'var(--surface2)', border: '1px solid var(--border)',
              borderRadius: 12, minWidth: 160, zIndex: 300,
              boxShadow: '0 8px 24px rgba(0,0,0,.4)', overflow: 'hidden',
            }}>
              <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{user?.displayName}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{user?.email}</div>
              </div>
              <button
                onClick={handleSwitchUser}
                style={{
                  width: '100%', padding: '12px 14px', background: 'none',
                  border: 'none', borderBottom: '1px solid var(--border)',
                  color: 'var(--text2)', fontSize: 14,
                  fontWeight: 600, cursor: 'pointer', textAlign: 'right',
                  fontFamily: 'Heebo,sans-serif', display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                <span>🔄</span> החלף משתמש
              </button>
              <button
                onClick={() => { setMenuOpen(false); signOut(auth); }}
                style={{
                  width: '100%', padding: '12px 14px', background: 'none',
                  border: 'none', color: 'var(--danger)', fontSize: 14,
                  fontWeight: 600, cursor: 'pointer', textAlign: 'right',
                  fontFamily: 'Heebo,sans-serif', display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                <span>🚪</span> יציאה מהחשבון
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
