import { Skeleton } from '@/components/ui/skeleton';

export function AddTaskFormLoading() {
    return (
        <div className="w-full h-full flex flex-col justify-between bg-main-color-100/10 shadow-lg gap-2 p-10">
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-10 w-full" />
                </div>

                <Skeleton className="h-px w-full" />

                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-10 w-full" />
                </div>

                <Skeleton className="h-px w-full" />

                <div className="flex flex-col gap-5">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-6 w-44" />
                </div>
            </div>

            <div className="flex w-full gap-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
            </div>
        </div>
    );
}
