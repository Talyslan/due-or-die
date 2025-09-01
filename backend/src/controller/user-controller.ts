import { Request, Response } from 'express';
import { IUserRepository } from '../repository/user-repository/type';
import { BadRequest, UnauthorizedError } from '../helpers/errors';
import {
    createRefreshToken,
    createToken,
    decodeToken,
    verifyRefreshToken,
} from '../helpers/tokens';
import { applyTokenCookies } from '../helpers/apply-tokens';
import { env } from '../env';

export class UserController {
    constructor(private readonly repository: IUserRepository) {}

    async findAll(_req: Request, res: Response) {
        const users = await this.repository.findAll();
        return res.status(200).json({ data: users });
    }

    async findById(req: Request, res: Response) {
        const { userId } = req.params;

        if (!userId)
            throw new BadRequest(
                'Identificador do usuário não fornecido na requisição.',
            );

        const user = await this.repository.findById({ uid: userId });

        return res.status(200).json(user);
    }

    async findByEmail(req: Request, res: Response) {
        const { email } = req.params;

        if (!email) throw new BadRequest('Email não fornceido na requisição.');

        const user = this.repository.findByEmail({ email });

        return res.status(200).json(user);
    }

    async findTasksByOwner(req: Request, res: Response) {
        const { userId } = req.params;

        if (!userId)
            throw new BadRequest(
                'Identificador do usuário não fornecido na requisição.',
            );

        const tasks = await this.repository.findTasksByOwner({ uid: userId });

        return res.status(200).json({ data: tasks });
    }

    async findTasksListsByOwner(req: Request, res: Response) {
        const { userId } = req.params;

        if (!userId)
            throw new Error(
                'Identificador do usuário não fornecido na requisição.',
            );

        const tasksLists = await this.repository.findTaskListsByOwner({
            uid: userId,
        });

        return res.status(200).json({ data: tasksLists });
    }

    async create(req: Request, res: Response) {
        const { uid, name, email, photoURL } = req.body;

        if (!name)
            throw new BadRequest('Nome não fornecido no corpo da requisição.');
        if (!email)
            throw new BadRequest('Email não fornecido no corpo requisição.');

        const user = await this.repository.findByEmail({ email });

        if (user)
            throw new BadRequest(
                'Usuário já existe, por favor, entre em sua conta.',
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
        const { email, idTokenGoogle } = req.body;

        if (!email || !idTokenGoogle)
            throw new BadRequest(
                'Email e Token Google Id não fornecidos no corpo requisição.',
            );

        const user = await this.repository.findByEmail({ email });

        if (!user)
            throw new UnauthorizedError(
                'Usuário não encontrado. Por favor, crie sua conta.',
            );

        const accessToken = createToken(user.uid);
        const refreshToken = createRefreshToken(user.uid);

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

        res.status(200).json({ token: newToken });
    }

    public async logout(_req: Request, res: Response) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');

        res.status(200).json({ message: 'Logout foi bem sucedido!' });
    }

    async update(req: Request, res: Response) {
        const { userId } = req.params;
        const { name, email } = req.body || {};

        if (!userId)
            throw new BadRequest(
                'Identificador do usuário não fornecido na requisição.',
            );
        if (!name && !email)
            throw new BadRequest(
                'Nome e email não fornecido no corpo da requisição.',
            );
        if (!name)
            throw new BadRequest('Nome não fornecido no corpo da requisição.');
        if (!email)
            throw new BadRequest('Email não fornecido no corpo da requisição.');

        await this.repository.update({ uid: userId, ...req.body });

        return res
            .status(204)
            .json({ message: 'Usuáro atualizado com sucesso.' });
    }

    async remove(req: Request, res: Response) {
        const { userId } = req.params;

        if (!userId)
            throw new Error(
                'Identificador do usuário não fornecido na requisição.',
            );

        await this.repository.remove({ uid: userId });

        return res
            .status(204)
            .json({ response: 'Usuário deletado com sucesso.' });
    }
}
