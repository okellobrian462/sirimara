'use client';

import React from 'react';
import Link from 'next/link';
import { useSiteConfig } from '@/context/SiteConfigContext';


interface Publication {
    title: string;
    imageUrl: string;
    link: string;
}

export default function MarketModules() {
    const config = useSiteConfig();
    const magazineName = config.magazine_name || 'Sirimara Magazine';

    const publications: Publication[] = [
        {
            title: magazineName,
            imageUrl: 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1737654654/production/qgevgchdh6kyemffd58v.jpg',
            link: '/sirimara-magazine'
        },
        {
            title: 'EQUESTRIAN MAGAZINE',
            imageUrl: 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1753809337/production/pn7iqfezdagcejexbklp.jpg',
            link: '/equestrian-magazine'
        },
        {
            title: 'VICINITY UPPER EAST SIDE',
            imageUrl: 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1743602943/production/wg7lok4hyiaxse4lf6ja.jpg',
            link: '/vicinity-magazine'
        },
        {
            title: 'VICINITY THE NORTH FORK',
            imageUrl: 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1744905781/production/lucliw2ltwgbs3rd5bqk.jpg',
            link: '/nfvicinity-magazine'
        }
    ];

    return (
        <section className="w-full min-h-screen snap-start bg-white flex flex-col justify-center items-center py-20 px-4 md:px-16 text-brand-dark">
            <div className="w-full max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-light uppercase tracking-[0.1em] mb-4">
                        FEATURED PUBLICATIONS
                    </h2>
                    <p className="text-lg text-gray-500 font-light">
                        Discover our latest curated stories.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {publications.map((pub, index) => (
                        <Link
                            key={index}
                            href={pub.link}
                            className="group block"
                        >
                            <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-gray-100 shadow-sm transition-shadow duration-300 group-hover:shadow-xl">
                                <img
                                    src={pub.imageUrl}
                                    alt={pub.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="text-center text-sm md:text-base font-medium tracking-[0.2em] uppercase text-brand-dark group-hover:text-gray-600 transition-colors">
                                {pub.title}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
