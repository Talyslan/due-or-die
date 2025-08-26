import { Task, User } from '../../types';
import { IFindTasksByOwnerDTO, IFindTasksByTaskListDTO } from '../task-repository/type';

export interface IUpdateUserDTO extends User {
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

export interface IUserRepository {
    findAll(): Promise<User[] | null>;
    findById(data: IFindUserByIdDTO): Promise<User | null>;
    findByEmail(data: IFindUserByEmailDTO): Promise<User | null>;
    findTasksByOwner(data: IFindTasksByOwnerDTO): Promise<Task[] | null>;
    findTasksByTaskList(data: IFindTasksByTaskListDTO): Promise<Task[] | null>;
    create(data: User): Promise<User>;
    update(data: IUpdateUserDTO): Promise<void>;
    remove(data: IDeleteUserByIdDTO): Promise<void>;
}
