import { PageSection } from '@/lib/content/fetchPageSections';

interface LegalSectionProps {
    section: PageSection;
}

export default function LegalSection({ section }: LegalSectionProps) {
    const { title, content, layout_config, background_color = '#FFFFFF', text_color = '#000000' } = section;

    interface LegalConfig {
        show_last_modified?: boolean;
        last_modified_date?: string;
    }

    const config = layout_config as unknown as LegalConfig;
    const showLastModified = config?.show_last_modified;
    const lastModifiedDate = config?.last_modified_date;

    return (
        <section
            className="py-16 px-6 md:px-12 lg:px-24"
            style={{
                backgroundColor: background_color,
                color: text_color
            }}
        >
            <div className="max-w-4xl mx-auto">
                {title && (
                    <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-8 uppercase border-b border-gray-200 pb-4">
                        {title}
                    </h2>
                )}

                {showLastModified && lastModifiedDate && (
                    <p className="text-sm opacity-60 mb-8 uppercase tracking-widest">
                        Last Modified: {new Date(lastModifiedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric'
                        })}
                    </p>
                )}

                <div
                    className="prose prose-lg max-w-none prose-headings:font-light prose-headings:tracking-wide prose-p:leading-relaxed prose-a:text-brand-primary hover:prose-a:underline"
                    style={{ color: text_color }}
                    dangerouslySetInnerHTML={{ __html: content || '' }}
                />
            </div>
        </section>
    );
}
