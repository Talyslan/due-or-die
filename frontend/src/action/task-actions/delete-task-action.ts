import { fetcher } from '@/services';
import { IActionResponse } from '../IActionResponse';

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
