import { redirect, RedirectType } from 'next/navigation';
import { env } from '@/env';
import { applyCorrectHeaders, isClientSide } from '@/utils';
import { customRedirectUser } from '@/utils/custom-redirect';

export async function fetcher<T>(
    url: string,
    config: RequestInit = {},
): Promise<FetchResult<T>> {
    const fullURL = `${env.NEXT_PUBLIC_API_URL}${url}`;
    const headers = await applyCorrectHeaders(config);

    try {
        let response = await fetch(fullURL, {
            ...config,
            headers,
            credentials: 'include',
        });

        // console.log(isClientSide());
        // console.log(response.status);

        if (isClientSide() && response.status === 401) {
            await fetch(`${env.NEXT_PUBLIC_API_URL}/users/refresh-token`, {
                ...config,
                method: 'POST',
                credentials: 'include',
                headers,
            });

            response = await fetch(fullURL, {
                ...config,
                headers,
                credentials: 'include',
            });

            if (response.status === 401) {
                console.log('!401 token && refresh token client side');
                customRedirectUser('/', 'replace' as RedirectType);
            }

            const json = await response.json();

            return { data: json.data ?? null, message: json.message ?? null };
        }

        const json = await response.json();

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
