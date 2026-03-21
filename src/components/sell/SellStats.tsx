import { fetchStatistics } from '@/lib/content/fetchStatistics';
import { fetchContentBlock } from '@/lib/content/fetchContentBlocks';

export default async function SellStats() {
    const statistics = await fetchStatistics('company');
    const statsBlock = await fetchContentBlock('sell', 'stats_section');

    return (
        <section className="bg-brand-dark text-white py-24 md:py-32 px-6">
            <div className="container mx-auto max-w-6xl">
                {statsBlock && (
                    <div className="text-center mb-24 max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-sans font-light tracking-[0.1em] uppercase mb-8">
                            {statsBlock.title}
                        </h2>
                        <p className="text-gray-400 font-light leading-relaxed mb-12">
                            {statsBlock.content}
                        </p>
                        {statsBlock.metadata?.cta_text && (
                            <button className="px-12 py-4 border border-white rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-brand-dark transition-all duration-300">
                                {statsBlock.metadata.cta_text}
                            </button>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center border-t border-white/10 pt-24">
                    {statistics.slice(0, 3).map((stat) => (
                        <div key={stat.id}>
                            <p className="text-5xl md:text-7xl font-sans font-light mb-4">{stat.value}</p>
                            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
