import AgentsStats from '@/components/agents/AgentsStats';
import AgentsInsider from '@/components/agents/AgentsInsider';
import AgentsContact from '@/components/agents/AgentsContact';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchPageSections } from '@/lib/content/fetchPageSections';
import SectionRenderer from '@/components/sections/SectionRenderer';

export default async function AgentsPage() {
    // Fetch CMS-managed sections (includes tabs section)
    const sections = await fetchPageSections('agents');

    return (
        <main className="min-h-screen bg-white">
            <Header />
            {/* Render CMS-managed sections (Hero, Tabs, etc.) */}
            {sections.map((section) => (
                <SectionRenderer key={section.id} section={section} />
            ))}

            <AgentsStats />
            <AgentsInsider />
            <AgentsContact />
            <Footer />
        </main>
    );
}
