import { fetcher } from '@/services';
import { KanbanBoard } from './KanbanBoard';

export async function KanbanListData() {
    const { data: user } = await fetcher<User>(`/users/me`);
    const { data: tasks } = await fetcher<Task_JOIN_TaskList[]>(
        `/users/${user?.uid}/tasks`,
        { next: { revalidate: 60 } }, // Optimization: Cache for 60s
    );

    return <KanbanBoard tasks={tasks ?? []} />;
}
