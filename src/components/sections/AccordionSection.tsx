'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import type { PageSection } from '@/lib/content/fetchPageSections';
import type { TabItem } from '@/lib/content/fetchTabItems';

interface AccordionSectionProps {
    section: PageSection;
    items: TabItem[];
}

export default function AccordionSection({ section, items }: AccordionSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-[#181728]">
            <div className="container mx-auto px-6 py-20 lg:py-32">
                <div className="max-w-6xl mx-auto">
                    {items.map((item, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div key={item.id} className="border-b border-gray-700">
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex items-center justify-between py-10 text-left focus:outline-none group"
                                >
                                    <h2 className="text-base lg:text-lg font-sans tracking-[0.2em] uppercase text-white font-medium group-hover:opacity-70 transition-opacity">
                                        {item.title}
                                    </h2>
                                    <div className="shrink-0 ml-4">
                                        {isOpen ? (
                                            <Minus className="w-5 h-5 text-white stroke-[1.5px]" />
                                        ) : (
                                            <Plus className="w-5 h-5 text-white stroke-[1.5px]" />
                                        )}
                                    </div>
                                </button>
                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-12' : 'max-h-0 opacity-0'}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        <p className="text-gray-400 text-sm">
                                            {item.description || 'Details coming soon.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
