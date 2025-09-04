'use client';

import { Input, CustomLink, PlusIcon } from '@/components';
import { UpdateTask } from '@/action/task-actions/update-task-action';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/date';
import { CircleChevronRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { priorityColors, statusColors } from './priority-and-status-colors';
import { useRouter } from 'next/navigation';

interface IProps {
    tasks: Task[] | null;
}

export function TaskList({ tasks }: IProps) {
    const router = useRouter();
    const handleTaskStatus = async (
        { target }: React.ChangeEvent<HTMLInputElement>,
        task: Task,
    ) => {
        const taskStatus = target.checked ? 'done' : 'to-do';
        task['status'] = taskStatus;

        const action = await UpdateTask(task);

        if (action.success) {
            toast.success(action.message);
            router.refresh();
        } else {
            toast.error(action.message);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <CustomLink
                href="/simple-list/?addTask=open"
                className="flex !justify-start items-center gap-2 w-full !rounded-b-none !rounded-t-md"
            >
                <PlusIcon />
                <span className="font-bold">Adicionar nova tarefa</span>
            </CustomLink>

            {!tasks || tasks.length === 0 ? (
                <span className="mt-5 ml-5">Você ainda não possui tarefas</span>
            ) : (
                tasks.map(task => (
                    <Link
                        href={`/simple-list/${task.id}`}
                        key={task.id}
                        className="w-full flex items-center justify-between p-4 border-b border-white-200 bg-main-color-100/10 hover:shadow-sm duration-200 cursor-pointer"
                    >
                        <div className="w-full">
                            <div className="flex justify-between items-center gap-4">
                                <label
                                    htmlFor={`${task.id}`}
                                    className="flex items-center gap-3 cursor-pointer"
                                    onClick={e => e.stopPropagation()}
                                >
                                    <Input
                                        type="checkbox"
                                        id={`${task.id}`}
                                        className="w-4 h-4 accent-success border-gray-300 rounded"
                                        onChange={e =>
                                            handleTaskStatus(e, task)
                                        }
                                    />
                                    <span className="text-gray-200 font-medium">
                                        {task.title}
                                    </span>
                                </label>
                            </div>

                            <div className="flex justify-between items-end mt-3">
                                <div className="flex gap-4">
                                    <span
                                        className={cn(
                                            'px-2 py-1 rounded-full text-xs font-medium',
                                            priorityColors[task.priority],
                                        )}
                                    >
                                        {task.priority}
                                    </span>
                                    <span
                                        className={cn(
                                            'px-2 py-1 rounded-full text-xs font-medium',
                                            statusColors[task.status],
                                        )}
                                    >
                                        {task.status}
                                    </span>
                                </div>

                                <span className="text-xs text-gray-400">
                                    {formatDate(task.createdAt)}
                                </span>
                            </div>
                        </div>

                        <CircleChevronRight className="text-gray-100 w-5 h-5" />
                    </Link>
                ))
            )}
        </div>
    );
}
