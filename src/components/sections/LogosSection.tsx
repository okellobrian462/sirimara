import React from 'react';
import type { PageSection } from '@/lib/content/fetchPageSections';

interface LogosSectionProps {
    section: PageSection;
}

export default function LogosSection({ section }: LogosSectionProps) {
    const config = section.layout_config || {};
    const title = section.title || 'WE ARE THE CHOICE OF WORLD-RENOWNED BRANDS';
    const logoUrl = section.media_url || 'http://res.cloudinary.com/daeyhsq50/image/upload/v1710268136/notmplnhap56ym7pmg3r.png';
    const backgroundColor = section.background_color || '#F8F8F8';

    return (
        <section
            className="py-24 border-t border-gray-100"
            style={{ backgroundColor: backgroundColor }}
        >
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-2xl md:text-4xl font-light tracking-tight text-brand-dark mb-12 uppercase italic">
                    {title}
                </h2>
                <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                    <img
                        src={logoUrl}
                        alt="Brand Portfolio"
                        className="max-w-4xl w-full"
                    />
                </div>
            </div>
        </section>
    );
}
