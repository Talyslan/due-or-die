import { redirect, RedirectType } from 'next/navigation';
import { applyCorrectHeaders, isClientSide } from '@/utils';
import { customRedirectUser } from '@/utils/custom-redirect';
import { getBaseUrl } from '@/utils/get-base-url';

export async function fetcher<T>(
    url: string,
    config: RequestInit = {},
): Promise<FetchResult<T>> {
    const headers = await applyCorrectHeaders(config);
    const baseUrl = getBaseUrl();

    console.log('[FETCHER] start', {
        url,
        isClient: isClientSide(),
        method: config.method ?? 'GET',
    });

    try {
        const response = await fetch(`${baseUrl}/api${url}`, {
            ...config,
            headers,
            credentials: 'include',
        });

        console.log('[FETCHER] response', {
            url,
            status: response.status,
            redirected: response.redirected,
        });

        const contentType = response.headers.get('content-type') ?? '';

        if (!contentType.includes('application/json')) {
            const text = await response.text();

            console.error('[FETCHER] non-json', {
                url,
                status: response.status,
                text: text.slice(0, 200),
            });

            // SSR: redireciona
            if (!isClientSide()) {
                console.error('[FETCHER] redirect SSR -> /login');
                redirect('/login');
            }

            throw new Error('Resposta inválida da API');
        }

        if (isClientSide() && response.status === 401) {
            const refresh = await fetch(`${baseUrl}/api/users/refresh-token`, {
                ...config,
                method: 'POST',
                credentials: 'include',
                headers,
            });

            if (!refresh.ok) {
                customRedirectUser('/', 'replace' as RedirectType);
                return { data: null, message: null };
            }

            const retry = await fetch(`${baseUrl}/api${url}`, {
                ...config,
                headers,
                credentials: 'include',
            });

            if (!retry.ok) {
                customRedirectUser('/', 'replace' as RedirectType);
                return { data: null, message: null };
            }

            const retryJson = await retry.json();

            // if (response.status === 401) {
            //     console.log('!401 token && refresh token client side');
            //     customRedirectUser('/', 'replace' as RedirectType);
            // }

            // const text = await response.json();
            // const json = text ? JSON.parse(text) : {};
            return {
                data: retryJson.data ?? null,
                message: retryJson.message ?? null,
            };
        }

        const json = await response.json();

        console.log('[FETCHER] json ok', {
            url,
            hasData: !!json?.data,
        });

        if (!response.ok) {
            throw new Error(json?.message ?? 'Erro desconhecido');
        }

        return { data: json.data ?? null, message: json.message ?? null };
    } catch (err) {
        const error = err as Error;
        console.error('API fetch error:', error);

        if (
            error.message.includes('Token expirado') ||
            error.message.includes('Não autorizado')
        ) {
            if (!isClientSide()) {
                redirect('/login');
            } else {
                customRedirectUser('/login', 'replace' as RedirectType);
            }
        }

        throw error;
    }
}
