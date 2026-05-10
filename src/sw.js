import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

self.skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBrAZBMOWmvy0afvp_l2EEbVusz08ziMQ0',
  authDomain: 'kaspit-d01e9.firebaseapp.com',
  projectId: 'kaspit-d01e9',
  storageBucket: 'kaspit-d01e9.firebasestorage.app',
  messagingSenderId: '45946797475',
  appId: '1:45946797475:web:9bf0003a39f530d805ee16',
});

const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
  self.registration.showNotification(payload.notification?.title || 'Budgi', {
    body: payload.notification?.body || '',
    icon: '/Budgi/icon-192.png',
    badge: '/Budgi/icon-192.png',
    tag: 'budgi-reminder',
  });
});
