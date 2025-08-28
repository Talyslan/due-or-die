import { Request, Response } from 'express';
import { BadRequest } from '../helpers/errors';
import { ITaskListRepository } from '../repository/task-list-repository/type';

export class TaskListController {
    constructor(private readonly repository: ITaskListRepository) {}

    async findAll(_req: Request, res: Response) {
        const tasksLists = await this.repository.findAll();
        return res.status(200).json({ data: tasksLists });
    }

    async findById(req: Request, res: Response) {
        const { taskListId } = req.params;

        if (!taskListId)
            throw new Error(
                'Identificador da lista de tarefas não fornecida na requisição.',
            );

        const taskList = await this.repository.findById({ taskListId });

        return res.status(200).json(taskList);
    }

    async create(req: Request, res: Response) {
        const requiredFields = ['name', 'userId'];
        const missingFields: string[] = [];
        requiredFields.forEach(field => {
            if (!req.body?.[field]) missingFields.push(field);
        });

        console.log(req.body);
        if (missingFields.length > 0) {
            throw new BadRequest(
                `Campos obrigatórios ausentes: ${missingFields.join(', ')}`,
            );
        }
        const taskList = await this.repository.create(req.body);

        return res.status(201).json({
            message: 'Lista de tarefa criada com sucesso.',
            data: taskList,
        });
    }

    async update(req: Request, res: Response) {
        const { taskListId } = req.params;

        const requiredFields = ['name', 'userId'];
        const missingFields: string[] = [];
        requiredFields.forEach(field => {
            if (!req.body?.[field]) missingFields.push(field);
        });

        if (missingFields.length > 0) {
            throw new BadRequest(
                `Campos obrigatórios ausentes: ${missingFields.join(', ')}`,
            );
        }

        if (!taskListId)
            throw new Error(
                'Identificador da lista de tarefas não fornecida na requisição.',
            );

        await this.repository.update(req.body);

        return res
            .status(204)
            .json({ message: 'Lista de tarefa atualizada com sucesso.' });
    }

    async remove(req: Request, res: Response) {
        const { taskListId } = req.params;

        if (!taskListId)
            throw new Error(
                'Identificador da lista de tarefas não fornecida na requisição.',
            );

        await this.repository.remove({ taskListId });

        return res
            .status(204)
            .json({ response: 'Lista de tarefas deletada com sucesso.' });
    }
}
