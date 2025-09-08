import { fetcher } from '@/services';
import { IActionResponse } from '../IActionResponse';

export async function DeleteTask(
    taskId: string,
): Promise<IActionResponse<Task>> {
    try {
        const { message } = await fetcher(`/tasks/${taskId}`, {
            method: 'DELETE',
        });

        return {
            success: true,
            message: message ?? 'Tarefa deletada com sucesso!',
            data: null,
        };
    } catch (error) {
        const err = error as Error;
        return {
            success: false,
            message: err?.message || 'Erro ao deletar a tarefa',
            data: null,
        };
    }
}
