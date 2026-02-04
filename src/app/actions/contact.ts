'use server';

import { createClient } from '@/lib/supabase/server';

export type FormType = 'contact' | 'valuation' | 'other';

export interface FormResponse {
    success: boolean;
    message: string;
}

export async function submitForm(formType: FormType, formData: Record<string, unknown>): Promise<FormResponse> {
    const supabase = await createClient();

    try {
        const { error } = await supabase
            .from('form_submissions')
            .insert({
                form_type: formType,
                data: formData,
                status: 'new'
            });

        if (error) {
            console.error('Error submitting form:', error);
            return {
                success: false,
                message: 'Failed to submit form. Please try again.'
            };
        }

        return {
            success: true,
            message: 'Thank you! Your message has been received.'
        };
    } catch (e) {
        console.error('Unexpected error submitting form:', e);
        return {
            success: false,
            message: 'An unexpected error occurred.'
        };
    }
}
