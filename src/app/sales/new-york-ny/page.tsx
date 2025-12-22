'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown, Plus, Search, Heart, Camera, MapPin, SlidersHorizontal, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function SalesSearchPage() {
    // Sample data based on user provided HTML/Images
    const listings = [
        {
            id: 1,
            address: '50 W 66TH St 62',
            city: 'New York, NY',
            price: '$85,000,000',
            beds: '6 BR',
            baths: '7 BA, 2 HALF BA',
            sqft: '9,678 SF',
            image: 'https://api-trestle.corelogic.com/trestle/Media/Property/PHOTO-Jpeg/1096721228/1/MzY3Ny81NzgwLzY/Ni8xMjc1My8xNzU3MzU5ODcz/HDhCVG5w3s-hUmc_qTYa4mYxDHZHPoHto9mbZC7vbPo',
            status: 'DOUGLAS ELLIMAN EXCLUSIVE'
        },
        {
            id: 2,
            address: '53 W 53RD St PH78',
            city: 'New York, NY',
            price: '$64,730,000',
            beds: '4 BR',
            baths: '3 BA, 1 HALF BA',
            sqft: '7,455 SF',
            image: 'https://api.cotality.com/trestle/Media/Property/PHOTO-Jpeg/1108013110/1/MzY3Ny81NzgwLzY/Ni8xMjc1My8xNzY0ODM5Mzgx/Uu1l_wlLJ07A0fzjF6kFtUYeQuQFpWtFZOB6LZNkSMY',
            status: 'DOUGLAS ELLIMAN EXCLUSIVE'
        },
        {
            id: 3,
            address: '9 E 82ND ST',
            city: 'New York, NY',
            price: '$29,995,000',
            beds: '10 BR',
            baths: '10 BA',
            sqft: '9,016 SF',
            image: 'https://dvvjkgh94f2v6.cloudfront.net/523fa3e6/420661812/83dcefb7.jpeg', // Placeholder or reuse existing image for demo
            status: 'DOUGLAS ELLIMAN EXCLUSIVE'
        },
        {
            id: 4,
            address: '349 W 86TH ST',
            city: 'New York, NY',
            price: '$29,750,000',
            beds: '7 BR',
            baths: '7 BA, 7 HALF BA',
            sqft: '12,375 SF',
            image: 'https://ext.same-assets.com/2757429726/2050726427.jpeg', // Placeholder
            status: 'DOUGLAS ELLIMAN EXCLUSIVE'
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            <Header theme="light" /> {/* Force light theme for the search page header initially, strictly following screenshot style which has dark background header? actually check screenshot again */}

            {/* 
               Correction: The screenshot shows a dark background header with "BUY" selected. 
               The Header component currently supports 'dark' (light bg, dark text) and 'light' (transparent/dark bg, white text).
               In Header.tsx: 
               bgClass = isScrolled 
                ? (theme === 'dark' ? 'bg-white...' : 'bg-black...') 
                : (theme === 'dark' ? 'bg-white' : 'bg-transparent');
               
               If we want a dark header bar like the screenshot (which seems to be the standard global header), 
               we might want the 'default' transparent behavior but with a solid background because it's not over a hero image?
               Wait, the screenshot has the header OVER the search bar or just above it. 
               It looks like a solid dark header. 
               
               If I use `theme="light"`, text is white, bg is transparent (unless scrolled).
               Ideally we want text white, bg black/dark blue. 
               I'll assume it's like the scrolled state of the home page but static.
               For now, I'll wrap the header in a div with dark bg or adjust usage.
               Actually, let's verify Header props: 
               theme='light' -> text-white, bg-transparent (unscrolled).
               theme='dark' -> text-dark, bg-white (unscrolled).
               
               The screenshot shows white text on a dark background. So `theme="light"` is correct for text, but we need a background.
               I will add a background to the main page or header wrapper.
            */}

            <div className="bg-[#0b0f19] pt-24 pb-4"> {/* Dark background for the top area including header space if needed, or just let header float */}
                {/* Actually Header is fixed. So I need to structure the page content to start below it. */}
            </div>

            {/* Search & Filter Bar Sticky */}
            <div className="sticky top-[88px] z-40 bg-white border-b border-gray-200 shadow-sm">

                {/* Top Search Input Row */}
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 bg-white border border-gray-300 rounded px-4 py-3 flex items-center gap-2 max-w-4xl shadow-sm">
                            {/* Tags */}
                            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded text-xs font-semibold tracking-wide uppercase text-gray-700">
                                New York City
                                <button className="hover:text-red-500"><Plus className="rotate-45 w-3 h-3" /></button>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your location, address, ZIP, property ID or agent name"
                                className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400 font-light"
                            />
                            <div className="flex items-center gap-4 text-gray-400">
                                <button className="hover:text-black"><Camera className="w-5 h-5" /></button>
                                <button className="hover:text-black"><MapPin className="w-5 h-5" /></button>
                                <button className="hover:text-black"><Search className="w-5 h-5" /></button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Toggles Row */}
                <div className="container mx-auto px-6 py-3 flex justify-between items-center text-xs font-semibold tracking-widest uppercase text-[#181728]">
                    <div className="flex items-center gap-8">
                        <button className="flex items-center gap-2 hover:opacity-70">
                            For Sale <ChevronDown className="w-3 h-3" />
                        </button>
                        <button className="flex items-center gap-2 hover:opacity-70">
                            Price <ChevronDown className="w-3 h-3" />
                        </button>
                        <button className="flex items-center gap-2 hover:opacity-70">
                            Bed / Bath <ChevronDown className="w-3 h-3" />
                        </button>
                        <button className="flex items-center gap-2 hover:opacity-70">
                            Property Type <ChevronDown className="w-3 h-3" />
                        </button>
                        <div className="w-[1px] h-4 bg-gray-300 mx-2"></div>
                        <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                            <SlidersHorizontal className="w-3 h-3" />
                            All Filters
                        </button>
                    </div>

                    <button className="flex items-center gap-2 hover:opacity-70">
                        View: Map and List <ChevronDown className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* Content Area: Split View */}
            <div className="flex h-[calc(100vh-180px)]">
                {/* Listings Column */}
                <div className="w-full lg:w-3/5 overflow-y-auto p-6 bg-white">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h1 className="text-2xl font-serif text-[#181728] mb-1">Luxury listings for sale in New York City</h1>
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">18 of 28,594 Homes</p>
                        </div>
                        <div className="flex items-center gap-6 text-[10px] font-bold tracking-[0.2em] text-[#181728] uppercase">
                            <div className="flex items-center gap-2">
                                <span>Compare</span>
                                <div className="w-8 h-4 bg-gray-200 rounded-full relative cursor-pointer">
                                    <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full shadow-sm"></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 cursor-pointer">
                                Featured Image: Default <ChevronDown className="w-3 h-3" />
                            </div>
                            <div className="flex items-center gap-2 cursor-pointer">
                                Sort By: DE Exclusives <ChevronDown className="w-3 h-3" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
                        {listings.map((listing) => (
                            <div key={listing.id} className="group cursor-pointer">
                                {/* Image Slider Placeholder */}
                                <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-gray-100">
                                    <img
                                        src={listing.image}
                                        alt={listing.address}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-white px-2 py-1 text-[10px] font-bold tracking-widest uppercase">
                                        Contract Signed
                                    </div>
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                                    </div>
                                    <button className="absolute bottom-4 right-4 w-8 h-8 flex items-center justify-center bg-transparent text-white hover:scale-110 transition-transform">
                                        <Heart className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Info */}
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <h2 className="text-2xl font-serif text-[#181728]">{listing.price}</h2>
                                        <button><Heart className="w-5 h-5 text-gray-300 hover:text-red-500 transition-colors" /></button>
                                    </div>
                                    <p className="text-xs font-bold tracking-[0.1em] text-[#181728] uppercase mb-4">
                                        {listing.address}, {listing.city}
                                    </p>

                                    <div className="flex items-center gap-6 text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">
                                        <span>{listing.beds}</span>
                                        <span>{listing.baths}</span>
                                        <span>{listing.sqft}</span>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-6 border bg-white flex items-center justify-center text-[6px] font-serif">DE</div>
                                            <span className="text-[9px] font-bold tracking-[0.2em] text-[#181728] uppercase">{listing.status}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Map Column */}
                <div className="hidden lg:block w-2/5 bg-gray-100 relative overflow-hidden">
                    {/* Placeholder for Map - Using a static image that looks like a map if available, or just a gray area with pins */}
                    <div className="absolute inset-0 bg-[#E5E3DF] flex items-center justify-center">
                        {/* We'll simulate a map background or use a placeholder image if available. 
                             Since I don't have the exact map screenshot file handy (it's in the prompt but not on disk), 
                             I'll create a stylized map placeholder.
                         */}
                        <div className="text-center opacity-30">
                            <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                            <p className="text-sm font-semibold tracking-widest uppercase">Map View</p>
                        </div>

                        {/* Simulated Map Pins */}
                        <div className="absolute top-1/4 left-1/4 bg-[#181728] text-white text-[10px] px-2 py-1 rounded shadow-lg">
                            $85M
                        </div>
                        <div className="absolute top-1/2 left-1/2 bg-[#181728] text-white text-[10px] px-2 py-1 rounded shadow-lg">
                            $64M
                        </div>
                        <div className="absolute bottom-1/3 right-1/4 bg-[#181728] text-white text-[10px] px-2 py-1 rounded shadow-lg">
                            $29M
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
