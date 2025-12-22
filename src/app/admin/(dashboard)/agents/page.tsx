import { createClient } from '@/lib/supabase/server';
import AgentsClient from './AgentsClient';

async function getAgents() {
    const supabase = await createClient();

    const { data: agents, error } = await supabase
        .from('agents')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching agents:', error);
        return [];
    }

    return agents || [];
}

export default async function AgentsPage() {
    const agents = await getAgents();

    return <AgentsClient agents={agents} />;
}
