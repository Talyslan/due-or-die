'use client';

import { IActionResponse } from '@/action/IActionResponse';
import { fetcher } from '@/services';

interface UserToLogIn {
    email: string;
    password: string;
}

export async function LogIn(data: UserToLogIn): Promise<IActionResponse<void>> {
    try {
        const response = await fetcher<{ message: string }>('/users/login', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        return {
            success: true,
            message: response.message,
        };
    } catch (err: any) {
        return {
            success: false,
            message: err?.message || 'Erro ao criar usuário',
        };
    }
}
