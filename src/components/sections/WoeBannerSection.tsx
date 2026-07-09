import React from 'react';
import GroupedBanner from '../world-of-sirimara/GroupedBanner';
import type { PageSection } from '@/lib/content/fetchPageSections';
import type { TabItem } from '@/lib/content/fetchTabItems';
import type { BannerItem } from '../world-of-sirimara/GroupedBanner';

interface WoeBannerSectionProps {
    section: PageSection;
    items: TabItem[];
}

export default function WoeBannerSection({ section, items }: WoeBannerSectionProps) {
    
    const bannerItems = items.map(tab => ({
        label: tab.description || '',
        title: tab.title,
        ctaText: 'WHY WE RIDE', 
        ctaLink: '/world-of-sirimara', 
        imageUrl: tab.image_url || ''
    }));

    if (bannerItems.length < 2) return <div className="h-screen bg-black" />;

    return <GroupedBanner items={[bannerItems[0], bannerItems[1]] as [BannerItem, BannerItem]} />;
}
