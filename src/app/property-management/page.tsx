'use server';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchPageSections } from '@/lib/content/fetchPageSections';
import SectionRenderer from '@/components/sections/SectionRenderer';

export default async function PropertyManagementPage() {
    // Fetch all sections for the property management page from the database
    const sections = await fetchPageSections('property-management');

    return (
        <div className="min-h-screen bg-brand-dark">
            <Header />

            {/* All sections rendered from CMS */}
            {sections.map((section) => (
                <SectionRenderer key={section.id} section={section} />
            ))}

            <Footer />
        </div>
    );
}
