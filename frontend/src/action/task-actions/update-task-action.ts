'use client';

import { IActionResponse } from '@/action';
import { fetcher } from '@/services';

export async function UpdateTask(data: Task): Promise<IActionResponse<Task>> {
    try {
        await fetcher(`/tasks/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });

        return {
            success: true,
            message: 'Tarefa atualizado com sucesso!',
            data: null,
        };
    } catch (error) {
        const err = error as Error;

        return {
            success: false,
            message: err?.message || 'Erro ao atualizar a tarefa.',
            data: null,
        };
    }
}
