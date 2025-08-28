'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@/components';
import { GoogleLogin } from '@/components/GoogleLogin';
import Link from 'next/link';
import { RegisterFormData, registerSchema } from './schema';
import { InputError } from '@/components/InputError';
import { CreateUser } from './action';
import { toast } from 'sonner';
import { fetcher } from '@/services';
import { LogIn } from '@/app/(auth)/login/_components/LoginForm/action';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });
    const router = useRouter();

    const onSubmit = async (data: RegisterFormData) => {
        const action = await CreateUser(data);

        if (action.success) {
            toast.success(action.message);
            const result = await LogIn(data);

            await fetcher('/tasks-lists/', {
                method: 'POST',
                body: JSON.stringify({
                    name: 'Pessoal',
                    userId: result.data?.data.id,
                }),
            });

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            result.success && router.push('/simple-list');
        } else {
            toast.error(action.message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white-200 sm:w-1/2 w-full px-12 flex flex-col items-center justify-center gap-4"
        >
            <h1 className="font-bold sm:text-5xl text-4xl">Crie sua conta</h1>

            <GoogleLogin />

            <div className="flex w-full max-w-sm flex-col gap-2">
                <label htmlFor="name" className="flex flex-col gap-1">
                    <span className="font-bold">Nome</span>
                    <Input
                        id="name"
                        placeholder="Digite seu nome"
                        className="placeholder:text-gray-100"
                        {...register('name')}
                    />
                    <InputError helperText={errors.name?.message} />
                </label>

                <label htmlFor="email" className="flex flex-col gap-1">
                    <span className="font-bold">Email</span>
                    <Input
                        id="email"
                        placeholder="Digite seu email"
                        className="placeholder:text-gray-100"
                        {...register('email')}
                    />
                    <InputError helperText={errors.email?.message} />
                </label>

                <label htmlFor="password" className="flex flex-col gap-1">
                    <span className="font-bold">Senha</span>
                    <Input
                        id="password"
                        placeholder="Digite sua senha"
                        className="placeholder:text-gray-100"
                        type="password"
                        {...register('password')}
                    />
                    <InputError helperText={errors.password?.message} />
                </label>

                <label
                    htmlFor="password-confirm"
                    className="flex flex-col gap-1"
                >
                    <span className="font-bold">Confirme sua senha</span>
                    <Input
                        id="password-confirm"
                        placeholder="Digite sua senha"
                        className="placeholder:text-gray-100"
                        type="password"
                        {...register('passwordConfirm')}
                    />
                    <InputError helperText={errors.passwordConfirm?.message} />
                </label>
            </div>

            <div className="flex flex-col gap-2 w-full max-w-sm">
                <Button className="w-full" disabled={isSubmitting}>
                    Entrar
                </Button>
                <span className="text-sm">
                    Já faz parte do Due or Die?{' '}
                    <Link
                        href={'/login'}
                        className="text-main-color-200 underline"
                    >
                        Entrar na sua conta
                    </Link>
                    .
                </span>
            </div>
        </form>
    );
}
