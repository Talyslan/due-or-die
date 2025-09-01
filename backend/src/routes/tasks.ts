import { Request, Response, Router } from 'express';
import { TaskController } from '../controller';
import { TaskRepository } from '../repository';
import { authMiddleware } from '../middlewares';
import { wrapRouter } from '../helpers';

const router = wrapRouter(Router());
const repository = new TaskRepository();
const controller = new TaskController(repository);

router.use(authMiddleware());

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
