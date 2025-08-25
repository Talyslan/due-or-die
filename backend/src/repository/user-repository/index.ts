import {
    addDoc,
    collection,
    CollectionReference,
    deleteDoc,
    doc,
    Firestore,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import { database } from '../../config/firebase';
import { User } from '../../types';
import {
    IDeleteUserByIdDTO,
    IFindUserByEmailDTO,
    IFindUserByIdDTO,
    IUpdateUserDTO,
    IUserRepository,
} from './type';
import { BadRequest, NotFoundError } from '../../helpers/errors';

export class UserRepository implements IUserRepository {
    private readonly collection: CollectionReference;
    private readonly database: Firestore;
    private readonly collectionName: string;

    constructor() {
        this.database = database;
        this.collectionName = 'users';
        this.collection = collection(this.database, this.collectionName);
    }

    async findAll(): Promise<User[] | null> {
        const snapshot = await getDocs(this.collection);

        if (snapshot.empty) return [];

        const users = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                email: data.email,
                photoURL: data.photoURL ?? null,
            };
        });

        return users;
    }

    async findById(data: IFindUserByIdDTO): Promise<User | null> {
        const docRef = doc(this.database, this.collectionName, data.userId);

        const snapshot = await getDoc(docRef);

        if (!snapshot.exists())
            throw new NotFoundError(
                'Nenhum usuário com esse identificado encontrado.',
            );

        return snapshot.data() as User;
    }

    async findByEmail(data: IFindUserByEmailDTO): Promise<User | null> {
        const q = query(this.collection, where('email', '==', data.email));

        const querySnapshot = await getDocs(q);

        return {
            ...querySnapshot.docs[0],
        } as User;
    }

    async create(data: User): Promise<User> {
        const docRef = await addDoc(this.collection, {
            name: data.name,
            email: data.email,
            photoURL: data.photoURL ?? null,
        });

        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) throw new BadRequest('Erro ao criar usuário.');

        return {
            ...(snapshot.data() as User),
        };
    }

    async update(data: IUpdateUserDTO): Promise<void> {
        const userRef = doc(this.database, this.collectionName, data.userId);

        return await updateDoc(userRef, {
            name: data.name,
            email: data.email,
            photoURL: data.photoURL ?? null,
        });
    }

    async remove(data: IDeleteUserByIdDTO): Promise<void> {
        const docRef = doc(this.database, this.collectionName, data.userId);

        const user = await getDoc(docRef);

        if (!user.exists())
            throw new NotFoundError(
                'Nenhum usuário com esse identificado encontrado.',
            );

        return await deleteDoc(docRef);
    }
}
