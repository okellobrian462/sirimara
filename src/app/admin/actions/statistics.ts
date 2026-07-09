'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface Statistic {
    id: string;
    label: string;
    value: string;
    sublabel: string | null;
    category: string;
    order_index: number;
    is_active: boolean;
}

export async function getStatistics() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('site_statistics')
        .select('*')
        .order('category', { ascending: true })
        .order('order_index', { ascending: true });

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, data: data as Statistic[] };
}

export async function updateStatistic(id: string, data: Partial<Statistic>) {
    const supabase = await createClient();

    const { data: updated, error } = await supabase
        .from('site_statistics')
        .update(data)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/statistics');
    revalidatePath('/about'); 
    revalidatePath('/sell');
    revalidatePath('/new-development');
    revalidatePath('/'); 

    return { success: true, data: updated };
}

export async function createStatistic(data: Omit<Statistic, 'id'>) {
    const supabase = await createClient();

    const { data: created, error } = await supabase
        .from('site_statistics')
        .insert(data)
        .select()
        .single();

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/statistics');
    revalidatePath('/about');
    revalidatePath('/sell');
    revalidatePath('/new-development');
    revalidatePath('/');

    return { success: true, data: created };
}

export async function deleteStatistic(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('site_statistics')
        .delete()
        .eq('id', id);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/statistics');
    revalidatePath('/about');
    revalidatePath('/sell');
    revalidatePath('/new-development');
    revalidatePath('/');

    return { success: true };
}
