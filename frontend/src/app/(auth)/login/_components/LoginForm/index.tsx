'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@/components';
import { GoogleLogin } from '@/components/GoogleLogin';
import Link from 'next/link';
import { InputError } from '@/components/InputError';
import { LogIn } from './action';
import { toast } from 'sonner';
import { LoginFormData, loginSchema } from './schema';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';

export function LoginForm() {
    const router = useRouter();
    const { setUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        const action = await LogIn(data);

        if (action.success) {
            toast.success(action.message);
            setUser(action.data ?? null);
            router.push('/simple-list');
        } else {
            toast.error(action.message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white-200 w-1/2 flex flex-col items-center justify-center gap-10"
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
                    <Input
                        id="password"
                        placeholder="Digite sua senha"
                        className="placeholder:text-gray-100"
                        type="password"
                        {...register('password')}
                    />
                    <InputError helperText={errors.password?.message} />
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
