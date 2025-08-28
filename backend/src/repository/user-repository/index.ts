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
import { Task, TaskList, User, UserWithPassword } from '../../types';
import {
    ICreateUserDTO,
    IDeleteUserByIdDTO,
    IFindUserByEmailDTO,
    IFindUserByIdDTO,
    IUpdateUserDTO,
    IUserRepository,
} from './type';
import { BadRequest, NotFoundError } from '../../helpers/errors';
import {
    IFindTasksByOwnerDTO,
    IFindTasksByTaskListDTO,
    ITaskRepository,
} from '../task-repository/type';
import { ITaskListRepository } from '../task-list-repository/type';

export class UserRepository implements IUserRepository {
    private readonly collection: CollectionReference;
    private readonly database: Firestore;
    private readonly collectionName: string;

    constructor(
        private readonly taskRepository: ITaskRepository,
        private readonly taskListRepository: ITaskListRepository,
    ) {
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

    async findById(data: IFindUserByIdDTO): Promise<Omit<User, 'id'> | null> {
        const docRef = doc(this.database, this.collectionName, data.userId);

        const snapshot = await getDoc(docRef);

        if (!snapshot.exists())
            throw new NotFoundError(
                'Nenhum usuário com esse identificado encontrado.',
            );

        return snapshot.data() as User;
    }

    async findByEmail(
        data: IFindUserByEmailDTO,
    ): Promise<UserWithPassword | null> {
        const q = query(this.collection, where('email', '==', data.email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return null;

        const docSnap = querySnapshot.docs[0];
        if (!docSnap) return null;

        return {
            id: docSnap.id,
            ...(docSnap.data() as Omit<UserWithPassword, 'id'>),
        };
    }

    async findTasksByOwner(data: IFindTasksByOwnerDTO): Promise<Task[] | null> {
        // verifica se o usuário existe
        await this.findById({ userId: data.userId });

        // procura as tarefas por usuário
        const tasks = await this.taskRepository.findTasksByOwner({
            userId: data.userId,
        });

        return tasks;
    }

    async findTasksListsByOwner(
        data: IFindTasksByTaskListDTO,
    ): Promise<TaskList[] | null> {
        const { userId } = data;

        await this.findById({ userId });

        const tasksLists = await this.taskListRepository.findTasksListsByOwner({
            userId,
        });

        return tasksLists;
    }

    async create(data: ICreateUserDTO): Promise<User> {
        const docRef = await addDoc(this.collection, {
            name: data.name,
            email: data.email,
            photoURL: data.photoURL ?? null,
            password: data.password,
        });

        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) throw new BadRequest('Erro ao criar usuário.');

        return {
            id: snapshot.id,
            ...(snapshot.data() as Omit<User, 'id'>),
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
