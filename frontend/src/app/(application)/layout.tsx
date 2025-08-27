import { AppSidebar } from '@/components/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

interface AppLayoutProp {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProp) {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <main className="pl-10 pt-10">{children}</main>
            </SidebarProvider>
        </>
    );
}
