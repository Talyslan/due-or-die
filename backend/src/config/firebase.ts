import { initializeApp } from 'firebase/app';
import { env } from '../env';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: env.FIREBASE_API_KEY,
    authDomain: env.FIREBASE_AUTH_DOMAIN,
    projectId: env.FIREBASE_PROJECT_ID,
    appId: env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
