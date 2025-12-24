import type { PageSection } from '@/lib/content/fetchPageSections';
import { fetchStatistics } from '@/lib/content/fetchStatistics';
import Link from 'next/link';

interface StatsSectionProps {
    section: PageSection;
}

/**
 * Reusable Stats Section Component
 * Displays statistics in a configurable grid layout
 */
export default async function StatsSection({ section }: StatsSectionProps) {
    const config = section.layout_config || {};
    const columns = (config.columns as number) || 3;
    const showBorder = (config.show_border as boolean) !== false;
    const showIntroText = (config.show_intro_text as boolean) !== false;

    // Fetch statistics from database
    const statsCategory = (config.stats_category as string) || 'company';
    const statistics = await fetchStatistics(statsCategory);

    // Determine grid columns class
    const gridClass = columns === 3 ? 'md:grid-cols-3' : columns === 4 ? 'md:grid-cols-4' : 'md:grid-cols-2';

    return (
        <section
            className="py-24 md:py-32 px-6"
            style={{
                backgroundColor: section.background_color,
                color: section.text_color
            }}
        >
            <div className="container mx-auto max-w-6xl">
                {/* Intro Text */}
                {showIntroText && (section.title || section.content) && (
                    <div className="text-center mb-24 max-w-4xl mx-auto">
                        {section.title && (
                            <h2 className="text-3xl md:text-5xl font-sans font-light tracking-[0.1em] uppercase mb-8">
                                {section.title}
                            </h2>
                        )}
                        {section.content && (
                            <p className="text-gray-400 font-light leading-relaxed mb-12">
                                {section.content}
                            </p>
                        )}
                        {section.cta_primary_text && section.cta_primary_link && (
                            <Link href={section.cta_primary_link}>
                                <button className="px-12 py-4 border border-current rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-current hover:text-white transition-all duration-300">
                                    {section.cta_primary_text}
                                </button>
                            </Link>
                        )}
                    </div>
                )}

                {/* Statistics Grid */}
                <div className={`grid grid-cols-1 ${gridClass} gap-16 md:gap-8 text-center ${showBorder ? 'border-t border-current/10 pt-24' : ''}`}>
                    {statistics.slice(0, columns).map((stat) => (
                        <div key={stat.id}>
                            <p className="text-5xl md:text-7xl font-sans font-light mb-4">{stat.value}</p>
                            <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-60">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
