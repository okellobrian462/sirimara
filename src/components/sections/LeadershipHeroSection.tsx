'use client';

import React from 'react';
import type { PageSection } from '@/lib/content/fetchPageSections';

interface LeadershipHeroSectionProps {
    section: PageSection;
}

export default function LeadershipHeroSection({ section }: LeadershipHeroSectionProps) {
    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src={section.media_url || ''}
                    alt={section.title || ''}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center text-white pt-20">
                <h1 className="text-4xl md:text-5xl lg:text-[44px] font-sans font-normal tracking-[0.1em] leading-tight uppercase mb-4 max-w-4xl mx-auto">
                    {section.title}
                </h1>
                <span className="block text-[10px] md:text-xs font-medium tracking-[0.4em] uppercase mb-8 opacity-80">
                    {section.subtitle || 'Our Leadership'}
                </span>
                <p className="text-xs md:text-sm lg:text-base font-light opacity-70 max-w-md mx-auto leading-relaxed">
                    {section.content}
                </p>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
                <span className="text-[9px] tracking-[0.4em] uppercase font-medium text-white/80">Scroll to discover</span>
                <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-white/60 animate-scroll-down" />
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll-down {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(200%); }
                }
                .animate-scroll-down {
                    animation: scroll-down 2s cubic-bezier(0.76, 0, 0.24, 1) infinite;
                }
            `}</style>
        </section>
    );
}
