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
import { Task } from '../../types';
import { BadRequest, NotFoundError } from '../../helpers/errors';
import {
    IDeleteTaskByIdDTO,
    IFindTaskByIdDTO,
    IFindTasksByOwnerDTO,
    IFindTasksByTaskListDTO,
    ITaskRepository,
    IUpdateTaskDTO,
} from './type';

export class TaskRepository implements ITaskRepository {
    private readonly collection: CollectionReference;
    private readonly database: Firestore;
    private readonly collectionName: string;

    constructor() {
        this.database = database;
        this.collectionName = 'tasks';
        this.collection = collection(this.database, this.collectionName);
    }

    async findAll(): Promise<Task[] | null> {
        const snapshot = await getDocs(this.collection);

        if (snapshot.empty) return [];

        const tasks = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                title: data.title,
                description: data.description,
                status: data.status,
                priority: data.priority,
                taskListId: data.taskListId,
                userId: data.userId,
            };
        });

        return tasks;
    }

    async findById(data: IFindTaskByIdDTO): Promise<Task | null> {
        const docRef = doc(this.database, this.collectionName, data.taskId);

        const snapshot = await getDoc(docRef);

        if (!snapshot.exists())
            throw new NotFoundError(
                'Nenhuma tarefa com esse identificado encontrado.',
            );

        return snapshot.data() as Task;
    }

    async findTasksByOwner(data: IFindTasksByOwnerDTO) {
        const q = query(this.collection, where('userId', '==', data.userId));

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return [];

        const tasks: Task[] = [];
        querySnapshot.forEach(doc => {
            tasks.push({ ...(doc.data() as Task) });
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
                ...(doc.data() as Task),
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
            ...(snapshot.data() as Task),
        };
    }

    async update(data: IUpdateTaskDTO): Promise<void> {
        const docRef = doc(this.database, this.collectionName, data.taskId);

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
