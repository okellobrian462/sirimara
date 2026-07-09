import type { PageSection } from '@/lib/content/fetchPageSections';

interface QuoteSectionProps {
    section: PageSection;
}

export default function QuoteSection({ section }: QuoteSectionProps) {
    const config = section.layout_config || {};
    const showQuotationMarks = (config.show_quotation_marks as boolean) !== false;
    const textAlignment = (config.text_alignment as string) || 'center';

    
    const author = (config.author as string) || section.subtitle;
    const authorTitle = (config.author_title as string) || '';

    const alignmentClass = textAlignment === 'left' ? 'text-left' : textAlignment === 'right' ? 'text-right' : 'text-center';

    return (
        <section
            className="py-24 px-6"
            style={{
                backgroundColor: section.background_color,
                color: section.text_color
            }}
        >
            <div className={`container mx-auto max-w-4xl ${alignmentClass}`}>
                <div className="mb-12 relative">
                    {showQuotationMarks && (
                        <span className="text-6xl opacity-20 absolute -top-8 left-0 font-serif">"</span>
                    )}
                    <h3 className="text-2xl md:text-3xl font-serif italic leading-relaxed px-8">
                        {section.content || section.title}
                    </h3>
                    {showQuotationMarks && (
                        <span className="text-6xl opacity-20 absolute -bottom-12 right-0 font-serif">"</span>
                    )}
                </div>
                {author && (
                    <div>
                        <p className="text-lg tracking-widest uppercase mb-2">{author}</p>
                        {authorTitle && (
                            <p className="text-xs opacity-60 uppercase tracking-wider">{authorTitle}</p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
