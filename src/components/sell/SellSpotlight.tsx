import { useState } from 'react';
import { useSiteConfig } from '@/context/SiteConfigContext';

export default function SellSpotlight() {
    const config = useSiteConfig();
    const siteName = config.company_name || 'Sirimara';
    const magazineName = config.magazine_name || 'Sirimara Magazine';

    const [activeTab, setActiveTab] = useState({
        id: 'press',
        title: 'THE POWER OF OUR PRESS',
        description: `By all measures, ${siteName} is one of the leading names in real estate news with over 15 billion mentions worldwide.`,
        image: 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727313622/staging/fsevbcxzzll7gegyk6ml.webp'
    });

    const tabs = [
        {
            id: 'press',
            title: 'THE POWER OF OUR PRESS',
            description: `By all measures, ${siteName} is one of the leading names in real estate news with over 15 billion mentions worldwide.`,
            image: 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727313622/staging/fsevbcxzzll7gegyk6ml.webp'
        },
        {
            id: 'magazine',
            title: magazineName,
            description: `We feature bespoke stories about your property alongside cultural and lifestyle stories to build trust with potential sellers.`,
            image: 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1739296414/production/nauvsrs45yyj7cu5vqli.jpg'
        },
        {
            id: 'social',
            title: 'SOCIAL REACH',
            description: 'Our curated social channels deliver more than 367 million impressions annually, giving your listing the visibility it deserves.',
            image: 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727313673/staging/gbbwcg4rcys9vbtduwiu.webp'
        }
    ];


    return (
        <section className="bg-[#181728] text-white py-24 md:py-32 px-6 overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-20">
                    <h2 className="text-3xl md:text-5xl font-sans font-light tracking-[0.1em] uppercase mb-6">
                        OUR WORLD IS YOUR SPOTLIGHT
                    </h2>
                    <p className="text-gray-400 font-light max-w-2xl">
                        We curate a 360-degree experience that targets the right audience for your home.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Tabs List */}
                    <div className="w-full lg:w-1/2 space-y-12">
                        {tabs.map((tab) => (
                            <div
                                key={tab.id}
                                className={`cursor-pointer transition-all duration-500 border-l-2 pl-8 py-2 ${activeTab.id === tab.id ? 'border-white opacity-100' : 'border-white/10 opacity-30 hover:opacity-100'
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                <h3 className="text-xl md:text-2xl font-sans font-light tracking-[0.1em] uppercase mb-4">
                                    {tab.title}
                                </h3>
                                <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed max-w-md">
                                    {tab.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Active Image */}
                    <div className="w-full lg:w-1/2 relative aspect-[4/3] md:aspect-square overflow-hidden rounded-sm">
                        <img
                            key={activeTab.id}
                            src={activeTab.image}
                            alt={activeTab.title}
                            className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-700"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
