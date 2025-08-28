/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/tokens';
import { UnauthorizedError } from '../helpers/errors';
import { UserRepository } from '../repository/user-repository';
import { TaskRepository } from '../repository/task-repository';
import { TaskListRepository } from '../repository/task-list-repository';

export const authMiddleware = () => {
    const taskListRepository = new TaskListRepository();
    const taskRepository = new TaskRepository(taskListRepository);
    const repository = new UserRepository(taskRepository, taskListRepository);

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.access_token as string;

            if (!token) {
                throw new UnauthorizedError(
                    'Não autorizado: Token inexistente!',
                );
            }

            const userId = verifyToken(token);

            if (!userId)
                throw new UnauthorizedError(
                    'Não autorizado: Token expirado ou inválido!',
                );

            const searchedUser = await repository.findById({ userId });

            if (!searchedUser)
                throw new UnauthorizedError(
                    'Não autorizado: Usuário não encontrado!',
                );

            req.user = { id: userId, ...searchedUser };

            return next();
        } catch (err: any) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
    };
};
