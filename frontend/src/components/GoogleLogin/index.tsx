import Image from 'next/image';

export function GoogleLogin() {
    return (
        <div className="h-12 flex items-center rounded-lg border-2 border-main-color-200 bg-main-color-200 cursor-pointer hover:bg-main-color-200/90 transition-colors">
            <div className="bg-white p-2 h-full rounded-l-lg flex items-center justify-center">
                <Image
                    src="/google-logo.png"
                    alt="Logo do Google"
                    width={32}
                    height={32}
                    className="block"
                />
            </div>

            <span className="text-white-100 font-bold px-4 text-sm">
                Entrar com Google
            </span>
        </div>
    );
}
