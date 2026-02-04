'use client';

import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    closestCorners,
} from '@dnd-kit/core';
import { useState } from 'react';
import { toast } from 'sonner';
import { UpdateTask } from '@/action';
import { KanbanColumn } from '../KanbanColumn';
import { KanbanCardOverlay } from '../KanbanCardOverlay';

const COLUMNS = [
    { id: 'to-do', title: 'Para Fazer' },
    { id: 'doing', title: 'Em Andamento' },
    { id: 'done', title: 'Concluidas' },
];

interface IProps {
    tasks: Task_JOIN_TaskList[];
}

export function KanbanBoard({ tasks }: IProps) {
    const [items, setItems] = useState(tasks);
    const [activeTask, setActiveTask] = useState<Task_JOIN_TaskList | null>(
        null,
    );

    const handleDragStart = (event: DragStartEvent) => {
        const task = items.find(t => t.id === event.active.id);
        if (task) setActiveTask(task);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveTask(null);
        if (!over) return;

        const taskId = active.id;
        const newStatus = over.id as Task['status'];

        setItems(prev =>
            prev.map(task =>
                task.id === taskId ? { ...task, status: newStatus } : task,
            ),
        );

        const task = items.find(t => t.id === taskId);
        if (!task) return;

        const action = await UpdateTask({
            ...task,
            status: newStatus,
            taskListId: task.taskList?.id as string,
        });

        if (!action.success) toast.error(action.message);
    };

    return (
        <DndContext
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="overflow-x-auto overflow-y-hidden h-[calc(100vh-180px)]">
                <div className="grid grid-cols-3 gap-6 min-w-[900px] h-full">
                    {COLUMNS.map(column => (
                        <KanbanColumn
                            key={column.id}
                            id={column.id}
                            title={column.title}
                            tasks={items.filter(
                                task => task.status === column.id,
                            )}
                            activeTask={activeTask}
                        />
                    ))}
                </div>
            </div>

            <DragOverlay>
                {activeTask ? <KanbanCardOverlay task={activeTask} /> : null}
            </DragOverlay>
        </DndContext>
    );
}
