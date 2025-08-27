import { AppSidebar } from '@/components/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

interface AppLayoutProp {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProp) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-col gap-5 w-full">{children}</main>
        </SidebarProvider>
    );
}
