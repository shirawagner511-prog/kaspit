import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export function useHousehold(householdId) {
  const [budgets, setBudgets] = useState({});
  const [savingsGoal, setSavingsGoal] = useState(null);
  const [customCategories, setCustomCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (!householdId) return;
    const unsubscribe = onSnapshot(
      doc(db, 'households', householdId),
      (snap) => {
        const data = snap.data() || {};
        setBudgets(data.budgets || {});
        setSavingsGoal(data.savingsGoal || null);
        setCustomCategories(data.customCategories || []);
        setAccounts(data.accounts || []);
      },
      (err) => console.error('household listener error:', err)
    );
    return unsubscribe;
  }, [householdId]);

  return { budgets, savingsGoal, customCategories, accounts };
}
