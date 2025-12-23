import { fetchStatistics } from '@/lib/content/fetchStatistics';
import { fetchContentBlock } from '@/lib/content/fetchContentBlocks';

export default async function StatsSection() {
    const statistics = await fetchStatistics('new_development');
    const statsIntro = await fetchContentBlock('new-development', 'stats_intro');

    return (
        <section className="bg-white py-24 md:py-32">
            <div className="container mx-auto px-6">
                {statsIntro && (
                    <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#181728] leading-[1.1] mb-8 uppercase">
                            {statsIntro.title}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-500 font-light max-w-3xl mx-auto leading-relaxed">
                            {statsIntro.content}
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 lg:gap-32 max-w-5xl mx-auto">
                    {statistics.map((stat) => (
                        <div key={stat.id} className="text-center group">
                            <div className="text-8xl md:text-9xl lg:text-[10rem] font-light text-[#181728] mb-4 tracking-tighter transition-transform duration-500 group-hover:scale-105">
                                {stat.value}
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-bold tracking-[0.2em] uppercase text-[#181728]">
                                    {stat.label}
                                </p>
                                {stat.sublabel && (
                                    <p className="text-xs tracking-[0.1em] text-gray-400 uppercase">
                                        {stat.sublabel}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
