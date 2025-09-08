import { IActionResponse } from '@/action';
import { fetcher } from '@/services';

export async function CreateTask(
    data: Omit<Task, 'id'>,
): Promise<IActionResponse<Task>> {
    try {
        const { message } = await fetcher('/tasks/', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        return {
            data: null,
            success: true,
            message,
        };
    } catch (error) {
        const err = error as Error;
        return {
            success: false,
            message: err.message,
            data: null,
        };
    }
}
