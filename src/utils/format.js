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

export function getMonthEntries(entries, month, year) {
  return entries.filter((e) => {
    if (!e.date) return false;
    const [y, m] = e.date.split('-').map(Number);
    return m - 1 === month && y === year;
  });
}
