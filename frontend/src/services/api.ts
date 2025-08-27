import { env } from '@/env';
import { applyCorrectHeaders } from '@/utils/apply-correct-headers';

export async function fetcher<T>(
    url: string,
    config: RequestInit = {},
): Promise<T> {
    const fullURL = `${env.NEXT_PUBLIC_API_URL}${url}`;

    const headers = await applyCorrectHeaders(config);

    try {
        const response = await fetch(fullURL, {
            ...config,
            headers,
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            console.log(error);
            throw new Error(error.message || 'Erro desconhecido');
        }

        return (await response.json()) as T;
    } catch (err) {
        console.error('API fetch error:', err);
        throw err;
    }
}
