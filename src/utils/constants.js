export const MONTHS_HE = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר',
];

export const DEFAULT_CATEGORIES = [
  { value: 'housing',   label: 'דיור' },
  { value: 'food',      label: 'מזון וסופר' },
  { value: 'transport', label: 'תחבורה' },
  { value: 'kids',      label: 'ילדים' },
  { value: 'health',    label: 'בריאות' },
  { value: 'education', label: 'חינוך' },
  { value: 'clothing',  label: 'ביגוד' },
  { value: 'dining',    label: 'מסעדות' },
  { value: 'leisure',   label: 'פנאי ובילויים' },
  { value: 'sport',     label: 'ספורט' },
  { value: 'telecom',   label: 'תקשורת' },
  { value: 'travel',    label: 'נסיעות' },
  { value: 'shopping',  label: 'קניות' },
  { value: 'insurance', label: 'ביטוח' },
  { value: 'pets',      label: 'חיות מחמד' },
  { value: 'savings',   label: 'חיסכון' },
  { value: 'income',    label: 'הכנסה' },
  { value: 'other',     label: 'אחר' },
];

export const CAT_ICONS = Object.fromEntries(DEFAULT_CATEGORIES.map((c) => [c.value, c.icon]));
export const CAT_NAMES = Object.fromEntries(DEFAULT_CATEGORIES.map((c) => [c.value, c.label]));
export const CATEGORIES = DEFAULT_CATEGORIES.map((c) => c.value);
