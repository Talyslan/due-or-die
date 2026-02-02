'use client';

import { useDroppable } from '@dnd-kit/core';
import { KanbanCard } from '../KanbanCard';
import { cn } from '@/lib/utils';
import { KanbanCardOverlay } from '../KanbanCardOverlay';

interface IProps {
    tasks: Task_JOIN_TaskList[];
    id: string;
    title: string;
    activeTask: Task_JOIN_TaskList | null;
}

export function KanbanColumn({ id, title, tasks, activeTask }: IProps) {
    const { setNodeRef, isOver } = useDroppable({ id });

    const showPlaceholder = isOver && activeTask && activeTask.status !== id;

    return (
        <div
            ref={setNodeRef}
            className={cn(
                'flex flex-col h-full rounded-xl border border-border/50 transition-colors duration-200 overflow-hidden',
                'bg-muted/40 backdrop-blur-sm',
                isOver && 'bg-muted/60 border-primary/20',
            )}
        >
            <div className="p-4 flex items-center justify-between shrink-0 bg-primary mb-3">
                <h2 className="font-semibold text-card tracking-tight flex items-center gap-2">
                    {title}
                </h2>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-background border border-border text-muted-foreground">
                    {tasks.length}
                </span>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 pb-3 flex flex-col gap-3 min-h-0 scrollbar-thin scrollbar-thumb-muted-foreground/10 hover:scrollbar-thumb-muted-foreground/20">
                {tasks.map(task => (
                    <KanbanCard key={task.id} task={task} />
                ))}

                {showPlaceholder && (
                    <KanbanCardOverlay task={activeTask} />
                )}
            </div>
        </div>
    );
}
