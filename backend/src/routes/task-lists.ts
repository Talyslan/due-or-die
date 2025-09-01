import { Request, Response, Router } from 'express';
import { TaskListController } from '../controller';
import { TaskListRepository } from '../repository';
import { authMiddleware } from '../middlewares';
import { wrapRouter } from '../helpers';

const router = wrapRouter(Router());
const repository = new TaskListRepository();
const controller = new TaskListController(repository);

router.use(authMiddleware());

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
