import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache } from 'firebase/firestore';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyBrAZBMOWmvy0afvp_l2EEbVusz08ziMQ0',
  authDomain: 'kaspit-d01e9.firebaseapp.com',
  projectId: 'kaspit-d01e9',
  storageBucket: 'kaspit-d01e9.firebasestorage.app',
  messagingSenderId: '45946797475',
  appId: '1:45946797475:web:9bf0003a39f530d805ee16',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
});
export const googleProvider = new GoogleAuthProvider();

export const messaging = isSupported().then((ok) => ok ? getMessaging(app) : null);
