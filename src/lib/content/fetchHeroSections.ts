import { createClient } from '@/lib/supabase/server';

export interface HeroSection {
    id: string;
    page: string;
    section_key: string;
    headline: string | null;
    subheadline: string | null;
    cta_text: string | null;
    cta_link: string | null;
    media_type: 'image' | 'video' | null;
    media_url: string | null;
    overlay_opacity: number;
    is_active: boolean;
    order: number;
}

export async function fetchHeroSections(page: string): Promise<HeroSection[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('hero_sections')
        .select('*')
        .eq('page', page)
        .eq('is_active', true)
        .order('order', { ascending: true });

    if (error) {
        console.error('Error fetching hero sections:', error);
        return [];
    }

    return data || [];
}

export async function fetchHeroSection(page: string, sectionKey: string): Promise<HeroSection | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('hero_sections')
        .select('*')
        .eq('page', page)
        .eq('section_key', sectionKey)
        .eq('is_active', true)
        .single();

    if (error) {
        console.error('Error fetching hero section:', error);
        return null;
    }

    return data;
}
