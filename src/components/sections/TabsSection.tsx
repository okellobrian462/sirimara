'use client';

import { useState } from 'react';
import type { PageSection } from '@/lib/content/fetchPageSections';

interface TabItem {
    id: string;
    title: string;
    description: string | null;
    image_url: string | null;
    order_index: number;
}

interface TabsSectionProps {
    section: PageSection;
    tabs: TabItem[];
}

/**
 * Reusable Tabs Section Component
 * Displays interactive tabs with image switching
 * Used for Sell page spotlight and Agents page advantages
 */
export default function TabsSection({ section, tabs }: TabsSectionProps) {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const config = section.layout_config || {};
    const imagePosition = (config.image_position as string) || 'right';
    const showGradient = (config.show_gradient as boolean) !== false;

    return (
        <section
            className="py-24 md:py-32 px-6 overflow-hidden"
            style={{
                backgroundColor: section.background_color,
                color: section.text_color
            }}
        >
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                {(section.title || section.content) && (
                    <div className="mb-20">
                        {section.title && (
                            <h2 className="text-3xl md:text-5xl font-sans font-light tracking-[0.1em] uppercase mb-6">
                                {section.title}
                            </h2>
                        )}
                        {section.content && (
                            <p className="text-gray-400 font-light max-w-2xl">
                                {section.content}
                            </p>
                        )}
                    </div>
                )}

                {/* Tabs Layout */}
                <div className={`flex flex-col lg:flex-row gap-16 items-start ${imagePosition === 'left' ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Tabs List */}
                    <div className="w-full lg:w-1/2 space-y-12">
                        {tabs.map((tab) => (
                            <div
                                key={tab.id}
                                className={`transition-all duration-500 py-2 ${
                                    tabs.length > 1 
                                        ? `cursor-pointer border-l-2 pl-8 ${activeTab.id === tab.id ? 'border-white opacity-100' : 'border-white/10 opacity-30 hover:opacity-100'}`
                                        : 'opacity-100'
                                }`}
                                onClick={() => tabs.length > 1 && setActiveTab(tab)}
                            >
                                {tabs.length === 1 && section.subtitle && (
                                    <p className="text-[#ff7e00] text-sm font-medium tracking-wider mb-2">
                                        {section.subtitle}
                                    </p>
                                )}
                                <h3 className="text-3xl md:text-4xl font-sans font-light uppercase mb-6 text-current">
                                    {tab.title}
                                </h3>
                                <p className="text-sm md:text-base text-current opacity-70 font-light leading-relaxed max-w-md">
                                    {tab.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Active Image */}
                    <div className="w-full lg:w-1/2 relative aspect-[4/3] md:aspect-square overflow-hidden rounded-sm">
                        {activeTab.image_url && (
                            <>
                                <img
                                    key={activeTab.id}
                                    src={activeTab.image_url}
                                    alt={activeTab.title}
                                    className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-700"
                                />
                                {showGradient && (
                                    <div className={`absolute inset-0 bg-gradient-to-r ${imagePosition === 'right'
                                        ? 'from-brand-dark via-transparent to-transparent'
                                        : 'from-transparent via-transparent to-brand-dark'
                                        } md:w-1/2`} />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
