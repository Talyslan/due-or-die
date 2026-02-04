import { SimpleListHeader } from './_components/SimpleList/header';
import { TaskList } from './_components/TaskList';
import { fetcher } from '@/services';

export default async function SimpleListLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: user } = await fetcher<User>(`/users/me`);
    const { data: tasks } = await fetcher<Task_JOIN_TaskList[]>(
        `/users/${user?.uid}/tasks`,
        { next: { revalidate: 60 } },
    );

    return (
        <div className="h-full w-full flex flex-col">
            <SimpleListHeader />

            <div className="flex justify-between gap-10 h-full w-full relative">
                <div className="flex flex-col gap-5 px-10 pt-10 w-full h-full overflow-hidden">
                    <TaskList tasks={tasks} />
                </div>

                {children}
            </div>
        </div>
    );
}
