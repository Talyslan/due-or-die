import { Request, Response } from 'express';
import { IUserRepository } from '../repository/user-repository/type';
import {
    createRefreshToken,
    createToken,
    decodeToken,
    verifyRefreshToken,
    applyTokenCookies,
    BadRequest,
    UnauthorizedError,
    NotFoundError,
} from '../helpers';
import { env } from '../env';

export class UserController {
    constructor(private readonly repository: IUserRepository) {}

    async findAll(req: Request, res: Response) {
        const emailParam = req.query.email;
        const email =
            typeof emailParam === 'string'
                ? emailParam
                : Array.isArray(emailParam)
                  ? emailParam[0]
                  : undefined;

        if (email) {
            const user = await this.repository.findByEmail({ email });
            if (!user) throw new NotFoundError('Usuário não encontrado');
            return res.status(200).json({ data: user });
        }

        const users = await this.repository.findAll();
        return res.status(200).json({ data: users });
    }

    async findById(req: Request, res: Response) {
        const userIdParam = req.params.userId;
        const userId = Array.isArray(userIdParam)
            ? userIdParam[0]
            : userIdParam;

        if (!userId)
            throw new BadRequest(
                'Identificador do usuário não fornecido na requisição.',
            );

        const user = await this.repository.findById({ uid: userId });

        return res.status(200).json({ data: user });
    }

    async findTasksByOwner(req: Request, res: Response) {
        const userIdParam = req.params.userId;
        const userId = Array.isArray(userIdParam)
            ? userIdParam[0]
            : userIdParam;

        if (!userId)
            throw new BadRequest(
                'Identificador do usuário não fornecido na requisição.',
            );

        const tasks = await this.repository.findTasksByOwner({ uid: userId });

        return res.status(200).json({ data: tasks });
    }

    async findTasksListsByOwner(req: Request, res: Response) {
        const userIdParam = req.params.userId;
        const userId = Array.isArray(userIdParam)
            ? userIdParam[0]
            : userIdParam;

        if (!userId)
            throw new BadRequest('Identificador do usuário não fornecido.');

        const tasksLists = await this.repository.findTaskListsByOwner({
            uid: userId,
        });

        return res.status(200).json({ data: tasksLists });
    }

    async create(req: Request, res: Response) {
        const { uid, name, email, photoURL } = req.body;

        if (!uid) throw new BadRequest('Identificador não fornecido.');
        if (!name) throw new BadRequest('Nome não fornecido.');
        if (!email) throw new BadRequest('Email não fornecido.');

        const user = await this.repository.findByEmail({ email });
        if (user)
            throw new BadRequest(
                'Usuário já existe. Por favor, entre em sua conta.',
            );

        const userCreated = await this.repository.create({
            uid,
            user: { name, email, photoURL },
        });

        return res.status(201).json({
            message: 'Usuário criado com sucesso.',
            data: userCreated,
        });
    }

    async login(req: Request, res: Response) {
        const { uid, email } = req.body;

        if (!uid || !email) {
            throw new BadRequest('Dados insuficientes para login.');
        }

        await this.repository.findById({ uid });
        const user = await this.repository.findByEmail({ email });

        if (!user) {
            throw new UnauthorizedError(
                'Usuário não encontrado. Crie sua conta.',
            );
        }

        const accessToken = createToken(uid);
        const refreshToken = createRefreshToken(uid);

        applyTokenCookies(res, { accessToken, refreshToken });

        return res.status(200).json({ message: 'Usuário logado com sucesso!' });
    }

    public async refreshToken(req: Request, res: Response) {
        const refreshToken = req.cookies.refresh_token as string;

        if (!refreshToken)
            throw new UnauthorizedError('O refresh token não foi fornecido.');

        if (!verifyRefreshToken(refreshToken))
            throw new UnauthorizedError('Refresh token inválido.');

        const userId = decodeToken(refreshToken);

        const newToken = createToken(userId);

        const isLocal = env.ENVIRONMENT === 'local';

        res.cookie('access_token', newToken, {
            httpOnly: true,
            secure: !isLocal,
            sameSite: 'none',
            path: '/',
            maxAge: 60 * 5 * 1000,
        });

        res.status(200).json({ data: newToken });
    }

    public async logout(_req: Request, res: Response) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        console.log('logout com sucesso');
        res.status(200).json({ message: 'Logout foi bem sucedido!' });
    }

    async update(req: Request, res: Response) {
        const { userId } = req.params;
        const { name, email } = req.body || {};

        if (!userId)
            throw new BadRequest('Identificador do usuário não fornecido.');
        if (!name && !email)
            throw new BadRequest('Nome e email não fornecido.');
        if (!name) throw new BadRequest('Nome não fornecido.');
        if (!email) throw new BadRequest('Email não fornecido.');

        await this.repository.update({ uid: userId, ...req.body });

        return res
            .status(204)
            .json({ message: 'Usuáro atualizado com sucesso.' });
    }

    async remove(req: Request, res: Response) {
        const { userId } = req.params;

        if (!userId)
            throw new BadRequest('Identificador do usuário não fornecido.');

        await this.repository.remove({ uid: userId });

        return res
            .status(204)
            .json({ message: 'Usuário deletado com sucesso.' });
    }
}
