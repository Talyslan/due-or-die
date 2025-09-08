import { CustomLink, ListIcon, StatusIcon } from '@/components';
import { fetcher } from '@/services';
import { firstLetterToUpperCase } from '@/utils';
import { TaskList } from '../_components/TaskList';
import { EditTaskForm } from '@/components/EditTaskForm';

interface PageProps {
    params: {
        taskId: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchParams: Promise<any>;
}

export default async function TaskPage({ params, searchParams }: PageProps) {
    const { taskId } = await params;
    const queryParams = await searchParams;
    const edit = !!queryParams.editTask;

    const { data: task } = await fetcher<Task>(`/tasks/${taskId}`);

    if (!taskId) return;

    const data = new Date();
    const day = data.getDate();
    const month = firstLetterToUpperCase(
        data.toLocaleString('pt-BR', { month: 'long' }),
    );
    const year = data.getFullYear();

    const { data: user } = await fetcher<User>(`/users/me`);
    const { data: tasks } = await fetcher<Task[]>(`/users/${user?.uid}/tasks`);

    return (
        <div className="flex justify-between gap-10 h-full">
            <div className="lg:flex hidden w-1/2 flex-col gap-5 pl-10 pt-10">
                <h1 className="font-bold text-gray-200">Lista Simples</h1>
                <h2 className="text-main-color-200 font-bold text-4xl">
                    Hoje, {day} de {month} de {year}
                </h2>

                <TaskList tasks={tasks} />
            </div>

            {edit ? (
                <EditTaskForm task={task!} userId={user!.uid} />
            ) : (
                <div className="lg:w-1/2 w-full h-full flex flex-col justify-between bg-main-color-100/10 shadow-lg gap-2 p-10">
                    <div className="flex flex-col gap-5 flex-1 overflow-hidden">
                        <div className="flex flex-col items-start gap-2">
                            <span className="font-black text-gray-200 text-xl">
                                Titulo:
                            </span>
                            <h1 className="font-bold text-4xl">
                                {task?.title}
                            </h1>
                        </div>
                        <hr className="border-t-2 border-gray-100/30" />

                        <div className="flex-1 w-full overflow-auto">
                            <p className="break-words text-justify">
                                {task?.description}
                            </p>
                        </div>

                        <hr className="border-t-2 border-gray-100/30" />
                        <div className="flex flex-col gap-5 items-start">
                            <div className="flex items-center gap-2">
                                <StatusIcon />
                                <span>Status: </span>
                                <span>{task?.status}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ListIcon />
                                <span>Lista: </span>
                                <span>Pessoal</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full gap-2">
                        <CustomLink
                            className="rounded-lg lg:hidden block"
                            href={`/simple-list/`}
                        >
                            Voltar
                        </CustomLink>
                        <CustomLink
                            className="rounded-lg"
                            href={`/simple-list/${taskId}?editTask=true`}
                        >
                            Editar
                        </CustomLink>
                    </div>
                </div>
            )}
        </div>
    );
}
