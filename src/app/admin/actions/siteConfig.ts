'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface SiteConfigItem {
    id: string;
    key: string;
    value: string | number | boolean | null | { [key: string]: unknown } | unknown[];
    category: string;
    updated_at?: string;
}

/**
 * Get all site configuration items
 */
export async function getSiteConfig() {
    const supabase = await createClient();
    
    const { data, error } = await supabase
        .from('site_config')
        .select('*')
        .order('category', { ascending: true });

    if (error) {
        console.error('Error fetching site config:', error);
        return { success: false, error: error.message, data: [] };
    }

    return { success: true, data: data || [] };
}

/**
 * Update a single site configuration item
 */
export async function updateSiteConfigItem(id: string, value: string | number | boolean | null | { [key: string]: unknown } | unknown[]) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('site_config')
        .update({
            value,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating site config:', error);
        return { success: false, error: error.message };
    }

    // Revalidate all pages that might use site config
    revalidatePath('/', 'layout'); // Revalidate entire site
    revalidatePath('/admin/config');

    return { success: true, data };
}

/**
 * Update multiple site configuration items at once
 */
export async function updateSiteConfigBatch(items: Array<{ id: string; value: string | number | boolean | null | { [key: string]: unknown } | unknown[] }>) {
    const supabase = await createClient();

    try {
        for (const item of items) {
            const { error } = await supabase
                .from('site_config')
                .update({
                    value: item.value,
                    updated_at: new Date().toISOString()
                })
                .eq('id', item.id);

            if (error) throw error;
        }

        // Revalidate all pages that might use site config
        revalidatePath('/', 'layout'); // Revalidate entire site
        revalidatePath('/admin/config');

        return { success: true };
    } catch (error) {
        console.error('Error updating site config batch:', error);
        return { success: false, error: (error as Error).message };
    }
}
