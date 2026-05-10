import { useState, useEffect } from 'react';

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showIOSHint, setShowIOSHint] = useState(false);
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem('budgi-install-dismissed') === '1'
  );

  useEffect(() => {
    if (isInStandaloneMode || dismissed) return;

    if (isIOS) {
      setShowIOSHint(true);
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [dismissed]);

  if (isInStandaloneMode || dismissed) return null;
  if (!deferredPrompt && !showIOSHint) return null;

  function dismiss() {
    localStorage.setItem('budgi-install-dismissed', '1');
    setDismissed(true);
    setDeferredPrompt(null);
    setShowIOSHint(false);
  }

  async function install() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') dismiss();
    else setDeferredPrompt(null);
  }

  return (
    <div style={{
      position: 'fixed', bottom: 72, insetInlineStart: 0, insetInlineEnd: 0,
      margin: '0 12px', zIndex: 500,
    }}>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '12px 16px',
        display: 'flex', alignItems: 'flex-start', gap: 12,
        boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
      }}>
        <img src="/Budgi/icon-192.png" alt="" style={{ width: 40, height: 40, borderRadius: 8, flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text1)', marginBottom: 2 }}>
            הוסיפי Budgi למסך הבית
          </div>
          {showIOSHint ? (
            <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>
              לחצי על <strong>שתף</strong> ואז <strong>הוסף למסך הבית</strong> ↑
            </div>
          ) : (
            <div style={{ fontSize: 12, color: 'var(--text2)' }}>
              גישה מהירה בלי דפדפן
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0, alignItems: 'center' }}>
          {!showIOSHint && (
            <button
              onClick={install}
              style={{
                background: 'var(--accent)', color: '#fff', border: 'none',
                borderRadius: 6, padding: '6px 12px', fontSize: 13,
                fontFamily: 'inherit', cursor: 'pointer', fontWeight: 500,
              }}
            >
              התקני
            </button>
          )}
          <button
            onClick={dismiss}
            style={{
              background: 'none', border: 'none', color: 'var(--text3)',
              cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 4,
            }}
            aria-label="סגור"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
