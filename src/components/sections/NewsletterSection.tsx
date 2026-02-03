'use client';

import type { PageSection } from '@/lib/content/fetchPageSections';

interface NewsletterSectionProps {
    section: PageSection;
}

export default function NewsletterSection({ section }: NewsletterSectionProps) {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;

        // TODO: Implement newsletter subscription logic
        console.log('Newsletter subscription:', email);
    };

    return (
        <section
            className="py-20"
            style={{ backgroundColor: section.background_color || '#181728' }}
        >
            <div className="px-6">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    {section.title && (
                        <h2
                            className="text-3xl md:text-4xl"
                            style={{
                                fontFamily: 'Sainte Colombe, serif',
                                color: section.text_color || '#FFFFFF'
                            }}
                        >
                            {section.title}
                        </h2>
                    )}
                    <form onSubmit={handleSubmit} className="relative w-full md:w-auto md:min-w-[400px]">
                        <input
                            type="email"
                            name="email"
                            placeholder={section.subtitle || 'ENTER YOUR EMAIL'}
                            required
                            className="w-full bg-transparent border-2 rounded-full px-6 py-4 text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-white/50"
                            style={{
                                borderColor: section.text_color || '#FFFFFF',
                                color: section.text_color || '#FFFFFF'
                            }}
                        />
                        <button
                            type="submit"
                            className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-80 transition-opacity"
                            style={{ color: section.text_color || '#FFFFFF' }}
                        >
                            →
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
