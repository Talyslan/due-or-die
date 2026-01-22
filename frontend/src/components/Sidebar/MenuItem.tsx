'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from '../ui/sidebar';
import { ElementType, ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface IProps {
    children: ReactNode;
    href: string;
    Icon: ElementType;
}

export function MenuItem({ children, href, Icon }: IProps) {
    const pathname = usePathname();
    const { state } = useSidebar();

    const isActive = pathname.includes(href);
    const isCollapsed = state === 'collapsed';

    const content = (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                className={`transition-all rounded-lg border border-transparent
            ${
                isActive
                    ? 'bg-main-color-100/40 text-main-color-300 dark:text-main-color-100 hover:bg-main-color-100/50  border-main-color-200'
                    : 'text-gray-200 hover:bg-gray-200/10 hover:border-gray-200'
            }`}
            >
                <Link href={href} className="flex items-center gap-2 px-3 py-2">
                    <Icon
                        className={`h-5 w-5 transition-colors ${
                            isActive ? 'text-main-color-300' : 'text-gray-400'
                        }`}
                    />

                    {state === 'expanded' && (
                        <span
                            className={`font-bold transition-colors ${
                                isActive
                                    ? 'text-main-color-300 dark:text-main-color-100'
                                    : 'text-gray-200'
                            }`}
                        >
                            {children}
                        </span>
                    )}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );

    if (!isCollapsed) {
        return content;
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>{content}</TooltipTrigger>
            <TooltipContent side="right">
                <p>{children}</p>
            </TooltipContent>
        </Tooltip>
    );
}
