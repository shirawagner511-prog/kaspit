export function formatAmount(n) {
  return '₪' + Math.round(Math.abs(n)).toLocaleString('he-IL');
}

export function getMonthEntries(entries, month, year) {
  return entries.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });
}
