import { Task_JOIN_TaskList, TaskList, User } from '../../types';

export interface IUpdateUserDTO extends Omit<User, 'createdAt' | 'updatedAt'> {}
interface IUserUID {
    uid: string;
}

export interface IFindUserByIdDTO extends IUserUID {}
export interface IFindTasksByUser extends IUserUID {}
export interface IFindTaskListsByUser extends IUserUID {}
export interface IDeleteUserByIdDTO extends IUserUID {}

export interface IFindUserByEmailDTO {
    email: string;
}

export interface ICreateUserDTO {
    uid: string;
    user: Omit<User, 'uid' | 'createdAt' | 'updatedAt'>;
}

export interface IUserRepository {
    findAll(): Promise<User[] | null>;
    findById(data: IFindUserByIdDTO): Promise<User | null>;
    findByEmail(data: IFindUserByEmailDTO): Promise<User | null>;
    findTasksByOwner(
        data: IFindTasksByUser,
    ): Promise<Task_JOIN_TaskList[] | null>;
    findTaskListsByOwner(
        data: IFindTaskListsByUser,
    ): Promise<TaskList[] | null>;
    create(data: ICreateUserDTO): Promise<User>;
    update(data: IUpdateUserDTO): Promise<void>;
    remove(data: IDeleteUserByIdDTO): Promise<void>;
}
