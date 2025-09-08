'use client';

import { IActionResponse } from '@/action';
import { fetcher } from '@/services';

export async function UpdateTask(data: Task): Promise<IActionResponse<Task>> {
    try {
        const { message } = await fetcher(`/tasks/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });

        return {
            success: true,
            message: message ?? 'Tarefa atualizada com sucesso!',
            data: null,
        };
    } catch (error) {
        const err = error as Error;

        return {
            success: false,
            message: err?.message || 'Erro ao atualizar a tarefa',
            data: null,
        };
    }
}
