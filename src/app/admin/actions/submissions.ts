'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface FormSubmission {
    id: string;
    form_type: string;
    data: Record<string, unknown>;
    status: string;
    created_at: string;
    updated_at: string;
}

export async function getSubmissions() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, data: data as FormSubmission[] };
}

export async function updateSubmissionStatus(id: string, status: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('form_submissions')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/submissions');
    revalidatePath('/admin');
    return { success: true, data };
}

export async function deleteSubmission(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('form_submissions')
        .delete()
        .eq('id', id);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/submissions');
    revalidatePath('/admin');
    return { success: true };
}
