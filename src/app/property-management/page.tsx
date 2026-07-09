'use server';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchPageSections } from '@/lib/content/fetchPageSections';
import SectionRenderer from '@/components/sections/SectionRenderer';

export default async function PropertyManagementPage() {
    
    const sections = await fetchPageSections('property-management');

    return (
        <div className="min-h-screen bg-brand-dark">
            <Header />

            {}
            {sections.map((section) => (
                <SectionRenderer key={section.id} section={section} />
            ))}

            <Footer />
        </div>
    );
}
