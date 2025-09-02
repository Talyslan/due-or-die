import { redirect } from 'next/navigation';
import { env } from '@/env';
import { applyCorrectHeaders } from '@/utils';

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
    } catch (err: any) {
        if (
            err.message.includes('Token expirado') ||
            err.message.includes('Não autorizado')
        ) {
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            } else {
                redirect('/login');
            }
        }

        console.error('API fetch error:', err);
        throw err;
    }
}
