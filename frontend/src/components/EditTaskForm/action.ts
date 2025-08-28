'use client';

import { IActionResponse } from '@/action/IActionResponse';
import { fetcher } from '@/services';

export async function UpdateTask(data: Task): Promise<IActionResponse<Task>> {
    try {
        await fetcher<{ message: string }>(`/tasks/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });

        return {
            success: true,
            message: 'Tarefa atualizado com sucesso!',
        };
    } catch (err: any) {
        return {
            success: false,
            message: err?.message || 'Erro ao atualizar a tarefa.',
        };
    }
}

export async function DeleteTask(
    taskId: string,
): Promise<IActionResponse<Task>> {
    try {
        const response = await fetcher<{ message: string }>(
            `/tasks/${taskId}`,
            {
                method: 'DELETE',
            },
        );

        console.log(response);

        return {
            success: true,
            message: 'Usuário deletado com sucesso!',
        };
    } catch (err: any) {
        return {
            success: false,
            message: err?.message || 'Erro ao deletar o usuário.',
        };
    }
}
