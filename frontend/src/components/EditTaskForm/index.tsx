'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Button,
    CustomLink,
    Input,
    ListIcon,
    StatusIcon,
    InputError,
} from '@/components';
import { AddTaskFormData, addTaskSchema } from './schema';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { useRouter } from 'next/navigation';
import {
    DeleteTask,
    UpdateTask,
} from '../../action/task-actions/update-task-action';
import { toast } from 'sonner';

interface Props {
    task: Task;
    userId: string;
}

export function EditTaskForm({ task, userId }: Props) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<AddTaskFormData>({
        resolver: zodResolver(addTaskSchema),
        defaultValues: {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
        },
    });
    const router = useRouter();

    const onSubmit = async (data: AddTaskFormData) => {
        const finalData = {
            ...data,
            id: task.id,
            userId: userId,
            taskListId: task.id,
            createdAt: new Date(),
            updateAt: new Date(),
        };

        const action = await UpdateTask(finalData);

        if (action.success) {
            toast.success(action.message);
            router.push(`/simple-list/${task.id}`);
        } else {
            toast.error(action.message);
        }
    };

    const onDelete = async (taskId: string) => {
        const action = await DeleteTask(taskId);

        if (action.success) {
            toast.success(action.message);
            router.push(`/simple-list`);
        } else {
            toast.error(action.message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:w-1/2 w-full h-full flex flex-col justify-between bg-main-color-100/10 shadow-lg gap-2 p-10"
        >
            <div className="flex flex-col gap-5">
                <div className="flex flex-col items-start gap-2">
                    <label htmlFor="title">
                        <span
                            className="font-black text-gray-200 text-xl"
                            id="title"
                        >
                            Titulo:
                        </span>
                        <Input
                            placeholder="Digite o titulo da sua tarefa"
                            {...register('title')}
                        />
                        <InputError helperText={errors.title?.message} />
                    </label>
                </div>
                <hr className="border-t-2 border-gray-100/30" />

                <label htmlFor="description">
                    <span>Descrição</span>
                    <Input
                        placeholder="Digite a descrição"
                        {...register('description')}
                    />
                    <InputError helperText={errors.description?.message} />
                </label>

                <hr className="border-t-2 border-gray-100/30" />

                <div className="flex flex-col gap-5 items-start">
                    <label className="flex items-center gap-2" htmlFor="status">
                        <StatusIcon />
                        <span id="status">Status: </span>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Selecione o status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Status</SelectLabel>
                                            <SelectItem value="to-do">
                                                Para fazer
                                            </SelectItem>
                                            <SelectItem value="doing">
                                                Em Andamento
                                            </SelectItem>
                                            <SelectItem value="done">
                                                Concluído
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <InputError helperText={errors.status?.message} />
                    </label>

                    <label className="flex items-center gap-2">
                        <ListIcon />
                        <span>Prioridade: </span>
                        <Controller
                            name="priority"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Selecione a prioridade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>
                                                Prioridade
                                            </SelectLabel>
                                            <SelectItem value="low">
                                                Baixa
                                            </SelectItem>
                                            <SelectItem value="medium">
                                                Média
                                            </SelectItem>
                                            <SelectItem value="high">
                                                Alta
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <InputError helperText={errors.status?.message} />
                    </label>
                </div>
            </div>

            <div className="flex w-full gap-2">
                <CustomLink
                    className="rounded-lg lg:hidden block"
                    href={`/simple-list/${task.id}`}
                >
                    Voltar
                </CustomLink>
                <Button
                    onClick={() => onDelete(task.id)}
                    type="button"
                    className="flex-1 rounded-lg bg-gray-100 border border-gray-200 hover:bg-gray-200 transition"
                    disabled={isSubmitting}
                >
                    Excluir
                </Button>
                <Button
                    className="flex-1 rounded-lg"
                    type="submit"
                    disabled={isSubmitting}
                >
                    Confirmar alterações
                </Button>
            </div>
        </form>
    );
}
