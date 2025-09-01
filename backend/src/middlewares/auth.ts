/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../helpers/errors';
import { UserRepository } from '../repository/user-repository';
import { TaskRepository } from '../repository/task-repository';
import { TaskListRepository } from '../repository/task-list-repository';
import { auth } from '../config/firebase-admin';

export const authMiddleware = () => {
    const taskListRepository = new TaskListRepository();
    const taskRepository = new TaskRepository(taskListRepository);
    const repository = new UserRepository(taskRepository, taskListRepository);

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.access_token;

            if (!token) {
                throw new UnauthorizedError(
                    'Não autorizado: Token inexistente!',
                );
            }

            const decoded = await auth.verifyIdToken(token);
            const userId = decoded.uid;

            if (!userId)
                throw new UnauthorizedError(
                    'Não autorizado: Token expirado ou inválido!',
                );

            const searchedUser = await repository.findById({ userId });

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
