'use client';

import React from 'react';
import Link from 'next/link';

const LINKS = [
    { label: 'CURRENT DEVELOPMENTS', href: '#developments' },
    { label: 'SERVICES', href: '#services' },
    { label: 'PORTFOLIO', href: '#portfolio' },
    { label: 'LEADERSHIP', href: '/leadership' },
    { label: 'PRESS', href: '/press-news' },
];

export default function SubNav() {
    return (
        <div className="sticky top-[88px] z-40 w-full bg-white border-b border-gray-100 py-6 hidden md:block">
            <div className="container mx-auto px-6 flex justify-center items-center gap-8 lg:gap-12">
                {LINKS.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className="text-xs font-medium tracking-[0.15em] text-[#181728] hover:text-gray-500 transition-colors uppercase"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}
