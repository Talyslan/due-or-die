import { env } from '@/env';

export async function fetcher<T>(
    url: string,
    config: RequestInit = {},
): Promise<T> {
    const fullURL = env.NEXT_PUBLIC_API_URL + url;

    try {
        const response = await fetch(fullURL, {
            ...config,
            headers: {
                'Content-Type': 'application/json',
                ...(config.headers || {}),
            },
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
