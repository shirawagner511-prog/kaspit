import { GoogleAuth } from 'google-auth-library';
import serviceAccount from './serviceAccount.js';

const PROJECT_ID = serviceAccount.project_id;
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

let _token = null;
let _tokenExpiry = 0;

async function getAccessToken() {
  if (_token && Date.now() < _tokenExpiry) return _token;
  const auth = new GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/datastore'],
  });
  const client = await auth.getClient();
  const result = await client.getAccessToken();
  _token = result.token;
  _tokenExpiry = Date.now() + 50 * 60 * 1000;
  return _token;
}

function toValue(val) {
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
  console.log('query result:', JSON.stringify(data?.[0]));
  if (!data[0]?.document) return null;
  const fields = fromFields(data[0].document.fields);
  if (!fields.householdId) return null;

  // Read anthropicApiKey from the household doc (per-household key)
  const token2 = await getAccessToken();
  const hRes = await fetch(`${BASE}/households/${fields.householdId}`, {
    headers: { Authorization: `Bearer ${token2}` },
  });
  const hData = await hRes.json();
  const hFields = fromFields(hData.fields || {});
  return { householdId: fields.householdId, anthropicApiKey: hFields.anthropicApiKey || null };
}

export async function addEntryToFirestore(householdId, entry, addedBy) {
  const token = await getAccessToken();
  const fields = {};
  for (const [k, v] of Object.entries({ ...entry, addedBy, createdAt: new Date().toISOString() })) {
    fields[k] = toValue(v);
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
