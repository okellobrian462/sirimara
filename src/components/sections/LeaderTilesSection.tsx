import React from 'react';
import type { PageSection } from '@/lib/content/fetchPageSections';
import type { TabItem } from '@/lib/content/fetchTabItems';

interface LeaderTilesSectionProps {
    section: PageSection;
    leaders: TabItem[];
}

export default function LeaderTilesSection({ section, leaders }: LeaderTilesSectionProps) {
    return (
        <section className="bg-gray-100">
            <div className="container mx-auto px-6 py-20 lg:py-32">
                <div className="max-w-7xl mx-auto space-y-12">
                    {leaders.map((leader, index) => (
                        <div
                            key={leader.id}
                            className={`flex flex-col md:flex-row ${(leader.layout_config as Record<string, unknown> | undefined)?.reversed ? 'md:flex-row-reverse' : ''} bg-white group overflow-hidden`}
                        >
                            <div className="w-full md:w-1/2 relative aspect-[4/3] md:aspect-auto overflow-hidden">
                                <img
                                    src={leader.image_url || undefined}
                                    alt={leader.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-20 bg-white items-start">
                                <h2 className="text-3xl lg:text-4xl font-serif text-brand-dark mb-4">{leader.title}</h2>
                                <p className="text-sm lg:text-base text-gray-500 mb-8 max-w-md">{leader.description}</p>
                                <button className="px-10 py-3 bg-[#100B28] text-white text-xs tracking-widest uppercase hover:bg-[#100B28]/90 transition-colors rounded-full font-medium">
                                    See more
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
