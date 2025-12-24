import type { PageSection } from '@/lib/content/fetchPageSections';
import Link from 'next/link';

interface ContactSectionProps {
    section: PageSection;
}

/**
 * Reusable Contact Section Component
 * Displays contact CTAs (phone, email, etc.)
 */
export default function ContactSection({ section }: ContactSectionProps) {
    const config = section.layout_config || {};
    const layout = (config.layout as string) || 'horizontal';
    const showIntroText = (config.show_intro_text as boolean) !== false;

    const layoutClass = layout === 'vertical' ? 'flex-col' : 'flex-row';

    return (
        <section
            className="py-32 px-6 text-center"
            style={{
                backgroundColor: section.background_color,
                color: section.text_color
            }}
        >
            <div className="container mx-auto">
                {showIntroText && section.title && (
                    <h2 className="text-5xl md:text-7xl font-light tracking-widest mb-6 uppercase">
                        {section.title}
                    </h2>
                )}
                {showIntroText && section.content && (
                    <p className="text-xl opacity-80 mb-12">{section.content}</p>
                )}

                {/* CTAs */}
                <div className={`flex ${layoutClass} gap-6 justify-center`}>
                    {section.cta_primary_text && section.cta_primary_link && (
                        <Link href={section.cta_primary_link}>
                            <button className="px-10 py-4 border border-current rounded-full text-sm tracking-widest uppercase hover:bg-current hover:text-white transition-colors">
                                {section.cta_primary_text}
                            </button>
                        </Link>
                    )}
                    {section.cta_secondary_text && section.cta_secondary_link && (
                        <Link href={section.cta_secondary_link}>
                            <button className="px-10 py-4 border border-current rounded-full text-sm tracking-widest uppercase hover:bg-current hover:text-white transition-colors">
                                {section.cta_secondary_text}
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
