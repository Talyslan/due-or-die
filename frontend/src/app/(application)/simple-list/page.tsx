import { PencilIcon } from '@/components';
import { TaskList } from './_components/TaskList';

export default function SimpleList() {
    const data = new Date();

    const day = data.getDate();
    const month = data
        .toLocaleString('pt-BR', { month: 'long' })
        .replace(/^\w/, c => c.toUpperCase());
    const year = data.getFullYear();

    const tasks: Task[] = [
        {
            id: '1',
            title: 'Finalizar resumo de Estruturas de Dados',
            description:
                'Preparar material de revisão para a prova de quinta-feira.',
            status: 'doing',
            priority: 'high',
            taskListId: 'study',
            userId: 'user123',
            createdAt: new Date(),
            updateAt: new Date(),
        },
        {
            id: '2',
            title: 'Assistir aula gravada de Matemática Discreta',
            description:
                'Ver a gravação da aula sobre grafos antes da próxima turma.',
            status: 'to-do',
            priority: 'medium',
            taskListId: 'study',
            userId: 'user123',
            createdAt: new Date(),
            updateAt: new Date(),
        },
        {
            id: '3',
            title: 'Ir ao mercado',
            description: 'Comprar pão, leite, ovos e café.',
            status: 'to-do',
            priority: 'low',
            taskListId: 'personal',
            userId: 'user123',
            createdAt: new Date(),
            updateAt: new Date(),
        },
    ];

    return (
        <div className="flex justify-between gap-10 h-full">
            <div className="flex flex-col gap-5 pl-10 pt-10 w-full">
                <h1 className="font-bold text-gray-200">Lista Simples</h1>
                <h2 className="text-main-color-200 font-bold text-4xl">
                    Hoje, {day} de {month} de {year}
                </h2>

                <TaskList tasks={tasks} />
            </div>

            <div className="w-full h-full flex flex-col justify-center items-center bg-main-color-100/10 shadow-lg gap-2">
                <PencilIcon className="text-gray-100" />
                <h3 className="text-gray-100 text-center font-bold text-2xl">
                    Clique em uma tarefa <br /> para abri-la
                </h3>
            </div>
        </div>
    );
}
