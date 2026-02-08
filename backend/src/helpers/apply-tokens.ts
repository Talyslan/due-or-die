import { env } from '../env';
import { CookieOptions, Response } from 'express';

const isLocal = env.ENVIRONMENT === 'local';

export const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: !isLocal,
    sameSite: isLocal ? 'lax' : 'none',
    path: '/',
};

export function applyTokenCookies(
    res: Response,
    {
        accessToken,
        refreshToken,
    }: { accessToken: string; refreshToken: string },
) {
    res.cookie('refresh_token', refreshToken, {
        ...cookieOptions,
        maxAge: 10 * 24 * 60 * 60 * 1000,
    });

    res.cookie('access_token', accessToken, {
        ...cookieOptions,
        maxAge: 60 * 15 * 1000,
    });
}
