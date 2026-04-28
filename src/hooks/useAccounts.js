import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export function useAccounts(householdId) {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (!householdId) { setAccounts([]); return; }
    return onSnapshot(
      collection(db, 'households', householdId, 'accounts'),
      (snap) => setAccounts(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (err) => console.error('accounts listener error:', err)
    );
  }, [householdId]);

  return accounts;
}
