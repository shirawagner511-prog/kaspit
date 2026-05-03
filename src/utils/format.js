const CURRENCY_SYMBOLS = {
  ILS: '₪', USD: '$', EUR: '€', GBP: '£', JPY: '¥', CAD: '$',
  AUD: '$', CHF: 'Fr', CNY: '¥', INR: '₹', MXN: '$', BRL: 'R$',
  KRW: '₩', SGD: '$', HKD: '$', NOK: 'kr', SEK: 'kr', DKK: 'kr',
  PLN: 'zł', TRY: '₺', AED: 'د.إ',
};

export function formatAmount(n, currency) {
  const cur = currency || localStorage.getItem('budgi-currency') || 'ILS';
  const sym = CURRENCY_SYMBOLS[cur] || cur;
  const lang = localStorage.getItem('i18nextLng') || 'he';
  const locale = lang === 'he' ? 'he-IL' : 'en-US';
  return sym + Math.round(Math.abs(n)).toLocaleString(locale);
}

export { CURRENCY_SYMBOLS };

export function getCycleWindow(month, year, startDay = 1) {
  const start = `${year}-${String(month + 1).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`;
  const nextStart = new Date(year, month + 1, startDay);
  nextStart.setDate(nextStart.getDate() - 1);
  const end = nextStart.toISOString().slice(0, 10);
  return { start, end };
}

export function getMonthEntries(entries, month, year, cycleStartDay = 1) {
  if (cycleStartDay === 1) {
    return entries.filter((e) => {
      if (!e.date) return false;
      const [y, m] = e.date.split('-').map(Number);
      return m - 1 === month && y === year;
    });
  }
  const { start, end } = getCycleWindow(month, year, cycleStartDay);
  return entries.filter((e) => e.date >= start && e.date <= end);
}
