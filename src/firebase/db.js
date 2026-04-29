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
  limit,
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

// ── Username registry ───────────────────────────────────

export async function isUsernameTaken(username) {
  const snap = await getDoc(doc(db, 'usernames', username.toLowerCase()));
  return snap.exists();
}

export async function registerUsername(username, uid) {
  await setDoc(doc(db, 'usernames', username.toLowerCase()), { uid });
}

export async function getEmailByUsername(username) {
  const snap = await getDoc(doc(db, 'usernames', username.toLowerCase()));
  if (!snap.exists()) return null;
  return snap.data().email;
}

export async function getUserData(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : {};
}

export async function saveUserEmail(uid, email) {
  await updateDoc(doc(db, 'users', uid), { email });
}

export async function setUserHousehold(uid, householdId) {
  await setDoc(doc(db, 'users', uid), { householdId }, { merge: true });
}

export async function saveUserPhone(uid, phoneNumber) {
  await setDoc(doc(db, 'users', uid), { phoneNumber }, { merge: true });
}

export async function saveHouseholdApiKey(householdId, anthropicApiKey) {
  await Promise.all([
    setDoc(doc(db, 'households', householdId), { anthropicApiKey }, { merge: true }),
    saveSettings(householdId, { anthropicApiKey }),
  ]);
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
    members: [{ uid: user.uid, displayName: user.displayName || '' }],
    memberUids: [user.uid],
    inviteCode,
    createdAt: new Date().toISOString(),
  });
  await setUserHousehold(user.uid, ref.id);
  return { householdId: ref.id, inviteCode };
}

export async function joinHousehold(user, inviteCode) {
  const q = query(
    collection(db, 'households'),
    where('inviteCode', '==', inviteCode.trim().toUpperCase()),
    limit(1)
  );
  const snap = await getDocs(q);
  if (snap.empty) throw new Error('קוד הזמנה לא נמצא');

  const householdDoc = snap.docs[0];
  const memberUids = householdDoc.data().memberUids || [];

  if (memberUids.length >= 1 && !memberUids.includes(user.uid)) {
    const creatorUid = memberUids[0];
    const subSnap = await getDoc(doc(db, 'subscriptions', creatorUid));
    const sub = subSnap.exists() ? subSnap.data() : null;
    const isCreatorPremium = sub?.status === 'active' ||
      (sub?.status === 'trial' && new Date(sub.trialEndsAt) > new Date());
    if (!isCreatorPremium) {
      throw new Error('REQUIRES_PREMIUM');
    }
  }

  if (!memberUids.includes(user.uid)) {
    const members = householdDoc.data().members || [];
    await updateDoc(doc(db, 'households', householdDoc.id), {
      members: [...members, { uid: user.uid, displayName: user.displayName || '' }],
      memberUids: [...memberUids, user.uid],
    });
  }
  await setUserHousehold(user.uid, householdDoc.id);
  return householdDoc.id;
}

export async function getHousehold(householdId) {
  const snap = await getDoc(doc(db, 'households', householdId));
  if (!snap.exists()) return null;
  const data = { id: snap.id, ...snap.data() };
  // backfill memberUids for households created before this schema change
  if (!data.memberUids) {
    const uids = (data.members || []).map((m) => (typeof m === 'string' ? m : m.uid));
    await updateDoc(doc(db, 'households', householdId), { memberUids: uids });
    data.memberUids = uids;
  }
  return data;
}

// members[] now contains { uid, displayName } objects — no extra reads needed
export function getHouseholdMembers(members) {
  return Promise.resolve(members.map((m) =>
    typeof m === 'string' ? { uid: m, displayName: m } : m
  ));
}

export async function saveCustomCategories(householdId, customCategories) {
  await Promise.all([
    setDoc(doc(db, 'households', householdId), { customCategories }, { merge: true }),
    saveSettings(householdId, { customCategories }),
  ]);
}

export async function saveBudgets(householdId, budgets) {
  await Promise.all([
    setDoc(doc(db, 'households', householdId), { budgets }, { merge: true }),
    saveSettings(householdId, { budgets }),
  ]);
}

