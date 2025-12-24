import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';

export interface PageSection {
    id: string;
    page: string;
    section_type: string;
    title: string | null;
    subtitle: string | null;
    content: string | null;
    media_url: string | null;
    media_type: string | null;
    layout_config: Record<string, unknown>;
    cta_primary_text: string | null;
    cta_primary_link: string | null;
    cta_secondary_text: string | null;
    cta_secondary_link: string | null;
    background_color: string;
    text_color: string;
    order_index: number;
    is_active: boolean;
    template_id: string | null;
}

/**
 * Fetch all active page sections for a specific page
 * Cached per request to avoid duplicate queries
 * @param page - The page identifier (e.g., 'home', 'about', 'sell')
 * @returns Array of page sections ordered by order_index
 */
export const fetchPageSections = cache(async (page: string): Promise<PageSection[]> => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page', page)
        .eq('is_active', true)
        .order('order_index', { ascending: true });

    if (error) {
        console.error(`Error fetching page sections for ${page}:`, error);
        return [];
    }

    return data || [];
});

/**
 * Fetch a single page section by ID
 * @param id - The section ID
 * @returns Single page section or null
 */
export const fetchPageSection = cache(async (id: string): Promise<PageSection | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('page_sections')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

    if (error) {
        console.error(`Error fetching page section ${id}:`, error);
        return null;
    }

    return data;
});
