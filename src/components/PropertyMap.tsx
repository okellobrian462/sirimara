"use client";

import type { Listing } from "@/lib/types/listing";

interface PropertyMapProps {
    listings: Listing[];
    onMarkerClick?: (listing: Listing) => void;
    apiKey: string;
}

export default function PropertyMap({
    listings,
    onMarkerClick,
    apiKey,
}: PropertyMapProps) {
    return (
        <div className="w-full h-full relative overflow-hidden bg-gray-200 group">
            {/* Dummy Map Image - Grayscale */}
            <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop"
                alt="Map View"
                className="w-full h-full object-cover grayscale opacity-80"
            />

            {/* Simulated Markers (Static dots for visual effect) */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#181728] rounded-full ring-4 ring-white shadow-lg cursor-pointer hover:scale-110 transition-transform"></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-[#181728] rounded-full ring-4 ring-white shadow-lg cursor-pointer hover:scale-110 transition-transform"></div>
            <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-[#181728] rounded-full ring-4 ring-white shadow-lg cursor-pointer hover:scale-110 transition-transform"></div>
            <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#181728] rounded-full ring-4 ring-white shadow-lg cursor-pointer hover:scale-110 transition-transform"></div>

            {/* Fake Controls for realism */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                <div className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-50 text-gray-600 font-bold text-lg select-none">+</div>
                <div className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-50 text-gray-600 font-bold text-lg select-none">−</div>
            </div>

            {/* Fake Google Attribution */}
            <div className="absolute bottom-1 left-1 bg-white/50 px-1 rounded text-[10px] text-gray-500 font-sans select-none">
                Google
            </div>
        </div>
    );
}
