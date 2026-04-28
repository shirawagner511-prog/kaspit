import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export function useSubscription(user) {
  const [subscription, setSubscription] = useState(undefined); // undefined = loading

  useEffect(() => {
    if (!user?.uid) { setSubscription(null); return; }
    return onSnapshot(
      doc(db, 'subscriptions', user.uid),
      async (snap) => {
        if (!snap.exists()) {
          // First load: create 60-day trial
          try {
            const trialEndsAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString();
            await setDoc(doc(db, 'subscriptions', user.uid), {
              uid: user.uid,
              plan: 'premium',
              status: 'trial',
              trialEndsAt,
              createdAt: new Date().toISOString(),
            });
          } catch (e) {
            console.error('trial create error:', e);
            setSubscription(null);
          }
          return; // listener will fire again with the new doc
        }
        setSubscription(snap.data());
      },
      (err) => { console.error('subscription listener error:', err); setSubscription(null); }
    );
  }, [user?.uid]);

  const isPremium = subscription === undefined
    ? true // show premium while loading to avoid flash of locked content
    : subscription?.status === 'active' ||
      (subscription?.status === 'trial' && new Date(subscription.trialEndsAt) > new Date());

  const trialDaysLeft = subscription?.status === 'trial'
    ? Math.max(0, Math.ceil((new Date(subscription.trialEndsAt) - Date.now()) / 86400000))
    : null;

  return { isPremium, status: subscription?.status ?? null, trialDaysLeft, subscription };
}
