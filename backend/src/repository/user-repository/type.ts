import { User } from '../../types';

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
    create(data: User): Promise<User>;
    update(data: IUpdateUserDTO): Promise<User>;
    remove(data: IDeleteUserByIdDTO): Promise<void>;
}
