import { TaskList, TaskList_JOIN_Tasks } from '../../types';

export interface IFindTaskListByIdDTO {
    id: string;
}

export interface IDeleteTaskListDTO {
    id: string;
}

export interface IUpdateTaskListDTO
    extends Omit<TaskList, 'createdAt' | 'updatedAt'> {}

export interface ICreateTaskListDTO
    extends Omit<TaskList, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IFindTaskListsByOwner {
    userId: string;
}

export interface ITaskListRepository {
    findAll(): Promise<TaskList[] | null>;
    findById(data: IFindTaskListByIdDTO): Promise<TaskList_JOIN_Tasks | null>;
    findTaskListsByOwner(
        data: IFindTaskListsByOwner,
    ): Promise<TaskList[] | null>;
    create(data: ICreateTaskListDTO): Promise<TaskList>;
    update(data: IUpdateTaskListDTO): Promise<void>;
    remove(data: IDeleteTaskListDTO): Promise<void>;
}
