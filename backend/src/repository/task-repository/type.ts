import { Task } from '../../types';

export interface IFindTaskByIdDTO {
    taskId: string;
}

export interface IDeleteTaskByIdDTO {
    taskId: string;
}

export interface IFindTasksByOwnerDTO {
    userId: string;
}

export interface IFindTasksByTaskListDTO {
    taskListId: string;
    userId: string;
}

export interface ITaskRepository {
    findAll(): Promise<Task[] | null>;
    findById(data: IFindTaskByIdDTO): Promise<Task | null>;
    create(data: Task): Promise<Task>;
    findTasksByOwner(data: IFindTasksByOwnerDTO): Promise<Task[] | null>;
    findTasksByTaskList(data: IFindTasksByTaskListDTO): Promise<Task[] | null>;
    update(data: Task): Promise<void>;
    remove(data: IDeleteTaskByIdDTO): Promise<void>;
}
