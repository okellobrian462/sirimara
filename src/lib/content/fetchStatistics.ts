import { createClient } from '@/lib/supabase/server';

export interface Statistic {
    id: string;
    // stat_key removed
    value: string;
    label: string;
    sublabel: string | null;
    category: string;
    order_index: number;
    is_active: boolean;
}

export async function fetchStatistics(category: string): Promise<Statistic[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('site_statistics')
        .select('*')
        .eq('category', category)
        .eq('is_active', true)
        .order('order_index', { ascending: true });

    if (error) {
        console.error('Error fetching statistics:', error);
        return [];
    }

    return data || [];
}

export async function fetchAllStatistics(): Promise<Statistic[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('site_statistics')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true })
        .order('order_index', { ascending: true });

    if (error) {
        console.error('Error fetching all statistics:', error);
        return [];
    }

    return data || [];
}
