import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';

export interface NavigationItem {
    id: string;
    menu_location: string;
    label: string;
    url: string;
    parent_id: string | null;
    order_index: number;
    is_active: boolean;
    opens_in_new_tab: boolean;
    icon: string | null;
    has_dropdown: boolean;
    dropdown_type: string | null;
    dropdown_config: Record<string, unknown>;
}

export const fetchNavigationItems = cache(async (menuLocation: string): Promise<NavigationItem[]> => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('navigation_items')
        .select('*')
        .eq('menu_location', menuLocation)
        .eq('is_active', true)
        .order('order_index', { ascending: true });

    if (error) {
        console.error(`Error fetching navigation for ${menuLocation}:`, error);
        return [];
    }

    return data || [];
});

export const fetchNavigationByLocations = cache(async (menuLocations: string[]): Promise<Record<string, NavigationItem[]>> => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('navigation_items')
        .select('*')
        .in('menu_location', menuLocations)
        .eq('is_active', true)
        .order('order_index', { ascending: true });

    if (error) {
        console.error('Error fetching navigation:', error);
        return {};
    }

    
    const grouped: Record<string, NavigationItem[]> = {};
    (data || []).forEach((item: NavigationItem) => {
        if (!grouped[item.menu_location]) {
            grouped[item.menu_location] = [];
        }
        grouped[item.menu_location].push(item);
    });

    return grouped;
});
