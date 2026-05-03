import { useEffect, useRef } from 'react';
import { addEntry } from '../firebase/db';
import { getCycleWindow } from '../utils/format';

function parseYM(dateStr) {
  const [y, m] = (dateStr || '').split('-').map(Number);
  return { y, m };
}

function monthDiff(y1, m1, y2, m2) {
  return (y2 - y1) * 12 + (m2 - m1);
}

function buildRecurring(entries) {
  const byName = {};
  entries.forEach((e) => {
    if (e.fixed !== 'fixed' && e.fixed !== 'bimonthly') return;
    const existing = byName[e.name];
    if (!existing || e.date > existing.lastDate) {
      byName[e.name] = {
        name: e.name,
        category: e.category,
        fixed: e.fixed,
        type: e.type,
        amount: e.amount,
        lastDate: e.date,
        recurringMonths: e.recurringMonths || null,
        recurringUntil: e.recurringUntil || null,
      };
    }
  });
  return Object.values(byName);
}

export function useAutoRecurring(entries, currentMonth, currentYear, householdId, user, isPremium, cycleStartDay = 1) {
  const processed = useRef(new Set());

  useEffect(() => {
    if (!householdId || !user || entries.length === 0) return;
    const key = `${currentYear}-${currentMonth}-${cycleStartDay}`;
    if (processed.current.has(key)) return;
    processed.current.add(key);

    const recurring = buildRecurring(entries);

    const { start, end } = getCycleWindow(currentMonth, currentYear, cycleStartDay);
    const monthEntries = entries.filter((e) => e.date >= start && e.date <= end);

    const date = start;

    recurring.forEach(async (r) => {
      const alreadyThisMonth = monthEntries.some((e) => e.name === r.name);
      if (alreadyThisMonth) return;

      if (r.fixed === 'bimonthly') {
        const { y: ly, m: lm } = parseYM(r.lastDate);
        const diff = monthDiff(ly, lm - 1, currentYear, currentMonth);
        if (diff < 2) return;
      }

      if (r.recurringUntil) {
        const currentYM = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
        if (currentYM > r.recurringUntil) return;
      }

      try {
        await addEntry(householdId, {
          name: r.name,
          amount: r.amount,
          category: r.category,
          date,
          fixed: r.fixed,
          type: r.type,
          note: 'הועבר אוטומטית',
          recurringMonths: r.recurringMonths,
          recurringUntil: r.recurringUntil,
        }, user);
      } catch (e) {
        console.error('auto-recurring:', e);
      }
    });
  }, [currentMonth, currentYear, householdId]);
}
