import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchPageSections } from '@/lib/content/fetchPageSections';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const metadata = {
    title: 'Our Agents | Sirimara Realty',
    description: 'Meet the expert real estate agents at Sirimara Realty. Buying, selling, or renting across Nairobi and beyond.',
};

export default async function AgentsPage() {
    
    const sections = await fetchPageSections('agents');

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {}
            {sections.map((section) => (
                <SectionRenderer key={section.id} section={section} />
            ))}

            <Footer />
        </main>
    );
}
