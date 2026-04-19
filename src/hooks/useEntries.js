import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export function useEntries(householdId) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (!householdId) {
      setEntries([]);
      return;
    }
    const q = query(
      collection(db, 'households', householdId, 'entries'),
      orderBy('date', 'desc')
    );
    const unsubscribe = onSnapshot(q,
      (snap) => setEntries(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (err) => console.error('entries listener error:', err)
    );
    return unsubscribe;
  }, [householdId]);

  return entries;
}
