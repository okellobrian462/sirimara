'use client';

import { useState } from 'react';

const features = [
    {
        id: 'service',
        title: 'WE DELIVER BESPOKE SERVICE',
        description: 'Our agents provide personalized attention that exceeds far beyond the transaction process.',
        image: 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727321395/staging/wzqzvjxa5hzs7vwht3ow.webp'
    },
    {
        id: 'technology',
        title: 'WE INVEST IN INDUSTRY-LEADING TECHNOLOGY',
        description: 'Our tools and resources enable agents to provide tailored insights a step ahead of the market.',
        image: 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727321421/staging/atcwrxvujecqg4bj6th6.webp'
    },
    {
        id: 'network',
        title: 'WE CONNECT YOU TO OUR UNPARALLELED NETWORK',
        description: 'Our network empowers agents to curate a wealth of possibilities that ensure your real estate success.',
        image: 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727321446/staging/tszojcqli2d4dyg54vun.webp'
    }
];

export default function AgentsFeatures() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section className="bg-brand-dark py-20 md:py-32 text-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    {}
                    <div className="w-full md:w-1/2 z-10">
                        <h2 className="text-3xl md:text-5xl font-sans font-light tracking-[0.1em] uppercase mb-6 leading-tight">
                            START YOUR JOURNEY WITH EVERY ADVANTAGE
                        </h2>

                        <div className="space-y-8 mt-16">
                            {features.map((feature, index) => (
                                <div
                                    key={feature.id}
                                    className={`cursor-pointer transition-all duration-500 ${activeTab === index ? 'opacity-100' : 'opacity-40 hover:opacity-60'}`}
                                    onClick={() => setActiveTab(index)}
                                >
                                    <h3 className="text-xl md:text-2xl font-light tracking-[0.1em] uppercase mb-2">
                                        {feature.title}
                                    </h3>
                                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeTab === index ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-lg">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {}
                    <div className="w-full md:w-1/2 relative h-[500px] md:h-[700px]">
                        {features.map((feature, index) => (
                            <div
                                key={feature.id}
                                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeTab === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                            >
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="w-full h-full object-cover"
                                />
                                {}
                                <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-transparent to-transparent md:w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
