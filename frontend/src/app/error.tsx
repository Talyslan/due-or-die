'use client';

import { Button, ErrorSVG, CustomLink } from '@/components';
import { useRouter } from 'next/navigation';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();

    const onTryAgain = () => {
        reset();
        router.refresh();
    };

    return (
        <main className="flex flex-col h-screen w-full items-center justify-center">
            <h1>Aconteceu um erro inesperado.</h1>

            <ErrorSVG />

            <p className="max-w-1/2">Erro: {error.message}</p>

            <div className="flex flex-col gap-2 mt-10">
                <Button onClick={() => onTryAgain()}>Tente novamente</Button>
                <CustomLink href={'/'}>Voltar ao início</CustomLink>
            </div>
        </main>
    );
}
