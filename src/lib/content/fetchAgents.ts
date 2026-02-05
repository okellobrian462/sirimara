import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';

export interface Agent {
    id: string;
    first_name: string;
    last_name: string;
    title: string | null;
    photo_url: string | null;
    email: string;
    phone: string | null;
}

/**
 * Fetch all active agents
 * Cached per request
 */
export const fetchActiveAgents = cache(async (): Promise<Agent[]> => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('agents')
        .select('id, first_name, last_name, title, photo_url, email, phone')
        .eq('is_active', true)
        .order('last_name', { ascending: true });

    if (error) {
        console.error('Error fetching agents:', error);
        return [];
    }

    return data || [];
});
