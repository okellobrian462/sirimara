import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchPageSections } from '@/lib/content/fetchPageSections';
import SectionRenderer from '@/components/sections/SectionRenderer';
import ControlBullets from '@/components/world-of-elliman/ControlBullets';

export const metadata = {
    title: 'Explore the World of Elliman | Douglas Elliman',
    description: 'Discover the stories, insights, and inspirations behind Douglas Elliman.'
};

export default async function WorldOfEllimanPage() {
    const sections = await fetchPageSections('world-of-elliman');

    // Create section IDs for the scroll bullets
    const bulletIds = sections.map((s, i) => s.section_type === 'woe_story' ? (s.title?.split(' ')[0].toLowerCase() || `section-${i}`) : `section-${i}`);

    return (
        <main className="relative h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
            <div className="fixed top-0 left-0 w-full z-50">
                <Header theme="light" />
            </div>

            {/* Note: ControlBullets might need an update to handle dynamic section IDs better */}
            {/* For now, we'll keep it as is or pass the sections */}

            {sections.map((section) => (
                <div key={section.id} id={section.title?.split(' ')[0].toLowerCase()}>
                    <SectionRenderer section={section} />
                </div>
            ))}

            <div id="footer" className="snap-start">
                <Footer />
            </div>
        </main>
    );
}
