'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import { ElementType, ReactNode } from 'react';
import { Tooltip, TooltipTrigger } from '../ui/tooltip';

interface IProps {
    children: ReactNode;
    href: string;
    Icon: ElementType;
}

export function MenuItem({ children, href, Icon }: IProps) {
    const pathname = usePathname();

    const isActive = pathname.includes(href);

    return (
        <Tooltip>
            <TooltipTrigger>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link
                            href={href}
                            className={`flex items-center gap-2 rounded-lg border transition-all px-3 py-2
                        ${
                            isActive
                                ? 'bg-main-color-100/40 border-main-color-200 text-main-color-300'
                                : 'border-transparent text-gray-200 hover:bg-main-color-100/20'
                        }`}
                        >
                            <Icon
                                className={`h-5 w-5 ${isActive ? 'text-main-color-300' : 'text-gray-400'}`}
                            />
                            <span
                                className={`font-bold ${isActive ? 'text-main-color-300' : 'text-gray-200'}`}
                            >
                                {children}
                            </span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </TooltipTrigger>
        </Tooltip>
    );
}
