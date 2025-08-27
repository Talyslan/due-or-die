import { parseCookies } from 'nookies';
import { isClientSide } from './is-client-side';

export async function getServerToken() {
    const cookies = (await import('next/headers')).cookies;
    const token = (await cookies()).get('access_token')?.value;
    return token;
}

export async function getServerRefreshToken() {
    const cookies = (await import('next/headers')).cookies;
    const token = (await cookies()).get('refresh_token')?.value;
    return token!;
}

export async function hasToken() {
    if (!isClientSide()) {
        const cookies = (await import('next/headers')).cookies;
        const token = (await cookies()).get('access_token')?.value;
        return !!token;
    }
    const { access_token: token } = parseCookies();

    return !!token;
}
