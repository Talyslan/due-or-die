export const statusColors: Record<TaskStatus, string> = {
    'to-do': 'bg-gray-100 text-foreground',
    doing: 'bg-blue-100 text-blue-500',
    done: 'bg-green-100 text-green-500',
};

export const priorityColors: Record<TaskPriority, string> = {
    low: 'bg-gray-100 text-foreground',
    medium: 'bg-yellow-100 text-yellow-500',
    high: 'bg-red-100 text-red-500',
};

export const priorityPT: Record<TaskPriority, string> = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta',
};

export const statusPT: Record<TaskStatus, string> = {
    'to-do': 'Para Fazer',
    doing: 'Em Andamento',
    done: 'Concluído',
};
