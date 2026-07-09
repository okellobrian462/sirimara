'use client';

import { Search, MapPin, Camera, X, ChevronDown, SlidersHorizontal, List, Map } from 'lucide-react';

export default function ExclusivesFilterBar() {
    return (
        <div className="sticky top-[80px] z-30 bg-white border-b border-gray-100 shadow-sm">
            { }
            <div className="w-full px-6 md:px-8 py-4 flex flex-col md:flex-row items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-xs font-bold tracking-widest uppercase text-brand-dark">
                    <span>United States of America</span>
                    <button className="hover:text-red-500">
                        <X className="w-3 h-3" />
                    </button>
                </div>

                <div className="flex-1 flex items-center gap-4 w-full md:w-auto border-b border-gray-200 md:border-none pb-2 md:pb-0">
                    <input
                        type="text"
                        placeholder="Enter location"
                        className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400 font-light"
                    />
                    <div className="flex items-center gap-3 text-gray-400">
                        <button className="hover:text-brand-dark"><Camera className="w-5 h-5" /></button>
                        <button className="hover:text-brand-dark"><MapPin className="w-5 h-5" /></button>
                        <button className="hover:text-brand-dark"><Search className="w-5 h-5" /></button>
                    </div>
                </div>
            </div>

            { }
            <div className="border-t border-gray-100">
                <div className="w-full px-6 md:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-6 md:gap-8 overflow-x-auto no-scrollbar">
                        <button className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-brand-dark whitespace-nowrap">
                            FOR SALE <ChevronDown className="w-3 h-3" />
                        </button>
                        <button className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-brand-dark whitespace-nowrap">
                            PRICE <ChevronDown className="w-3 h-3" />
                        </button>
                        <button className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-brand-dark whitespace-nowrap">
                            BED / BATH <ChevronDown className="w-3 h-3" />
                        </button>
                        {/* <button className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-brand-dark whitespace-nowrap">
                            PROPERTY TYPE <ChevronDown className="w-3 h-3" />
                        </button> */}

                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-xs font-bold tracking-widest uppercase text-brand-dark hover:bg-gray-50 transition-colors whitespace-nowrap">
                            <SlidersHorizontal className="w-3 h-3" /> ALL FILTERS
                        </button>
                    </div>

                    <div className="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-brand-dark cursor-pointer">
                        VIEW: LIST <ChevronDown className="w-3 h-3" />
                    </div>
                </div>
            </div>
        </div>
    );
}
