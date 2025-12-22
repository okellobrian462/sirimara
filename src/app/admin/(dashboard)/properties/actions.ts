'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteProperty(propertyId: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId);

    if (error) {
        console.error('Error deleting property:', error);
        throw new Error('Failed to delete property');
    }

    revalidatePath('/admin/properties');
    return { success: true };
}

export async function updatePropertyStatus(propertyId: string, status: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('properties')
        .update({ status })
        .eq('id', propertyId);

    if (error) {
        console.error('Error updating property status:', error);
        throw new Error('Failed to update property status');
    }

    revalidatePath('/admin/properties');
    return { success: true };
}

export async function toggleFeatured(propertyId: string, isFeatured: boolean) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('properties')
        .update({ is_featured: !isFeatured })
        .eq('id', propertyId);

    if (error) {
        console.error('Error toggling featured status:', error);
        throw new Error('Failed to toggle featured status');
    }

    revalidatePath('/admin/properties');
    return { success: true };
}
