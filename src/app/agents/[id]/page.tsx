import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AgentProfileHero from '@/components/agents/profile/AgentProfileHero';
import AgentProfileNav from '@/components/agents/profile/AgentProfileNav';
import AgentProfileBio from '@/components/agents/profile/AgentProfileBio';
import AgentProfileValuation from '@/components/agents/profile/AgentProfileValuation';
import AgentProfileContact from '@/components/agents/profile/AgentProfileContact';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export const revalidate = 3600; // Cache for 1 hour

interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Fetch a single agent by ID
 */
async function fetchAgent(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        console.error('Error fetching agent:', error);
        return null;
    }
    return data;
}

export default async function AgentProfilePage(props: PageProps) {
    const params = await props.params;
    const agentData = await fetchAgent(params.id);

    if (!agentData) {
        notFound();
    }

    // Map DB data to component props format
    // The components seem to expect specific structures, let's adapt:
    const agent = {
        name: `${agentData.first_name} ${agentData.last_name}`,
        title: agentData.title || 'Real Estate Agent',
        license: '', // Schema doesn't have license yet, or I missed it. Passing empty/default.
        phone: agentData.phone || '',
        address: '', // Schema doesn't have address.
        email: agentData.email,
        image: agentData.photo_url || '',
        bio: agentData.bio || '',
        social: agentData.social_links || {}
    };

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <AgentProfileHero agent={agent} />
            <AgentProfileNav />
            <AgentProfileBio name={agent.name} bio={agent.bio} />
            <AgentProfileValuation />
            <AgentProfileContact name={agent.name} />
            <Footer />
        </main>
    );
}
