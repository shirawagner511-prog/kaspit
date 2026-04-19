export const MONTHS_HE = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר',
];

export const DEFAULT_CATEGORIES = [
  { value: 'housing',   label: 'דיור',       icon: '🏠' },
  { value: 'food',      label: 'מזון וסופר', icon: '🛒' },
  { value: 'transport', label: 'תחבורה',     icon: '🚗' },
  { value: 'kids',      label: 'ילדים',      icon: '👶' },
  { value: 'health',    label: 'בריאות',     icon: '💊' },
  { value: 'education', label: 'חינוך',      icon: '📚' },
  { value: 'clothing',  label: 'ביגוד',      icon: '👗' },
  { value: 'dining',    label: 'מסעדות',     icon: '🍽️' },
  { value: 'leisure',   label: 'פנאי ובילויים', icon: '🎉' },
  { value: 'sport',     label: 'ספורט',      icon: '🏋️' },
  { value: 'telecom',   label: 'תקשורת',     icon: '📱' },
  { value: 'travel',    label: 'נסיעות',     icon: '✈️' },
  { value: 'shopping',  label: 'קניות',      icon: '🛍️' },
  { value: 'insurance', label: 'ביטוח',      icon: '🛡️' },
  { value: 'pets',      label: 'חיות מחמד',  icon: '🐾' },
  { value: 'savings',   label: 'חיסכון',     icon: '💰' },
  { value: 'income',    label: 'הכנסה',      icon: '💳' },
  { value: 'other',     label: 'אחר',        icon: '📦' },
];

export const CAT_ICONS = Object.fromEntries(DEFAULT_CATEGORIES.map((c) => [c.value, c.icon]));
export const CAT_NAMES = Object.fromEntries(DEFAULT_CATEGORIES.map((c) => [c.value, c.label]));
export const CATEGORIES = DEFAULT_CATEGORIES.map((c) => c.value);
