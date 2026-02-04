import { fetcher } from '@/services';
import { EditTaskForm } from '@/components/EditTaskForm';
import { CustomLink, ListIcon, StatusIcon } from '@/components';

interface Props {
    taskId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchParams: Promise<any>;
}

export async function TaskDetailData({ taskId, searchParams }: Props) {
    const queryParams = await searchParams;
    const isEditing = !!queryParams.editTask;

    const { data: task } = await fetcher<Task>(`/tasks/${taskId}`);
    const { data: user } = await fetcher<User>(`/users/me`);

    if (!taskId) return null;

    if (isEditing) return <EditTaskForm task={task!} userId={user!.uid} />;

    return (
        <div className="w-full h-full flex flex-col justify-between bg-main-color-100/10 shadow-lg gap-2 p-10">
            <div className="flex flex-col gap-5 flex-1 overflow-hidden">
                <div className="flex flex-col items-start gap-2">
                    <span className="font-black text-gray-200 text-xl">
                        Titulo:
                    </span>
                    <h1 className="font-bold text-4xl">{task?.title}</h1>
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
    );
}
