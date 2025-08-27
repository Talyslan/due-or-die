'use server';

import { IActionResponse } from '@/action/IActionResponse';
import { fetcher } from '@/services';

interface UserToCreate {
    name: string;
    email: string;
    password: string;
}

export async function CreateUser(
    data: UserToCreate,
): Promise<IActionResponse<void>> {
    try {
        const response = await fetcher<{ message: string }>('/users/', {
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
