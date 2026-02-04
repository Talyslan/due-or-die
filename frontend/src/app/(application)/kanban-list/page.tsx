import { Suspense } from 'react';
import { GetCurrentDayMonthYear } from '@/utils';
import { KanbanListData } from './_components/KanbanListData';
import { Skeleton } from '@/components/ui/skeleton';

export default async function KanbanList() {
    const { day, month, year } = GetCurrentDayMonthYear();

    return (
        <div className="p-10 h-full w-full">
            <div>
                <h1 className="font-bold text-gray-200">Lista Kanban</h1>
                <h2 className="text-main-color-200 font-bold text-4xl mb-5">
                    Hoje, {day} de {month} de {year}
                </h2>
            </div>

            <Suspense
                fallback={
                    <div className="flex gap-4 h-full w-full overflow-x-auto">
                        <Skeleton className="h-full w-[300px] rounded-lg" />
                        <Skeleton className="h-full w-[300px] rounded-lg" />
                        <Skeleton className="h-full w-[300px] rounded-lg" />
                    </div>
                }
            >
                <KanbanListData />
            </Suspense>
        </div>
    );
}
