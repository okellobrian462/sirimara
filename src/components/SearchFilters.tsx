"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, SlidersHorizontal, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FilterState } from "@/lib/types/listing";

interface SearchFiltersProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    totalResults: number;
    filteredResults: number;
}

export default function SearchFilters({
    filters,
    onFilterChange,
    totalResults,
    filteredResults,
}: SearchFiltersProps) {
    const router = useRouter();
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const filtersRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const handleGoalChange = (newGoal: "sale" | "rental") => {
        if (newGoal === "sale") router.push("/sales");
        else router.push("/rentals");
        setActiveDropdown(null);
    };

    const updateFilter = (key: keyof FilterState, value: string | number | string[] | null) => {
        onFilterChange({ ...filters, [key]: value } as FilterState);
    };

    return (
        <div ref={filtersRef} className="w-full bg-white px-6 py-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 relative z-50">
            <div className="flex items-center gap-4">
                {/* Sale/Rent Toggle */}
                <div className="relative">
                    <button
                        onClick={() => toggleDropdown("goal")}
                        className={`flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-opacity ${activeDropdown === "goal" ? "opacity-100" : "text-[#181728] hover:opacity-70"}`}
                    >
                        {filters.goal === 'sale' ? 'For Sale' : 'For Rent'}
                        <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === "goal" ? "rotate-180" : ""}`} />
                    </button>
                    {activeDropdown === "goal" && (
                        <div className="absolute top-full left-0 mt-4 w-40 bg-white shadow-xl border border-gray-100 py-2 rounded-sm z-50">
                            <button
                                onClick={() => handleGoalChange("sale")}
                                className="w-full text-left px-4 py-3 text-xs uppercase tracking-wider hover:bg-gray-50 flex justify-between items-center"
                            >
                                For Sale
                                {filters.goal === "sale" && <Check className="w-3 h-3" />}
                            </button>
                            <button
                                onClick={() => handleGoalChange("rental")}
                                className="w-full text-left px-4 py-3 text-xs uppercase tracking-wider hover:bg-gray-50 flex justify-between items-center"
                            >
                                For Rent
                                {filters.goal === "rental" && <Check className="w-3 h-3" />}
                            </button>
                        </div>
                    )}
                </div>

                {/* Price Filter */}
                <div className="relative">
                    <button
                        onClick={() => toggleDropdown("price")}
                        className={`flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-opacity ${activeDropdown === "price" ? "opacity-100" : "text-[#181728] hover:opacity-70"}`}
                    >
                        Price
                        <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === "price" ? "rotate-180" : ""}`} />
                    </button>
                    {activeDropdown === "price" && (
                        <div className="absolute top-full left-0 mt-4 w-72 bg-white shadow-xl border border-gray-100 p-6 rounded-sm z-50 cursor-default" onClick={(e) => e.stopPropagation()}>
                            <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-gray-500">Price Range</h4>
                            <div className="flex gap-4 mb-4">
                                <div className="flex-1">
                                    <label className="block text-[10px] uppercase text-gray-400 mb-1">Min Price</label>
                                    <input
                                        type="number"
                                        placeholder="No Min"
                                        className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black outline-none"
                                        value={filters.priceMin || ""}
                                        onChange={(e) => updateFilter("priceMin", e.target.value ? Number(e.target.value) : null)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-[10px] uppercase text-gray-400 mb-1">Max Price</label>
                                    <input
                                        type="number"
                                        placeholder="No Max"
                                        className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black outline-none"
                                        value={filters.priceMax || ""}
                                        onChange={(e) => updateFilter("priceMax", e.target.value ? Number(e.target.value) : null)}
                                    />
                                </div>
                            </div>
                            <div className="text-right">
                                <button
                                    onClick={() => setActiveDropdown(null)}
                                    className="text-[10px] font-bold uppercase tracking-widest text-[#181728] hover:underline"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bed / Bath Filter */}
                <div className="relative">
                    <button
                        onClick={() => toggleDropdown("beds")}
                        className={`flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-opacity ${activeDropdown === "beds" ? "opacity-100" : "text-[#181728] hover:opacity-70"}`}
                    >
                        Bed / Bath
                        <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === "beds" ? "rotate-180" : ""}`} />
                    </button>
                    {activeDropdown === "beds" && (
                        <div className="absolute top-full left-0 mt-4 w-80 bg-white shadow-xl border border-gray-100 p-6 rounded-sm z-50 cursor-default" onClick={(e) => e.stopPropagation()}>
                            <div className="mb-6">
                                <h4 className="text-xs font-bold uppercase tracking-widest mb-3 text-gray-500">Bedrooms</h4>
                                <div className="flex flex-wrap gap-2">
                                    {[0, 1, 2, 3, 4, 5].map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => updateFilter("beds", filters.beds === num ? null : num)}
                                            className={`w-10 h-10 rounded-full text-xs font-medium flex items-center justify-center transition-colors ${filters.beds === num
                                                ? "bg-[#181728] text-white"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }`}
                                        >
                                            {num === 0 ? "Any" : `${num}+`}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4">
                                <h4 className="text-xs font-bold uppercase tracking-widest mb-3 text-gray-500">Bathrooms</h4>
                                <div className="flex flex-wrap gap-2">
                                    {[0, 1, 2, 3, 4, 5].map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => updateFilter("baths", filters.baths === num ? null : num)}
                                            className={`w-10 h-10 rounded-full text-xs font-medium flex items-center justify-center transition-colors ${filters.baths === num
                                                ? "bg-[#181728] text-white"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }`}
                                        >
                                            {num === 0 ? "Any" : `${num}+`}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="text-right">
                                <button
                                    onClick={() => setActiveDropdown(null)}
                                    className="text-[10px] font-bold uppercase tracking-widest text-[#181728] hover:underline"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Property Type Filter - Placeholder until DB support */}
                <button className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 cursor-not-allowed">
                    Property Type
                    <ChevronDown className="w-3 h-3" />
                </button>

                {/* All Filters Button */}
                <button className="flex items-center gap-2 px-8 py-3 border border-gray-300 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-[#181728] hover:bg-gray-50 transition-colors ml-4">
                    All Filters
                    <SlidersHorizontal className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
}
