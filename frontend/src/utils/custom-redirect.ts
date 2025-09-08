'use server';

import { redirect, RedirectType } from 'next/navigation';

export async function customRedirectUser(
    url: string,
    redirectType: RedirectType,
) {
    redirect(url, redirectType);
}
