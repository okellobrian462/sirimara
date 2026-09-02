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
import type { Metadata } from 'next';
import { COMPANY_NAME, SITE_URL } from '@/lib/seo/site';

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const agent = await fetchAgent(id);
    if (!agent) return {};

    const name = `${agent.first_name} ${agent.last_name}`;
    const slug = slugifyAgentName(agent.first_name, agent.last_name);
    const title = `${name} | ${agent.title || 'Real Estate Agent'} | ${COMPANY_NAME}`;
    const description =
        agent.bio?.replace(/\s+/g, ' ').trim().slice(0, 155) ||
        `${name} is a real estate agent at ${COMPANY_NAME} in Nairobi, Kenya.`;

    return {
        title,
        description,
        alternates: { canonical: `/agents/${slug}` },
        openGraph: {
            type: 'profile',
            url: `${SITE_URL}/agents/${slug}`,
            title,
            description,
            ...(agent.photo_url ? { images: [agent.photo_url] } : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            ...(agent.photo_url ? { images: [agent.photo_url] } : {}),
        },
    };
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'RealEstateAgent',
                        '@id': `${SITE_URL}/agents/${slugifyAgentName(agentData.first_name, agentData.last_name)}`,
                        name: agent.name,
                        jobTitle: agent.title || undefined,
                        description: agent.bio
                            ? agent.bio.replace(/\s+/g, ' ').trim().slice(0, 300)
                            : undefined,
                        url: `${SITE_URL}/agents/${slugifyAgentName(agentData.first_name, agentData.last_name)}`,
                        telephone: agent.phone || undefined,
                        email: agent.email || undefined,
                        image: agent.image || undefined,
                        worksFor: {
                            '@type': 'Organization',
                            name: COMPANY_NAME,
                            url: SITE_URL
                        },
                        address: {
                            '@type': 'PostalAddress',
                            addressLocality: 'Nairobi',
                            addressCountry: 'KE'
                        }
                    })
                }}
            />
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
