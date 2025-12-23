import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';

export interface SiteConfig {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

/**
 * Fetch site configuration
 * Cached per request to avoid duplicate queries
 */
export const fetchSiteConfig = cache(async (category?: string): Promise<SiteConfig> => {
    const supabase = await createClient();
    let query = supabase.from('site_config').select('*');

    if (category) {
        query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching site config:', error);
        return {};
    }

    // Convert array to key-value object
    const config = data?.reduce((acc, item) => {
        // Parse JSON value if it's a string
        try {
            acc[item.key] = typeof item.value === 'string' ? JSON.parse(item.value) : item.value;
        } catch {
            acc[item.key] = item.value;
        }
        return acc;
    }, {} as SiteConfig) || {};

    return config;
});

/**
 * Fetch a specific config value by key
 * Cached per request to avoid duplicate queries
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchConfigValue = cache(async (key: string): Promise<any> => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('site_config')
        .select('value')
        .eq('key', key)
        .single();

    if (error) {
        console.error(`Error fetching config value for ${key}:`, error);
        return null;
    }

    try {
        return typeof data.value === 'string' ? JSON.parse(data.value) : data.value;
    } catch {
        return data.value;
    }
});
