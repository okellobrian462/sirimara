import type { PageSection } from '@/lib/content/fetchPageSections';
import Link from 'next/link';

interface BannerSectionProps {
    section: PageSection;
}

export default function BannerSection({ section }: BannerSectionProps) {
    const config = section.layout_config || {};
    const height = (config.height as string) || '80vh';
    const overlayOpacity = (config.overlay_opacity as number) || 30;
    const textAlignment = (config.text_alignment as string) || 'center';
    const ctaLayout = (config.cta_layout as string) || 'horizontal';

    const heightClass = height === 'screen' ? 'h-screen' : height === '80vh' ? 'h-[80vh]' : 'h-[60vh]';
    const alignmentClass = textAlignment === 'left' ? 'text-left' : textAlignment === 'right' ? 'text-right' : 'text-center';
    const ctaLayoutClass = ctaLayout === 'vertical' ? 'flex-col' : 'flex-row';

    return (
        <section className={`relative ${heightClass} flex items-center justify-center overflow-hidden`}>
            {}
            {section.media_type === 'video' && section.media_url ? (
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={section.media_url} type="video/mp4" />
                </video>
            ) : section.media_type === 'image' && section.media_url ? (
                <img
                    src={section.media_url}
                    alt={section.title || ''}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ) : null}

            {}
            <div className={`absolute inset-0 bg-black/${overlayOpacity}`} />

            {}
            <div className={`relative z-10 ${alignmentClass} text-white px-6 max-w-4xl mx-auto`}>
                {section.title && (
                    <h2 className="text-5xl md:text-7xl font-light tracking-widest mb-6 uppercase">
                        {section.title}
                    </h2>
                )}
                {section.content && !config.show_caption && (
                    <p className="text-xl mb-12">{section.content}</p>
                )}

                {}
                {(section.cta_primary_text || section.cta_secondary_text) && (
                    <div className={`flex ${ctaLayoutClass} gap-6 justify-center`}>
                        {section.cta_primary_text && section.cta_primary_link && (
                            <Link href={section.cta_primary_link}>
                                <button className="px-8 py-4 border-2 border-white rounded-full text-sm tracking-widest hover:bg-white hover:text-gray-900 transition-colors uppercase">
                                    {section.cta_primary_text}
                                </button>
                            </Link>
                        )}
                        {section.cta_secondary_text && section.cta_secondary_link && (
                            <Link href={section.cta_secondary_link}>
                                <button className="px-8 py-4 border-2 border-white rounded-full text-sm tracking-widest hover:bg-white hover:text-gray-900 transition-colors uppercase">
                                    {section.cta_secondary_text}
                                </button>
                            </Link>
                        )}
                    </div>
                )}
            </div>

            {}
            {(config.show_caption as boolean) && section.content && (
                <div className={`absolute ${(config.caption_position as string) === 'bottom-left' ? 'bottom-6 left-6' : 'bottom-6 right-6'} z-10`}>
                    <div className="text-white bg-black/50 p-4 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none md:p-0">
                        <p className="text-xs tracking-widest uppercase">
                            {section.content}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}
