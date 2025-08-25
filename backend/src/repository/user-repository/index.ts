import { User } from '../../types';
import {
    IDeleteUserByIdDTO,
    IFindUserByEmailDTO,
    IFindUserByIdDTO,
    IUpdateUserDTO,
    IUserRepository,
} from './type';

export class UserRepository implements IUserRepository {
    findAll(): Promise<User[] | null> {
        throw new Error('Method not implemented.');
    }

    findById(data: IFindUserByIdDTO): Promise<User | null> {
        throw new Error('Method not implemented.');
    }

    findByEmail(data: IFindUserByEmailDTO): Promise<User | null> {
        throw new Error('Method not implemented.');
    }

    create(data: User): Promise<User> {
        throw new Error('Method not implemented.');
    }

    update(data: IUpdateUserDTO): Promise<User> {
        throw new Error('Method not implemented.');
    }
    
    remove(data: IDeleteUserByIdDTO): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
