import { GoogleAuth } from 'google-auth-library';

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

const credentials = {
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n').replace(/"/g, ''),
};

async function getAccessToken() {
  const auth = new GoogleAuth({
    credentials,
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
  return { nullValue: null };
}

function fromFields(fields = {}) {
  const result = {};
  for (const [k, v] of Object.entries(fields)) {
    if ('stringValue' in v) result[k] = v.stringValue;
    else if ('doubleValue' in v) result[k] = v.doubleValue;
    else if ('integerValue' in v) result[k] = Number(v.integerValue);
    else if ('booleanValue' in v) result[k] = v.booleanValue;
    else result[k] = null;
  }
  return result;
}

export async function getHouseholdByPhone(phone) {
  const token = await getAccessToken();
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:runQuery`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
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
    }),
  });
  const data = await res.json();
  console.log('raw query:', JSON.stringify(data?.[0]?.document?.fields?.householdId));
  if (!data[0]?.document) return null;
  return fromFields(data[0].document.fields).householdId || null;
}

export async function addEntryToFirestore(householdId, entry, addedBy) {
  const token = await getAccessToken();
  const fields = {};
  for (const [k, v] of Object.entries({ ...entry, addedBy, createdAt: new Date().toISOString() })) {
    fields[k] = toFirestoreValue(v);
  }
  await fetch(`${BASE}/households/${householdId}/entries`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields }),
  });
}

export async function getHouseholdCategories(householdId) {
  const token = await getAccessToken();
  const res = await fetch(`${BASE}/households/${householdId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  const arr = data.fields?.customCategories?.arrayValue?.values || [];
  return arr.map((v) => {
    const m = v.mapValue?.fields || {};
    return {
      value: m.value?.stringValue || '',
      label: m.label?.stringValue || '',
      icon: m.icon?.stringValue || '',
    };
  });
}
