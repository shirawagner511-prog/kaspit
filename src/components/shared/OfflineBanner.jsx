import { useState, useEffect } from 'react';

export default function OfflineBanner() {
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);

  if (!offline) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, insetInlineStart: 0, insetInlineEnd: 0,
      background: '#92400e', color: '#fff',
      fontSize: 13, textAlign: 'center', padding: '8px 16px',
      zIndex: 9000, fontFamily: 'inherit',
    }}>
      אין חיבור לאינטרנט — מציג נתונים שמורים
    </div>
  );
}
