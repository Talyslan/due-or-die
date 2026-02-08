import { env } from '../env';
import { Response } from 'express';

export function applyTokenCookies(
    res: Response,
    {
        accessToken,
        refreshToken,
    }: { accessToken: string; refreshToken: string },
) {
    const isLocal = env.ENVIRONMENT === 'local';

    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: !isLocal,
        path: '/',
        maxAge: 10 * 24 * 60 * 60 * 1000,
        sameSite: isLocal ? 'lax' : 'none',
    });

    res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: !isLocal,
        path: '/',
        maxAge: 60 * 15 * 1000,
        sameSite: isLocal ? 'lax' : 'none',
    });
}
