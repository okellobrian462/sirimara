'use server';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchPageSections } from '@/lib/content/fetchPageSections';
import SectionRenderer from '@/components/sections/SectionRenderer';

export default async function About() {
    // Fetch all sections for the about page from the database
    const sections = await fetchPageSections('about');

    return (
        <div className="min-h-screen bg-[#181728]">
            <Header />

            {/* All sections now rendered from CMS */}
            {sections.map((section) => (
                <SectionRenderer key={section.id} section={section} />
            ))}

            <Footer />
        </div>
    );
}
