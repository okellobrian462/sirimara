'use client';

import type { PageSection } from '@/lib/content/fetchPageSections';
import { ArrowRight } from 'lucide-react';

interface NewsletterSectionProps {
    section: PageSection;
}

export default function NewsletterSection({ section }: NewsletterSectionProps) {
    const { title, subtitle, background_color = 'var(--brand-dark)', text_color = '#FFFFFF' } = section;

    return (
        <section
            className="py-20 px-6 md:px-12"
            style={{
                backgroundColor: background_color,
                color: text_color
            }}
        >
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">
                            {title || "The latest in luxury"}
                        </h2>
                        {subtitle && (
                            <p className="text-sm md:text-base font-light tracking-wide opacity-80 uppercase">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    <form className="relative" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="EMAIL ADDRESS"
                            className="w-full bg-transparent border-b border-white/30 py-4 px-0 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors uppercase tracking-widest text-sm"
                        />
                        <button
                            type="submit"
                            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 hover:opacity-70 transition-opacity uppercase tracking-widest text-xs"
                        >
                            Subscribe <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
