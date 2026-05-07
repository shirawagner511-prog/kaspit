importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBrAZBMOWmvy0afvp_l2EEbVusz08ziMQ0',
  authDomain: 'kaspit-d01e9.firebaseapp.com',
  projectId: 'kaspit-d01e9',
  storageBucket: 'kaspit-d01e9.firebasestorage.app',
  messagingSenderId: '45946797475',
  appId: '1:45946797475:web:9bf0003a39f530d805ee16',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/Budgi/icon-192.png',
    badge: '/Budgi/icon-192.png',
    tag: 'budgi-reminder',
  });
});
