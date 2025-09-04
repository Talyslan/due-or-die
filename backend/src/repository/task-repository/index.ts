import { database } from '../../config/firebase-admin';
import { Task, Task_JOIN_TaskList, TaskList } from '../../types';
import { NotFoundError } from '../../helpers';
import {
    ICreateTaskDTO,
    IDeleteTaskDTO,
    IFindTaskByIdDTO,
    IFindTasksByOwnerDTO,
    IFindTasksByTaskListDTO,
    ITaskRepository,
    IUpdateTaskDTO,
} from './type';
import {
    CollectionReference,
    Firestore,
    Timestamp,
} from 'firebase-admin/firestore';

export class TaskRepository implements ITaskRepository {
    private readonly collection: CollectionReference;
    private readonly database: Firestore;

    constructor() {
        this.database = database;
        this.collection = this.database.collection('tasks');
    }

    async findAll() {
        const snapshot = await this.collection.get();

        if (snapshot.empty) return [];

        const tasks = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                userId: data.userId,
                title: data.title,
                description: data.description,
                status: data.status,
                priority: data.priority,
                taskListId: data.taskListId ?? null,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            };
        });

        return tasks;
    }

    async findById({ id }: IFindTaskByIdDTO) {
        const snapshot = await this.collection.doc(id).get();

        if (!snapshot.exists)
            throw new NotFoundError(
                'Nenhuma tarefa com esse identificador encontrado.',
            );

        const tasks = await this.taskJOINtaskListItem(snapshot);

        return tasks;
    }

    async findTasksByOwner({ userId }: IFindTasksByOwnerDTO) {
        const snapshot = await this.collection
            .where('userId', '==', userId)
            .get();

        if (snapshot.empty) return [];

        const tasks = Promise.all(
            snapshot.docs.map(doc => this.taskJOINtaskListItem(doc)),
        );

        return tasks;
    }

    async findTasksByTaskList({ userId, taskListId }: IFindTasksByTaskListDTO) {
        const snapshot = await this.collection
            .where('userId', '==', userId)
            .where('taskListId', '==', taskListId)
            .get();

        if (snapshot.empty) return [];

        const tasks = Promise.all(
            snapshot.docs.map(doc => this.taskJOINtaskListItem(doc)),
        );

        return tasks;
    }

    async create(data: ICreateTaskDTO) {
        const docRef = this.collection.doc();

        const taskToCreate = {
            title: data.title,
            userId: data.userId,
            description: data.description ?? null,
            status: data.status,
            priority: data.priority,
            taskListId: data.taskListId,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        };

        await docRef.set(taskToCreate);

        return { ...taskToCreate, id: docRef.id };
    }

    async update(data: IUpdateTaskDTO) {
        await this.findById({ id: data.id });

        await this.collection.doc(data.id).update({
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            taskListId: data.taskListId,
            userId: data.userId,
        });
    }

    async remove(data: IDeleteTaskDTO) {
        await this.findById({ id: data.id });

        await this.collection.doc(data.id).delete();
    }

    private async taskJOINtaskListItem(
        snapshot: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>,
    ) {
        const data = snapshot.data() as Task;

        const taskListSnap = await this.database
            .collection('tasks-lists')
            .doc(data.taskListId)
            .get();

        if (!taskListSnap.exists) {
            return {
                ...(data as Omit<Task, 'id' | 'taskListId'>),
                taskList: null,
                id: data.id,
            } as Task_JOIN_TaskList;
        }

        const { userId: _removed, ...taskListData } =
            taskListSnap.data() as Omit<TaskList, 'id'>;

        return {
            ...(data as Omit<Task, 'id' | 'taskListId'>),
            taskList: {
                id: taskListSnap.id,
                ...taskListData,
            },

            id: data.id,
        } as Task_JOIN_TaskList;
    }
}
