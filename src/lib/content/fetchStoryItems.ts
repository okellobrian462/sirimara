import { createClient } from '@/lib/supabase/server';

export interface StoryItem {
    id: string;
    title: string;
    image_url: string;
    category: string;
    url?: string;
}

export async function fetchStoryItems(sectionId: string): Promise<StoryItem[]> {
    const supabase = await createClient();

    const { data } = await supabase
        .from('stories_items')
        .select('*')
        .eq('section_id', sectionId)
        .order('sort_order', { ascending: true });

    return (data as StoryItem[]) || [];
}
