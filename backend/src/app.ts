import express, { type Express, Request, Response } from 'express';
import cors from 'cors';
import { env } from './env';
import { userRouter } from './routes/users';
import { ErrorHandler } from './middlewares/error-handler';
import { taskRouter } from './routes/tasks';
import { taskListRouter } from './routes/task-lists';

class App {
    public express: Express;

    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
        this.errorHandlers();
    }

    private middlewares() {
        this.express.use(
            cors({
                origin: env.CLIENT_URL,
                credentials: true,
            }),
        );
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
    }

    private routes() {
        this.express.get('/', (_req: Request, res: Response) =>
            res.json({ response: 'Due or Die API has been started!' }),
        );

        this.express.use('/users', userRouter);
        this.express.use('/tasks', taskRouter);
        this.express.use('/tasks-lists', taskListRouter);
    }

    private errorHandlers() {
        this.express.use(ErrorHandler);
    }
}

export default new App().express;
