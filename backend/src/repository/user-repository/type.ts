import { Task, TaskList, User, UserWithPassword } from '../../types';
import { IFindTasksListsByOwnerDTO } from '../task-list-repository/type';
import { IFindTasksByOwnerDTO } from '../task-repository/type';

export interface IUpdateUserDTO extends Omit<User, 'id'> {
    userId: string;
}

export interface IFindUserByEmailDTO {
    email: string;
}

export interface IFindUserByIdDTO {
    userId: string;
}

export interface IDeleteUserByIdDTO {
    userId: string;
}

export interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
    photoURL?: string | undefined;
}

export interface IUserRepository {
    findAll(): Promise<User[] | null>;
    findById(data: IFindUserByIdDTO): Promise<Omit<User, 'id'> | null>;
    findByEmail(data: IFindUserByEmailDTO): Promise<UserWithPassword | null>;
    findTasksByOwner(data: IFindTasksByOwnerDTO): Promise<Task[] | null>;
    findTasksListsByOwner(
        data: IFindTasksListsByOwnerDTO,
    ): Promise<TaskList[] | null>;
    create(data: ICreateUserDTO): Promise<User>;
    update(data: IUpdateUserDTO): Promise<void>;
    remove(data: IDeleteUserByIdDTO): Promise<void>;
}
