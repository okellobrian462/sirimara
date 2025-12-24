'use server';

import { createClient } from '@/lib/supabase/server';

export interface TabItem {
    id: string;
    section_id: string;
    title: string;
    description: string | null;
    image_url: string | null;
    order_index: number;
    is_active: boolean;
}

/**
 * Fetch tabs for a specific section
 */
export async function fetchTabItems(sectionId: string): Promise<TabItem[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('tabs_items')
        .select('*')
        .eq('section_id', sectionId)
        .eq('is_active', true)
        .order('order_index', { ascending: true });

    if (error) {
        console.error('Error fetching tab items:', error);
        return [];
    }

    return data || [];
}
