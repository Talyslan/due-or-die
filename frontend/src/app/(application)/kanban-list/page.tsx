import { fetcher } from '@/services';
import { KanbanBoard } from './_components/KanbanBoard';
import { GetCurrentDayMonthYear } from '@/utils';

export default async function KanbanList() {
    const { day, month, year } = GetCurrentDayMonthYear();
    const { data: user } = await fetcher<User>(`/users/me`);
    const { data: tasks } = await fetcher<Task_JOIN_TaskList[]>(
        `/users/${user?.uid}/tasks`,
    );

    // console.log(tasks);

    return (
        <div className="p-10">
            <h1 className="font-bold text-gray-200">Lista Kanban</h1>
            <h2 className="text-main-color-200 font-bold text-4xl mb-5">
                Hoje, {day} de {month} de {year}
            </h2>

            <KanbanBoard tasks={tasks ?? []} />
        </div>
    );
}
