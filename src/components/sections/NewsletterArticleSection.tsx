import type { PageSection } from '@/lib/content/fetchPageSections';

interface NewsletterArticleSectionProps {
    section: PageSection;
}

export default function NewsletterArticleSection({ section }: NewsletterArticleSectionProps) {
    if (!section.content) return null;

    return (
        <section className="py-20 md:py-32 bg-white text-brand-dark">
            <div className="container mx-auto px-6 max-w-4xl">
                {section.title && (
                    <h1 className="text-3xl md:text-5xl font-serif mb-12 text-center uppercase tracking-widest">
                        {section.title}
                    </h1>
                )}

                <div
                    className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-p:font-light prose-p:leading-relaxed prose-a:text-brand-dark prose-a:underline hover:prose-a:opacity-70 transition-opacity"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                />
            </div>
        </section>
    );
}
