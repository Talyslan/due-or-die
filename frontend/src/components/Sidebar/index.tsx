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

export function AppSidebar() {
    const { state } = useSidebar();
    const { signOut } = useAuth();
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
            <SidebarHeader className="flex flex-row w-full justify-between items-center mt-5">
                {state === 'expanded' && (
                    <LogoLightTheme className="bg-white-200 rounded-lg h-12 w-auto" />
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
                <SidebarMenuItem className={state === 'expanded' ? 'ml-5' : ''}>
                    <SidebarMenuButton asChild>
                        <Button
                            className={`bg-transparent border-transparent text-gray-200 hover:bg-main-color-100/20 flex items-center gap-2 rounded-lg border transition-all px-3 py-2`}
                            onClick={() => onLogout()}
                        >
                            <LogoutIcon className="h-5 w-5" />
                            <span className={`font-bold 'text-gray-200'}`}>
                                Sair da conta
                            </span>
                        </Button>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarFooter>
        </Sidebar>
    );
}
