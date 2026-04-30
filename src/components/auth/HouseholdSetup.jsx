import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { createHousehold, joinHousehold } from '../../firebase/db';

function LangToggle() {
  const { i18n } = useTranslation();
  const isHe = i18n.language === 'he';
  function toggle() {
    const next = isHe ? 'en' : 'he';
    i18n.changeLanguage(next);
    localStorage.setItem('budgi-lang', next);
    document.body.dir = next === 'he' ? 'rtl' : 'ltr';
  }
  return (
    <button className="login-lang-btn" onClick={toggle}>
      {isHe ? 'EN' : 'עב'}
    </button>
  );
}

export default function HouseholdSetup({ user, onComplete }) {
  const { t } = useTranslation();
  const [step, setStep] = useState('choose');
  const [inviteCode, setInviteCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    setLoading(true);
    setError('');
    try {
      const { householdId, inviteCode: code } = await createHousehold(user);
      setInviteCode(code);
      setStep('created');
      onComplete(householdId);
    } catch (e) {
      setError(t('household.errorCreate') + e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleJoin() {
    if (!joinCode.trim()) return;
    setLoading(true);
    setError('');
    try {
      const householdId = await joinHousehold(user, joinCode);
      onComplete(householdId);
    } catch (e) {
      setError(e.message === 'REQUIRES_PREMIUM' ? t('household.errorJoinPremium') : (e.message || t('household.errorJoin')));
    } finally {
      setLoading(false);
    }
  }

  if (step === 'choose') {
    return (
      <div className="household-screen">
        <LangToggle />
        <div style={{ fontSize: 48 }}>🏠</div>
        <h2>{t('household.welcome')}</h2>
        <p>{t('household.chooseDesc')}</p>
        <div className="household-actions">
          <button className="btn-primary" onClick={handleCreate} disabled={loading}>
            {loading ? t('household.creating') : t('household.create')}
          </button>
          <div className="divider">{t('household.or')}</div>
          <button className="btn-secondary" onClick={() => setStep('join')}>
            {t('household.join')}
          </button>
        </div>
        {error && <div className="login-error">{error}</div>}
        <button
          onClick={() => signOut(auth)}
          style={{ marginTop: 24, background: 'none', border: 'none', color: 'var(--text3)', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}
        >
          {t('header.signOut')}
        </button>
      </div>
    );
  }

  if (step === 'created') {
    return (
      <div className="household-screen">
        <div style={{ fontSize: 48 }}>🎉</div>
        <h2>{t('household.created')}</h2>
        <p>{t('household.createdDesc')}</p>
        <div className="invite-code-display">
          <p>{t('household.inviteLabel')}</p>
          <div className="code">{inviteCode}</div>
          <p>{t('household.inviteHint')}</p>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text2)', textAlign: 'center' }}>
          {t('household.autoLogin')}
        </p>
      </div>
    );
  }

  if (step === 'join') {
    return (
      <div className="household-screen">
        <LangToggle />
        <div style={{ fontSize: 48 }}>🔑</div>
        <h2>{t('household.joinTitle')}</h2>
        <p>{t('household.joinDesc')}</p>
        <div className="join-form">
          <input
            className="form-input"
            placeholder={t('household.joinPlaceholder')}
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            maxLength={6}
            style={{ textAlign: 'center', letterSpacing: 4, fontSize: 20 }}
          />
          {error && <div className="login-error">{error}</div>}
          <button className="btn-primary" onClick={handleJoin} disabled={loading || !joinCode.trim()}>
            {loading ? t('household.joining') : t('household.joinBtn')}
          </button>
          <button className="btn-secondary" onClick={() => { setStep('choose'); setError(''); }}>
            {t('household.back')}
          </button>
        </div>
      </div>
    );
  }
}
