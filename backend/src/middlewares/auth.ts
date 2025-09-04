import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError, verifyToken } from '../helpers';
import {
    UserRepository,
    TaskRepository,
    TaskListRepository,
} from '../repository';
import jwt from 'jsonwebtoken';
import { env } from '../env';

export const authMiddleware = () => {
    const taskListRepository = new TaskListRepository();
    const taskRepository = new TaskRepository();
    const repository = new UserRepository(taskRepository, taskListRepository);

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.access_token;

            if (!token) {
                throw new UnauthorizedError(
                    'Não autorizado: Token inexistente!',
                );
            }

            const decoded = verifyToken(token);
            const userId = decoded;

            if (!userId)
                throw new UnauthorizedError(
                    'Não autorizado: Token expirado ou inválido!',
                );

            const searchedUser = await repository.findById({ uid: userId });

            if (!searchedUser)
                throw new UnauthorizedError(
                    'Não autorizado: Usuário não encontrado!',
                );

            req.user = searchedUser;

            return next();
        } catch (err: any) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
    };
};
