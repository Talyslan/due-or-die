import { AddTaskForm } from '@/components';
import { fetcher } from '@/services';

export async function AddTaskFormData({ userId }: { userId: string }) {
    const { data: tasklists } = await fetcher<TaskList[]>(
        `/users/${userId}/tasks-lists`,
        { next: { revalidate: 60 } },
    );

    return <AddTaskForm tasksLists={tasklists!} userId={userId} />;
}
