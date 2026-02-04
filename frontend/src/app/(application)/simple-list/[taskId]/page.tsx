import { Suspense } from 'react';
import { TaskDetailData } from './_components/TaskDetailData';
import { TaskSheet } from '../_components/TaskSheet';
import { Skeleton } from '@/components/ui/skeleton';

interface PageProps {
    params: Promise<{
        taskId: string;
    }>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchParams: Promise<any>;
}

function TaskSheetLoading() {
    return (
        <div className="w-full h-full flex flex-col gap-5 bg-main-color-100/10 shadow-lg p-10">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-12 w-3/4" />
            </div>

            <Skeleton className="h-px w-full" />

            <div className="flex-1">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
            </div>

            <Skeleton className="h-px w-full" />

            <div className="flex flex-col gap-3">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-24" />
            </div>

            <div className="flex gap-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
            </div>
        </div>
    );
}

export default async function TaskPage({ params, searchParams }: PageProps) {
    const { taskId } = await params;

    return (
        <TaskSheet isOpen={true}>
            <Suspense fallback={<TaskSheetLoading />}>
                <TaskDetailData taskId={taskId} searchParams={searchParams} />
            </Suspense>
        </TaskSheet>
    );
}
