import { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { savePendingWhatsappPhone, disconnectWhatsapp } from '../../firebase/db';

const BOT_NUMBER = '+1 415 523 8886';
const BOT_NUMBER_PLAIN = '+14155238886';

export default function BudgiBot({ user }) {
  const [botConnected, setBotConnected] = useState('');
  const [botPending, setBotPending] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;
    return onSnapshot(doc(db, 'users', user.uid), (snap) => {
      const d = snap.data() || {};
      setBotConnected(d.whatsappNumber || '');
      setBotPending(d.pendingWhatsappPhone || '');
    });
  }, [user?.uid]);

  async function handleConnect() {
    const phone = phoneInput.trim();
    if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
      setPhoneError('המספר חייב להתחיל ב-+ ולכלול קידומת מדינה, למשל +972501234567');
      return;
    }
    setPhoneError('');
    setSaving(true);
    try {
      await savePendingWhatsappPhone(user.uid, phone);
    } finally { setSaving(false); }
  }

  async function handleDisconnect() {
    setSaving(true);
    try {
      await disconnectWhatsapp(user.uid);
      setPhoneInput('');
    } finally { setSaving(false); }
  }

  return (
    <div className="page" style={{ maxWidth: 480, margin: '0 auto' }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '32px 0 24px' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#dcfce7', border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 16px' }}>
          🤖
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'DM Sans,Heebo,sans-serif', color: 'var(--text)', marginBottom: 6 }}>
          Budgi Bot
        </div>
        <div style={{ fontSize: 14, color: 'var(--text3)', lineHeight: 1.6 }}>
          שלח הוצאות בוואטסאפ — הן יירשמו אוטומטית
        </div>
      </div>

      {/* State card */}
      {botConnected ? (
        <div style={{ background: 'var(--surface)', border: '1.5px solid var(--accent)', borderRadius: 14, padding: '20px 20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>✅</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)' }}>מחובר</div>
              <div style={{ fontFamily: 'DM Mono,monospace', fontSize: 13, color: 'var(--text3)', direction: 'ltr' }}>
                {botConnected.slice(0, 4) + '•••••' + botConnected.slice(-3)}
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--surface2)', borderRadius: 10, padding: '12px 14px', marginBottom: 16, fontSize: 13, color: 'var(--text2)', lineHeight: 1.9 }}>
            <div>שלח ל-<span style={{ fontFamily: 'DM Mono,monospace', direction: 'ltr', display: 'inline-block' }}>{BOT_NUMBER}</span>:</div>
            <div>• <span style={{ color: 'var(--accent)', fontWeight: 600 }}>"קפה 18"</span></div>
            <div>• <span style={{ color: 'var(--accent)', fontWeight: 600 }}>"סופר 340 שקל"</span></div>
            <div>• 📸 תמונת קבלה</div>
          </div>

          <button onClick={handleDisconnect} disabled={saving} style={{ width: '100%', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '11px 0', fontSize: 14, fontFamily: 'Heebo,sans-serif', color: 'var(--expense)', fontWeight: 600, cursor: 'pointer' }}>
            {saving ? '...' : 'ניתוק'}
          </button>
        </div>

      ) : botPending ? (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ fontSize: 32 }}>⏳</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>ממתין לאישור</div>
              <div style={{ fontSize: 12, color: 'var(--text3)' }}>הבוט יתחבר ברגע שתשלח לו הודעה</div>
            </div>
          </div>

          <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px', marginBottom: 16, fontSize: 13, lineHeight: 2 }}>
            <div style={{ fontWeight: 700, marginBottom: 2 }}>שלוש שניות לחיבור:</div>
            <div>1. שמור את המספר הזה בוואטסאפ:<br/>
              <span style={{ fontFamily: 'DM Mono,monospace', color: 'var(--accent)', fontWeight: 700, fontSize: 15, direction: 'ltr', display: 'inline-block' }}>{BOT_NUMBER}</span>
            </div>
            <div>2. שלח לו: <span style={{ fontFamily: 'DM Mono,monospace', color: 'var(--accent)', fontWeight: 700 }}>join method-strike</span></div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>פעם אחת בלבד — פותח את הצ׳אט</div>
          </div>

          <a
            href={`https://wa.me/${BOT_NUMBER_PLAIN}?text=join%20method-strike`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', width: '100%', background: '#25D366', border: 'none', borderRadius: 8, padding: '12px 0', fontSize: 14, fontFamily: 'Heebo,sans-serif', color: '#fff', fontWeight: 700, cursor: 'pointer', textAlign: 'center', textDecoration: 'none', marginBottom: 10, boxSizing: 'border-box' }}
          >
            פתח בוואטסאפ ←
          </a>

          <button onClick={handleDisconnect} disabled={saving} style={{ width: '100%', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '11px 0', fontSize: 14, fontFamily: 'Heebo,sans-serif', color: 'var(--text2)', cursor: 'pointer' }}>
            {saving ? '...' : 'ביטול'}
          </button>
        </div>

      ) : (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 20px 16px' }}>
          <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 16, lineHeight: 1.7 }}>
            הזן את מספר הוואטסאפ שלך כדי להתחיל
          </div>

          <div className="form-group">
            <label className="form-label">מספר וואטסאפ</label>
            <input
              className="form-input"
              dir="ltr"
              placeholder="+972501234567"
              value={phoneInput}
              onChange={(e) => { setPhoneInput(e.target.value); setPhoneError(''); }}
              type="tel"
            />
            {phoneError
              ? <div style={{ fontSize: 11, color: 'var(--expense)', marginTop: 4 }}>{phoneError}</div>
              : <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>כולל קידומת מדינה, למשל +972501234567</div>
            }
          </div>

          <button className="submit-btn" onClick={handleConnect} disabled={saving || !phoneInput.trim()} style={{ margin: 0, width: '100%' }}>
            {saving ? 'שומר...' : 'חבר ל-WhatsApp'}
          </button>
        </div>
      )}

      {/* How it works */}
      {!botConnected && (
        <div style={{ marginTop: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>איך זה עובד</div>
          {[
            { n: '1', text: 'הזן את המספר שלך ולחץ "חבר"' },
            { n: '2', text: 'שלח "join method-strike" לבוט בוואטסאפ' },
            { n: '3', text: 'שלח הוצאות כמו "קפה 18" או צלם קבלה 📸' },
          ].map(({ n, text }) => (
            <div key={n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--accent)', flexShrink: 0 }}>{n}</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, paddingTop: 3 }}>{text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
