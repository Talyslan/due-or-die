import { Task } from './Task';

export interface TaskList {
    id: string;
    name: string;
    userId: string;
    tasks: Task[];
}
