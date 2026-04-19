import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { MONTHS_HE } from '../../utils/constants';

export default function Header({ user, currentMonth, currentYear, onMonthChange }) {
  function handleMonthPick() {
    const dir = confirm('אישור = חודש קודם | ביטול = חודש הבא');
    let m = currentMonth, y = currentYear;
    if (dir) {
      m--;
      if (m < 0) { m = 11; y--; }
    } else {
      m++;
      if (m > 11) { m = 0; y++; }
    }
    onMonthChange(m, y);
  }

  return (
    <div className="app-header">
      <div className="app-logo">כספית ✦</div>
      <div className="header-right">
        <button className="month-selector" onClick={handleMonthPick}>
          {MONTHS_HE[currentMonth]} {currentYear} ▾
        </button>
        <button
          className="avatar"
          onClick={() => signOut(auth)}
          title="יציאה"
        >
          {user?.displayName?.charAt(0) || '?'}
        </button>
      </div>
    </div>
  );
}
