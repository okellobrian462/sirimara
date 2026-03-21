import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchPageSections } from '@/lib/content/fetchPageSections';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const metadata = {
    title: 'Our Leadership | Sirimara',
    description: 'Real Estate is a People Business First. Relationships and thoughtful leadership are the most essential.'
};

export default async function LeadershipPage() {
    const sections = await fetchPageSections('leadership');

    return (
        <main className="min-h-screen bg-brand-dark">
            <Header />

            {sections.map((section) => (
                <SectionRenderer key={section.id} section={section} />
            ))}

            <Footer />
        </main>
    );
}
