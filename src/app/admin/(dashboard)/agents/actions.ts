'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteAgent(agentId: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('agents')
        .delete()
        .eq('id', agentId);

    if (error) {
        console.error('Error deleting agent:', error);
        throw new Error('Failed to delete agent');
    }

    revalidatePath('/admin/agents');
    return { success: true };
}

export async function toggleAgentStatus(agentId: string, isActive: boolean) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('agents')
        .update({ is_active: !isActive })
        .eq('id', agentId);

    if (error) {
        console.error('Error toggling agent status:', error);
        throw new Error('Failed to toggle agent status');
    }

    revalidatePath('/admin/agents');
    return { success: true };
}
