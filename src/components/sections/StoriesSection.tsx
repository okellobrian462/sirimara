import type { PageSection } from '@/lib/content/fetchPageSections';
import type { StoryItem } from '@/lib/content/fetchStoryItems';
import { useSiteConfig } from '@/context/SiteConfigContext';

interface StoriesSectionProps {
    section: PageSection;
    items: StoryItem[];
}

export default function StoriesSection({ section, items }: StoriesSectionProps) {
    const config = useSiteConfig();
    const platformName = config.platform_name || 'Sirimara Inspirations';

    return (
        <section className="bg-white py-24 md:py-32 px-6">
            <div className="container mx-auto max-w-6xl">
                {section.title && (
                    <h2 className="text-3xl md:text-5xl font-sans font-light tracking-[0.1em] uppercase mb-20 text-center">
                        {section.title}
                    </h2>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map((story) => (
                        <div key={story.id} className="group cursor-pointer">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-6">
                                {story.image_url ? (
                                    <img
                                        src={story.image_url}
                                        alt={story.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                                <div className="absolute bottom-8 left-8 right-8">
                                    {story.category && (
                                        <div className="flex items-center gap-2 mb-4">
                                            {story.category === 'INSIDER' && (
                                                <img
                                                    src="https://www.sirimara.com/images/ellimanInsiderLogo.svg"
                                                    alt={platformName}
                                                    className="h-4 brightness-100 invert"
                                                />

                                            )}
                                            {}
                                            {story.category !== 'INSIDER' && (
                                                <span className="text-white text-xs tracking-widest uppercase font-bold">
                                                    {story.category}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    <h3 className="text-white text-lg md:text-xl font-sans font-light leading-tight">
                                        {story.title}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
