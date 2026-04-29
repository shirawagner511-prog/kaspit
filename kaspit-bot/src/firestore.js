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

async function queryUsers(fieldPath, value) {
  const token = await getAccessToken();
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:runQuery`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: 'users' }],
        where: { fieldFilter: { field: { fieldPath }, op: 'EQUAL', value: { stringValue: value } } },
        limit: 1,
      },
    }),
  });
  const data = await res.json();
  if (!data[0]?.document) return null;
  const docName = data[0].document.name;
  const uid = docName.split('/').pop();
  return { uid, ...fromFields(data[0].document.fields) };
}

async function patchUser(uid, fields) {
  const token = await getAccessToken();
  const updateMask = Object.keys(fields).map((k) => `updateMask.fieldPaths=${k}`).join('&');
  const body = { fields: Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, toValue(v)])) };
  await fetch(`${BASE}/users/${uid}?${updateMask}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export async function getHouseholdByPhone(phone) {
  const user = await queryUsers('whatsappNumber', phone);
  if (!user?.householdId) return null;
  return { householdId: user.householdId, uid: user.uid };
}

export async function getUserByPendingPhone(phone) {
  return queryUsers('pendingWhatsappPhone', phone);
}

export async function confirmWhatsappLink(uid, phone) {
  await patchUser(uid, { whatsappNumber: phone, pendingWhatsappPhone: '' });
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
