'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface Props {
    showPassword: boolean;
    setShowPassword(data: boolean): void;
}

export function PasswordVisualization({
    showPassword,
    setShowPassword,
}: Props) {
    return (
        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
            {showPassword ? (
                <EyeOffIcon className="w-5 h-5" />
            ) : (
                <EyeIcon className="w-5 h-5" />
            )}
        </button>
    );
}
