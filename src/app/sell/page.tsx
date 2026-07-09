import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchPageSections } from '@/lib/content/fetchPageSections';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const metadata = {
    title: 'Sell Your Home or Property | Sirimara',
    description: 'Ready to sell? Sirimara connects sellers with qualified buyers through expert strategies and a global network. Start your selling journey today.',
}

export default async function SellPage() {
    
    const sections = await fetchPageSections('sell');

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
