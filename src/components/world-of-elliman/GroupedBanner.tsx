'use client';

import React from 'react';
import Link from 'next/link';

export interface BannerItem {
    label: string;
    title: string;
    ctaText: string;
    ctaLink: string;
    imageUrl: string;
}

interface GroupedBannerProps {
    items: [BannerItem, BannerItem];
}

export default function GroupedBanner({ items }: GroupedBannerProps) {
    return (
        <section className="w-full h-screen snap-start flex flex-col md:flex-row bg-white">
            {items.map((item, index) => (
                <div key={index} className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                        <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 w-full h-full flex flex-col justify-end items-start p-8 md:p-12 text-white">
                        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                            <p className="font-serif italic text-lg opacity-90 mb-2">
                                {item.label}
                            </p>
                            <h2 className="text-3xl md:text-4xl uppercase font-light tracking-[0.1em] mb-6">
                                {item.title}
                            </h2>
                            <Link
                                href={item.ctaLink}
                                className="inline-block text-sm font-medium tracking-[0.2em] uppercase border-b border-white pb-1 hover:text-gray-200 transition-colors"
                            >
                                {item.ctaText}
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}
