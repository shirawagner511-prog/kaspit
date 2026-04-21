export const CATEGORY_VALUES = [
  'housing','food','transport','kids','health','education',
  'clothing','dining','leisure','sport','telecom','travel',
  'shopping','insurance','pets','savings','income','other',
];

export function getDefaultCategories(t) {
  return CATEGORY_VALUES.map((value) => ({ value, label: t(`categories.${value}`) }));
}

export function getMonths(t) {
  return t('months', { returnObjects: true });
}

export const CATEGORIES = CATEGORY_VALUES;
