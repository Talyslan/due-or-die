import { redirect, RedirectType } from 'next/navigation';
import { env } from '@/env';
import { applyCorrectHeaders, isClientSide } from '@/utils';

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

        if (
            isClientSide() &&
            response.status === 401 &&
            !url.includes('/users/me') &&
            !url.includes('/users/login')
        ) {
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
            if (response.status === 401)
                redirect('/', 'replace' as RedirectType);
        }

        const json = await response.json();

        if (!response.ok) {
            const message = json?.message ?? 'Erro desconhecido';
            throw new Error(message);
        }

        return { data: json.data ?? null, message: json.message ?? null };
    } catch (err) {
        const error = err as Error;
        console.error('API fetch error:', error);

        if (
            error.message.includes('Token expirado') ||
            error.message.includes('Não autorizado')
        ) {
            console.log('to aqui');
            await fetch(`${env.NEXT_PUBLIC_API_URL}/users/refresh-token`, {
                ...config,
                method: 'POST',
                credentials: 'include',
                headers,
            });
            const response = await fetch(fullURL, {
                ...config,
                headers,
                credentials: 'include',
            });
            // console.log(response);
            if (response.status === 401)
                redirect('/', 'replace' as RedirectType);
        }

        throw error;
    }
}
