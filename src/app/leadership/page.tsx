'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Plus, Minus, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface LeaderTileProps {
    name: string;
    title: string;
    image: string;
    reversed?: boolean;
}

function LeaderTile({ name, title, image, reversed }: LeaderTileProps) {
    return (
        <div className={`flex flex-col md:flex-row ${reversed ? 'md:flex-row-reverse' : ''} bg-white group overflow-hidden`}>
            <div className="w-full md:w-1/2 relative aspect-[4/3] md:aspect-auto overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>
            <div className={`w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-20 ${reversed ? 'items-start md:text-left' : 'items-start md:text-left'} bg-white`}>
                <h2 className="text-3xl lg:text-4xl font-serif text-[#181728] mb-4">{name}</h2>
                <p className="text-sm lg:text-base text-gray-500 mb-8 max-w-md">{title}</p>
                <button className="px-10 py-3 bg-[#100B28] text-white text-xs tracking-widest uppercase hover:bg-[#100B28]/90 transition-colors rounded-full font-medium">
                    See more
                </button>
            </div>
        </div>
    );
}

interface AccordionItemProps {
    title: string;
    isOpen: boolean;
    onClick: () => void;
}

function AccordionItem({ title, isOpen, onClick }: AccordionItemProps) {
    return (
        <div className="border-b border-gray-700">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-10 text-left focus:outline-none group"
            >
                <h2 className="text-base lg:text-lg font-sans tracking-[0.2em] uppercase text-white font-medium group-hover:opacity-70 transition-opacity">
                    {title}
                </h2>
                <div className="shrink-0 ml-4">
                    {isOpen ? (
                        <Minus className="w-5 h-5 text-white stroke-[1.5px]" />
                    ) : (
                        <Plus className="w-5 h-5 text-white stroke-[1.5px]" />
                    )}
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-12' : 'max-h-0 opacity-0'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <p className="text-gray-400 text-sm">Leadership details coming soon for this region.</p>
                </div>
            </div>
        </div>
    );
}

export default function LeadershipPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const regions = [
        "Executive Leadership",
        "New York City",
        "Long Island, Hamptons & North Fork",
        "Westchester & New England",
        "Mid-Atlantic",
        "New Jersey",
        "Florida",
        "California",
        "Colorado",
        "Texas",
        "Nevada"
    ];

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <main className="min-h-screen bg-[#181728]">
            <Header />

            {/* Hero Section */}
            <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://res.cloudinary.com/dk92v0fkk/image/upload/v1766097063/production/myfyhtalqjqjhtcmxiuk.jpg"
                        alt="Leadership Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </div>

                <div className="relative z-10 container mx-auto px-6 text-center text-white pt-20">
                    <span className="block text-[10px] md:text-xs font-medium tracking-[0.4em] uppercase mb-6 opacity-80">
                        Our Leadership
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-[44px] font-sans font-normal tracking-[0.1em] leading-tight uppercase mb-8 max-w-4xl mx-auto">
                        Real Estate is a People Business First
                    </h1>
                    <p className="text-xs md:text-sm lg:text-base font-light opacity-70 max-w-md mx-auto leading-relaxed">
                        While innovation drives success for our agents and partners, relationships and thoughtful leadership are the most essential.
                    </p>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
                    <span className="text-[9px] tracking-[0.4em] uppercase font-medium text-white/80">Scroll to discover</span>
                    <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-white/60 animate-scroll-down" />
                    </div>
                </div>
            </section>

            {/* Top Leadership Tiles */}
            <section className="bg-gray-100">
                <div className="container mx-auto px-6 py-20 lg:py-32">
                    <div className="max-w-7xl mx-auto space-y-12">
                        <LeaderTile
                            name="Michael S. Liebowitz"
                            title="President and Chief Executive Officer"
                            image="https://res.cloudinary.com/dk92v0fkk/image/upload/v1740419107/production/hpzxerrwbliqrzaogane.png"
                        />
                        <LeaderTile
                            name="Susan de França"
                            title="President & Chief Executive Officer - DE Development Marketing"
                            image="https://res.cloudinary.com/dk92v0fkk/image/upload/v1734999307/production/ri0ouilkicfcv6k9okhf.png"
                            reversed
                        />
                    </div>
                </div>
            </section>

            {/* Regional Accordions */}
            <section className="bg-[#181728]">
                <div className="container mx-auto px-6 py-20 lg:py-32">
                    <div className="max-w-6xl mx-auto">
                        {regions.map((region, index) => (
                            <AccordionItem
                                key={region}
                                title={region}
                                isOpen={openIndex === index}
                                onClick={() => toggleAccordion(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx global>{`
                @keyframes scroll-down {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(200%); }
                }
                .animate-scroll-down {
                    animation: scroll-down 2s cubic-bezier(0.76, 0, 0.24, 1) infinite;
                }
            `}</style>
        </main>
    );
}
