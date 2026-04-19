import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { DEFAULT_CATEGORIES } from '../utils/constants';

export function useCategories(householdId) {
  const [customCategories, setCustomCategories] = useState([]);

  useEffect(() => {
    if (!householdId) return;
    const unsubscribe = onSnapshot(
      doc(db, 'households', householdId),
      (snap) => setCustomCategories(snap.data()?.customCategories || []),
      (err) => console.error('categories listener error:', err)
    );
    return unsubscribe;
  }, [householdId]);

  const allCategories = [
    ...DEFAULT_CATEGORIES,
    ...customCategories.filter((c) => !DEFAULT_CATEGORIES.some((d) => d.value === c.value)),
  ];

  return { allCategories, customCategories };
}
