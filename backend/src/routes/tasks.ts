import { Request, Response, Router } from 'express';
import { wrapRouter } from '../helpers/catch-errors';
import { TaskRepository } from '../repository/task-repository';
import { TaskController } from '../controller/task-controller';
import { TaskListRepository } from '../repository/task-list-repository';

const router = wrapRouter(Router());
const taskListRepository = new TaskListRepository();
const repository = new TaskRepository(taskListRepository);
const controller = new TaskController(repository);

router.get('/', (req: Request, res: Response) => controller.findAll(req, res));

router.get('/:taskId', (req: Request, res: Response) =>
    controller.findById(req, res),
);

router.post('/', (req: Request, res: Response) => controller.create(req, res));

router.put('/:taskId', (req: Request, res: Response) =>
    controller.update(req, res),
);

router.delete('/:taskId', (req: Request, res: Response) =>
    controller.remove(req, res),
);

export { router as taskRouter };
