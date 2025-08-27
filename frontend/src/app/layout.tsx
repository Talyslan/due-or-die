import type { Metadata } from 'next';
import { lobster, urbanist } from '@/fonts';
import '@/styles/globals.css';

export const metadata: Metadata = {
    title: 'Due or Die',
    description: 'Sua to-do list definitiva: organize, conclua, vença.',
    robots: {
        follow: true,
        index: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta charSet="UTF-8" />
                <meta name="robots" content="index, follow" />

                <title>Due or Die - Sua To-Do List Definitiva</title>

                <meta
                    name="description"
                    content="Due or Die é a to-do list que une simplicidade, tecnologia e urgência. Organize suas tarefas, aumente sua produtividade e vença a procrastinação."
                />
                <meta
                    name="keywords"
                    content="to-do list, lista de tarefas, produtividade, organização, tarefas, gestão de tempo, due or die, app de tarefas, foco, objetivos"
                />
                <meta name="author" content="Due or Die Team" />
            </head>

            <body
                className={`${urbanist.variable} ${lobster.variable} antialiased bg-background text-foreground`}
                cz-shortcut-listen="true"
            >
                {children}
            </body>
        </html>
    );
}
