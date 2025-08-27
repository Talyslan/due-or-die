import { Request, Response, Router } from 'express';
import { UserController } from '../controller/user-controller';
import { UserRepository } from '../repository/user-repository';
import { wrapRouter } from '../helpers/catch-errors';
import { TaskRepository } from '../repository/task-repository';
import { TaskListRepository } from '../repository/task-list-repository';
import { authMiddleware } from '../middlewares/auth';

const router = wrapRouter(Router());

const taskListRepository = new TaskListRepository();
const taskRepository = new TaskRepository(taskListRepository);

const repository = new UserRepository(taskRepository, taskListRepository);
const controller = new UserController(repository);

router.get('/', authMiddleware(), (req: Request, res: Response) =>
    controller.findAll(req, res),
);

router.get('/me', authMiddleware(), (req: Request, res: Response) => {
    return res.json({ data: { id: req.user?.id, email: req.user?.email } });
});

router.get('/:userId', authMiddleware(), (req: Request, res: Response) =>
    controller.findById(req, res),
);

router.get('/:userId/tasks', authMiddleware(), (req: Request, res: Response) =>
    controller.findTasksByOwner(req, res),
);

router.get(
    '/:userId/tasks-lists',
    authMiddleware(),
    (req: Request, res: Response) => controller.findTasksListsByOwner(req, res),
);

router.post('/', (req: Request, res: Response) => controller.create(req, res));

router.post('/login', (req: Request, res: Response) =>
    controller.login(req, res),
);

router.post('/refresh-token', (req, res) => controller.refreshToken(req, res));

router.post('/logout', authMiddleware(), (req, res) =>
    controller.logout(req, res),
);

router.put('/:userId', authMiddleware(), (req: Request, res: Response) =>
    controller.update(req, res),
);

router.delete('/:userId', authMiddleware(), (req: Request, res: Response) =>
    controller.remove(req, res),
);

export { router as userRouter };
