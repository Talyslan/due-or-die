'use client';

import { formatDate } from '@/utils';
import { Clock } from 'lucide-react';

const PRIORITY_COLORS = {
    high: 'bg-red-500/10 text-red-600 border-red-200',
    medium: 'bg-amber-500/10 text-amber-600 border-amber-200',
    low: 'bg-slate-500/10 text-slate-600 border-slate-200',
    default: 'bg-slate-500/10 text-slate-600 border-slate-200',
};

export function KanbanCardOverlay({ task }: { task: Task_JOIN_TaskList }) {
    const priorityColor =
        PRIORITY_COLORS[task.priority as keyof typeof PRIORITY_COLORS] ||
        PRIORITY_COLORS.default;

    return (
        <div className="pointer-events-none scale-[1.03] opacity-30">
            <div className="group relative flex flex-col gap-2 p-3 bg-card border border-border/40 rounded-xl shadow-2xl backdrop-blur-sm">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-sm leading-tight text-foreground/90 line-clamp-2">
                        {task.title}
                    </h3>
                </div>

                {task.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {task.description}
                    </p>
                )}

                <div className="flex items-center justify-between mt-1">
                    <div
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${priorityColor}`}
                    >
                        {task.priority || 'low'}
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground/60 font-medium">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(task.createdAt)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
