'use server';

import { createClient } from '@/lib/supabase/server';

export async function subscribeToNewsletter(formData: FormData) {
    const email = formData.get('email');

    if (!email || typeof email !== 'string') {
        return { success: false, error: 'Valid email is required' };
    }

    const supabase = await createClient();

    // Check if subscriber exists
    const { data: existing } = await supabase
        .from('newsletter_subscribers')
        .select('id, is_active')
        .eq('email', email)
        .single();

    if (existing) {
        if (!existing.is_active) {
            // Reactivate them
            const { error: updateError } = await supabase
                .from('newsletter_subscribers')
                .update({ is_active: true, unsubscribed_at: null })
                .eq('id', existing.id);

            if (updateError) {
                console.error('Error reactivating subscriber:', updateError);
                return { success: false, error: 'Failed to reactivate subscription' };
            }
            return { success: true, message: 'Welcome back! You have been resubscribed.' };
        }
        return { success: false, error: 'This email is already subscribed' };
    }

    // Insert new subscriber
    const { error: insertError } = await supabase
        .from('newsletter_subscribers')
        .insert([{
            email,
            is_active: true
        }]);

    if (insertError) {
        console.error('Error adding subscriber:', insertError);
        return { success: false, error: 'Failed to subscribe. Please try again later.' };
    }

    return { success: true, message: 'Thank you for subscribing!' };
}
