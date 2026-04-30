import { useState, useEffect } from 'react';
import { doc, onSnapshot, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export function useHousehold(householdId) {
  const [budgets, setBudgets] = useState({});
  const [savingsGoal, setSavingsGoal] = useState(null);
  const [customCategories, setCustomCategories] = useState([]);
  const [memberUids, setMemberUids] = useState([]);
  const [currency, setCurrency] = useState(null);

  // Listen to household doc for membership
  useEffect(() => {
    if (!householdId) { setMemberUids([]); return; }
    return onSnapshot(
      doc(db, 'households', householdId),
      (snap) => {
        const data = snap.data() || {};
        if (!data.memberUids && data.members?.length > 0) {
          // Backfill memberUids for households created before the schema change
          const uids = data.members.map((m) => (typeof m === 'string' ? m : m.uid));
          setDoc(doc(db, 'households', householdId), { memberUids: uids }, { merge: true })
            .catch(console.error);
          setMemberUids(uids);
        } else {
          setMemberUids(data.memberUids || []);
        }
        if (data.currency) setCurrency(data.currency);
      },
      (err) => console.error('household listener error:', err)
    );
  }, [householdId]);

  // Listen to settings/main for settings data; fallback to household doc if not yet created
  useEffect(() => {
    if (!householdId) return;
    return onSnapshot(
      doc(db, 'households', householdId, 'settings', 'main'),
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setBudgets(data.budgets || {});
          setSavingsGoal(data.savingsGoal || null);
          setCustomCategories(data.customCategories || []);
        } else {
          // settings/main not yet created — fall back to household doc
          getDoc(doc(db, 'households', householdId)).then((hSnap) => {
            const data = hSnap.data() || {};
            setBudgets(data.budgets || {});
            setSavingsGoal(data.savingsGoal || null);
            setCustomCategories(data.customCategories || []);
          }).catch(console.error);
        }
      },
      (err) => console.error('settings listener error:', err)
    );
  }, [householdId]);

  return { budgets, savingsGoal, customCategories, memberUids, currency };
}
