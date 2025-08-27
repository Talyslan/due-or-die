import { z } from 'zod';

export const registerSchema = z
    .object({
        name: z.string().min(2, 'Nome é obrigatório'),
        email: z.email('Email inválido'),
        password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
        passwordConfirm: z.string().min(6, 'Confirmação de senha obrigatória'),
    })
    .refine(data => data.password === data.passwordConfirm, {
        message: 'As senhas não coincidem',
        path: ['passwordConfirm'],
    });

export type RegisterFormData = z.infer<typeof registerSchema>;
