'use client';

import { ErrorSVG, Link } from '@/components';

export default function Error() {
    return (
        <main className="flex flex-col h-screen w-full items-center justify-center">
            <h1>Aconteceu um erro inesperado.</h1>
            <ErrorSVG />
            <Link href={'/'}>Voltar ao início</Link>
        </main>
    );
}
