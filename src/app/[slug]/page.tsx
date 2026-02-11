import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchPageSections } from '@/lib/content/fetchPageSections';
import { fetchSiteConfig } from '@/lib/content/fetchSiteConfig';
import SectionRenderer from '@/components/sections/SectionRenderer';

import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { slug } = await params;
    // In a real implementation, we would fetch metadata from a page_meta table
    const [sections, siteConfig] = await Promise.all([
        fetchPageSections(slug),
        fetchSiteConfig()
    ]);

    const siteName = siteConfig.company_name || 'Sirimara';
    const heroSection = sections.find(s => s.section_type === 'hero');

    return {
        title: heroSection?.title ? `${heroSection.title} | ${siteName}` : siteName,
        description: heroSection?.subtitle || `${siteName} Real Estate`,
    };

}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const sections = await fetchPageSections(slug);

    if (!sections || sections.length === 0) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#181728]">
            <Header />

            {/* Render sections from CMS */}
            {sections.map((section) => (
                <SectionRenderer key={section.id} section={section} />
            ))}

            <Footer />
        </div>
    );
}
