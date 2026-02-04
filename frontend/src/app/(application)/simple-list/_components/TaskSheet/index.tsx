'use client';

import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet';
import { useRouter } from 'next/navigation';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface TaskSheetProps {
    isOpen: boolean;
    children: React.ReactNode;
}

export function TaskSheet({ isOpen, children }: TaskSheetProps) {
    const router = useRouter();

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            router.push('/simple-list');
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetContent
                side="right"
                className="w-[400px] sm:w-[540px] p-0 border-none bg-transparent shadow-none"
                onOpenAutoFocus={e => e.preventDefault()}
            >
                <VisuallyHidden>
                    <SheetTitle>Task Details</SheetTitle>
                    <SheetDescription>
                        View or edit task details
                    </SheetDescription>
                </VisuallyHidden>
                <div className="h-full w-full bg-white dark:bg-zinc-950 shadow-2xl overflow-y-auto">
                    {children}
                </div>
            </SheetContent>
        </Sheet>
    );
}
