'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import {
    Button,
    Input,
    InputError,
    GoogleLogin,
    PasswordVisualization,
} from '@/components';
import { RegisterFormData, registerSchema } from './schema';
import { useAuth } from '@/context/auth';
import { fetcher } from '@/services';

export function RegisterForm() {
    const router = useRouter();
    const { createAccount, signIn } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        const { success, message } = await createAccount(data);

        // console.log('CreateAccount success: ' + success);
        // console.log('CreateAccount message: ' + message);
        if (!success) toast.error(message);

        const {
            success: loginSuccess,
            // message: loginMessage,
            data: userLogged,
        } = await signIn(data.email, data.password);

        // console.log('Login success: ' + loginSuccess);
        // console.log('Login message: ' + loginMessage);

        await fetcher('/tasks-lists/', {
            method: 'POST',
            body: JSON.stringify({
                name: 'Pessoal',
                userId: userLogged?.uid,
            }),
        });

        if (loginSuccess) router.push('/simple-list');
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
                    <div className="relative w-full">
                        <Input
                            id="password"
                            placeholder="Digite sua senha"
                            className="placeholder:text-gray-100"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                        />
                        <PasswordVisualization
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />
                        <InputError helperText={errors.password?.message} />
                    </div>
                </label>

                <label
                    htmlFor="password-confirm"
                    className="flex flex-col gap-1"
                >
                    <span className="font-bold">Confirme sua senha</span>
                    <div className="relative w-full">
                        <Input
                            id="password-confirm"
                            placeholder="Digite sua senha"
                            className="placeholder:text-gray-100"
                            type={showPasswordConfirm ? 'text' : 'password'}
                            {...register('passwordConfirm')}
                        />
                        <PasswordVisualization
                            showPassword={showPasswordConfirm}
                            setShowPassword={setShowPasswordConfirm}
                        />
                        <InputError
                            helperText={errors.passwordConfirm?.message}
                        />
                    </div>
                </label>
            </div>

            <div className="flex flex-col gap-2 w-full max-w-sm">
                <Button className="w-full" disabled={isSubmitting}>
                    Criar conta
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
