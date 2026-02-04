import { NextRequest, NextResponse } from 'next/server';
import { fetcher } from './services';
import { serialize } from 'cookie';
import {
    extractAndParseCookies,
    setResponseCookies,
    isTokenExpired,
} from './utils';

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    const token = request.cookies.get('access_token')?.value;
    const refreshToken = request.cookies.get('refresh_token')?.value;

    if (
        (!token || isTokenExpired(token)) &&
        (!refreshToken || isTokenExpired(refreshToken)) &&
        request.nextUrl.pathname !== '/login'
    ) {
        request.nextUrl.pathname = '/login';
        return NextResponse.redirect(request.nextUrl);
    }

    if (
        token &&
        !isTokenExpired(token) &&
        request.nextUrl.pathname === '/login'
    ) {
        return NextResponse.redirect(new URL('/simple-list', request.url));
    }

    if (
        (!token || isTokenExpired(token)) &&
        refreshToken &&
        !isTokenExpired(refreshToken)
    ) {
        const { data: newToken } = await fetcher<string>(
            '/users/refresh-token',
            {
                method: 'POST',
                headers: {
                    Cookie: serialize('refresh_token', refreshToken),
                },
            },
        );

        if (!newToken) {
            request.nextUrl.pathname = '/login';
            return NextResponse.redirect(request.nextUrl);
        }

        const cookies = extractAndParseCookies(
            `access_token=${newToken}; Path=/; HttpOnly`,
            ['access_token'],
        );
        setResponseCookies(response, cookies);

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set(
            'Cookie',
            `access_token=${newToken}; refresh_token=${refreshToken}`,
        );

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
            headers: response.headers,
        });
    }

    return response;
}

export const config = {
    matcher: [
        '/simple-list/:path*',
        '/my-profile/:path*',
        '/kanban-list/:path*',
        '/login',
    ],
};
