import Link from 'next/link';
import { LogoLightTheme } from '../assets';
import Image from 'next/image';

export function Header() {
    return (
        <div className="fixed top-5 left-0 right-0 px-10">
            <header className="mx-auto w-full max-w-[800px] bg-main-color-200 rounded-3xl flex items-center justify-between sm:px-8 px-3 py-3 shadow-md">
                <LogoLightTheme className="bg-white-200 rounded-lg h-12 w-auto" />

                <nav>
                    <ul className="flex items-center gap-2 font-bold text-white-200">
                        <li>
                            <Link href="/simple-list">Minhas tarefas</Link>
                        </li>
                        <li>
                            <Link href="/my-profile">
                                <Image
                                    src="/user-image.png"
                                    alt="Foto do Perfil"
                                    width={44}
                                    height={44}
                                    className="bg-white-200 p-1 rounded-full object-cover"
                                />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}
