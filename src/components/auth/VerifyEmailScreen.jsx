import { useState } from 'react';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useTranslation } from 'react-i18next';

export default function VerifyEmailScreen({ user }) {
  const { i18n } = useTranslation();
  const isHe = i18n.language === 'he';
  const [checking, setChecking] = useState(false);
  const [resent, setResent] = useState(false);
  const [error, setError] = useState('');

  async function handleCheck() {
    setChecking(true);
    try {
      await auth.currentUser.reload();
      if (!auth.currentUser.emailVerified) {
        setError(isHe ? 'האימייל עדיין לא אומת. בדקי את תיבת הדואר שלך.' : 'Email not yet verified. Check your inbox.');
      }
    } finally {
      setChecking(false);
    }
  }

  async function handleResend() {
    try {
      await sendEmailVerification(auth.currentUser);
      setResent(true);
    } catch {
      setError(isHe ? 'שגיאה בשליחה מחדש.' : 'Error resending.');
    }
  }

  return (
    <div className="login-screen" dir={isHe ? 'rtl' : 'ltr'}>
      <div className="login-hero">
        <div className="login-wordmark" dir="ltr">
          <span className="login-wordmark-b">B</span>
          <span className="login-wordmark-rest">udgi</span>
        </div>
      </div>
      <div className="login-card" style={{ textAlign: 'center', gap: 16 }}>
        <div style={{ fontSize: 40 }}>📧</div>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>
          {isHe ? 'אמתי את האימייל שלך' : 'Verify your email'}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.6 }}>
          {isHe
            ? `שלחנו קישור אימות ל-${user.email}. לחצי על הקישור ואז חזרי לכאן.`
            : `We sent a verification link to ${user.email}. Click it then come back here.`}
        </p>
        {error && <div style={{ fontSize: 13, color: 'var(--expense)' }}>{error}</div>}
        {resent && <div style={{ fontSize: 13, color: 'var(--accent)' }}>{isHe ? 'נשלח מחדש ✓' : 'Resent ✓'}</div>}
        <button className="btn-primary" onClick={handleCheck} disabled={checking} style={{ width: '100%' }}>
          {checking ? '...' : isHe ? 'אימתתי — כניסה' : "I've verified — continue"}
        </button>
        <button
          type="button"
          onClick={handleResend}
          style={{ background: 'none', border: 'none', color: 'var(--text3)', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isHe ? 'שלח מחדש' : 'Resend email'}
        </button>
        <button
          type="button"
          onClick={() => auth.signOut()}
          style={{ background: 'none', border: 'none', color: 'var(--text3)', fontSize: 12, cursor: 'pointer' }}
        >
          {isHe ? 'יציאה' : 'Sign out'}
        </button>
      </div>
    </div>
  );
}
