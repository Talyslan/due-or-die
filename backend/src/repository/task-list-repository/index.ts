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
import { Task, TaskList } from '../../types';
import { BadRequest, NotFoundError } from '../../helpers/errors';
import {
    IDeleteTaskListByIdDTO,
    IFindTaskListByIdDTO,
    IFindTasksListsByOwnerDTO,
} from './type';

export class TaskListRepository implements TaskListRepository {
    private readonly collection: CollectionReference;
    private readonly database: Firestore;
    private readonly collectionName: string;

    constructor() {
        this.database = database;
        this.collectionName = 'tasks-lists';
        this.collection = collection(this.database, this.collectionName);
    }

    async findAll(): Promise<Array<Omit<TaskList, 'tasks'>> | null> {
        const snapshot = await getDocs(this.collection);

        if (snapshot.empty) return [];

        const tasksLists = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                userId: data.userId,
            };
        });

        return tasksLists;
    }

    async findById(data: IFindTaskListByIdDTO): Promise<TaskList | null> {
        const docRef = doc(this.database, this.collectionName, data.taskListId);

        const snapshot = await getDoc(docRef);

        if (!snapshot.exists())
            throw new NotFoundError(
                'Nenhuma lista de tarefa com esse identificado encontrado.',
            );

        return snapshot.data() as TaskList;
    }

    async findTasksListsByOwner(
        data: IFindTasksListsByOwnerDTO,
    ): Promise<TaskList[] | null> {
        const taskListsQuery = query(
            this.collection,
            where('userId', '==', data.userId),
        );
        const taskListsSnapshot = await getDocs(taskListsQuery);

        if (taskListsSnapshot.empty) return [];

        const tasksLists: TaskList[] = [];

        const tasksQuery = query(
            collection(this.database, 'tasks'),
            where('userId', '==', data.userId),
        );
        const tasksSnapshot = await getDocs(tasksQuery);
        const tasks = tasksSnapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<Task, 'id'>),
        }));

        taskListsSnapshot.forEach(doc => {
            const taskListData = {
                id: doc.id,
                ...(doc.data() as Omit<TaskList, 'id'>),
            } as TaskList;

            // Filtra as tasks que pertencem a essa taskList
            taskListData.tasks = tasks.filter(
                task => task.taskListId === doc.id,
            );

            tasksLists.push(taskListData);
        });

        return tasksLists;
    }

    async create(data: TaskList): Promise<TaskList> {
        const docRef = await addDoc(this.collection, {
            name: data.name,
            userId: data.userId,
        });

        const snapshot = await getDoc(docRef);

        if (!snapshot.exists())
            throw new BadRequest('Erro ao criar uma lista de tarefas.');

        return {
            id: docRef.id,
            ...(snapshot.data() as Omit<TaskList, 'id'>),
        };
    }

    async update(data: TaskList): Promise<void> {
        const docRef = doc(this.database, this.collectionName, data.id);

        return await updateDoc(docRef, {
            name: data.name,
            userId: data.userId,
        });
    }

    async remove(data: IDeleteTaskListByIdDTO): Promise<void> {
        const docRef = doc(this.database, this.collectionName, data.taskListId);

        const taskList = await getDoc(docRef);

        if (!taskList.exists())
            throw new NotFoundError(
                'Nenhuma lista de tarefas com esse identificado encontrado.',
            );

        return await deleteDoc(docRef);
    }
}
