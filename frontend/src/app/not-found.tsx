import { NotFoundSVG, Link } from '@/components';

export default function NotFound() {
    return (
        <div className="flex flex-col h-screen w-full items-center justify-center gap-2">
            <h1>Página não encontrada.</h1>
            <div role="status" className="flex flex-col items-center gap-3">
                <NotFoundSVG className="transform scale-75" />
            </div>
            <Link href={'/'}>Voltar ao início</Link>
        </div>
    );
}
