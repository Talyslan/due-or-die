import { fetcher } from '@/services';
import { AddTaskForm } from '@/components/AddTaskForm';
import { TaskList } from '../TaskList';
import { TaskSheet } from '../TaskSheet';
import { TaskDetailData } from '../../[taskId]/_components/TaskDetailData';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchParams: Promise<any>;
    taskId?: string;
}

export async function SimpleListData({
    searchParams,
    taskId: propTaskId,
}: Props) {
    const queryParams = await searchParams;
    const open = !!queryParams.addTask;
    const taskId = propTaskId || queryParams.taskId;
    const isSheetOpen = !!(open || taskId);

    const { data: user } = await fetcher<User>(`/users/me`);
    const { data: tasks } = await fetcher<Task_JOIN_TaskList[]>(
        `/users/${user?.uid}/tasks`,
        { next: { revalidate: 60 } },
    );
    const { data: tasklists } = await fetcher<TaskList[]>(
        `/users/${user?.uid}/tasks-lists`,
        { next: { revalidate: 60 } },
    );

    return (
        <div className="flex justify-between gap-10 h-full w-full">
            <div className="flex flex-col gap-5 px-10 pt-10 w-full">
                <TaskList tasks={tasks} />
            </div>

            <TaskSheet isOpen={isSheetOpen}>
                {open && (
                    <AddTaskForm tasksLists={tasklists!} userId={user!.uid} />
                )}
                {taskId && (
                    <TaskDetailData
                        taskId={taskId}
                        searchParams={searchParams}
                    />
                )}
            </TaskSheet>
        </div>
    );
}
