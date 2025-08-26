import { Request, Response, Router } from 'express';
import { wrapRouter } from '../helpers/catch-errors';
import { TaskRepository } from '../repository/task-repository';
import { TaskController } from '../controller/task-controller';

const router = wrapRouter(Router());
const repository = new TaskRepository();
const controller = new TaskController(repository);

router.get('/', (req: Request, res: Response) => controller.findAll(req, res));

router.get('/:taskListId', (req: Request, res: Response) =>
    controller.findById(req, res),
);

router.post('/', (req: Request, res: Response) => controller.create(req, res));

router.put('/:taskListId', (req: Request, res: Response) =>
    controller.update(req, res),
);

router.delete('/:taskListId', (req: Request, res: Response) =>
    controller.remove(req, res),
);

export { router as taskListRouter };
