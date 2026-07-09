import { createClient } from '@/lib/supabase/server';

export interface ContentBlock {
    id: string;
    page: string;
    block_type: string;
    title: string | null;
    content: string | null;
    
    metadata: Record<string, string>;
    order: number;
    is_active: boolean;
}

export async function fetchContentBlocks(page: string, blockType?: string): Promise<ContentBlock[]> {
    const supabase = await createClient();
    let query = supabase
        .from('content_blocks')
        .select('*')
        .eq('page', page)
        .eq('is_active', true);

    if (blockType) {
        query = query.eq('block_type', blockType);
    }

    const { data, error } = await query.order('order', { ascending: true });

    if (error) {
        console.error('Error fetching content blocks:', error);
        return [];
    }

    return data || [];
}

export async function fetchContentBlock(page: string, blockType: string): Promise<ContentBlock | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('content_blocks')
        .select('*')
        .eq('page', page)
        .eq('block_type', blockType)
        .eq('is_active', true)
        .single();

    if (error) {
        console.error('Error fetching content block:', error);
        return null;
    }

    return data;
}
