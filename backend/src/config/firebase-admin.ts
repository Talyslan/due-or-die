import admin from 'firebase-admin';
import { Auth } from 'firebase-admin/auth';
import { Firestore } from 'firebase-admin/firestore';
import { env } from '../env';

if (!admin.apps.length) {
    if (env.FIREBASE_SERVICE_ACCOUNT) {
        try {
            const serviceAccount = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT);

            admin.initializeApp({
                credential: admin.credential.cert(
                    serviceAccount as admin.ServiceAccount,
                ),
            });

            console.log(
                '✅ Firebase Admin initialized with service account from env',
            );
        } catch (error) {
            console.error('❌ Error parsing FIREBASE_SERVICE_ACCOUNT:', error);
            throw new Error('Invalid FIREBASE_SERVICE_ACCOUNT env variable');
        }
    } else {
        admin.initializeApp();
        console.log('⚠️ Firebase Admin initialized with default credentials');
    }
}

export const auth: Auth = admin.auth();
export const database: Firestore = admin.firestore();
