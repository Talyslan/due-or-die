import { TaskList } from "./TaskList";

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'to-do' | 'doing' | 'done';
    priority: 'low' | 'medium' | 'high';
    taskListId: string;
    userId: string;
}

export interface TaskWithTaskList extends Task {
    taskList: TaskList;
}
