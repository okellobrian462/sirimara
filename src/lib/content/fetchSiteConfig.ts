import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';

export interface SiteConfig {
    company_name?: string;
    magazine_name?: string;
    platform_name?: string;
    linkedin_url?: string;
    instagram_url?: string;
    facebook_url?: string;
    twitter_url?: string;
    location?: {
        lat: number;
        lng: number;
    };
    contact_address?: string;
    footer_keepingup_title?: string;
    phone?: string;
    email?: string;
    insider_name?: string;
    logo_header_svg?: string;
    logo_image_url?: string;
    footer_disclaimer_1?: string;
    footer_disclaimer_2?: string;
    footer_disclaimer_3?: string;
    footer_powered_by?: string;
    footer_section_titles?: {
        company_title: string;
        resources_title: string;
        portfolio_title: string;
        markets_title: string;
    };
    theme_colors?: {
        primary: string;
        primary_hover: string;
        accent: string;
    };
    [key: string]: unknown;
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

export const fetchConfigValue = cache(async (key: string): Promise<unknown> => {
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
