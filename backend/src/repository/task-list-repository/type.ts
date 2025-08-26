import { TaskList } from '../../types';

export interface IFindTaskListByIdDTO {
    taskListId: string;
}

export interface IDeleteTaskListByIdDTO {
    taskListId: string;
}

export interface IFindTasksListsByOwnerDTO {
    userId: string;
}

export interface ITaskListRepository {
    findAll(): Promise<TaskList[] | null>;
    findById(data: IFindTaskListByIdDTO): Promise<TaskList | null>;
    create(data: TaskList): Promise<TaskList>;
    update(data: TaskList): Promise<void>;
    remove(data: IDeleteTaskListByIdDTO): Promise<void>;
}
