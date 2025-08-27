import { RingSpinner } from '@/components';

export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div role="status" className="flex flex-col items-center gap-3">
                <RingSpinner />
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                    Carregando...
                </span>
            </div>
        </div>
    );
}
