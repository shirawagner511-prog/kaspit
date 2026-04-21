import { useState } from 'react';
import { createHousehold, joinHousehold } from '../../firebase/db';

export default function HouseholdSetup({ user, onComplete }) {
  const [step, setStep] = useState('choose'); // 'choose' | 'created' | 'join'
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
      setError('שגיאה ביצירת הבית: ' + e.message);
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
      setError(e.message || 'שגיאה בהצטרפות');
    } finally {
      setLoading(false);
    }
  }

  if (step === 'choose') {
    return (
      <div className="household-screen">
        <div style={{ fontSize: 48 }}>🏠</div>
        <h2>ברוכים הבאים ל-BUDGI</h2>
        <p>צרי בית משותף חדש או הצטרפי לבית קיים עם קוד ההזמנה של בן/בת הזוג</p>
        <div className="household-actions">
          <button className="btn-primary" onClick={handleCreate} disabled={loading}>
            {loading ? 'יוצרת...' : '✦ צרי בית חדש'}
          </button>
          <div className="divider">— או —</div>
          <button className="btn-secondary" onClick={() => setStep('join')}>
            הצטרפי לבית קיים
          </button>
        </div>
        {error && <div className="login-error">{error}</div>}
      </div>
    );
  }

  if (step === 'created') {
    return (
      <div className="household-screen">
        <div style={{ fontSize: 48 }}>🎉</div>
        <h2>הבית נוצר!</h2>
        <p>שלחי את קוד ההזמנה לבן/בת הזוג כדי שיצטרפו</p>
        <div className="invite-code-display">
          <p>קוד ההזמנה שלך</p>
          <div className="code">{inviteCode}</div>
          <p>הם יכנסו לאפליקציה ויבחרו "הצטרפי לבית קיים"</p>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text2)', textAlign: 'center' }}>
          הכניסה לאפליקציה תתחיל אוטומטית
        </p>
      </div>
    );
  }

  if (step === 'join') {
    return (
      <div className="household-screen">
        <div style={{ fontSize: 48 }}>🔑</div>
        <h2>הצטרפי לבית קיים</h2>
        <p>בקשי מבן/בת הזוג את קוד ההזמנה שלהם</p>
        <div className="join-form">
          <input
            className="form-input"
            placeholder="הכניסי קוד (לדוגמא: ABC123)"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            maxLength={6}
            style={{ textAlign: 'center', letterSpacing: 4, fontSize: 20 }}
          />
          {error && <div className="login-error">{error}</div>}
          <button className="btn-primary" onClick={handleJoin} disabled={loading || !joinCode.trim()}>
            {loading ? 'מצטרפת...' : 'הצטרפי'}
          </button>
          <button className="btn-secondary" onClick={() => { setStep('choose'); setError(''); }}>
            חזרה
          </button>
        </div>
      </div>
    );
  }
}
