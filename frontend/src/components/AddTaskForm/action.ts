'use client';

import { IActionResponse } from '@/action/IActionResponse';
import { fetcher } from '@/services';

export async function CreateTask(
    data: Omit<Task, 'id'>,
): Promise<IActionResponse<Task>> {
    try {
        const response = await fetcher<{ message: string }>('/tasks/', {
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
            message: err?.message,
        };
    }
}
