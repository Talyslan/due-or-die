import { Request, Response } from 'express';
import { IUserRepository } from '../repository/user-repository/type';
import { UnauthorizedError } from '../helpers/errors';
import {
    createRefreshToken,
    createToken,
    decodeToken,
    verifyRefreshToken,
} from '../helpers/tokens';
import { applyTokenCookies } from '../helpers/apply-tokens';
import bcrypt from 'bcrypt';
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
            throw new Error(
                'Identificador do usuário não fornecido na requisição.',
            );

        const user = await this.repository.findById({ userId });

        return res.status(200).json(user);
    }

    async findByEmail(req: Request, res: Response) {
        const { email } = req.params;

        if (!email) throw new Error('Email não fornceido na requisição.');

        const user = this.repository.findByEmail({ email });

        return res.status(200).json(user);
    }

    async findTasksByOwner(req: Request, res: Response) {
        const { userId } = req.params;

        if (!userId)
            throw new Error(
                'Identificador do usuário não fornecido na requisição.',
            );

        const user = await this.repository.findById({ userId });
        const tasks = await this.repository.findTasksByOwner({ userId });

        return res.status(200).json({ data: { user, tasks } });
    }

    async findTasksListsByOwner(req: Request, res: Response) {
        const { userId } = req.params;

        if (!userId)
            throw new Error(
                'Identificador do usuário não fornecido na requisição.',
            );

        const user = await this.repository.findById({ userId });
        const tasksLists = await this.repository.findTasksListsByOwner({
            userId,
        });

        return res.status(200).json({ data: { user, tasksLists } });
    }

    async create(req: Request, res: Response) {
        const { name, email, password, photoURL } = req.body || {};

        if (!name)
            throw new Error('Nome não fornecido no corpo da requisição.');
        if (!email) throw new Error('Email não fornecido no corpo requisição.');
        if (!password)
            throw new Error('Senha não fornecida no corpo requisição.');

        const hashedPassword = await bcrypt.hash(password, 10);

        const docRef = await this.repository.create({
            name,
            email,
            password: hashedPassword,
            photoURL,
        });

        const user = {
            id: docRef.id,
            name,
            email,
            photoURL,
        };

        return res
            .status(201)
            .json({ message: 'Usuário criado com sucesso.', data: user });
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email) throw new Error('Email não fornecido no corpo requisição.');
        if (!password)
            throw new Error('Senha não fornecida no corpo requisição.');

        const user = await this.repository.findByEmail({ email });

        if (!user)
            throw new UnauthorizedError(
                'Usuário não encontrado. Por favor, crie sua conta.',
            );

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) throw new UnauthorizedError('Senha incorreta!');

        const accessToken = createToken(user.id);
        const refreshToken = createRefreshToken(user.id);

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
            path: '/',
            maxAge: 60 * 5 * 1000,
        });

        res.status(200).json({ message: 'token refreshed' });
    }

    public async logout(_req: Request, res: Response) {
        console.log('entrei')
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');

        res.status(200).json({ message: 'Logout foi bem sucedido!' });
    }

    async update(req: Request, res: Response) {
        const { userId } = req.params;
        const { name, email, photoURL } = req.body || {};

        if (!userId)
            throw new Error(
                'Identificador do usuário não fornecido na requisição.',
            );
        if (!name && !email)
            throw new Error(
                'Nome e email não fornecido no corpo da requisição.',
            );
        if (!name)
            throw new Error('Nome não fornecido no corpo da requisição.');
        if (!email)
            throw new Error('Email não fornecido no corpo da requisição.');

        await this.repository.update({
            userId,
            name,
            email,
            photoURL,
        });

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

        await this.repository.remove({ userId });

        return res
            .status(204)
            .json({ response: 'Usuário deletado com sucesso.' });
    }
}
