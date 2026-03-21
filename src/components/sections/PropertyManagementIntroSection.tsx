import type { PageSection } from '@/lib/content/fetchPageSections';
import Link from 'next/link';
import * as Icons from 'lucide-react';

interface StatItem {
    icon: string;
    label: string;
    value: string;
}

interface PropertyManagementIntroSectionProps {
    section: PageSection;
}

/**
 * Custom section for Property Management page
 * Features a split layout with intro text on the left and a 2-column stats grid on the right
 */
export default function PropertyManagementIntroSection({ section }: PropertyManagementIntroSectionProps) {
    const config = section.layout_config || {};
    const stats: StatItem[] = (config.stats as StatItem[]) || [];

    // Safe icon renderer
    const renderIcon = (iconName: string) => {
        const Icon = Icons[iconName as keyof typeof Icons] as React.ElementType;
        if (!Icon) return <Icons.CheckCircle className="w-8 h-8 text-[#ff7e00]" />;
        return <Icon className="w-8 h-8 text-[#ff7e00]" strokeWidth={1.5} />;
    };

    return (
        <section
            className="py-24 md:py-32 px-6"
            style={{
                backgroundColor: section.background_color || '#FFFFFF',
                color: section.text_color || 'var(--brand-dark)'
            }}
        >
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    {/* Left Column: Intro */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        {section.title && (
                            <h2 className="text-3xl md:text-5xl font-sans font-light tracking-[0.05em] uppercase mb-8 leading-tight">
                                {section.title}
                            </h2>
                        )}
                        
                        {section.content && (
                            <div 
                                className="text-gray-600 font-light leading-relaxed mb-12 space-y-6 text-lg"
                                dangerouslySetInnerHTML={{ __html: section.content.replace(/\n\n/g, '<br/><br/>') }}
                            />
                        )}

                        {section.cta_primary_text && section.cta_primary_link && (
                            <div className="mt-auto pt-4">
                                <Link href={section.cta_primary_link}>
                                    <button className="px-10 py-4 border-2 border-brand-dark text-brand-dark rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-dark hover:text-white transition-all duration-300">
                                        {section.cta_primary_text}
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Stats Grid */}
                    <div className="w-full lg:w-1/2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="flex flex-col gap-4">
                                    <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50/50">
                                        {renderIcon(stat.icon)}
                                    </div>
                                    <div>
                                        {stat.value && (
                                            <p className="text-xl font-medium mb-1 text-brand-dark">
                                                {stat.value}
                                            </p>
                                        )}
                                        {stat.label && (
                                            <p className="text-sm font-bold tracking-widest uppercase text-gray-400">
                                                {stat.label}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
