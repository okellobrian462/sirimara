'use client';

import { Search } from 'lucide-react';

export default function AgentsHero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://res.cloudinary.com/dk92v0fkk/image/upload/v1727311016/staging/zkbtspvuvdutxii11lzk.webp"
                    alt="Agents Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center text-white">
                <span className="text-sm md:text-base tracking-[0.2em] font-medium uppercase mb-4 block">
                    AGENTS
                </span>
                <h1 className="text-3xl md:text-6xl font-sans font-light tracking-[0.1em] uppercase mb-12 max-w-4xl mx-auto leading-tight">
                    CONNECT WITH OUR LUXURY REAL ESTATE AGENTS
                </h1>

                {/* Search Bar */}
                <div className="max-w-4xl mx-auto relative group w-full">
                    <div className="relative flex items-center bg-white p-2">
                        <input
                            type="text"
                            placeholder="Enter agent name, state or office address"
                            className="w-full bg-transparent border-none py-4 px-6 text-brand-dark placeholder:text-gray-400 focus:outline-none text-lg md:text-xl font-light"
                        />
                        <button className="p-4 hover:opacity-70 transition-opacity">
                            <Search className="w-6 h-6 text-brand-dark" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-[10px] tracking-[0.2em] uppercase font-bold text-center z-20">
                SCROLL TO DISCOVER
                <div className="w-[1px] h-12 bg-white mx-auto mt-4" />
            </div>
        </section>
    );
}
