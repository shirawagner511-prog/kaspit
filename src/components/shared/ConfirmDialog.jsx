export default function ConfirmDialog({ open, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="modal-overlay open" style={{ zIndex: 400 }} onClick={onCancel}>
      <div className="modal" style={{ maxWidth: 320 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">אישור</div>
        <div className="modal-body" style={{ paddingBottom: 8 }}>
          <p style={{ textAlign: 'center', color: 'var(--text2)', margin: '8px 0' }}>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="submit-btn" style={{ background: 'var(--danger)', flex: 1 }} onClick={onConfirm}>מחיקה</button>
          <button className="submit-btn" style={{ background: 'var(--surface3)', flex: 1 }} onClick={onCancel}>ביטול</button>
        </div>
      </div>
    </div>
  );
}
