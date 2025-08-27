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
import { Task, TaskList, TaskWithTaskList } from '../../types';
import { BadRequest, NotFoundError } from '../../helpers/errors';
import {
    IDeleteTaskByIdDTO,
    IFindTaskByIdDTO,
    IFindTasksByOwnerDTO,
    IFindTasksByTaskListDTO,
    ITaskRepository,
} from './type';
import { ITaskListRepository } from '../task-list-repository/type';

export class TaskRepository implements ITaskRepository {
    private readonly collection: CollectionReference;
    private readonly database: Firestore;
    private readonly collectionName: string;

    constructor(private readonly taskListRepository: ITaskListRepository) {
        this.database = database;
        this.collectionName = 'tasks';
        this.collection = collection(this.database, this.collectionName);
    }

    async findAll(): Promise<TaskWithTaskList[]> {
        const snapshot = await getDocs(this.collection);

        if (snapshot.empty) return [];

        const tasks = await Promise.all(
            snapshot.docs.map(async doc => {
                const data = doc.data();
                console.log(data);

                let taskList = null;

                if (data.taskListId) {
                    try {
                        taskList = await this.taskListRepository.findById({
                            taskListId: data.taskListId,
                        });
                    } catch (err) {
                        console.warn(
                            `TaskList ${data.taskListId} não encontrada:`,
                            err,
                        );
                        taskList = null;
                    }
                }

                return {
                    id: doc.id,
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    priority: data.priority,
                    taskListId: data.taskListId ?? null,
                    taskList: taskList ?? undefined,
                    userId: data.userId,
                } as TaskWithTaskList;
            }),
        );

        return tasks;
    }

    async findById(data: IFindTaskByIdDTO): Promise<Task | null> {
        const docRef = doc(this.database, this.collectionName, data.taskId);

        const snapshot = await getDoc(docRef);

        if (!snapshot.exists())
            throw new NotFoundError(
                'Nenhuma tarefa com esse identificado encontrado.',
            );

        return {
            id: docRef.id,
            ...(snapshot.data() as Omit<Task, 'id'>),
        };
    }

    async findTasksByOwner(data: IFindTasksByOwnerDTO) {
        const q = query(this.collection, where('userId', '==', data.userId));

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return [];

        const tasks: Task[] = [];
        querySnapshot.forEach(doc => {
            tasks.push({
                id: doc.id,
                ...(doc.data() as Omit<Task, 'id'>),
            });
        });

        return tasks;
    }

    async findTasksByTaskList(
        data: IFindTasksByTaskListDTO,
    ): Promise<Task[] | null> {
        const q = query(
            this.collection,
            where('userId', '==', data.userId),
            where('taskList', '==', data.taskListId),
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return [];

        const tasks: Task[] = [];
        querySnapshot.forEach(doc => {
            tasks.push({
                id: doc.id,
                ...(doc.data() as Omit<Task, 'id'>),
            });
        });

        return tasks;
    }

    async create(data: Task): Promise<Task> {
        const docRef = await addDoc(this.collection, {
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            taskListId: data.taskListId,
            userId: data.userId,
        });

        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) throw new BadRequest('Erro ao criar tarefa.');

        return {
            id: docRef.id,
            ...(snapshot.data() as Omit<Task, 'id'>),
        };
    }

    async update(data: Task): Promise<void> {
        const docRef = doc(this.database, this.collectionName, data.id);

        return await updateDoc(docRef, {
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            taskListId: data.taskListId,
            userId: data.userId,
        });
    }

    async remove(data: IDeleteTaskByIdDTO): Promise<void> {
        const docRef = doc(this.database, this.collectionName, data.taskId);

        const task = await getDoc(docRef);

        if (!task.exists())
            throw new NotFoundError(
                'Nenhuma tarefa com esse identificado encontrado.',
            );

        return await deleteDoc(docRef);
    }
}
