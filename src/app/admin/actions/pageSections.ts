'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface PageSection {
    id?: string;
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

export async function createPageSection(section: Omit<PageSection, 'id'>) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('page_sections')
        .insert(section)
        .select()
        .single();

    if (error) {
        console.error('Error creating page section:', error);
        return { success: false, error: error.message };
    }

    revalidatePath(`/${section.page}`);
    revalidatePath('/admin/pages');

    return { success: true, data };
}

export async function updatePageSection(id: string, updates: Partial<PageSection>) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('page_sections')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating page section:', error);
        return { success: false, error: error.message };
    }

    
    if (data) {
        revalidatePath(`/${data.page}`);
        revalidatePath('/admin/pages');
    }

    return { success: true, data };
}

export async function deletePageSection(id: string) {
    const supabase = await createClient();

    
    const { data: section } = await supabase
        .from('page_sections')
        .select('page')
        .eq('id', id)
        .single();

    const { error } = await supabase
        .from('page_sections')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting page section:', error);
        return { success: false, error: error.message };
    }

    if (section) {
        revalidatePath(`/${section.page}`);
        revalidatePath('/admin/pages');
    }

    return { success: true };
}

export async function reorderPageSections(page: string, sectionIds: string[]) {
    const supabase = await createClient();

    
    for (let i = 0; i < sectionIds.length; i++) {
        const { error } = await supabase
            .from('page_sections')
            .update({ order_index: i + 1 })
            .eq('id', sectionIds[i]);

        if (error) {
            console.error(`Error reordering section ${sectionIds[i]}:`, error);
            return { success: false, error: error.message };
        }
    }

    revalidatePath(`/${page}`);
    revalidatePath('/admin/pages');

    return { success: true };
}

export async function getPageSections(page: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page', page)
        .order('order_index', { ascending: true });

    if (error) {
        console.error('Error fetching page sections:', error);
        return { success: false, error: error.message, data: [] };
    }

    return { success: true, data: data || [] };
}

export async function getComponentTemplates() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('component_templates')
        .select('*')
        .eq('is_active', true)
        .order('component_type');

    if (error) {
        console.error('Error fetching templates:', error);
        return { success: false, error: error.message, data: [] };
    }

    return { success: true, data: data || [] };
}

export async function toggleSectionActive(id: string, isActive: boolean) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('page_sections')
        .update({ is_active: isActive })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error toggling section:', error);
        return { success: false, error: error.message };
    }

    if (data) {
        revalidatePath(`/${data.page}`);
        revalidatePath('/admin/pages');
    }

    return { success: true, data };
}