export async function saveSavingsGoal(householdId, savingsGoal) {
  await Promise.all([
    setDoc(doc(db, 'households', householdId), { savingsGoal }, { merge: true }),
    saveSettings(householdId, { savingsGoal }),
  ]);
}

// ── Settings subcollection ─────────────────────────────

export async function saveSettings(householdId, settings) {
  await setDoc(doc(db, 'households', householdId, 'settings', 'main'), settings, { merge: true });
}

// ── Monthly summaries ──────────────────────────────────

export async function updateMonthlySummary(householdId, yearMonth) {
  const [y, m] = yearMonth.split('-').map(Number);
  const start = `${yearMonth}-01`;
  const nextY = m === 12 ? y + 1 : y;
  const nextM = m === 12 ? 1 : m + 1;
  const end = `${nextY}-${String(nextM).padStart(2, '0')}-01`;

  const snap = await getDocs(query(
    collection(db, 'households', householdId, 'entries'),
    where('date', '>=', start),
    where('date', '<', end),
  ));
  const all = snap.docs.map((d) => d.data());
  const totalIncome = all.filter((e) => e.type === 'income').reduce((s, e) => s + e.amount, 0);
  const totalExpenses = all.filter((e) => e.type !== 'income').reduce((s, e) => s + e.amount, 0);
  const totalSavings = all.filter((e) => e.type === 'saving').reduce((s, e) => s + e.amount, 0);
  const byCategory = {};
  all.filter((e) => e.type !== 'income').forEach((e) => {
    byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
  });
  await setDoc(doc(db, 'households', householdId, 'monthlySummaries', yearMonth), {
    month: yearMonth,
    totalIncome,
    totalExpenses,
    totalSavings,
    byCategory,
    entryCount: all.length,
    updatedAt: new Date().toISOString(),
  });
}

// ── Accounts (subcollection) ────────────────────────────

export async function getHouseholdAccounts(householdId) {
  const snap = await getDocs(query(collection(db, 'households', householdId, 'accounts'), limit(100)));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addAccount(householdId, account) {
  const ref = await addDoc(collection(db, 'households', householdId, 'accounts'), account);
  return ref.id;
}

export async function updateAccount(householdId, accountId, data) {
  await updateDoc(doc(db, 'households', householdId, 'accounts', accountId), data);
}

export async function deleteAccount(householdId, accountId) {
  await deleteDoc(doc(db, 'households', householdId, 'accounts', accountId));
}

export async function migrateAccountsFromDoc(householdId) {
  const householdSnap = await getDoc(doc(db, 'households', householdId));
  const legacyAccounts = householdSnap.data()?.accounts;
  if (!legacyAccounts?.length) return;
  await Promise.all(legacyAccounts.map((a) => {
    const { id: legacyId, ...rest } = a;
    return setDoc(doc(db, 'households', householdId, 'accounts', legacyId), rest);
  }));
  await updateDoc(doc(db, 'households', householdId), { accounts: [] });
}

// ── Entries ────────────────────────────────────────────

export async function addEntry(householdId, entry, user) {
  const householdSnap = await getDoc(doc(db, 'households', householdId));
  const memberUids = householdSnap.data()?.memberUids || [user.uid];
  await addDoc(collection(db, 'households', householdId, 'entries'), {
    ...entry,
    householdId,
    memberUids,
    addedBy: user.displayName || 'unknown',
    addedByUid: user.uid,
    createdAt: new Date().toISOString(),
  });
  const yearMonth = entry.date.slice(0, 7);
  updateMonthlySummary(householdId, yearMonth).catch((e) => console.error('summary update error:', e));
}

export async function updateEntry(householdId, entryId, data) {
  await updateDoc(doc(db, 'households', householdId, 'entries', entryId), data);
  if (data.date) {
    const yearMonth = data.date.slice(0, 7);
    updateMonthlySummary(householdId, yearMonth).catch((e) => console.error('summary update error:', e));
  }
}

export async function deleteEntry(householdId, entryId) {
  const entrySnap = await getDoc(doc(db, 'households', householdId, 'entries', entryId));
  const date = entrySnap.data()?.date;
  await deleteDoc(doc(db, 'households', householdId, 'entries', entryId));
  if (date) {
    updateMonthlySummary(householdId, date.slice(0, 7)).catch((e) => console.error('summary update error:', e));
  }
}
