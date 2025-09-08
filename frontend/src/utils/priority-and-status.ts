export const statusColors: Record<TaskStatus, string> = {
    'to-do': 'bg-gray-100 text-gray-600',
    doing: 'bg-blue-100 text-blue-600',
    done: 'bg-green-100 text-green-600',
};

export const priorityColors: Record<TaskPriority, string> = {
    low: 'bg-gray-100 text-gray-600',
    medium: 'bg-yellow-100 text-yellow-600',
    high: 'bg-red-100 text-red-600',
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
