import { Timestamp } from "firebase-admin/firestore";

export interface User {
    uid: string;
    name: string;
    email: string;
    photoURL: string | null;

    createdAt: Timestamp;
    updatedAt: Timestamp;
}
