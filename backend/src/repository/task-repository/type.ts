import { Task, Task_JOIN_TaskList } from '../../types';

export interface IFindTaskByIdDTO {
    id: string;
}

export interface IDeleteTaskDTO {
    id: string;
}

export interface IUpdateTaskDTO extends Omit<Task, 'createdAt' | 'updatedAt'> {}

export interface ICreateTaskDTO
    extends Omit<Task, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IFindTasksByOwnerDTO {
    userId: string;
}

export interface IFindTasksByTaskListDTO {
    userId: string;
    taskListId: string;
}

export interface ITaskRepository {
    findAll(): Promise<Task[] | null>;
    findById(data: IFindTaskByIdDTO): Promise<Task_JOIN_TaskList | null>;
    findTasksByOwner(
        data: IFindTasksByOwnerDTO,
    ): Promise<Task_JOIN_TaskList[] | null>;
    findTasksByTaskList(
        data: IFindTasksByTaskListDTO,
    ): Promise<Task_JOIN_TaskList[] | null>;
    create(data: ICreateTaskDTO): Promise<Task>;
    update(data: IUpdateTaskDTO): Promise<void>;
    remove(data: IDeleteTaskDTO): Promise<void>;
}
