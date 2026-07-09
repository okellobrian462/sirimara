import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AgentProfileHero from '@/components/agents/profile/AgentProfileHero';
import AgentProfileNav from '@/components/agents/profile/AgentProfileNav';
import AgentProfileTabsContent from '@/components/agents/profile/AgentProfileTabsContent';
import AgentProfileValuation from '@/components/agents/profile/AgentProfileValuation';
import AgentProfileContact from '@/components/agents/profile/AgentProfileContact';
import { createClient } from '@/lib/supabase/server';
import { slugifyAgentFirstName, slugifyAgentName } from '@/lib/agentSlug';
import { notFound } from 'next/navigation';

export const revalidate = 3600; 

interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function fetchAgent(identifier: string) {
    const supabase = await createClient();

    if (uuidPattern.test(identifier)) {
        const { data, error } = await supabase
            .from('agents')
            .select('*')
            .eq('id', identifier)
            .single();

        if (!error && data) {
            return data;
        }
    }

    const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('is_active', true);

    if (error || !data) {
        console.error('Error fetching agent:', error);
        return null;
    }

    return data.find((agent) => {
        const firstNameSlug = slugifyAgentFirstName(agent.first_name);
        const fullNameSlug = slugifyAgentName(agent.first_name, agent.last_name);

        return identifier === firstNameSlug || identifier === fullNameSlug;
    }) ?? null;
}

export default async function AgentProfilePage(props: PageProps) {
    const params = await props.params;
    const agentData = await fetchAgent(params.id);

    if (!agentData) {
        notFound();
    }

    
    
    const agent = {
        name: `${agentData.first_name} ${agentData.last_name}`,
        title: agentData.title || 'Real Estate Agent',
        license: '', 
        phone: agentData.phone || '',
        address: '', 
        email: agentData.email,
        image: agentData.photo_url || '',
        bio: agentData.bio || '',
        social: agentData.social_links || {},
        profile_data: agentData.profile_data || {}
    };

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <AgentProfileHero agent={agent} />
            <AgentProfileNav />
            <AgentProfileTabsContent name={agent.name} bio={agent.bio} profileData={agent.profile_data} />
            <AgentProfileValuation />
            <AgentProfileContact name={agent.name} />
            <Footer />
        </main>
    );
}
