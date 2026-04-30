import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function WelcomeScreen({ onContinue }) {
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(onContinue, 2500);
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="welcome-screen" onClick={onContinue}>
      <div className="welcome-content">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="welcome-check">
          <circle cx="40" cy="40" r="38" stroke="#2D6A4F" strokeWidth="3" fill="#F4EBD0" />
          <path d="M22 40L34 52L58 28" stroke="#2D6A4F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="welcome-wordmark" dir="ltr">
          <span style={{ fontWeight: 700, color: 'var(--accent)' }}>B</span>
          <span style={{ color: 'var(--text1)' }}>udgi</span>
        </div>
        <h1 className="welcome-headline">{t('welcome.headline')}</h1>
        <p className="welcome-sub">{t('welcome.sub')}</p>
        <button className="welcome-btn" onClick={(e) => { e.stopPropagation(); onContinue(); }}>
          {t('welcome.continue')}
        </button>
        <p className="welcome-hint">לחצו בכל מקום להמשך</p>
      </div>
    </div>
  );
}
