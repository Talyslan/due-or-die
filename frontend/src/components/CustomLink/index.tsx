import NextLink from 'next/link';
import { cn } from '@/lib/utils';

type AppLinkProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
};

export function CustomLink({ href, children, className }: AppLinkProps) {
    return (
        <NextLink
            href={href}
            className={cn(
                'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-12 px-4 py-2 has-[>svg]:px-3',
                className,
            )}
        >
            {children}
        </NextLink>
    );
}
