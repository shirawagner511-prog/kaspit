import { useTranslation } from 'react-i18next';

export default function ConfirmDialog({ open, message, onConfirm, onCancel }) {
  const { t } = useTranslation();
  if (!open) return null;
  return (
    <div
      onClick={onCancel}
      style={{
        position: 'fixed', inset: 0, zIndex: 400,
        background: 'rgba(28,25,23,0.55)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0 16px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--surface)', borderRadius: 16, padding: '28px 24px 24px',
          width: '100%', maxWidth: 360, boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>{t('misc.confirmDelete')}</p>
        <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 24 }}>{message}</p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: '12px 0', borderRadius: 10, border: '1px solid var(--border)',
              background: 'var(--surface)', color: 'var(--text2)', fontSize: 15,
              fontFamily: 'DM Sans,Heebo,sans-serif', cursor: 'pointer', fontWeight: 500,
            }}
          >
            {t('misc.no')}
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1, padding: '12px 0', borderRadius: 10, border: 'none',
              background: 'var(--expense)', color: '#fff', fontSize: 15,
              fontFamily: 'DM Sans,Heebo,sans-serif', cursor: 'pointer', fontWeight: 600,
            }}
          >
            {t('misc.yes')}
          </button>
        </div>
      </div>
    </div>
  );
}
