import { useState, useEffect } from 'react';
import { collection, query, orderBy, where, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

function getDateBounds() {
  const now = new Date();
  const thisMonthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
  const historyStart = new Date(now);
  historyStart.setMonth(historyStart.getMonth() - 6);
  return {
    thisMonthStart,
    historyStart: historyStart.toISOString().slice(0, 10),
  };
}

export function useEntries(householdId) {
  const [live, setLive]         = useState([]);
  const [historical, setHistorical] = useState([]);

  // Real-time: current month only — small dataset, changes often
  useEffect(() => {
    if (!householdId) { setLive([]); return; }
    const { thisMonthStart } = getDateBounds();
    const q = query(
      collection(db, 'households', householdId, 'entries'),
      where('date', '>=', thisMonthStart),
      orderBy('date', 'desc')
    );
    return onSnapshot(q,
      (snap) => setLive(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (err) => console.error('entries listener error:', err)
    );
  }, [householdId]);

  // One-time fetch: previous 6 months — served from local cache on repeat loads
  useEffect(() => {
    if (!householdId) { setHistorical([]); return; }
    const { thisMonthStart, historyStart } = getDateBounds();
    const q = query(
      collection(db, 'households', householdId, 'entries'),
      where('date', '>=', historyStart),
      where('date', '<', thisMonthStart),
      orderBy('date', 'desc')
    );
    getDocs(q)
      .then((snap) => setHistorical(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))
      .catch((err) => console.error('history fetch error:', err));
  }, [householdId]);

  return [...live, ...historical];
}
