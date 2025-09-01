import {
    CollectionReference,
    Firestore,
    Timestamp,
} from 'firebase-admin/firestore';
import { database } from '../../config';
import { User } from '../../types';
import {
    ICreateUserDTO,
    IDeleteUserByIdDTO,
    IFindTaskListsByUser,
    IFindTasksByUser,
    IFindUserByEmailDTO,
    IFindUserByIdDTO,
    IUpdateUserDTO,
    IUserRepository,
} from './type';
import { NotFoundError } from '../../helpers';
import { ITaskRepository } from '../task-repository/type';
import { ITaskListRepository } from '../task-list-repository/type';

export class UserRepository implements IUserRepository {
    private readonly collection: CollectionReference;
    private readonly database: Firestore;

    constructor(
        private readonly taskRepository: ITaskRepository,
        private readonly taskListRepository: ITaskListRepository,
    ) {
        this.database = database;
        this.collection = this.database.collection('users');
    }

    async findAll() {
        const snapshot = await this.collection.get();

        if (snapshot.empty) return [];

        const users = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                uid: doc.id,
                name: data.name,
                email: data.email,
                photoURL: data.photoURL ?? null,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            };
        });

        return users;
    }

    async findById(data: IFindUserByIdDTO) {
        const snapshot = await this.collection.doc(data.uid).get();

        if (!snapshot.exists)
            throw new NotFoundError(
                'Nenhum usuário com esse identificador encontrado.',
            );

        return {
            ...(snapshot.data() as Omit<User, 'uid'>),
            uid: snapshot.id,
        };
    }

    async findByEmail(data: IFindUserByEmailDTO) {
        const snapshot = await this.collection
            .where('email', '==', data.email)
            .get();

        if (snapshot.empty) return null;

        const docSnap = snapshot.docs[0];
        if (!docSnap) return null;
        const dataUser = docSnap.data() as User;

        return { ...dataUser, uid: docSnap.id };
    }

    async findTasksByOwner({ uid }: IFindTasksByUser) {
        await this.findById({ uid });

        const tasks = await this.taskRepository.findTasksByOwner({
            userId: uid,
        });

        return tasks;
    }

    async findTaskListsByOwner({ uid }: IFindTaskListsByUser) {
        await this.findById({ uid });

        const taskLists = await this.taskListRepository.findTaskListsByOwner({
            userId: uid,
        });

        return taskLists;
    }

    async create({ uid, user }: ICreateUserDTO) {
        const userToCreate = {
            name: user.name,
            email: user.email,
            photoURL: user.photoURL ?? undefined,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        };

        await this.collection.doc(uid).set(userToCreate);

        return { uid, ...userToCreate };
    }

    async update(data: IUpdateUserDTO) {
        await this.collection.doc(data.uid).update({
            name: data.name,
            photoURL: data.photoURL ?? undefined,
            email: data.email,
            updatedAt: Timestamp.now(),
        });
    }

    async remove({ uid }: IDeleteUserByIdDTO) {
        await this.findById({ uid });

        await this.collection.doc(uid).delete();
    }
}
