'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Camera, Map as MapIcon, ChevronLeft, ChevronRight, Calculator, Plus } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'next/navigation';

interface ListingData {
    address: string;
    location: string;
    price: string;
    beds: string;
    baths: string;
    sqft: string;
    image: string;
    agent: {
        name: string;
        image: string;
        phone: string;
        title: string;
    };
}

export default function ListingDetailPage() {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    const listings: Record<string, ListingData> = {
        '200-e-59th-st-ph32-new-york-ny-10022': {
            address: '200 E 59TH St PH32',
            location: 'NEW YORK, NY 10022',
            price: '$17,990,000',
            beds: '2 BR',
            baths: '3 BA, 1 HALF BA',
            sqft: 'Approx. 3,924 SF',
            image: 'https://api.cotality.com/trestle/Media/Property/PHOTO-Jpeg/1100149223/1/MzY3Ny81NzgwLzY/Ni8xMjc1My8xNzY2MzM3NDA2/JwUEZ3EjKhowuXy8szILFnG3L9rBd1zFdbpQaommrSg',
            agent: {
                name: 'Kathryn Neugold',
                image: 'https://res.cloudinary.com/douglas-elliman/image/upload/v1/HeadShots/50/m5hnqoylnbiatruef56i',
                phone: '212.891.7000',
                title: 'Licensed Real Estate Salesperson'
            }
        },
        '291-palm-ave-miami-beach-fl-33139': {
            address: '291 Palm Ave',
            location: 'Miami Beach, FL 33139',
            price: '$5,995,000',
            beds: '4 BR',
            baths: '4 BA, 1 HALF BA',
            sqft: 'Approx. 3,077 SF',
            image: 'https://dvvjkgh94f2v6.cloudfront.net/523fa3e6/420661812/83dcefb7.jpeg',
            agent: {
                name: 'Devin Kay',
                image: 'https://res.cloudinary.com/douglas-elliman/image/upload/v1/Headshots/316/ub0fha9mutlzdnenehdt',
                phone: '305.677.5000',
                title: 'Sales Associate'
            }
        }
    };

    // Default to Miami Beach if slug doesn't match
    const data = (slug && listings[slug]) || listings['291-palm-ave-miami-beach-fl-33139'];

    return (
        <main className="min-h-screen bg-white">
            <Header theme="dark" />

            {/* Image Hero Section */}
            <section className="relative w-full h-[60vh] md:h-[85vh] group overflow-hidden bg-gray-100">
                <img
                    src={data.image}
                    alt="Property Hero"
                    className="w-full h-full object-cover"
                />

                {/* Image Nav Arrows */}
                <button className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronLeft className="w-6 h-6 text-[#181728]" />
                </button>
                <button className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-6 h-6 text-[#181728]" />
                </button>

                {/* Floating Buttons */}
                <div className="absolute bottom-10 left-10 flex gap-4">
                    <button className="flex items-center gap-3 px-6 py-3 bg-white text-[#181728] rounded-full shadow-md text-xs font-semibold tracking-widest uppercase hover:bg-gray-50 transition-colors">
                        <Camera className="w-4 h-4" />
                        Photos
                    </button>
                    <button className="flex items-center gap-3 px-6 py-3 bg-white text-[#181728] rounded-full shadow-md text-xs font-semibold tracking-widest uppercase hover:bg-gray-50 transition-colors">
                        <MapIcon className="w-4 h-4" />
                        Map
                    </button>
                </div>
            </section>

            {/* Property Info Container */}
            <section className="bg-[#F8F8F8] py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center space-y-4 mb-12">
                        <h1 className="text-3xl md:text-[44px] font-sans font-normal tracking-[0.1em] text-[#181728] uppercase">
                            {data.address}
                        </h1>
                        <p className="text-sm md:text-base tracking-[0.15em] text-gray-500 uppercase">
                            {data.location}
                        </p>

                        <div className="w-12 h-[1px] bg-gray-400 mx-auto my-10"></div>

                        <div className="space-y-4">
                            <h2 className="text-5xl md:text-[64px] font-sans font-normal text-[#181728]">
                                {data.price}
                            </h2>
                            <button className="text-[10px] tracking-[0.2em] font-bold text-[#181728] uppercase border-b border-[#181728] pb-1 hover:opacity-70 transition-opacity">
                                Estimate My Mortgage
                            </button>
                        </div>
                    </div>

                    {/* Stats Divider Lines */}
                    <div className="w-full h-[1px] bg-gray-200"></div>
                    <div className="flex flex-wrap justify-center items-center gap-x-12 md:gap-x-20 py-8 text-[#181728]">
                        <div className="flex items-center gap-3 py-4">
                            <svg className="w-6 h-6 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M2.5 12h19M2.5 12V6.5a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2V12M2.5 12v5.5a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2V12m-16-7.5v5m13-5v5" />
                            </svg>
                            <span className="text-sm font-medium tracking-[0.2em] uppercase">{data.beds}</span>
                        </div>
                        <div className="flex items-center gap-3 py-4">
                            <svg className="w-6 h-6 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M4 11h16M7 7h10M6 15h12v3a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-3z" />
                            </svg>
                            <span className="text-sm font-medium tracking-[0.2em] uppercase">{data.baths}</span>
                        </div>
                        <div className="flex items-center gap-3 py-4">
                            <svg className="w-6 h-6 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18" />
                            </svg>
                            <span className="text-sm font-medium tracking-[0.2em] uppercase">{data.sqft}</span>
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-gray-200"></div>

                    {/* Exclusive Badge */}
                    <div className="flex justify-center items-center gap-3 mt-12 opacity-60">
                        <div className="w-4 h-4 rounded-full border border-[#181728] flex items-center justify-center text-[10px] font-bold">
                            DE
                        </div>
                        <span className="text-[10px] tracking-[0.2em] font-semibold uppercase text-[#181728]">
                            Douglas Elliman Exclusive
                        </span>
                    </div>
                </div>
            </section>

            {/* Agent Section */}
            <section className="bg-white py-20 border-t border-gray-100">
                <div className="container mx-auto px-6 max-w-xl text-center">
                    <h3 className="text-base tracking-[0.3em] uppercase text-[#181728] mb-12 font-medium">
                        Get in touch with our agents
                    </h3>

                    <div className="bg-white border border-gray-50 shadow-sm p-8 flex flex-col items-center">
                        <div className="w-40 h-40 mb-6 overflow-hidden">
                            <img
                                src={data.agent.image}
                                alt={data.agent.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h4 className="text-lg font-sans text-[#181728] mb-2">{data.agent.name}</h4>
                        <p className="text-sm text-gray-500 mb-1">{data.agent.phone}</p>
                        <p className="text-sm text-gray-500 mb-1">{data.agent.title}</p>
                        <p className="text-sm text-gray-400 mb-8">DOUGLAS ELLIMAN REAL ESTATE</p>

                        <button className="px-12 py-4 bg-[#100B28] text-white rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-[#100B28]/90 transition-colors">
                            Connect
                        </button>
                    </div>
                </div>
            </section>

            {/* Mortgage CTA Section */}
            <section className="bg-[#F8F8F8] py-40 border-t border-gray-100">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-sans font-normal tracking-[0.1em] text-[#181728] uppercase mb-10">
                        Estimate My Mortgage
                    </h2>
                    <button className="flex justify-center items-center gap-3 mx-auto text-xs tracking-[0.2em] font-semibold uppercase text-[#181728] hover:opacity-70 transition-opacity">
                        <Plus className="w-5 h-5" />
                        Get Started
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
