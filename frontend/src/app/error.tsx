'use client';

import { Button, ErrorSVG, Link } from '@/components';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="flex flex-col h-screen w-full items-center justify-center">
            <h1>Aconteceu um erro inesperado.</h1>

            <ErrorSVG />

            <p>Erro: {error.message}</p>

            <div className="flex flex-col gap-2 mt-10">
                <Button onClick={() => reset()}>Tente novamente</Button>
                <Link href={'/'}>Voltar ao início</Link>
            </div>
        </main>
    );
}
