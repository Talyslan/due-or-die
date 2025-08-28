import { PencilIcon } from '@/components';
import { TaskList } from './_components/TaskList';
import { firstLetterToUpperCase } from '@/utils/first-letter-to-upper-case';
import { fetcher } from '@/services';
import { AddTaskForm } from '@/components/AddTaskForm';

interface Props {
    searchParams: Promise<any>;
}

export default async function SimpleList({ searchParams }: Props) {
    const queryParams = await searchParams;
    const open = !!queryParams.addTask;

    const data = new Date();
    const day = data.getDate();
    const month = firstLetterToUpperCase(
        data.toLocaleString('pt-BR', { month: 'long' }),
    );
    const year = data.getFullYear();

    const { data: user } = await fetcher<IFetch<User>>(`/users/me`);
    const { data: result } = await fetcher<IFetch<Task[]>>(
        `/users/${user.id}/tasks`,
    );
    const tasks = result.tasks;
    const taskslists = await fetcher(`/users/${user.id}/tasks-lists`);

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
                <AddTaskForm
                    tasksLists={taskslists.data.tasksLists}
                    userId={user.id}
                />
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
