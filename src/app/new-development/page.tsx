import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchPageSections } from '@/lib/content/fetchPageSections';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const metadata = {
    title: 'New Development | Sirimara',
    description: 'Discover the world’s most inspired new developments with Sirimara.'
};

export default async function NewDevelopmentPage() {
    
    const sections = await fetchPageSections('new-development');

    return (
        <div className="min-h-screen bg-white">
            <Header theme="light" />

            <main>
                {}
                {sections?.map((section) => (
                    <SectionRenderer key={section.id} section={section} />
                ))}
            </main>

            <Footer />
        </div>
    );
}
