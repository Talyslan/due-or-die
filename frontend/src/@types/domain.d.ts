interface Task {
    id: string;
    title: string;
    description?: string; // mudanças aqui
    status: 'to-do' | 'doing' | 'done';
    priority: 'low' | 'medium' | 'high';
    taskListId: string;
    userId: string;

    createdAt: Data;
    updateAt: Date;
}

type TaskStatus = 'to-do' | 'doing' | 'done';
type TaskPriority = 'low' | 'medium' | 'high';

interface TaskList {
    id: string;
    name: string;
    userId: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    photoURL?: string | undefined;
}

interface RequestInit extends RequestInit {
    token?: string;
    timeout?: number;
}

interface IFetch<T> {
    data: T;
}
