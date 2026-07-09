'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { Property } from '@/types/database.types';

interface HomeClientProps {
    featuredProperties: Property[];
    propertyListings: Property[];
    categories: string[];
    propertyShowcaseTitle?: string;
    propertyShowcaseSubtitle?: string;
}

export default function HomeClient({ featuredProperties, propertyListings, categories, propertyShowcaseTitle, propertyShowcaseSubtitle }: HomeClientProps) {
    const [activeTab, setActiveTab] = useState(categories[0] || 'all');
    const [currentCarousel, setCurrentCarousel] = useState(0);

    const formatBeds = (beds?: number) => beds ? `${beds} BR` : '';
    const formatBaths = (baths?: number, halfBaths?: number) => {
        const parts = [];
        if (baths) parts.push(`${baths} BA`);
        if (halfBaths) parts.push(`${halfBaths} HALF BA`);
        return parts.join(', ');
    };
    const formatPrice = (price: number) => `$${price.toLocaleString()}`;

    
    const filteredProperties = propertyListings.filter(property => {
        if (!property.category) return false;
        return property.category === activeTab;
    });

    return (
        <>
            {}
            {featuredProperties.length > 0 && (
                <section className="relative">
                    <div className="relative h-[600px] overflow-hidden">
                        <img
                            src={featuredProperties[currentCarousel]?.images[0] || ''}
                            alt={featuredProperties[currentCarousel]?.title || ''}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                            <div className="container mx-auto">
                                <h3 className="text-3xl font-light mb-4">
                                    {featuredProperties[currentCarousel]?.title}
                                </h3>
                                <div className="flex items-center gap-6 text-sm tracking-widest uppercase">
                                    <span>{featuredProperties[currentCarousel]?.city}</span>
                                    <span>|</span>
                                    <span>{formatBeds(featuredProperties[currentCarousel]?.bedrooms)}</span>
                                    <span>|</span>
                                    <span>{formatBaths(featuredProperties[currentCarousel]?.bathrooms, featuredProperties[currentCarousel]?.half_baths)}</span>
                                    <span>|</span>
                                    <span>{formatPrice(featuredProperties[currentCarousel]?.price || 0)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute right-12 bottom-12 flex gap-4">
                            <button
                                onClick={() => setCurrentCarousel((prev) => (prev - 1 + featuredProperties.length) % featuredProperties.length)}
                                className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => setCurrentCarousel((prev) => (prev + 1) % featuredProperties.length)}
                                className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {}
            <section className="bg-brand-dark py-20">
                <div className="px-6">
                    <div className="text-center text-white mb-12">
                        <p className="text-sm tracking-widest uppercase mb-4">
                            {propertyShowcaseSubtitle || 'Local Experts, Global Reach'}
                        </p>
                        <h2 className="text-5xl md:text-6xl tracking-wide mb-12">
                            {propertyShowcaseTitle || 'THE NEXT MOVE IS YOURS'}
                        </h2>
                        {}
                        <div className="w-px h-20 bg-white/40 mx-auto mb-12" />
                    </div>

                    {}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 border-b border-white/20">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveTab(category)}
                                className={`pb-4 text-xs md:text-sm tracking-widest uppercase transition-colors ${activeTab === category
                                    ? 'text-white border-b-2 border-white'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {filteredProperties.length > 0 ? (
                            filteredProperties.map((property) => (
                                <Link key={property.id} href={`/listing/${property.slug}`} className="group cursor-pointer">
                                    <div className="relative overflow-hidden mb-4 aspect-[3/4]">
                                        <img
                                            src={property.images[0] || ''}
                                            alt={property.city}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                                        <div className="absolute bottom-8 left-0 right-0 text-center text-white px-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                            <h3 className="text-4xl mb-3 font-serif">
                                                {property.city}
                                            </h3>
                                            <div className="text-xs tracking-widest uppercase space-y-2 font-medium">
                                                <div>{formatBeds(property.bedrooms)} | {formatBaths(property.bathrooms, property.half_baths)}</div>
                                                <div className="text-base">{formatPrice(property.price)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-white/60 py-12">
                                <p>No properties found in this category.</p>
                            </div>
                        )}
                    </div>

                    {}
                    <div className="text-center">
                        <Link href="/buy" className="inline-block px-8 py-4 border-2 border-white rounded-full text-sm tracking-widest text-white hover:bg-white hover:text-gray-900 transition-colors uppercase">
                            View All Listings
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
