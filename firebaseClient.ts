import firebaseClient from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const CLIENT_CONFIG = {
  apiKey: 'AIzaSyBWjzzaSLiqi6GOMpNSN6cIcT_b2VNBePs',
  authDomain: 'heroes-next-admin.firebaseapp.com',
  projectId: 'heroes-next-admin',
  storageBucket: 'heroes-next-admin.appspot.com',
  messagingSenderId: '459447491789',
  appId: '1:459447491789:web:2cd81333639c7ed65edd84',
};

if (typeof window !== 'undefined' && !firebaseClient.apps.length) {
  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  (window as any).firebase = firebaseClient;
}

export { firebaseClient };
