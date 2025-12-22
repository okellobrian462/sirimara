'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addToFeatured(propertyId: string) {
    const supabase = await createClient();

    // Get current max order
    const { data: maxItem } = await supabase
        .from('featured_properties')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1)
        .single();

    const nextOrder = (maxItem?.display_order || 0) + 1;

    const { error } = await supabase
        .from('featured_properties') // Correct table name
        .insert({
            property_id: propertyId,
            display_order: nextOrder
        });

    if (error) {
        console.error('Error adding to featured:', error);
        throw new Error('Failed to add property to featured list');
    }

    revalidatePath('/admin/featured');
    return { success: true };
}

export async function removeFromFeatured(featuredId: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('featured_properties')
        .delete()
        .eq('id', featuredId);

    if (error) {
        console.error('Error removing from featured:', error);
        throw new Error('Failed to remove property from featured list');
    }

    revalidatePath('/admin/featured');
    return { success: true };
}

export async function updateFeaturedOrder(items: { id: string; display_order: number }[]) {
    const supabase = await createClient();

    // In a real app we might want to do this in a transaction or batch update
    // minimizing round trips, but for < 20 items a loop is acceptable.
    const updates = items.map(async (item) => {
        return supabase
            .from('featured_properties')
            .update({ display_order: item.display_order })
            .eq('id', item.id);
    });

    await Promise.all(updates);

    revalidatePath('/admin/featured');
    return { success: true };
}
