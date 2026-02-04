import { fetcher } from '@/services';
import { TaskList } from '@/app/(application)/simple-list/_components/TaskList';
import { GetCurrentDayMonthYear } from '@/utils';

export async function SimpleListSidebar() {
    const { day, month, year } = GetCurrentDayMonthYear();
    const { data: user } = await fetcher<User>(`/users/me`);
    const { data: tasks } = await fetcher<Task[]>(`/users/${user?.uid}/tasks`, {
        next: { revalidate: 60 },
    });

    const normalizedTasks: Task_JOIN_TaskList[] | null = tasks
        ? tasks.map(task => ({
              ...task,
              taskList: null,
          }))
        : null;

    return (
        <div className="lg:flex hidden w-1/2 flex-col gap-5 pl-10 pt-10">
            <h1 className="font-bold text-gray-200">Lista Simples</h1>
            <h2 className="text-main-color-200 font-bold text-4xl">
                Hoje, {day} de {month} de {year}
            </h2>

            <TaskList tasks={normalizedTasks} />
        </div>
    );
}
