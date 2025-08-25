export interface Task {
    title: string;
    description: string;
    status: 'to-do' | 'doing' | 'done';
    priority: 'low' | 'medium' | 'high';
    taskListId: string;
    userId: string;
}
