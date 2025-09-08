import { fetcher } from '@/services';
import { IActionResponse } from '../IActionResponse';

export async function DeleteTask(
    taskId: string,
): Promise<IActionResponse<Task>> {
    try {
        await fetcher(`/tasks/${taskId}`, { method: 'DELETE' });

        return {
            success: true,
            message: 'Usuário deletado com sucesso!',
            data: null,
        };
    } catch (error) {
        const err = error as Error;
        return {
            success: false,
            message: err?.message || 'Erro ao deletar o usuário',
            data: null,
        };
    }
}
