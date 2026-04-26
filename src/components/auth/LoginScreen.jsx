import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase/config';
import { isUsernameTaken, registerUsername, getEmailByUsername } from '../../firebase/db';

const FEATURES = ['feature1', 'feature2', 'feature3'];
const USERNAME_RE = /^[a-zA-Z0-9_\u0590-\u05FF]{2,20}$/;

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

export default function LoginScreen() {
  const { t, i18n } = useTranslation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [showManual, setShowManual] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  // form fields
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const isHe = i18n.language === 'he';

  function toggleLang() {
    const next = isHe ? 'en' : 'he';
    i18n.changeLanguage(next);
    localStorage.setItem('budgi-lang', next);
    document.documentElement.dir = next === 'he' ? 'rtl' : 'ltr';
  }

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
    setError('');
    const uname = username.trim();

    if (!USERNAME_RE.test(uname)) { setError(t('login.errorUsernameChars')); return; }
    if (!password) return;

    setLoading('manual');
    try {
      if (isCreate) {
        if (password !== confirm) { setError(t('login.errorPasswordMatch')); return; }
        if (password.length < 6) { setError(t('login.errorWeakPassword')); return; }
        if (!email.trim()) { setError(t('login.errorGeneric') + 'Email required'); return; }

        const taken = await isUsernameTaken(uname);
        if (taken) { setError(t('login.errorUsernameTaken')); return; }

        // use username@budgi.internal as the firebase email so it's unique
        const firebaseEmail = `${uname.toLowerCase()}@budgi.internal`;
        const cred = await createUserWithEmailAndPassword(auth, firebaseEmail, password);
        await updateProfile(cred.user, { displayName: displayName.trim() || uname });
        await registerUsername(uname, email.trim(), cred.user.uid);
      } else {
        const foundEmail = await getEmailByUsername(uname);
        if (!foundEmail) { setError(t('login.errorUsernameNotFound')); return; }
        await signInWithEmailAndPassword(auth, foundEmail, password);
      }
    } catch (e) {
      if (e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') setError(t('login.errorWrongPassword'));
      else setError(t('login.errorGeneric') + e.message);
    } finally { setLoading(''); }
  }

  function openManual(create) {
    setIsCreate(create);
    setShowManual(true);
    setError('');
    setUsername(''); setDisplayName(''); setEmail(''); setPassword(''); setConfirm('');
  }

  return (
    <div className="login-screen" dir={isHe ? 'rtl' : 'ltr'}>

      <button className="login-lang-btn" onClick={toggleLang}>
        {isHe ? 'EN' : 'עב'}
      </button>

      <div className="login-hero">
        <div className="login-wordmark" dir="ltr">
          <span className="login-wordmark-b">B</span>
          <span className="login-wordmark-rest">udgi</span>
        </div>
        <div className="login-tagline">
          {t('login.tagline').split('\n').map((line, i) => (
            <span key={i}>{line}{i === 0 && <br />}</span>
          ))}
        </div>
        <div className="login-tagline-sub">{t('login.taglineSub')}</div>
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
          <form onSubmit={handleManual} style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
            <div className="login-form-title">
              {isCreate ? t('login.createAccount') : t('login.signInManual')}
            </div>

            <input
              className="form-input"
              placeholder={t('login.usernameLabel')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              autoCapitalize="none"
              autoCorrect="off"
              required
              dir="ltr"
            />

            {isCreate && (
              <>
                <input
                  className="form-input"
                  placeholder={t('login.displayNamePlaceholder')}
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                <input
                  className="form-input"
                  type="email"
                  placeholder={t('login.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  dir="ltr"
                />
              </>
            )}

            <input
              className="form-input"
              type="password"
              placeholder={t('login.passwordLabel')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              dir="ltr"
            />

            {isCreate && (
              <input
                className="form-input"
                type="password"
                placeholder={t('login.passwordConfirmLabel')}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                dir="ltr"
              />
            )}

            {isCreate && (
              <div className="login-email-note">
                🔒 {t('login.emailPlaceholder')}
              </div>
            )}

            <button className="login-provider-btn login-provider-manual" type="submit" disabled={!!loading} style={{ marginTop: 4 }}>
              {loading === 'manual' ? '...' : isCreate ? t('login.createAccount') : t('login.signInBtn')}
            </button>

            <button type="button" className="login-switch-link" onClick={() => openManual(!isCreate)}>
              {isCreate ? t('login.switchToSignIn') : t('login.switchToCreate')}
            </button>
            <button type="button" className="login-switch-link" onClick={() => { setShowManual(false); setError(''); }}>
              ← {t('login.signInGoogle')}
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
