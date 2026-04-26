import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase/config';

const FEATURES = ['feature1', 'feature2', 'feature3'];

export default function LoginScreen() {
  const { t, i18n } = useTranslation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isHe = i18n.language === 'he';

  function toggleLang() {
    const next = isHe ? 'en' : 'he';
    i18n.changeLanguage(next);
    localStorage.setItem('budgi-lang', next);
    document.documentElement.dir = next === 'he' ? 'rtl' : 'ltr';
  }

  async function handleLogin() {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user') {
        try {
          await signInWithRedirect(auth, googleProvider);
        } catch (e2) {
          setError(t('login.errorGeneric') + (e2.message || e2.code));
        }
      } else if (e.code === 'auth/unauthorized-domain') {
        setError(t('login.errorDomain'));
      } else {
        setError(t('login.errorGeneric') + (e.message || e.code));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-screen" dir={isHe ? 'rtl' : 'ltr'}>

      {/* Language toggle — top corner */}
      <button className="login-lang-btn" onClick={toggleLang}>
        {isHe ? 'EN' : 'עב'}
      </button>

      {/* Hero */}
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

      {/* CTA card */}
      <div className="login-card">
        <button className="google-btn" onClick={handleLogin} disabled={loading}>
          <svg className="google-logo" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {loading ? '...' : t('login.signIn')}
        </button>
        {error && <div className="login-error">{error}</div>}
        <div className="login-hint">{t('login.hint')}</div>
      </div>

      {/* Feature bullets */}
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
