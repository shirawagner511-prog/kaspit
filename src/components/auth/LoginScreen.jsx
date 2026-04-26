import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  signInWithPopup, signInWithRedirect,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, googleProvider, appleProvider } from '../../firebase/config';

const FEATURES = ['feature1', 'feature2', 'feature3'];

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

function AppleIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 814 1000" style={{ flexShrink: 0 }}>
      <path fill="currentColor" d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.8 0 663.3 0 541.3c0-207.8 135.4-317.7 268.3-317.7 99.5 0 163.2 52.6 220.9 52.6 55.4 0 132.7-55.7 242.1-55.7 38.8 0 144.1 3.6 215.7 120.4zm-257.4-152.2c28.2-36.3 48.3-86.5 48.3-136.7 0-7-.6-14.1-1.9-19.8-45.9 1.7-101.1 30.6-134.4 72.3-26.1 31.8-49.5 82-49.5 133s.6 13.5 1.3 18.8c3.2.6 8.4 1.3 13.6 1.3 40.8 0 90.9-27.1 122.6-69.3z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

export default function LoginScreen() {
  const { t, i18n } = useTranslation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
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

  async function withProvider(provider, key) {
    setError(''); setLoading(key);
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user') {
        try { await signInWithRedirect(auth, provider); } catch (e2) { setError(t('login.errorGeneric') + e2.message); }
      } else if (e.code === 'auth/unauthorized-domain') {
        setError(t('login.errorDomain'));
      } else {
        setError(t('login.errorGeneric') + e.message);
      }
    } finally { setLoading(''); }
  }

  async function handleEmail(e) {
    e.preventDefault();
    setError('');
    if (!email || !password) return;
    if (isCreate && password !== confirm) { setError(t('login.errorPasswordMatch')); return; }
    if (isCreate && password.length < 6) { setError(t('login.errorWeakPassword')); return; }
    setLoading('email');
    try {
      if (isCreate) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') setError(t('login.errorEmailInUse'));
      else if (e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') setError(t('login.errorWrongPassword'));
      else if (e.code === 'auth/user-not-found') setError(t('login.errorUserNotFound'));
      else setError(t('login.errorGeneric') + e.message);
    } finally { setLoading(''); }
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
        {!showEmail ? (
          <>
            <button className="login-provider-btn" onClick={() => withProvider(googleProvider, 'google')} disabled={!!loading}>
              <GoogleIcon /> {loading === 'google' ? '...' : t('login.signInGoogle')}
            </button>
            <button className="login-provider-btn login-provider-apple" onClick={() => withProvider(appleProvider, 'apple')} disabled={!!loading}>
              <AppleIcon /> {loading === 'apple' ? '...' : t('login.signInApple')}
            </button>
            <div className="login-or"><span>{t('login.orDivider')}</span></div>
            <button className="login-provider-btn login-provider-email" onClick={() => setShowEmail(true)} disabled={!!loading}>
              <MailIcon /> {t('login.signInEmail')}
            </button>
          </>
        ) : (
          <form onSubmit={handleEmail} style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
            <input
              className="form-input"
              type="email"
              placeholder={t('login.emailLabel')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              required
              dir="ltr"
            />
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
            <button className="login-provider-btn login-provider-email" type="submit" disabled={!!loading} style={{ marginTop: 4 }}>
              {loading === 'email' ? '...' : isCreate ? t('login.createAccount') : t('login.signInBtn')}
            </button>
            <button type="button" className="login-switch-link" onClick={() => { setIsCreate(!isCreate); setError(''); setConfirm(''); }}>
              {isCreate ? t('login.switchToSignIn') : t('login.switchToCreate')}
            </button>
            <button type="button" className="login-switch-link" onClick={() => { setShowEmail(false); setError(''); }}>
              ← {t('login.orDivider')}
            </button>
          </form>
        )}

        {error && <div className="login-error">{error}</div>}
        <div className="login-hint">{t('login.hint')}</div>
      </div>

      <div className="login-features">
        {FEATURES.map((key) => (
          <div key={key} className="login-feature-row">
            <span className="login-feature-check">✓</span>
            <span>{t(`login.${key}`)}</span>
          </div>
        ))}
      </div>

      <div className="login-footer">{t('login.footer')}</div>
    </div>
  );
}
