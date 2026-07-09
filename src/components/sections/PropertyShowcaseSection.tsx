'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { PageSection } from '@/lib/content/fetchPageSections';

interface PropertyShowcaseSectionProps {
    section: PageSection;
}

interface Property {
    id: string;
    title: string;
    slug: string;
    city: string;
    bedrooms?: number;
    bathrooms?: number;
    half_baths?: number;
    price: number;
    category?: string;
    images: string[];
}

export default function PropertyShowcaseSection({ section }: PropertyShowcaseSectionProps) {
    const [activeTab, setActiveTab] = useState<string>('');
    const [categories, setCategories] = useState<string[]>([]);
    const [properties, setProperties] = useState<Property[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                
                const response = await fetch('/api/properties?status=active');
                const data = await response.json();

                
                const uniqueCategories = [...new Set(
                    data
                        .map((p: Property) => p.category)
                        .filter(Boolean)
                )] as string[];

                setCategories(uniqueCategories.sort());
                setProperties(data);

                
                if (uniqueCategories.length > 0) {
                    setActiveTab(uniqueCategories[0]);
                }
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        
        const filtered = properties.filter(property => property.category === activeTab);
        setFilteredProperties(filtered);
    }, [activeTab, properties]);

    const formatBeds = (beds?: number) => beds ? `${beds} BR` : '';
    const formatBaths = (baths?: number, halfBaths?: number) => {
        const parts = [];
        if (baths) parts.push(`${baths} BA`);
        if (halfBaths) parts.push(`${halfBaths} HALF BA`);
        return parts.join(', ');
    };
    const formatPrice = (price: number) => `$${price.toLocaleString()}`;

    if (loading) {
        return (
            <section className="bg-brand-dark py-20">
                <div className="px-6 text-center text-white">
                    <p>Loading properties...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-brand-dark py-20">
            <div className="px-6">
                <div className="text-center text-white mb-12">
                    {section.subtitle && (
                        <p className="text-sm tracking-widest uppercase mb-4">
                            {section.subtitle}
                        </p>
                    )}
                    {section.title && (
                        <h2 className="text-5xl md:text-6xl tracking-wide mb-12">
                            {section.title}
                        </h2>
                    )}
                    {}
                    <div className="w-px h-20 bg-white/40 mx-auto mb-12" />
                </div>

                {}
                {categories.length > 0 && (
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
                )}

                {}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {filteredProperties.length > 0 ? (
                        filteredProperties.slice(0, 4).map((property) => (
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
                {section.cta_primary_text && section.cta_primary_link && (
                    <div className="text-center">
                        <Link
                            href={section.cta_primary_link}
                            className="inline-block px-8 py-4 border-2 border-white rounded-full text-sm tracking-widest text-white hover:bg-white hover:text-gray-900 transition-colors uppercase"
                        >
                            {section.cta_primary_text}
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
