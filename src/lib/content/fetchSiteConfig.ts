import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';

export interface SiteConfig {
    
    [key: string]: any;
}

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

    
    const config = data?.reduce((acc, item) => {
        
        try {
            acc[item.key] = typeof item.value === 'string' ? JSON.parse(item.value) : item.value;
        } catch {
            acc[item.key] = item.value;
        }
        return acc;
    }, {} as SiteConfig) || {};

    return config;
});

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
