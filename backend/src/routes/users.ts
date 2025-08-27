import { Request, Response, Router } from 'express';
import { UserController } from '../controller/user-controller';
import { UserRepository } from '../repository/user-repository';
import { wrapRouter } from '../helpers/catch-errors';
import { TaskRepository } from '../repository/task-repository';
import { TaskListRepository } from '../repository/task-list-repository';

const router = wrapRouter(Router());
const taskRepository = new TaskRepository();
const taskListRepository = new TaskListRepository();
const repository = new UserRepository(taskRepository, taskListRepository);
const controller = new UserController(repository);

router.get('/', (req: Request, res: Response) => controller.findAll(req, res));

router.get('/:userId', (req: Request, res: Response) =>
    controller.findById(req, res),
);

router.get('/:userId/tasks', (req: Request, res: Response) =>
    controller.findTasksByOwner(req, res),
);

router.get('/:userId/tasks-lists', (req: Request, res: Response) =>
    controller.findTasksListsByOwner(req, res),
);

router.post('/', (req: Request, res: Response) => controller.create(req, res));

router.put('/:userId', (req: Request, res: Response) =>
    controller.update(req, res),
);

router.delete('/:userId', (req: Request, res: Response) =>
    controller.remove(req, res),
);

export { router as userRouter };
