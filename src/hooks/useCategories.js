import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { CATEGORY_VALUES } from '../utils/constants';

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

  return { customCategories };
}
