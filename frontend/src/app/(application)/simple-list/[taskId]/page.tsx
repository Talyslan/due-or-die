interface PageProps {
    params: {
        taskId: string;
    };
}

export default function TaskPage({ params }: PageProps) {
    const { taskId } = params;

    if (!taskId) return;

    return (
        <>
            <h1>TaskId: {taskId}</h1>
        </>
    );
}
