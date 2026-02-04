'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export interface Newsletter {
    id: string;
    title: string;
    slug: string;
    cover_image_url: string | null;
    description: string | null;
    content: string | null;
    category: string;
    published_date: string | null;
    is_featured: boolean;
    order_index: number;
    created_at?: string;
    updated_at?: string;
}

export async function fetchAllNewsletters() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('newsletters')
        .select('*')
        .order('order_index', { ascending: true })
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching newsletters:', error);
        return [];
    }

    return data as Newsletter[];
}

export async function getNewsletter(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('newsletters')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return null;
    return data as Newsletter;
}

export async function getNewsletterBySlug(slug: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('newsletters')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) return null;
    return data as Newsletter;
}

export async function createNewsletter(formData: FormData) {
    const supabase = await createClient();

    // Check auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const cover_image_url = formData.get('cover_image_url') as string;
    const is_featured = formData.get('is_featured') === 'on';

    const { error } = await supabase
        .from('newsletters')
        .insert({
            title,
            slug,
            description,
            content,
            category,
            cover_image_url,
            is_featured,
            order_index: 999 // Put at end initially
        });

    if (error) {
        console.error('Error creating newsletter:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/newsletters');
    revalidatePath('/admin/newsletters');
    redirect('/admin/newsletters');
}

export async function updateNewsletter(id: string, formData: FormData) {
    const supabase = await createClient();

    // Check auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const cover_image_url = formData.get('cover_image_url') as string;
    const is_featured = formData.get('is_featured') === 'on';

    const { error } = await supabase
        .from('newsletters')
        .update({
            title,
            slug,
            description,
            content,
            category,
            cover_image_url,
            is_featured
        })
        .eq('id', id);

    if (error) {
        console.error('Error updating newsletter:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/newsletters');
    revalidatePath(`/newsletters/${slug}`);
    revalidatePath('/admin/newsletters');
    redirect('/admin/newsletters');
}

export async function deleteNewsletter(id: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { error } = await supabase
        .from('newsletters')
        .delete()
        .eq('id', id);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/newsletters');
    revalidatePath('/admin/newsletters');
    return { success: true };
}
