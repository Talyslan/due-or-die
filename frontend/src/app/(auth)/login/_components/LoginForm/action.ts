'use client';

import { IActionResponse } from '@/action/IActionResponse';
import { fetcher } from '@/services';

interface UserToLogIn {
    email: string;
    password: string;
}

export async function LogIn(data: UserToLogIn): Promise<IActionResponse<User>> {
    try {
        const response = await fetcher<{ message: string }>('/users/login', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        const user = await fetcher<User>('/users/me');

        return {
            success: true,
            message: response.message,
            data: user,
        };
    } catch (err: any) {
        return {
            success: false,
            message: err?.message,
        };
    }
}
