import { AppSidebar } from '@/components/Sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

interface AppLayoutProp {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProp) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-col gap-5 w-full relative">
                <SidebarTrigger className="absolute top-3 left-5 z-50 flex sm:hidden" />
                {children}
            </main>
        </SidebarProvider>
    );
}
