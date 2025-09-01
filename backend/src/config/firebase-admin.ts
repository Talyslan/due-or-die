import admin from 'firebase-admin';
import { Auth } from 'firebase-admin/auth';
import { Firestore } from 'firebase-admin/firestore';
import serviceAccount from '../../serviceAccountKey.json';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(
            serviceAccount as admin.ServiceAccount,
        ),
    });
}

export const auth: Auth = admin.auth();
export const database: Firestore = admin.firestore();
