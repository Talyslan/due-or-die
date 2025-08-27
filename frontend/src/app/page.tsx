import { Link } from '@/components';
import { Header } from '@/components/Header';

export default function Home() {
    return (
        <>
            <Header />

            <main className="flex flex-col items-center justify-center gap-10 w-full h-screen">
                <div className="flex flex-col gap-3 items-center justify-center">
                    <h1 className="font-bold text-9xl">Due or Die</h1>

                    <h2 className="font-bold text-5xl">
                        Suas tarefas, sem{' '}
                        <strong
                            className={`font-lobster italic text-main-color-200 relative`}
                        >
                            desculpas
                            <div className="w-20 h-20 border-main-color-200 border-2 rounded-full absolute -right-40 -top-15"></div>
                        </strong>
                        .
                    </h2>
                    <h3 className="text-2xl">
                        Organize, conclusa e alcance seus objetivos
                    </h3>
                </div>

                <Link href="/simple-list" className="text-xl">
                    Comece agora!
                </Link>
            </main>
        </>
    );
}
