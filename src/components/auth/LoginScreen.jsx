import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  signInWithPopup, signInWithRedirect,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '../../firebase/config';
import { isUsernameTaken, registerUsername, getEmailByUsername } from '../../firebase/db';

const FEATURES = ['feature1', 'feature2', 'feature3'];
const USERNAME_RE = /^[a-zA-Z0-9_\u0590-\u05FF]{2,20}$/;
const EMAIL_RE    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function passwordStrength(pw) {
  let score = 0;
  if (pw.length >= 8)                      score++;
  if (pw.length >= 12)                     score++;
  if (/[A-Z]/.test(pw))                   score++;
  if (/[0-9]/.test(pw))                   score++;
  if (/[^a-zA-Z0-9\u0590-\u05FF]/.test(pw)) score++;
  return score; // 0-5
}

function StrengthBar({ password }) {
  const { t } = useTranslation();
  if (!password) return null;
  const s = passwordStrength(password);
  const labels = [
    t('login.strengthVeryWeak'),
    t('login.strengthWeak'),
    t('login.strengthFair'),
    t('login.strengthGood'),
    t('login.strengthStrong'),
  ];
  const colors = ['#c0392b', '#e67e22', '#f1c40f', '#27ae60', '#2D6A4F'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', gap: 3 }}>
        {[1,2,3,4,5].map((i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: s >= i ? colors[Math.min(s,5)-1] : 'var(--border)',
            transition: 'background 0.2s',
          }} />
        ))}
      </div>
      <div style={{ fontSize: 11, color: s >= 3 ? 'var(--text2)' : '#c0392b', textAlign: 'start' }}>
        {labels[Math.min(s, 4)]}
      </div>
    </div>
  );
}

