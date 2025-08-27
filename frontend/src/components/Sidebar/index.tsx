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

export function AppSidebar() {
    const { state } = useSidebar();

    return (
        <Sidebar collapsible="icon">
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
                <MenuItem Icon={LogoutIcon} href="/logout">
                    Sair da conta
                </MenuItem>
            </SidebarFooter>
        </Sidebar>
    );
}
