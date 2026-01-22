'use client';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from '@/components/ui/sidebar';
import {
    KanbanListIcon,
    LogoDarkTheme,
    LogoLightTheme,
    LogoutIcon,
    ProfileIcon,
    SimpleListIcon,
} from '../assets';
import { MenuItem } from './MenuItem';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '../ui';
import { useAuth } from '@/context/auth';
import { ThemeToggle } from '../ThemeToggle';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export function AppSidebar() {
    const { state } = useSidebar();
    const { signOut } = useAuth();
    const { theme } = useTheme();
    const router = useRouter();

    const onLogout = async () => {
        const { message, success } = await signOut();

        if (success) {
            toast.success(message);
            router.push('/');
        } else {
            toast.error(message);
        }
    };

    return (
        <Sidebar
            collapsible="icon"
            className="border-none shadow-lg bg-main-color-100/10"
        >
            <SidebarHeader
                className={cn(
                    'flex flex-row w-full justify-between items-center mt-5',
                    state === 'collapsed' && 'justify-center',
                )}
            >
                {state === 'expanded' && theme === 'light' ? (
                    <LogoLightTheme className="rounded-lg h-12 w-auto" />
                ) : (
                    <LogoDarkTheme className="rounded-lg h-12 w-auto" />
                )}
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent className="mt-10">
                <SidebarGroup>
                    <SidebarGroupLabel className="uppercase text-gray-100 font-bold">
                        Visualização
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <MenuItem Icon={SimpleListIcon} href="/simple-list">
                                Lista Simples
                            </MenuItem>
                            <MenuItem Icon={KanbanListIcon} href="/kanban-list">
                                Lista Kanban
                            </MenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel className="uppercase text-gray-100 font-bold">
                        Perfil
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <MenuItem Icon={ProfileIcon} href="/my-profile">
                                Meu Perfil
                            </MenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="mb-5">
                <ThemeToggle />
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Button
                            className="group/logout bg-transparent border-transparent hover:border-destructive text-gray-200 hover:bg-destructive/10 flex items-center gap-2 rounded-lg border transition-all px-3 py-2"
                            onClick={onLogout}
                        >
                            <LogoutIcon className="h-5 w-5 text-gray-200 transition-colors group-hover/logout:text-destructive" />

                            <span className="font-bold text-gray-200 transition-colors group-hover/logout:text-destructive">
                                Sair da conta
                            </span>
                        </Button>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarFooter>
        </Sidebar>
    );
}
