import { Suspense } from 'react';
import { TaskSheet } from './_components/TaskSheet';
import { fetcher } from '@/services';
import { AddTaskFormData } from './_components/AddForm';
import { AddTaskFormLoading } from './_components/AddForm/skeleton';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchParams: Promise<any>;
}

export default async function SimpleListPage({ searchParams }: Props) {
    const queryParams = await searchParams;
    const open = !!queryParams.addTask;

    if (!open) return null;

    const { data: user } = await fetcher<User>(`/users/me`);

    return (
        <TaskSheet isOpen={open}>
            <Suspense fallback={<AddTaskFormLoading />}>
                <AddTaskFormData userId={user!.uid} />
            </Suspense>
        </TaskSheet>
    );
}
