'use client';

import { IActionResponse } from '@/action/IActionResponse';
import { fetcher } from '@/services';

export async function Logout(): Promise<IActionResponse<void>> {
    try {
        const response = await fetcher<{ message: string }>('/users/logout', {
            method: 'POST',
        });

        return {
            success: true,
            message: response.message,
        };
    } catch (err: any) {
        console.log(err);
        return {
            success: false,
            message: err?.message,
        };
    }
}
