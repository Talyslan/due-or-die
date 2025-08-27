import { z } from 'zod';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export function extractAndParseCookies(
    cookieString: string,
    cookieNames: string[],
) {
    const cookies: ResponseCookie[] = [];

    const individualCookies = cookieString.split(/,\s*(?=[^;]+=[^;]+)/);

    individualCookies.forEach(cookiePart => {
        const regex = new RegExp(`(${cookieNames.join('|')})=([^;]*)`, 'g');
        let match;

        while ((match = regex.exec(cookiePart)) !== null) {
            const name = match[1];
            const value = match[2].trim();

            const parts = cookiePart.split(/;\s*/);
            const attributes: Record<string, string> = {};

            parts.slice(1).forEach(attr => {
                const [attrName, ...attrValueParts] = attr.split('=');
                const attrValue = attrValueParts.join('=').trim();

                if (attrName) {
                    if (attrName.toLowerCase() === 'httponly') {
                        attributes[attrName] = 'true';
                    } else {
                        attributes[attrName] = attrValue || '';
                    }
                }
            });

            attributes.name = name;
            attributes.value = value;

            cookies.push(
                convertObjectKeysToCamelCaseAndConvertStringValuesToType(
                    attributes,
                ),
            );
        }
    });

    return cookies;
}

const toCamelCase = (str: string): string => {
    return str
        .replace(/([-_][a-z])/gi, match =>
            match.toUpperCase().replace('-', '').replace('_', ''),
        )
        .replace(/^[A-Z]/, match => match.toLowerCase());
};

export const convertStringToType = (value: string) => {
    if (value === '') {
        return value;
    }

    const stringToTypeSchema = z.union([
        z.literal('true').transform(() => true),
        z.literal('false').transform(() => false),
        z
            .string()
            .refine(value => !isNaN(Number(value)), {
                message: 'Not a valid number',
            })
            .transform(value => Number(value)),
        z
            .string()
            .refine(value => !isNaN(Date.parse(value)), {
                message: 'Not a valid date',
            })
            .transform(value => new Date(value)),
        z.string(),
    ]);

    const result = stringToTypeSchema.safeParse(value);
    if (result.success) {
        return result.data;
    }
    return value;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyObject = Record<string, any>;
const convertObjectKeysToCamelCaseAndConvertStringValuesToType = <
    T extends AnyObject,
>(
    obj: AnyObject,
): T =>
    Object.entries(obj).reduce((acc, [key, value]) => {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            acc[toCamelCase(key) as keyof T] =
                convertObjectKeysToCamelCaseAndConvertStringValuesToType(value);
        } else {
            acc[toCamelCase(key) as keyof T] = convertStringToType(
                value,
            ) as any;
        }
        return acc;
    }, {} as T);
