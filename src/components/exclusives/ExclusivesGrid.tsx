'use client';

import ListingCard from './ListingCard';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const MOCK_LISTINGS = [
    {
        id: 1,
        price: '$47,500,000',
        address: '1025 N Starwood Rd',
        cityStateZip: 'Aspen, CO',
        beds: 7,
        baths: 12,
        halfBaths: 3,
        sqft: '14,395',
        images: [
            'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727313545/staging/if0tunyrf2dsgrf6eeec.webp',
            'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727313622/staging/fsevbcxzzll7gegyk6ml.webp',
            'https://res.cloudinary.com/dk92v0fkk/image/upload/v1732501450/staging-test/vrvgksmitdbeff170j1y.jpg'
        ]
    },
    {
        id: 2,
        price: '$1,750,000',
        address: '16 Island Ave 6E',
        cityStateZip: 'Miami Beach, FL',
        beds: 1,
        baths: 1,
        halfBaths: 1,
        sqft: '1,085',
        images: [
            'https://res.cloudinary.com/dk92v0fkk/image/upload/v1738661172/production/htebpzevs038je1q7upw.jpg',
            'https://res.cloudinary.com/dk92v0fkk/image/upload/v1738658928/production/dn5vu5ygsufsrvju51nb.jpg',
            'https://res.cloudinary.com/dk92v0fkk/image/upload/v1739293162/production/cc2ayll3ggr8ntqi0kei.jpg'
        ]
    },
    {
        id: 3,
        price: '$139,000',
        address: '1004 Pennsylvania Ave 18',
        cityStateZip: 'Miami Beach, FL',
        beds: 1,
        baths: 1,
        halfBaths: 0,
        sqft: '850',
        images: [
            'https://res.cloudinary.com/dk92v0fkk/image/upload/v1720625904/staging/sqpw1fppqlcf6cokh69b.webp',
            'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727313673/staging/gbbwcg4rcys9vbtduwiu.webp'
        ]
    },
    {
        id: 4,
        price: '$3,495,000',
        address: '400 N Flagler Dr 1206',
        cityStateZip: 'West Palm Beach, FL',
        beds: 3,
        baths: 2,
        halfBaths: 1,
        sqft: '2,251',
        images: [
            'https://res.cloudinary.com/dk92v0fkk/image/upload/v1739296414/production/nauvsrs45yyj7cu5vqli.jpg',
            'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727313545/staging/if0tunyrf2dsgrf6eeec.webp'
        ]
    },
    {
        id: 5,
        price: '$2,700,000',
        address: '68 Three Mi Hbr Hog Crk Hwy',
        cityStateZip: 'East Hampton, NY',
        beds: 4,
        baths: 3,
        halfBaths: 1,
        sqft: '2,800',
        images: [
            'https://res.cloudinary.com/dk92v0fkk/image/upload/v1738658928/production/dn5vu5ygsufsrvju51nb.jpg'
        ]
    },
    {
        id: 6,
        price: '$1,796,000',
        address: '700 Lakeside Cir',
        cityStateZip: 'North Palm Beach, FL',
        beds: 3,
        baths: 2,
        halfBaths: 0,
        sqft: '1,941',
        images: [
            'https://res.cloudinary.com/dk92v0fkk/image/upload/v1732501450/staging-test/vrvgksmitdbeff170j1y.jpg'
        ]
    }
];

export default function ExclusivesGrid() {
    return (
        <section className="bg-white py-12 px-6">
            <div className="w-full px-6 md:px-8">

                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                    <div>
                        <h1 className="text-2xl font-sans font-light mb-1">
                            Luxury listings for sale in United States of America
                        </h1>
                        <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">
                            18 of 3,122 Homes
                        </p>
                    </div>

                    <div className="flex items-center gap-8">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <span className="text-xs font-bold tracking-widest uppercase">COMPARE</span>
                            <div className="w-10 h-5 bg-gray-200 rounded-full relative">
                                <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                            </div>
                        </label>

                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase cursor-pointer">
                            FEATURED IMAGE: DEFAULT <ChevronDown className="w-3 h-3" />
                        </div>

                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase cursor-pointer">
                            SORT BY: NEWEST <ChevronDown className="w-3 h-3" />
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mb-24">
                    {MOCK_LISTINGS.map(listing => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-8 mb-12">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-50" disabled>
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-4 text-sm font-bold tracking-widest text-[#181728]">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full border border-black">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">3</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">4</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">5</button>
                        <span className="text-gray-400">...</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">9</button>
                    </div>

                    <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </section>
    );
}
