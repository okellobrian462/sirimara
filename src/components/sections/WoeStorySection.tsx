'use client';

import React from 'react';
import FullBleedStory from '../world-of-sirimara/FullBleedStory';
import type { PageSection } from '@/lib/content/fetchPageSections';

interface WoeStorySectionProps {
    section: PageSection;
}

export default function WoeStorySection({ section }: WoeStorySectionProps) {
    const layoutConfig = (section.layout_config as Record<string, unknown> | undefined) || {};

    return (
        <FullBleedStory
            title={section.title || ''}
            subtitle={section.subtitle || undefined}
            label={layoutConfig.label as string | undefined}
            ctaText={section.cta_primary_text || undefined}
            ctaLink={section.cta_primary_link || undefined}
            videoUrl={section.media_type === 'video' ? section.media_url || undefined : undefined}
            imageUrl={section.media_type === 'image' ? section.media_url || undefined : undefined}
            variant={layoutConfig.variant as 'story' | 'hero' | 'banner' | undefined}
        />
    );
}
