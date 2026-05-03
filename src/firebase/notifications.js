import { getToken } from 'firebase/messaging';
import { messaging } from './config';

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;
const SW_PATH = '/kaspit/firebase-messaging-sw.js';

export async function registerForPush() {
  if (!('Notification' in window)) throw new Error('notifications_unsupported');
  if (!('serviceWorker' in navigator)) throw new Error('sw_unsupported');

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') throw new Error('permission_denied');

  const instance = await messaging;
  if (!instance) throw new Error('messaging_unsupported');

  const sw = await navigator.serviceWorker.register(SW_PATH);
  await navigator.serviceWorker.ready;

  const token = await getToken(instance, { vapidKey: VAPID_KEY, serviceWorkerRegistration: sw });
  return token;
}
