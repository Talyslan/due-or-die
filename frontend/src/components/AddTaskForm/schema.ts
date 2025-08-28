import { z } from 'zod';

export const addTaskSchema = z.object({
    title: z.string().min(2, 'Título é obrigatório'),
    description: z.string().optional(),
    status: z.enum(['to-do', 'doing', 'done'], 'Status inválido'),
    priority: z.enum(['low', 'medium', 'high'], 'Prioridade inválida'),
});

export type AddTaskFormData = z.infer<typeof addTaskSchema>;
