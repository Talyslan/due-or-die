'use client';

import { GetCurrentDayMonthYear } from '@/utils';

export function SimpleListHeader() {
    const { day, month, year } = GetCurrentDayMonthYear();

    return (
        <div className="px-10 pt-10">
            <h1 className="font-bold text-gray-200">Lista Simples</h1>
            <h2 className="text-main-color-200 font-bold text-4xl">
                Hoje, {day} de {month} de {year}
            </h2>
        </div>
    );
}
