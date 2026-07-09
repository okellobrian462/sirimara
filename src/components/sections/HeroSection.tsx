import type { PageSection } from '@/lib/content/fetchPageSections';
import Link from 'next/link';
import StartSearchButton from '@/components/StartSearchButton';
import UnifiedSearch from '@/components/search/UnifiedSearch';

interface HeroSectionProps {
    section: PageSection;
}

export default function HeroSection({ section }: HeroSectionProps) {
    const config = section.layout_config || {};
    const variant = config.variant || 'default';
    const height = config.height || 'screen';
    const overlayOpacity = config.overlay_opacity || 30;
    const textAlignment = config.text_alignment || 'center';
    const showScrollIndicator = config.show_scroll_indicator || false;
    const showBottomNav = config.show_bottom_nav || false;

    
    const heightClass = height === 'screen' ? 'h-screen' : height === '80vh' ? 'h-[80vh]' : 'h-[60vh]';

    
    const alignmentClass = textAlignment === 'left' ? 'text-left' : textAlignment === 'right' ? 'text-right' : 'text-center';

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
            <div className={`relative z-10 ${alignmentClass} text-white px-6 ${variant === 'home' ? 'max-w-none' : 'max-w-5xl mx-auto'}`}>
                {section.title && (
                    <h1 className={`${variant === 'home' ? 'text-[40px] tracking-[0.25rem]' : 'text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.05em]'} uppercase leading-[1.2] mb-4`}>
                        {section.title}
                    </h1>
                )}
                {section.subtitle && (
                    <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-8 opacity-90">
                        {section.subtitle}
                    </p>
                )}
                {section.content && (
                    <p className="text-lg md:text-xl font-light max-w-2xl mx-auto opacity-90 mb-12">
                        {section.content}
                    </p>
                )}

                {}
                {variant === 'agents' ? (
                    <div className="max-w-4xl mx-auto w-full mt-8">
                        <UnifiedSearch
                            searchType="agents"
                            placeholder={(section.layout_config?.search_placeholder as string) || 'Enter agent name, state or office address'}
                            className="w-full shadow-lg"
                        />
                    </div>
                ) : (section.cta_primary_text || section.cta_secondary_text) && (
                    <div className="flex gap-4 justify-center">
                        {variant === 'home' ? (
                            <StartSearchButton text={section.cta_primary_text || ''} />
                        ) : section.cta_primary_link ? (
                            <Link href={section.cta_primary_link}>
                                <button className="px-8 py-4 border-2 border-white rounded-full text-sm tracking-widest hover:bg-white hover:text-gray-900 transition-colors uppercase">
                                    {section.cta_primary_text}
                                </button>
                            </Link>
                        ) : null}
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
            {showBottomNav && variant === 'home' && (
                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <div className="px-6 py-8 flex items-center justify-between text-white">
                        <div className="flex items-center gap-8">
                            <nav className="hidden md:flex gap-8 uppercase text-sm tracking-wider">
                                <Link href="/buy" className="hover:opacity-80 transition-opacity">Buy</Link>
                                <span>|</span>
                                <Link href="/rent" className="hover:opacity-80 transition-opacity">Rent</Link>
                                <Link href="/sell" className="hover:opacity-80 transition-opacity">Sell</Link>
                                <Link href="/agents" className="hover:opacity-80 transition-opacity">Agents</Link>
                                <Link href="/property-management" className="hover:opacity-80 transition-opacity">Property Management</Link>
                            </nav>
                        </div>
                    </div>
                </div>
            )}

            {}
            {showScrollIndicator && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-white z-20">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase block mb-4">
                        SCROLL TO DISCOVER
                    </span>
                    <div className="w-[1px] h-16 bg-white mx-auto animate-pulse" />
                </div>
            )}
        </section>
    );
}
