import Image from 'next/image';
import { Button, Input, LoginSVG } from '@/components';
import Link from 'next/link';

export default function Login() {
    return (
        <main className="flex h-screen w-full">
            <div className="bg-main-color-200 w-1/2 flex items-center justify-center">
                <LoginSVG className="transform scale-60" />
            </div>

            <form className="bg-white-200 w-1/2 flex flex-col items-center justify-center gap-10">
                <h1 className="font-bold">Login</h1>

                <div className="flex items-center rounded-lg border-2 border-main-color-200 bg-main-color-200 cursor-pointer hover:bg-main-color-200/90 transition-colors">
                    <div className="bg-white p-2 rounded-l-lg flex items-center justify-center">
                        <Image
                            src="/google-logo.png"
                            alt="Logo do Google"
                            width={32}
                            height={32}
                            className="block"
                        />
                    </div>

                    <span className="text-white-100 font-bold px-4">
                        Entrar com Google
                    </span>
                </div>

                <div className="flex w-full max-w-sm flex-col gap-5">
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
                </div>

                <div className="flex flex-col gap-2 w-full max-w-sm">
                    <Button className="w-full">Entrar</Button>
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
        </main>
    );
}
