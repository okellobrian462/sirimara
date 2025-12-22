'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function toggleSubscriberStatus(id: string, isActive: boolean) {
    const supabase = await createClient();

    const updates: { is_active: boolean; unsubscribed_at?: string | null } = {
        is_active: isActive,
    };

    if (!isActive) {
        updates.unsubscribed_at = new Date().toISOString();
    } else {
        updates.unsubscribed_at = null;
    }

    const { error } = await supabase
        .from('newsletter_subscribers')
        .update(updates)
        .eq('id', id);

    if (error) {
        console.error('Error updating subscriber:', error);
        throw new Error('Failed to update subscriber status');
    }

    revalidatePath('/admin/subscribers');
    return { success: true };
}

export async function deleteSubscriber(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting subscriber:', error);
        throw new Error('Failed to delete subscriber');
    }

    revalidatePath('/admin/subscribers');
    return { success: true };
}
