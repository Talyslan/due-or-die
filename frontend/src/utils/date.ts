export const formatDate = (timestamp: {
    _seconds: number;
    _nanoseconds: number;
}) => {
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleString('pt-BR');
};
