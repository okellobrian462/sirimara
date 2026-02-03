import React from 'react';
import Link from 'next/link';
import type { PageSection } from '@/lib/content/fetchPageSections';
import type { StoryItem } from '@/lib/content/fetchStoryItems';

interface WoeModulesSectionProps {
    section: PageSection;
    items: StoryItem[];
}

export default function WoeModulesSection({ section, items }: WoeModulesSectionProps) {
    return (
        <section className="w-full min-h-screen snap-start bg-white flex flex-col justify-center items-center py-20 px-4 md:px-16 text-[#181728]">
            <div className="w-full max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-light uppercase tracking-[0.1em] mb-4">
                        {section.title || 'FEATURED PUBLICATIONS'}
                    </h2>
                    <p className="text-lg text-gray-500 font-light">
                        {section.subtitle || 'Discover our latest curated stories.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((pub, index) => (
                        <Link
                            key={index}
                            href={pub.url || '/'}
                            className="group block"
                        >
                            <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-gray-100 shadow-sm transition-shadow duration-300 group-hover:shadow-xl">
                                <img
                                    src={pub.image_url}
                                    alt={pub.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="text-center text-sm md:text-base font-medium tracking-[0.2em] uppercase text-[#181728] group-hover:text-gray-600 transition-colors">
                                {pub.title}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
