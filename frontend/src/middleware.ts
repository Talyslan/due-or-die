import { NextRequest, NextResponse } from 'next/server';
import { fetcher } from './services';
import { serialize } from 'cookie';
import { extractAndParseCookies } from './utils/extract-and-parse-cookies';
import { setResponseCookies } from './utils/set-response-cookies';

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    const token = request.cookies.get('access_token')?.value;
    const refreshToken = request.cookies.get('refresh_token')?.value;

    if (
        (!token || token === 'undefined') &&
        (!refreshToken || refreshToken === 'undefined')
    ) {
        request.nextUrl.pathname = '/login';
        return NextResponse.redirect(request.nextUrl);
    }

    if (
        (!token || token === 'undefined') &&
        (refreshToken || refreshToken === 'undefined')
    ) {
        console.log('entrei');
        const { token: newToken } = await fetcher<{ token: string }>(
            '/users/refresh-token',
            {
                method: 'POST',
                headers: {
                    Cookie: serialize('refresh_token', refreshToken),
                },
            },
        );

        const cookies = extractAndParseCookies(
            `access_token=${newToken}; Path=/; HttpOnly`,
            ['access_token'],
        );
        setResponseCookies(response, cookies);

        return response;
    }

    return response;
}

export const config = {
    matcher: [
        '/simple-list/:path*',
        '/my-profile/:path*',
        '/kanban-list/:path*',
    ],
};
