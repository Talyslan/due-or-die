import { CustomLink } from '@/components';
import { Header } from '@/components/Header';

export default function Home() {
    return (
        <>
            <Header />

            <main className="flex flex-col items-center justify-center gap-10 w-full h-screen">
                <div className="flex flex-col gap-3 items-center justify-center">
                    <h1 className="font-bold md:text-9xl text-6xl">
                        Due or Die
                    </h1>

                    <h2 className="font-bold md:text-5xl text-2xl">
                        Suas tarefas, sem{' '}
                        <strong
                            className={`font-lobster italic text-main-color-200 relative`}
                        >
                            desculpas
                            <div className="md:w-20 md:h-20 w-8 h-8 border-main-color-200 border-2 rounded-full absolute xs:-right-10 md:-right-25 -right-6 md:-top-15 -top-8"></div>
                        </strong>
                        .
                    </h2>
                    <h3 className="md:text-2xl text-md">
                        Organize, conclusa e alcance seus objetivos
                    </h3>
                </div>

                <CustomLink href="/simple-list" className="text-xl">
                    Comece agora!
                </CustomLink>
            </main>
        </>
    );
}
