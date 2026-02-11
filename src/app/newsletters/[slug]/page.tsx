import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getNewsletterBySlug } from '@/app/actions/newsletters';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const newsletter = await getNewsletterBySlug(slug);
    if (!newsletter) return {};

    return {
        title: `${newsletter.title} | Sirimara`,
        description: newsletter.description || `Read ${newsletter.title} on Sirimara.`,
    };
}

export default async function NewsletterDetailPage({ params }: Props) {
    const { slug } = await params;
    const newsletter = await getNewsletterBySlug(slug);

    if (!newsletter) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <Header />

            <article className="pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        {newsletter.category && (
                            <p className="text-xs font-medium tracking-[0.2em] text-gray-500 uppercase mb-4">
                                {newsletter.category}
                            </p>
                        )}
                        <h1 className="text-3xl md:text-5xl font-serif mb-6 text-[#181728] uppercase tracking-wide leading-tight">
                            {newsletter.title}
                        </h1>
                        {newsletter.published_date && (
                            <p className="text-sm font-light text-gray-400">
                                {new Date(newsletter.published_date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        )}
                    </div>

                    <div
                        className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-[#181728] prose-p:font-light prose-p:leading-relaxed prose-p:text-gray-600 prose-a:text-[#181728] prose-a:underline hover:prose-a:opacity-70 transition-opacity prose-img:rounded-lg prose-img:w-full"
                        dangerouslySetInnerHTML={{ __html: newsletter.content || '' }}
                    />
                </div>
            </article>

            <Footer />
        </main>
    );
}
