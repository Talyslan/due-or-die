import { isClientSide } from './is-client-side';
import { getServerToken } from './auth';
import { serialize } from 'cookie';

export async function applyCorrectHeaders(config: RequestInit | undefined) {
    let headers: Record<string, string> = {
        ...(config?.headers as Record<string, string>),
    };

    headers = { ...headers, 'Content-Type': 'application/json' };

    if (config?.token && !isClientSide()) {
        headers = {
            ...headers,
            Cookie: serialize('access_token', config?.token),
        };
        delete config.token;
        return headers;
    }

    if (!isClientSide() && !config?.token) {
        const token = await getServerToken();
        if (token) {
            // Check if there are existing cookies and append
            const existingCookies = headers.Cookie || '';
            const separator = existingCookies ? '; ' : '';
            if (!existingCookies.includes('access_token')) {
                headers = {
                    ...headers,
                    Cookie: `${existingCookies}${separator}${serialize('access_token', token)}`,
                };
            }
        }
        return headers;
    }

    return headers;
}
