import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CURRENCIES = [
  { code: 'ILS', symbol: '₪', flag: '🇮🇱', name: 'שקל ישראלי', nameEn: 'Israeli Shekel' },
  { code: 'USD', symbol: '$',  flag: '🇺🇸', name: 'דולר אמריקאי', nameEn: 'US Dollar' },
  { code: 'EUR', symbol: '€',  flag: '🇪🇺', name: 'אירו', nameEn: 'Euro' },
  { code: 'GBP', symbol: '£',  flag: '🇬🇧', name: 'לירה שטרלינג', nameEn: 'British Pound' },
  { code: 'JPY', symbol: '¥',  flag: '🇯🇵', name: 'ין יפני', nameEn: 'Japanese Yen' },
  { code: 'CAD', symbol: '$',  flag: '🇨🇦', name: 'דולר קנדי', nameEn: 'Canadian Dollar' },
  { code: 'AUD', symbol: '$',  flag: '🇦🇺', name: 'דולר אוסטרלי', nameEn: 'Australian Dollar' },
  { code: 'CHF', symbol: 'Fr', flag: '🇨🇭', name: 'פרנק שוויצרי', nameEn: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥',  flag: '🇨🇳', name: 'יואן סיני', nameEn: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹',  flag: '🇮🇳', name: 'רופי הודי', nameEn: 'Indian Rupee' },
  { code: 'MXN', symbol: '$',  flag: '🇲🇽', name: 'פסו מקסיקני', nameEn: 'Mexican Peso' },
  { code: 'BRL', symbol: 'R$', flag: '🇧🇷', name: 'ריאל ברזילאי', nameEn: 'Brazilian Real' },
  { code: 'KRW', symbol: '₩',  flag: '🇰🇷', name: 'וון קוריאני', nameEn: 'Korean Won' },
  { code: 'SGD', symbol: '$',  flag: '🇸🇬', name: 'דולר סינגפורי', nameEn: 'Singapore Dollar' },
  { code: 'HKD', symbol: '$',  flag: '🇭🇰', name: 'דולר הונג קונג', nameEn: 'Hong Kong Dollar' },
  { code: 'NOK', symbol: 'kr', flag: '🇳🇴', name: 'כתר נורווגי', nameEn: 'Norwegian Krone' },
  { code: 'SEK', symbol: 'kr', flag: '🇸🇪', name: 'כתר שוודי', nameEn: 'Swedish Krona' },
  { code: 'DKK', symbol: 'kr', flag: '🇩🇰', name: 'כתר דני', nameEn: 'Danish Krone' },
  { code: 'PLN', symbol: 'zł', flag: '🇵🇱', name: 'זלוטי פולני', nameEn: 'Polish Złoty' },
  { code: 'TRY', symbol: '₺',  flag: '🇹🇷', name: 'לירה טורקית', nameEn: 'Turkish Lira' },
  { code: 'AED', symbol: 'د.إ',flag: '🇦🇪', name: 'דירהם אמירתי', nameEn: 'UAE Dirham' },
];

export default function CurrencyPicker({ onSelect }) {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('ILS');
  const isHe = i18n.language === 'he';

  const filtered = CURRENCIES.filter((c) => {
    const q = query.toLowerCase();
    return (
      c.code.toLowerCase().includes(q) ||
      c.nameEn.toLowerCase().includes(q) ||
      c.name.includes(q) ||
      c.symbol.includes(q)
    );
  });

  return (
    <div className="currency-picker-screen">
      <div className="currency-picker-card">
        <div className="currency-picker-header">
          <h2>{t('currency.title')}</h2>
          <p>{t('currency.sub')}</p>
        </div>

        <input
          className="form-input currency-search"
          placeholder={t('currency.search')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          dir="auto"
        />

        <div className="currency-list">
          {filtered.map((c) => (
            <button
              key={c.code}
              className={`currency-item${selected === c.code ? ' selected' : ''}`}
              onClick={() => setSelected(c.code)}
            >
              <span className="currency-flag">{c.flag}</span>
              <span className="currency-name">{isHe ? c.name : c.nameEn}</span>
              <span className="currency-code" dir="ltr">{c.symbol} {c.code}</span>
            </button>
          ))}
        </div>

        <div className="currency-actions">
          <button className="btn-primary" onClick={() => onSelect(selected)}>
            {t('currency.confirm')}
          </button>
          <button className="btn-secondary" onClick={() => onSelect('ILS')}>
            {t('currency.skip')}
          </button>
        </div>
      </div>
    </div>
  );
}
