import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';

export function useAccounts(householdId) {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (!householdId) { setAccounts([]); return; }
    const q = query(
      collection(db, 'households', householdId, 'accounts'),
      orderBy('createdAt', 'asc')
    );
    return onSnapshot(q, (snap) => {
      setAccounts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, [householdId]);

  return accounts;
}
