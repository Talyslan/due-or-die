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

    try {
        let response = await fetch(`${baseUrl}/api${url}`, {
            ...config,
            headers,
            credentials: 'include',
        });

        // console.log(isClientSide());
        // console.log(response.status);

        if (isClientSide() && response.status === 401) {
            await fetch(`${baseUrl}/api/users/refresh-token`, {
                ...config,
                method: 'POST',
                credentials: 'include',
                headers,
            });

            response = await fetch(`${baseUrl}/api${url}`, {
                ...config,
                headers,
                credentials: 'include',
            });

            if (response.status === 401) {
                console.log('!401 token && refresh token client side');
                customRedirectUser('/', 'replace' as RedirectType);
            }

            const text = await response.text();
            const json = text ? JSON.parse(text) : {};

            return { data: json.data ?? null, message: json.message ?? null };
        }

        const text = await response.text();
        const json = text ? JSON.parse(text) : {};

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
            redirect('/login', 'replace' as RedirectType);
        }

        throw error;
    }
}
