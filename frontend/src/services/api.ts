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

        const text = await response.text();

        const data = text ? JSON.parse(text) : null;

        if (!response.ok) {
            const message =
                data?.message || response.statusText || 'Erro desconhecido';
            throw new Error(message);
        }

        return data as T;
    } catch (err) {
        console.error('API fetch error:', err);
        throw err;
    }
}
