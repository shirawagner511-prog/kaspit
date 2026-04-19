// Uses Firestore REST API instead of firebase-admin to save memory

const BASE = `https://firestore.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/databases/(default)/documents`;

async function getAccessToken() {
  const { GoogleAuth } = await import('google-auth-library');
  const auth = new GoogleAuth({
    credentials: {
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.split('\\n').join('\n'),
    },
    scopes: ['https://www.googleapis.com/auth/datastore'],
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token.token;
}

function toFirestoreValue(val) {
  if (typeof val === 'string') return { stringValue: val };
  if (typeof val === 'number') return { doubleValue: val };
  if (typeof val === 'boolean') return { booleanValue: val };
  if (val === null || val === undefined) return { nullValue: null };
  return { stringValue: String(val) };
}

function fromFirestoreDoc(doc) {
  const fields = doc.fields || {};
  const result = {};
  for (const [k, v] of Object.entries(fields)) {
    result[k] = v.stringValue ?? v.doubleValue ?? v.integerValue ?? v.booleanValue ?? null;
  }
  return result;
}

export async function getHouseholdByPhone(phone) {
  const token = await getAccessToken();
  const url = `https://firestore.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/databases/(default)/documents:runQuery`;
  const body = {
    structuredQuery: {
      from: [{ collectionId: 'users' }],
      where: {
        fieldFilter: {
          field: { fieldPath: 'phoneNumber' },
          op: 'EQUAL',
          value: { stringValue: phone },
        },
      },
      limit: 1,
    },
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data[0]?.document) return null;
  const fields = fromFirestoreDoc(data[0].document);
  return fields.householdId || null;
}

export async function addEntryToFirestore(householdId, entry, addedBy) {
  const token = await getAccessToken();
  const fields = {};
  for (const [k, v] of Object.entries({ ...entry, addedBy, createdAt: new Date().toISOString() })) {
    fields[k] = toFirestoreValue(v);
  }
  const url = `${BASE}/households/${householdId}/entries`;
  await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields }),
  });
}

export async function getHouseholdCategories(householdId) {
  const token = await getAccessToken();
  const url = `${BASE}/households/${householdId}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!data.fields?.customCategories) return [];
  const arr = data.fields.customCategories.arrayValue?.values || [];
  return arr.map((v) => {
    const m = v.mapValue?.fields || {};
    return {
      value: m.value?.stringValue || '',
      label: m.label?.stringValue || '',
      icon: m.icon?.stringValue || '',
    };
  });
}
