export function formatAmount(n) {
  const lang = localStorage.getItem('i18nextLng') || 'he';
  const locale = lang === 'he' ? 'he-IL' : 'en-US';
  return '₪' + Math.round(Math.abs(n)).toLocaleString(locale);
}

export function getMonthEntries(entries, month, year) {
  return entries.filter((e) => {
    if (!e.date) return false;
    const [y, m] = e.date.split('-').map(Number);
    return m - 1 === month && y === year;
  });
}
