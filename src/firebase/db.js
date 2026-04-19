import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from './config';

// ── Users ──────────────────────────────────────────────

export async function getOrCreateUser(firebaseUser) {
  const ref = doc(db, 'users', firebaseUser.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      householdId: null,
      createdAt: new Date().toISOString(),
    });
    return { householdId: null };
  }
  return snap.data();
}

export async function setUserHousehold(uid, householdId) {
  await updateDoc(doc(db, 'users', uid), { householdId });
}

// ── Households ─────────────────────────────────────────

function generateInviteCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export async function createHousehold(user) {
  const inviteCode = generateInviteCode();
  const ref = await addDoc(collection(db, 'households'), {
    name: `הבית של ${user.displayName?.split(' ')[0] || 'המשפחה'}`,
    members: [user.uid],
    inviteCode,
    createdAt: new Date().toISOString(),
  });
  await setUserHousehold(user.uid, ref.id);
  return { householdId: ref.id, inviteCode };
}

export async function joinHousehold(user, inviteCode) {
  const q = query(
    collection(db, 'households'),
    where('inviteCode', '==', inviteCode.trim().toUpperCase())
  );
  const snap = await getDocs(q);
  if (snap.empty) throw new Error('קוד הזמנה לא נמצא');

  const householdDoc = snap.docs[0];
  const members = householdDoc.data().members || [];
  if (!members.includes(user.uid)) {
    await updateDoc(doc(db, 'households', householdDoc.id), {
      members: [...members, user.uid],
    });
  }
  await setUserHousehold(user.uid, householdDoc.id);
  return householdDoc.id;
}

export async function getHousehold(householdId) {
  const snap = await getDoc(doc(db, 'households', householdId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// ── Entries ────────────────────────────────────────────

export async function addEntry(householdId, entry, user) {
  await addDoc(collection(db, 'households', householdId, 'entries'), {
    ...entry,
    addedBy: user.displayName || 'unknown',
    addedByUid: user.uid,
    createdAt: new Date().toISOString(),
  });
}

export async function deleteEntry(householdId, entryId) {
  await deleteDoc(doc(db, 'households', householdId, 'entries', entryId));
}
