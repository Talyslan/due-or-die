import express, { type Express, Request, Response } from 'express';
import cors from 'cors';
import { env } from './env';

class App {
    public express: Express;

    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    public middlewares() {
        this.express.use(
            cors({
                origin: env.CLIENT_URL,
                credentials: true,
            }),
        );
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
    }

    public routes() {
        this.express.get('/', (_req: Request, res: Response) =>
            res.json({ response: 'Due or Die API has been started!' }),
        );
    }
}

export default new App().express;
