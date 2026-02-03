import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchPageSections } from '@/lib/content/fetchPageSections';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const metadata = {
    title: 'Luxury Homes for Sale & Real Estate | Douglas Elliman',
    description: 'View luxury homes for sale. Find your dream property at Elliman.com',
}

export default async function ExclusivesPage() {
    const sections = await fetchPageSections('exclusives');

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {sections?.map((section) => (
                <SectionRenderer key={section.id} section={section} />
            ))}

            <Footer />
        </main>
    );
}
