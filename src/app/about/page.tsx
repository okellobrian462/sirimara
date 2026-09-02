'use server';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchPageSections } from '@/lib/content/fetchPageSections';
import SectionRenderer from '@/components/sections/SectionRenderer';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'About | Sirimara Realty',
        description: 'Learn about Sirimara Realty, a luxury real estate firm headquartered in Lavington, Nairobi, Kenya.',
    };
}

export default async function About() {
    
    const sections = await fetchPageSections('about');

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
