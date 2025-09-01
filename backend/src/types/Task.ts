import { Timestamp } from 'firebase-admin/firestore';
import { TaskList } from './TaskList';

export interface Task {
    id: string;
    userId: string;
    title: string;
    description: string | undefined;
    status: 'to-do' | 'doing' | 'done';
    priority: 'low' | 'medium' | 'high';
    taskListId: string;

    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface Task_JOIN_TaskList extends Omit<Task, 'taskListId'> {
    taskList: Omit<TaskList, 'userId'> | null;
}
