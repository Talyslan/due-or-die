import { PencilIcon } from '@/components';
import { TaskList } from './_components/TaskList';
import { fetcher } from '@/services';
import { AddTaskForm } from '@/components/AddTaskForm';
import { GetCurrentDayMonthYear } from '@/utils';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchParams: Promise<any>;
}

export default async function SimpleList({ searchParams }: Props) {
    const queryParams = await searchParams;
    const open = !!queryParams.addTask;
    const { day, month, year } = GetCurrentDayMonthYear();

    const { data: user } = await fetcher<User>(`/users/me`);
    const { data: tasks } = await fetcher<Task_JOIN_TaskList[]>(
        `/users/${user?.uid}/tasks`,
    );
    const { data: tasklists } = await fetcher<TaskList[]>(
        `/users/${user?.uid}/tasks-lists`,
    );

    return (
        <div className="flex justify-between gap-10 h-full">
            <div className="flex flex-col gap-5 px-10 pt-10 w-full">
                <h1 className="font-bold text-gray-200">Lista Simples</h1>
                <h2 className="text-main-color-200 font-bold text-4xl">
                    Hoje, {day} de {month} de {year}
                </h2>

                <TaskList tasks={tasks} />
            </div>

            {open ? (
                <AddTaskForm tasksLists={tasklists!} userId={user!.uid} />
            ) : (
                <div className="hidden lg:flex w-full h-full flex-col justify-center items-center bg-main-color-100/10 shadow-lg gap-2">
                    <PencilIcon className="text-gray-100" />
                    <h3 className="text-gray-100 text-center font-bold text-2xl">
                        Clique em uma tarefa <br /> para abri-la
                    </h3>
                </div>
            )}
        </div>
    );
}
