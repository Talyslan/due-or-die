import { database } from '../../config';
import { Task, TaskList, TaskList_JOIN_Tasks } from '../../types';
import { NotFoundError } from '../../helpers';
import {
    ICreateTaskListDTO,
    IDeleteTaskListDTO,
    IFindTaskListByIdDTO,
    IFindTaskListsByOwner,
    ITaskListRepository,
    IUpdateTaskListDTO,
} from './type';
import {
    CollectionReference,
    Firestore,
    Timestamp,
} from 'firebase-admin/firestore';

export class TaskListRepository implements ITaskListRepository {
    private readonly collection: CollectionReference;
    private readonly database: Firestore;

    constructor() {
        this.database = database;
        this.collection = this.database.collection('tasks-lists');
    }

    async findAll() {
        const snapshot = await this.collection.get();

        if (snapshot.empty) return [];

        const tasksLists = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                userId: data.userId,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            };
        });

        return tasksLists;
    }

    async findById({ id }: IFindTaskListByIdDTO) {
        const snapshot = await this.collection.doc(id).get();

        if (!snapshot.exists)
            throw new NotFoundError(
                'Nenhuma lista de tarefa com esse identificador encontrado.',
            );

        const taskList = this.tasklistJOINtaskItem(snapshot);

        return taskList;
    }

    async findTaskListsByOwner({ userId }: IFindTaskListsByOwner) {
        const snapshot = await this.collection
            .where('userId', '==', userId)
            .get();

        if (snapshot.empty) return [];

        const taskLists = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                userId: data.userId,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            } as TaskList;
        });

        return taskLists;
    }

    async create(data: ICreateTaskListDTO) {
        const docRef = this.collection.doc();

        const taskListToCreate = {
            name: data.name,
            userId: data.userId,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        };

        await docRef.set(taskListToCreate);

        return { id: docRef.id, ...taskListToCreate };
    }

    async update(data: IUpdateTaskListDTO) {
        await this.findById({ id: data.id });

        await this.collection.doc(data.id).update({
            name: data.name,
            userId: data.userId,
            updatedAt: Timestamp.now(),
        });
    }

    async remove({ id }: IDeleteTaskListDTO) {
        await this.findById({ id });

        await this.collection.doc(id).delete();
    }

    private async tasklistJOINtaskItem(
        snapshot: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>,
    ) {
        const data = snapshot.data() as Omit<TaskList, 'id'>;

        const taskSnap = await this.database
            .collection('tasks')
            .where('userId', '==', data.userId)
            .where('taskListId', '==', snapshot.id)
            .get();

        const tasks = taskSnap.docs.map(doc => {
            const { taskListId: _removed, ...taskData } = doc.data() as Omit<
                Task,
                'id'
            >;
            return {
                id: doc.id,
                ...taskData,
            } as Task;
        });

        return {
            id: snapshot.id,
            ...data,
            tasks,
        } as TaskList_JOIN_Tasks;
    }
}
