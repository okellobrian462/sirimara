'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const SERVICES = [
    {
        id: 'research',
        title: 'research + analytics',
        image: 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1733498376/production/wpmwbah2g1r8nrafz7jj.jpg',
        description: 'Guided by data-driven insights and a deep understanding of market dynamics, our analysis ensures every project is positioned for success.'
    },
    {
        id: 'planning',
        title: 'planning + design',
        image: 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1733498315/production/t0y1m0valxjjgovcrsuj.jpg',
        description: 'Collaborating with world-renowned architects and designers to create residences that define the modern luxury lifestyle.'
    },
    {
        id: 'branding',
        title: 'branding + marketing',
        image: 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1721338194/staging/emdaxu0bvayeflhkeeqx.jpg',
        description: 'Crafting compelling narratives and elevated visual identities that resonate with the global elite.'
    },
    {
        id: 'sales',
        title: 'sales + operations',
        image: 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1731963295/staging-test/boqens24o7fqalofhu7e.jpg',
        description: 'Unparalleled expertise in lead generation and conversion, supported by a global network of top-tier professionals.'
    }
];

export default function ServicesSection() {
    const [activeTab, setActiveTab] = useState(SERVICES[0].id);

    return (
        <section id="services" className="bg-white py-24 md:py-32">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#181728] mb-6 uppercase">
                        WE ARE PARTNERS THROUGHOUT <br /> THE ENTIRE PROCESS
                    </h2>
                    <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
                        Our team of experts provides the highest level of hands-on support at every turn.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
                    {/* Tabs */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-4">
                        {SERVICES.map((service) => (
                            <button
                                key={service.id}
                                onClick={() => setActiveTab(service.id)}
                                className={`text-left py-6 px-8 transition-all duration-300 border-l-2 ${activeTab === service.id
                                        ? 'border-[#181728] bg-gray-50'
                                        : 'border-gray-100 hover:border-gray-300 text-gray-400'
                                    }`}
                            >
                                <span className="text-sm font-bold tracking-[0.2em] uppercase block mb-2">
                                    {service.title}
                                </span>
                                {activeTab === service.id && (
                                    <p className="text-sm text-gray-500 font-light leading-relaxed animate-fade-in">
                                        {service.description}
                                    </p>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Image Display */}
                    <div className="w-full lg:w-2/3 aspect-video relative overflow-hidden group">
                        {SERVICES.map((service) => (
                            <div
                                key={service.id}
                                className={`absolute inset-0 transition-opacity duration-700 ${activeTab === service.id ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                    }`}
                            >
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
