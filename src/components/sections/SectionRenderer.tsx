import type { PageSection } from '@/lib/content/fetchPageSections';
import { fetchTabItems } from '@/lib/content/fetchTabItems';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import QuoteSection from './QuoteSection';
import BannerSection from './BannerSection';
import ContactSection from './ContactSection';
import TabsSection from './TabsSection';
import StoriesSection from './StoriesSection';

interface SectionRendererProps {
    section: PageSection;
}

/**
 * Universal section renderer that dynamically renders sections based on type
 * This is the core component that makes the CMS system work
 */
export default async function SectionRenderer({ section }: SectionRendererProps) {
    // Fetch tabs if this is a tabs section
    const tabs = section.section_type === 'tabs' ? await fetchTabItems(section.id!) : [];

    switch (section.section_type) {
        case 'hero':
            return <HeroSection section={section} />;
        case 'stats':
            return <StatsSection section={section} />;
        case 'quote':
            return <QuoteSection section={section} />;
        case 'banner':
            return <BannerSection section={section} />;
        case 'contact':
            return <ContactSection section={section} />;
        case 'tabs':
            return <TabsSection section={section} tabs={tabs} />;
        case 'stories':
            return <StoriesSection section={section} />;
        default:
            console.warn(`Unknown section type: ${section.section_type}`);
            return null;
    }
}
