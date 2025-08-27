import { decode, JwtPayload, sign, verify } from 'jsonwebtoken';
import { env } from '../env';

export const createToken = (payload: string) => {
    const token = sign(
        {
            sub: payload,
        },
        env.TOKEN_SECRET!,
        { expiresIn: '5m' },
    );

    return token;
};

export const verifyToken = (token: string) => {
    try {
        const { sub, exp } = verify(token, env.TOKEN_SECRET!) as JwtPayload;

        if (!sub || !exp) {
            return false;
        }

        if (exp < Date.now() / 1000) {
            return false;
        }

        return sub;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export function verifyRefreshToken(token: string) {
    try {
        const { sub, exp } = verify(
            token,
            env.REFRESH_TOKEN_SECRET!,
        ) as JwtPayload;

        if (!sub || !exp) {
            return false;
        }

        if (exp < Date.now() / 1000) {
            return false;
        }

        return sub;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export function createRefreshToken(payload: string) {
    const token = sign(
        {
            sub: payload,
        },
        env.REFRESH_TOKEN_SECRET!,
        { expiresIn: '10d' },
    );

    return token;
}

export function decodeToken(token: string) {
    const sub = decode(token)?.sub as string;
    return sub;
}
