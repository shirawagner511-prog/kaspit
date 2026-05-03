import { GoogleAuth } from 'google-auth-library';
import serviceAccount from './serviceAccount.js';

const PROJECT_ID = serviceAccount.project_id;
const FCM_URL = `https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`;

let _token = null;
let _tokenExpiry = 0;

async function getFcmToken() {
  if (_token && Date.now() < _tokenExpiry) return _token;
  const auth = new GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
  });
  const client = await auth.getClient();
  const result = await client.getAccessToken();
  _token = result.token;
  _tokenExpiry = Date.now() + 50 * 60 * 1000;
  return _token;
}

export async function sendPush(fcmToken, { title, body }) {
  const accessToken = await getFcmToken();
  const res = await fetch(FCM_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: { token: fcmToken, notification: { title, body } } }),
  });
  if (!res.ok) throw new Error(await res.text());
}