function FieldError({ msg }) {
  if (!msg) return null;
  return <div style={{ fontSize: 11, color: '#c0392b', marginTop: -6, textAlign: 'start' }}>{msg}</div>;
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

export default function LoginScreen({ onNewUser }) {
  const { t, i18n } = useTranslation();
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState('');
  const [showManual, setShowManual] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const [username,    setUsername]    = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email,       setEmail]       = useState('');
  const [password,    setPassword]    = useState('');
  const [confirm,     setConfirm]     = useState('');

  // touched: only show errors after user leaves a field
  const [touched, setTouched] = useState({});
  const touch = (field) => setTouched((p) => ({ ...p, [field]: true }));

  const isHe = i18n.language === 'he';

  function toggleLang() {
    const next = isHe ? 'en' : 'he';
    i18n.changeLanguage(next);
    localStorage.setItem('budgi-lang', next);
    document.body.dir = next === 'he' ? 'rtl' : 'ltr';
  }

  // ── field-level errors ──────────────────────────────
  const errs = {
    username:    !USERNAME_RE.test(username.trim())    ? t('login.errorUsernameChars') : '',
    displayName: displayName.trim().length < 2         ? t('login.errorDisplayName')   : '',
    email:       !EMAIL_RE.test(email.trim())          ? t('login.errorEmailFormat')   : '',
    password:    passwordStrength(password) < 2        ? t('login.errorWeakPassword')  : '',
    confirm:     password !== confirm                  ? t('login.errorPasswordMatch') : '',
  };

  const formValid = isCreate
    ? !errs.username && !errs.displayName && !errs.email && !errs.password && !errs.confirm
    : !errs.username && password.length >= 1;

  async function handleGoogle() {
    setError(''); setLoading('google');
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user') {
        try { await signInWithRedirect(auth, googleProvider); } catch (e2) { setError(t('login.errorGeneric') + e2.message); }
      } else if (e.code === 'auth/unauthorized-domain') {
        setError(t('login.errorDomain'));
      } else {
        setError(t('login.errorGeneric') + e.message);
      }
    } finally { setLoading(''); }
  }

  async function handleManual(e) {
    e.preventDefault();
    // touch all fields to reveal errors
    const allFields = isCreate
      ? { username: true, displayName: true, email: true, password: true, confirm: true }
      : { username: true, password: true };
    setTouched(allFields);
    if (!formValid) return;

    setError(''); setLoading('manual');
    try {
      const uname = username.trim().toLowerCase();
      if (isCreate) {
        const taken = await isUsernameTaken(uname);
        if (taken) { setError(t('login.errorUsernameTaken')); return; }

        const firebaseEmail = `${uname}@budgi.internal`;
        const cred = await createUserWithEmailAndPassword(auth, firebaseEmail, password);
        await updateProfile(cred.user, { displayName: displayName.trim() });
        await registerUsername(uname, cred.user.uid);
        onNewUser?.();
      } else {
        const exists = await getEmailByUsername(uname);
        if (!exists) { setError(t('login.errorUsernameNotFound')); return; }
        const firebaseEmail = `${uname}@budgi.internal`;
        await signInWithEmailAndPassword(auth, firebaseEmail, password);
      }
    } catch (e) {
      if (e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') setError(t('login.errorWrongPassword'));
      else setError(t('login.errorGeneric') + e.message);
    } finally { setLoading(''); }
  }

  function openManual(create) {
    setIsCreate(create); setShowManual(true); setError('');
    setUsername(''); setDisplayName(''); setEmail(''); setPassword(''); setConfirm('');
    setTouched({});
  }

  return (
    <div className="login-screen" dir={isHe ? 'rtl' : 'ltr'}>

      <button className="login-lang-btn" onClick={toggleLang}>
        {isHe ? 'EN' : 'עב'}
      </button>

      <div className="login-hero">
        <svg width="72" height="56" viewBox="0 0 72 56" fill="none" style={{ marginBottom: 4 }}>
          <rect x="4" y="20" width="24" height="30" rx="4" fill="#F4EBD0" stroke="#D6C9A8" strokeWidth="1.2"/>
          <rect x="32" y="10" width="24" height="40" rx="4" fill="#F4EBD0" stroke="#D6C9A8" strokeWidth="1.2"/>
          <rect x="4" y="28" width="24" height="4" rx="2" fill="#2D6A4F" opacity="0.7"/>
          <rect x="32" y="18" width="24" height="4" rx="2" fill="#2D6A4F" opacity="0.9"/>
          <rect x="32" y="26" width="14" height="4" rx="2" fill="#2D6A4F" opacity="0.5"/>
          <circle cx="60" cy="14" r="10" fill="#2D6A4F" opacity="0.12"/>
          <path d="M54 14 L58 18 L66 10" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
        </svg>
        <div className="login-wordmark" dir="ltr">
          <span className="login-wordmark-b">B</span>
          <span className="login-wordmark-rest">udgi</span>
        </div>
        <div className="login-tagline">{t('login.tagline')}</div>
      </div>

      <div className="login-card">
        {!showManual ? (
          <>
            <button className="login-provider-btn" onClick={handleGoogle} disabled={!!loading}>
              <GoogleIcon /> {loading === 'google' ? '...' : t('login.signInGoogle')}
            </button>
            <div className="login-or"><span>{t('login.orDivider')}</span></div>
            <button className="login-provider-btn login-provider-manual" onClick={() => openManual(false)} disabled={!!loading}>
              {t('login.signInManual')}
            </button>
            <button className="login-provider-btn login-provider-create" onClick={() => openManual(true)} disabled={!!loading}>
              {t('login.createAccount')}
            </button>
          </>
        ) : (
          <form onSubmit={handleManual} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
            <div className="login-form-title">
              {isCreate ? t('login.createAccount') : t('login.signInManual')}
            </div>

            {/* Username */}
            <input
              className={`form-input${touched.username && errs.username ? ' input-error' : ''}`}
              placeholder={t('login.usernameLabel')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => touch('username')}
              autoFocus autoCapitalize="none" autoCorrect="off"
              dir="ltr"
            />
            {touched.username && <FieldError msg={errs.username} />}

            {isCreate && (
              <>
                {/* Display name */}
                <input
                  className={`form-input${touched.displayName && errs.displayName ? ' input-error' : ''}`}
                  placeholder={t('login.displayNamePlaceholder')}
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  onBlur={() => touch('displayName')}
                />
                {touched.displayName && <FieldError msg={errs.displayName} />}

                {/* Email */}
                <input
                  className={`form-input${touched.email && errs.email ? ' input-error' : ''}`}
                  type="email"
                  placeholder={t('login.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => touch('email')}
                  dir="ltr"
                />
                {touched.email && <FieldError msg={errs.email} />}
              </>
            )}

            {/* Password */}
            <div style={{ position: 'relative' }}>
              <input
                className={`form-input${touched.password && errs.password ? ' input-error' : ''}`}
                type={showPw ? 'text' : 'password'}
                placeholder={t('login.passwordLabel')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => touch('password')}
                dir="ltr"
                style={{ paddingInlineEnd: 44 }}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', fontSize: 13, padding: 4 }}
                tabIndex={-1}
              >
                {showPw ? '🙈' : '👁'}
              </button>
            </div>
            {isCreate && <StrengthBar password={password} />}
            {touched.password && !isCreate && <FieldError msg={errs.password} />}

            {isCreate && (
              <>
                <div style={{ position: 'relative' }}>
                  <input
                    className={`form-input${touched.confirm && errs.confirm ? ' input-error' : ''}`}
                    type={showPw ? 'text' : 'password'}
                    placeholder={t('login.passwordConfirmLabel')}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    onBlur={() => touch('confirm')}
                    dir="ltr"
                    style={{ paddingInlineEnd: 44 }}
                  />
                </div>
                {touched.confirm && <FieldError msg={errs.confirm} />}
              </>
            )}

            <button
              className="login-provider-btn login-provider-manual"
              type="submit"
              disabled={!!loading}
              style={{ marginTop: 6 }}
            >
              {loading === 'manual' ? '...' : isCreate ? t('login.createAccount') : t('login.signInBtn')}
            </button>

            <button type="button" className="login-switch-link" onClick={() => openManual(!isCreate)}>
              {isCreate ? t('login.switchToSignIn') : t('login.switchToCreate')}
            </button>
            <button type="button" className="login-switch-link" onClick={() => { setShowManual(false); setError(''); }}>
              ← {t('login.backToOptions')}
            </button>
          </form>
        )}

        {error && <div className="login-error">{error}</div>}
        <div className="login-hint">{t('login.hint')}</div>
      </div>

      {!showManual && (
        <div className="login-features">
          {FEATURES.map((key) => (
            <div key={key} className="login-feature-row">
              <span className="login-feature-check">✓</span>
              <span>{t(`login.${key}`)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="login-footer">{t('login.footer')}</div>
    </div>
  );
}
