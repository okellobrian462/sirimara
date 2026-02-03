import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchPageSections } from '@/lib/content/fetchPageSections';
import SectionRenderer from '@/components/sections/SectionRenderer';

export default async function AgentsPage() {
    // Fetch all CMS-managed sections for the agents page
    const sections = await fetchPageSections('agents');

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* All sections are now CMS-managed and rendered via SectionRenderer */}
            {sections.map((section) => (
                <SectionRenderer key={section.id} section={section} />
            ))}

            <Footer />
        </main>
    );
}
