import { Request, Response } from 'express';
import { ITaskRepository } from '../repository/task-repository/type';
import { BadRequest } from '../helpers';

export class TaskController {
    constructor(private readonly repository: ITaskRepository) {}

    async findAll(_req: Request, res: Response) {
        const tasks = await this.repository.findAll();
        return res.status(200).json({ data: tasks });
    }

    async findById(req: Request, res: Response) {
        const { taskId } = req.params;

        if (!taskId)
            throw new Error(
                'Identificador da tarefa não fornecida na requisição.',
            );

        const task = await this.repository.findById({ id: taskId });

        return res.status(200).json({ data: task });
    }

    async create(req: Request, res: Response) {
        const requiredFields = [
            'title',
            'description',
            'status',
            'priority',
            'taskListId',
            'userId',
        ];
        const missingFields: string[] = [];
        requiredFields.forEach(field => {
            if (!req.body?.[field]) missingFields.push(field);
        });

        if (missingFields.length > 0) {
            throw new BadRequest(
                `Campos obrigatórios ausentes: ${missingFields.join(', ')}`,
            );
        }

        const task = await this.repository.create(req.body);

        return res
            .status(201)
            .json({ message: 'Tarefa criada com sucesso.', data: task });
    }

    async update(req: Request, res: Response) {
        const { taskId } = req.params;
        const requiredFields = [
            'title',
            'description',
            'status',
            'priority',
            'taskListId',
            'userId',
        ];
        const missingFields: string[] = [];
        requiredFields.forEach(field => {
            if (!req.body?.[field]) missingFields.push(field);
        });

        if (missingFields.length > 0) {
            throw new BadRequest(
                `Campos obrigatórios ausentes: ${missingFields.join(', ')}`,
            );
        }

        if (!taskId)
            throw new Error(
                'Identificador da tarefa não fornecida na requisição.',
            );

        await this.repository.update(req.body);

        return res
            .status(204)
            .json({ message: 'Tarefa atualizada com sucesso.' });
    }

    async remove(req: Request, res: Response) {
        const { taskId } = req.params;

        if (!taskId)
            throw new Error(
                'Identificador da tarefa não fornecida na requisição.',
            );

        await this.repository.remove({ id: taskId });

        return res
            .status(204)
            .json({ message: 'Tarefa deletada com sucesso.' });
    }
}
