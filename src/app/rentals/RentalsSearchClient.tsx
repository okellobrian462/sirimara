"use client";

import ListingCard from "@/components/ListingCard";
import SearchFilters from "@/components/SearchFilters";
import PropertyMap from "@/components/PropertyMap";
import { Plus, Search, Camera, MapPin } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Listing, FilterState } from "@/lib/types/listing";

interface RentalsSearchClientProps {
    listings: Listing[];
    googleMapsApiKey: string;
    hideHero?: boolean;
}

export default function RentalsSearchClient({
    listings,
    googleMapsApiKey,
    hideHero = false,
}: RentalsSearchClientProps) {
    const [filters, setFilters] = useState<FilterState>({
        goal: "rental",
        priceMin: null,
        priceMax: null,
        beds: null,
        baths: null,
        propertyTypes: [],
        location: "New York City",
    });

    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState("");

    const filteredListings = listings.filter((listing) => {
        // Search Query Check
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const match =
                listing.address.toLowerCase().includes(query) ||
                listing.city.toLowerCase().includes(query) ||
                listing.zip.toLowerCase().includes(query);
            if (!match) return false;
        }

        // Goal check
        if (filters.goal && listing.listingType !== filters.goal) return false;

        // Price check
        if (filters.priceMin && listing.price < filters.priceMin) return false;
        if (filters.priceMax && listing.price > filters.priceMax) return false;

        // Bed/Bath check
        if (filters.beds && listing.beds < filters.beds) return false;
        if (filters.baths && listing.baths < filters.baths) return false;

        return true;
    });

    return (
        <>
            {/* Hero Section */}
            {!hideHero && (
                <div className="bg-[#4d525c] pt-28 pb-16 text-center px-6">
                    <h2 className="text-white text-3xl md:text-4xl font-light tracking-[0.15em] mb-4 font-serif">
                        FIND YOUR FAVORITE PLACE TO BE
                    </h2>
                    <p className="text-white/90 text-sm tracking-wide font-light">
                        We are experts in the luxury rental market.
                    </p>
                </div>
            )}

            {/* Main Content Area */}
            <div className="min-h-screen bg-white">
                {/* Sticky Search Bar */}
                <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
                    <div className="w-full px-6 py-4 container mx-auto max-w-7xl">
                        <div className="flex items-center gap-4">
                            <div className="flex-1 bg-white border border-gray-300 rounded px-4 py-3 flex items-center gap-2 shadow-sm">
                                <input
                                    type="text"
                                    placeholder="Enter your location, address, ZIP, property ID or agent name"
                                    className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400 font-light"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <div className="flex items-center gap-4 text-gray-400">
                                    <button type="button" className="hover:text-black">
                                        <Camera className="w-5 h-5" />
                                    </button>
                                    <button type="button" className="hover:text-black">
                                        <MapPin className="w-5 h-5" />
                                    </button>
                                    <button type="button" className="hover:text-black">
                                        <Search className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Filters in the same container */}
                        <div className="mt-4">
                            <SearchFilters
                                filters={filters}
                                onFilterChange={setFilters}
                                totalResults={listings.length}
                                filteredResults={filteredListings.length}
                            />
                        </div>
                    </div>
                </div>

                {/* Listings Grid - Full Width */}
                <div className="w-full px-6 py-8 container mx-auto max-w-7xl">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h1 className="text-2xl font-serif text-[#181728] mb-1">
                                Luxury listings for rent in New York City
                            </h1>
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">
                                {filteredListings.length} of {listings.length} Homes
                            </p>
                        </div>
                        <div className="flex items-center gap-6 text-[10px] font-bold tracking-[0.2em] text-[#181728] uppercase">
                            <div className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                                <span>Compare</span>
                                <div className="w-8 h-4 bg-gray-200 rounded-full relative">
                                    <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full shadow-sm" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 cursor-pointer">
                                Featured Image: Default
                            </div>
                            <div className="flex items-center gap-2 cursor-pointer">
                                Sort By: DE Exclusives
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                        {filteredListings.map((listing) => (
                            <ListingCard
                                key={listing.id}
                                listing={listing}
                                onFavorite={(id) => console.log("Favorited:", id)}
                                onClick={(id) => {
                                    const listing = listings.find((l) => l.id === id);
                                    if (listing) {
                                        router.push(`/listing/${listing.slug}`);
                                    }
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
