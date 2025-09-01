import { Timestamp } from "firebase-admin/firestore";

export interface User {
    uid: string;
    name: string;
    email: string;
    photoURL: string | undefined;

    createdAt: Timestamp;
    updatedAt: Timestamp;
}
