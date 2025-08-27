import { Button, Input, RegisterSVG } from '@/components';
import { GoogleLogin } from '@/components/GoogleLogin';
import Link from 'next/link';

export default function Register() {
    return (
        <main className="flex h-screen w-full">
            <div className="bg-main-color-200 w-1/2 flex items-center justify-center">
                <RegisterSVG className="transform scale-60" />
            </div>

            <form className="bg-white-200 w-1/2 flex flex-col items-center justify-center gap-10">
                <h1 className="font-bold">Crie sua conta</h1>

                <GoogleLogin />

                <div className="flex w-full max-w-sm flex-col gap-5">
                    <label htmlFor="name" className="flex flex-col gap-1">
                        <span className="font-bold">Nome</span>
                        <Input
                            id="name"
                            placeholder="Digite seu nome"
                            className="placeholder:text-gray-100"
                        />
                    </label>
                    <label htmlFor="email" className="flex flex-col gap-1">
                        <span className="font-bold">Email</span>
                        <Input
                            id="email"
                            placeholder="Digite seu email"
                            className="placeholder:text-gray-100"
                        />
                    </label>
                    <label htmlFor="password" className="flex flex-col gap-1">
                        <span className="font-bold">Senha</span>
                        <Input
                            id="password"
                            placeholder="Digite sua senha"
                            className="placeholder:text-gray-100"
                        />
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
                        />
                    </label>
                </div>

                <div className="flex flex-col gap-2 w-full max-w-sm">
                    <Button className="w-full">Entrar</Button>
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
        </main>
    );
}
