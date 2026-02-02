import { firstLetterToUpperCase } from './first-letter-to-upper-case';

export function GetCurrentDayMonthYear() {
    const date = new Date();
    const day = date.getDate();
    const month = firstLetterToUpperCase(
        date.toLocaleString('pt-BR', { month: 'long' }),
    );
    const year = date.getFullYear();

    return { day, month, year };
}
