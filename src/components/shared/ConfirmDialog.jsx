export default function ConfirmDialog({ open, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="modal-overlay open" onClick={onCancel}>
      <div className="modal" style={{ maxWidth: 320 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">אישור</div>
        <p style={{ textAlign: 'center', color: 'var(--text2)', margin: '12px 0 24px' }}>{message}</p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="submit-btn" style={{ background: 'var(--danger)' }} onClick={onConfirm}>מחיקה</button>
          <button className="submit-btn" style={{ background: 'var(--surface3)' }} onClick={onCancel}>ביטול</button>
        </div>
      </div>
    </div>
  );
}
