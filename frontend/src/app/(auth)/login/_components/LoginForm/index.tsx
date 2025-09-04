'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Button,
    Input,
    InputError,
    GoogleLogin,
    PasswordVisualization,
} from '@/components';
import Link from 'next/link';
import { toast } from 'sonner';
import { LoginFormData, loginSchema } from './schema';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';
import { useState } from 'react';

export function LoginForm() {
    const router = useRouter();
    const { signIn } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        const action = await signIn(data.email, data.password);

        if (action.success) {
            toast.success(action.message);
            router.push('/simple-list');
        } else {
            toast.error(action.message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white-200 sm:w-1/2 w-full px-12 flex flex-col items-center justify-center gap-10"
        >
            <h1 className="font-bold text-7xl">Login</h1>

            <GoogleLogin />

            <div className="flex w-full max-w-sm flex-col gap-5">
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
                            type={showPassword ? 'text' : 'password'}
                            className="placeholder:text-gray-100"
                            {...register('password')}
                        />
                        <PasswordVisualization
                            setShowPassword={setShowPassword}
                            showPassword={showPassword}
                        />

                        <InputError helperText={errors.password?.message} />
                    </div>
                </label>
            </div>

            <div className="flex flex-col gap-2 w-full max-w-sm">
                <Button
                    className="w-full"
                    disabled={isSubmitting}
                    type={'submit'}
                >
                    Entrar
                </Button>
                <span className="text-sm">
                    Ainda não faz parte do Due or Die?{' '}
                    <Link
                        href={'/register'}
                        className="text-main-color-200 underline"
                    >
                        Crie sua conta
                    </Link>
                    .
                </span>
            </div>
        </form>
    );
}
