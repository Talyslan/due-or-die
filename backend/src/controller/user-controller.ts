import { Request, Response } from 'express';
import { IUserRepository } from '../repository/user-repository/type';

export class UserController {
    constructor(private readonly repository: IUserRepository) {}

    async findAll(_req: Request, res: Response) {
        const users = await this.repository.findAll();
        return res.status(200).json({ data: users });
    }

    async findById(req: Request, res: Response) {
        const { userId } = req.params;

        if (!userId)
            throw new Error(
                'Identificador do usuário não fornecido na requisição.',
            );

        const user = await this.repository.findById({ userId });

        return res.status(200).json(user);
    }

    async findByEmail(req: Request, res: Response) {
        const { email } = req.params;

        if (!email) throw new Error('Email não fornceido na requisição.');

        const user = this.repository.findByEmail({ email });

        return res.status(200).json(user);
    }

    async findTasksByOwner(req: Request, res: Response) {
        const { userId } = req.params;

        if (!userId)
            throw new Error(
                'Identificador do usuário não fornecido na requisição.',
            );

        const user = await this.repository.findById({ userId });
        const tasks = await this.repository.findTasksByOwner({ userId });

        return res.status(200).json({ data: { user, tasks } });
    }

    async findTasksByTaskList(req: Request, res: Response) {
        const { userId, taskListId } = req.params;

        if (!userId)
            throw new Error(
                'Identificador do usuário não fornecido na requisição.',
            );

        if (!taskListId)
            throw new Error(
                'Identificador da lista de tarefas não fornecida na requisição.',
            );

        const user = await this.repository.findById({ userId });
        const tasksByTaskList = await this.repository.findTasksByTaskList({
            userId,
            taskListId,
        });

        return res.status(200).json({ data: { user, tasksByTaskList } });
    }

    async create(req: Request, res: Response) {
        const { name, email, photoURL } = req.body || {};

        if (!name && !email)
            throw new Error(
                'Nome e email não fornecido no corpo da requisição.',
            );
        if (!name)
            throw new Error('Nome não fornecido no corpo da requisição.');
        if (!email) throw new Error('Email não fornecido no corpo requisição.');

        const user = await this.repository.create({ name, email, photoURL });

        return res
            .status(201)
            .json({ message: 'Usuário criado com sucesso.', data: user });
    }

    async update(req: Request, res: Response) {
        const { userId } = req.params;
        const { name, email, photoURL } = req.body || {};

        if (!userId)
            throw new Error(
                'Identificador do usuário não fornecido na requisição.',
            );
        if (!name && !email)
            throw new Error(
                'Nome e email não fornecido no corpo da requisição.',
            );
        if (!name)
            throw new Error('Nome não fornecido no corpo da requisição.');
        if (!email)
            throw new Error('Email não fornecido no corpo da requisição.');

        await this.repository.update({
            userId,
            name,
            email,
            photoURL,
        });

        return res
            .status(204)
            .json({ message: 'Usuáro atualizado com sucesso.' });
    }

    async remove(req: Request, res: Response) {
        const { userId } = req.params;

        if (!userId)
            throw new Error(
                'Identificador do usuário não fornecido na requisição.',
            );

        await this.repository.remove({ userId });

        return res
            .status(204)
            .json({ response: 'Usuário deletado com sucesso.' });
    }
}
