import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { getOrCreateUser } from '../firebase/db';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [householdId, setHouseholdId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const userData = await getOrCreateUser(firebaseUser);
          if (userData.householdId) setHouseholdId(userData.householdId);
        } catch {}
      } else {
        setUser(null);
        setHouseholdId(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, householdId, setHouseholdId, loading };
}
