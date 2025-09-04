type TaskStatus = 'to-do' | 'doing' | 'done';
type TaskPriority = 'low' | 'medium' | 'high';
interface Task {
    id: string;
    userId: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    taskListId: string;

    createdAt: Timestamp;
    updatedAt: Timestamp;
}

interface TaskList {
    id: string;
    userId: string;
    name: string;

    createdAt: Timestamp;
    updatedAt: Timestamp;
}

interface Task_JOIN_TaskList extends Omit<Task, 'taskListId'> {
    taskList: Omit<TaskList, 'userId'> | null;
}

interface TaskList_JOIN_Tasks extends TaskList {
    tasks: Task[];
}

interface User {
    uid: string;
    name: string;
    email: string;
    photoURL?: string;

    createdAt: Timestamp;
    updatedAt: Timestamp;
}

interface RequestInit extends RequestInit {
    token?: string;
    timeout?: number;
}

type FetchResult<T> =
    | {
          message: string | null;
          data: null;
      }
    | {
          message: string | null;
          data: T;
      };
