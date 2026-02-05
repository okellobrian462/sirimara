import type { PageSection } from '@/lib/content/fetchPageSections';
import { fetchTabItems } from '@/lib/content/fetchTabItems';
import { fetchStoryItems } from '@/lib/content/fetchStoryItems';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import QuoteSection from './QuoteSection';
import BannerSection from './BannerSection';
import ContactSection from './ContactSection';
import TabsSection from './TabsSection';
import StoriesSection from './StoriesSection';
import SalesSearchSection from './SalesSearchSection';
import RentalsSearchSection from './RentalsSearchSection';
import DevelopmentsGridSection from './DevelopmentsGridSection';
import LogosSection from './LogosSection';
import PropertyShowcaseSection from './PropertyShowcaseSection';
import NewsletterSection from './NewsletterSection';
import NewsletterArticleSection from './NewsletterArticleSection';
import AgentsGridSection from './AgentsGridSection';
import WoeStorySection from './WoeStorySection';
import WoeBannerSection from './WoeBannerSection';
import WoeModulesSection from './WoeModulesSection';
import LeadershipHeroSection from './LeadershipHeroSection';
import LeaderTilesSection from './LeaderTilesSection';
import AccordionSection from './AccordionSection';
import LegalSection from './LegalSection';

interface SectionRendererProps {
    section: PageSection;
}

/**
 * Universal section renderer that dynamically renders sections based on type
 * This is the core component that makes the CMS system work
 */
export default async function SectionRenderer({ section }: SectionRendererProps) {
    // Fetch common sub-items if applicable
    const tabs = (['tabs', 'woe_banner', 'leadership_tiles', 'accordion'].includes(section.section_type))
        ? await fetchTabItems(section.id!)
        : [];

    const stories = (['stories', 'woe_modules'].includes(section.section_type))
        ? await fetchStoryItems(section.id!)
        : [];

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
            return <StoriesSection section={section} items={stories} />;
        case 'property_search_sales':
            return <SalesSearchSection section={section} />;
        case 'property_search_rentals':
            return <RentalsSearchSection section={section} />;
        case 'development_grid':
            return <DevelopmentsGridSection section={section} />;
        case 'logo_grid':
            return <LogosSection section={section} />;
        case 'property_showcase':
            return <PropertyShowcaseSection section={section} />;
        case 'newsletter':
            return <NewsletterSection section={section} />;
        case 'newsletter_article':
            return <NewsletterArticleSection section={section} />;
        case 'agents_grid':
            return <AgentsGridSection section={section} />;
        case 'woe_story':
            return <WoeStorySection section={section} />;
        case 'woe_banner':
            return <WoeBannerSection section={section} items={tabs} />;
        case 'woe_modules':
            return <WoeModulesSection section={section} items={stories} />; // We'll reuse this for the gallery
        case 'leadership_hero':
            return <LeadershipHeroSection section={section} />;
        case 'leadership_tiles':
            return <LeaderTilesSection section={section} leaders={tabs} />;
        case 'accordion':
            return <AccordionSection section={section} items={tabs} />;
        case 'legal':
            return <LegalSection section={section} />;
        default:
            console.warn(`Unknown section type: ${section.section_type}`);
            return null;
    }
}
