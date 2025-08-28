'use client';

import { Input, CustomLink, PlusIcon } from '@/components';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/data';
import { CircleChevronRight } from 'lucide-react';
import Link from 'next/link';

interface IProps {
    tasks: Task[];
}

const statusColors: Record<TaskStatus, string> = {
    'to-do': 'bg-gray-100 text-gray-600',
    doing: 'bg-blue-100 text-blue-600',
    done: 'bg-green-100 text-green-600',
};

const priorityColors: Record<TaskPriority, string> = {
    low: 'bg-green-100 text-green-600',
    medium: 'bg-yellow-100 text-yellow-600',
    high: 'bg-red-100 text-red-600',
};

export function TaskList({ tasks }: IProps) {
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
                                >
                                    <Input
                                        type="checkbox"
                                        id={`${task.id}`}
                                        className="w-4 h-4 accent-success border-gray-300 rounded"
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
