'use server';

import { fetchConfigValue } from '@/lib/content/fetchSiteConfig';

export interface ContactConfig {
    phone: string;
    email: string;
}

export async function getContactConfig(): Promise<ContactConfig> {
    const [phone, email] = await Promise.all([
        fetchConfigValue('phone'),
        fetchConfigValue('email')
    ]);

    return {
        phone: (phone as string) || '1-800-SIRIMARA',
        email: (email as string) || 'okellobrian462@gmail.com'
    };
}
