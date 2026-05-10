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

function toFirestoreFields(obj) {
  const fields = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === null || v === undefined) fields[k] = { nullValue: null };
    else if (typeof v === 'string') fields[k] = { stringValue: v };
    else if (typeof v === 'number') fields[k] = { doubleValue: v };
    else if (typeof v === 'boolean') fields[k] = { booleanValue: v };
  }
  return fields;
}

export async function upsertSubscription(uid, data) {
  const token = await getAccessToken();
  const url = `${BASE}/subscriptions/${uid}`;

  // PATCH with updateMask to merge (upsert)
  const fields = toFirestoreFields(data);
  const mask = Object.keys(data).join(',');
  const res = await fetch(`${url}?updateMask.fieldPaths=${Object.keys(data).join('&updateMask.fieldPaths=')}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Firestore upsertSubscription failed (${res.status}): ${body}`);
  }
}

export async function getUidByCustomerId(braintreeCustomerId) {
  const token = await getAccessToken();
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:runQuery`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: 'subscriptions' }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'braintreeCustomerId' },
            op: 'EQUAL',
            value: { stringValue: braintreeCustomerId },
          },
        },
        limit: 1,
      },
    }),
  });
  const data = await res.json();
  if (!data[0]?.document) return null;
  const name = data[0].document.name;
  return name.split('/').pop();
}
