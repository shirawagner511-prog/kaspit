import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.split('\\n').join('\n'),
    }),
  });
}

const db = admin.firestore();

export async function getHouseholdByPhone(phone) {
  // Normalize: keep only digits and leading +
  const normalized = phone.replace(/\s/g, '');
  const snap = await db.collection('users').where('phoneNumber', '==', normalized).limit(1).get();
  if (snap.empty) return null;
  const userData = snap.docs[0].data();
  return userData.householdId || null;
}

export async function addEntryToFirestore(householdId, entry, userName) {
  const ref = db.collection('households').doc(householdId).collection('entries').doc();
  await ref.set({
    ...entry,
    id: ref.id,
    addedBy: userName || 'קיקי',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  return ref.id;
}

export async function getHouseholdCategories(householdId) {
  const snap = await db.collection('households').doc(householdId).get();
  if (!snap.exists) return [];
  return snap.data().customCategories || [];
}
