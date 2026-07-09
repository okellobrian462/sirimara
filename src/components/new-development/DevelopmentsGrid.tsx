import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const DEVELOPMENTS = [
    {
        name: 'Waldorf Astoria Residences New York',
        image: 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1734022751/production/rszaiclemwkk23lszcmk.jpg',
        link: '/new-development/waldorf-astoria-residences-new-york'
    },
    {
        name: 'The Greenwich By Rafael Viñoly',
        image: 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1733868483/production/muzav9yzuwfacpqmryzq.jpg',
        link: '/new-development/the-greenwich-by-rafael-vinoly'
    },
    {
        name: 'Viceroy Residences Fort Lauderdale',
        image: 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1744993329/production/zqvwzzhizl3l8pjyme8c.jpg',
        link: '/new-development/viceroy-residences-fort-lauderdale'
    },
    {
        name: 'The Ritz-Carlton Residences, The Woodlands',
        image: 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1734022152/production/pltmm8okd6t6k0ialxj2.jpg',
        link: '/new-development/the-ritz-carlton-residences-the-woodlands'
    }
];

export default function DevelopmentsGrid() {
    return (
        <section id="developments" className="bg-[#F8F8F8] py-24 md:py-32">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-light tracking-tight text-brand-dark mb-6 uppercase">
                        WE TRANSFORM SKYLINES AND SHAPE CULTURE
                    </h2>
                    <p className="text-lg text-gray-500 font-light mb-10 max-w-2xl mx-auto">
                        Our projects are the most highly coveted residences in leading luxury markets.
                    </p>
                    <Link
                        href="/buy/new-development"
                        className="inline-block bg-brand-dark text-white text-xs font-bold tracking-[0.2em] py-5 px-10 rounded-full hover:bg-gray-800 transition-colors uppercase"
                    >
                        EXPLORE current developments
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
                    {DEVELOPMENTS.map((dev) => (
                        <Link
                            key={dev.name}
                            href={dev.link}
                            className="relative group h-[500px] overflow-hidden"
                        >
                            <Image
                                src={dev.image}
                                alt={dev.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                            <div className="absolute inset-x-0 bottom-0 p-8 text-center">
                                <h3 className="text-white text-2xl font-light tracking-tight leading-tight transition-transform duration-500 group-hover:-translate-y-2">
                                    {dev.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
