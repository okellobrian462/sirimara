"use client";

import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import type { FilterState } from "@/lib/types/listing";

interface AllFiltersModalProps {
    isOpen: boolean;
    onClose: () => void;
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    filteredCount: number;
    totalCount: number;
    propertyTypes: { id: string; name: string; slug: string }[];
    features: { id: string; name: string; category: string }[];
}

const bedroomOptions = [
    { value: 0, label: "Any" },
    { value: 1, label: "Studio" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5+" },
];

const bathroomOptions = [
    { value: 0, label: "Any" },
    { value: 1, label: "1+" },
    { value: 2, label: "2+" },
    { value: 3, label: "3+" },
    { value: 4, label: "4+" },
    { value: 5, label: "5+" },
];

const parkingOptions = [
    { value: null, label: "Any" },
    { value: 1, label: "1+" },
    { value: 2, label: "2+" },
    { value: 3, label: "3+" },
    { value: 4, label: "4+" },
];

export default function AllFiltersModal({
    isOpen,
    onClose,
    filters,
    onFilterChange,
    filteredCount,
    totalCount,
    propertyTypes,
    features,
}: AllFiltersModalProps) {
    const [localFilters, setLocalFilters] = useState<FilterState>(filters);
    const [activeTab, setActiveTab] = useState<"sale" | "rental" | "sold">(filters.goal);

    useEffect(() => {
        if (isOpen) {
            setLocalFilters(filters);
            setActiveTab(filters.goal);
        }
    }, [isOpen, filters]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const updateLocalFilter = <K extends keyof FilterState>(
        key: K,
        value: FilterState[K]
    ) => {
        setLocalFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleTabChange = (tab: "sale" | "rental" | "sold") => {
        setActiveTab(tab);
        updateLocalFilter("goal", tab);
    };

    const handleApply = () => {
        onFilterChange(localFilters);
        onClose();
    };

    const handleReset = () => {
        const resetFilters: FilterState = {
            goal: activeTab,
            priceMin: null,
            priceMax: null,
            beds: null,
            baths: null,
            propertyTypes: [],
            location: localFilters.location,
            features: [],
            parkingMin: null,
            parkingMax: null,
            sqftMin: null,
            sqftMax: null,
            yearBuiltMin: null,
            yearBuiltMax: null,
        };
        setLocalFilters(resetFilters);
    };

    const toggleFeature = (featureId: string) => {
        setLocalFilters((prev) => ({
            ...prev,
            features: prev.features.includes(featureId)
                ? prev.features.filter((id) => id !== featureId)
                : [...prev.features, featureId],
        }));
    };

    const togglePropertyType = (typeId: string) => {
        setLocalFilters((prev) => ({
            ...prev,
            propertyTypes: prev.propertyTypes.includes(typeId)
                ? prev.propertyTypes.filter((id) => id !== typeId)
                : [...prev.propertyTypes, typeId],
        }));
    };

    const groupedFeatures = features.reduce((acc, feature) => {
        const cat = feature.category || "General";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(feature);
        return acc;
    }, {} as Record<string, typeof features>);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {}
            <div className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-lg shadow-2xl overflow-hidden flex flex-col mx-4">
                {}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium tracking-wide uppercase">All Filters</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {}
                <div className="flex border-b border-gray-200">
                    {[
                        { id: "sale", label: "For Sale" },
                        { id: "rental", label: "For Rent" },
                        { id: "sold", label: "Sold" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id as typeof activeTab)}
                            className={`flex-1 py-4 text-sm font-medium tracking-wide uppercase transition-colors ${activeTab === tab.id
                                    ? "text-brand-dark border-b-2 border-brand-dark"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {}
                <div className="flex-1 overflow-y-auto p-6">
                    {}
                    <div className="mb-8">
                        <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
                            Price
                        </h3>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-xs text-gray-500 uppercase mb-1">
                                    Min Price
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">KES</span>
                                    <input
                                        type="number"
                                        placeholder="No min"
                                        className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-dark text-sm"
                                        value={localFilters.priceMin || ""}
                                        onChange={(e) =>
                                            updateLocalFilter(
                                                "priceMin",
                                                e.target.value ? Number(e.target.value) : null
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs text-gray-500 uppercase mb-1">
                                    Max Price
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">KES</span>
                                    <input
                                        type="number"
                                        placeholder="No max"
                                        className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-dark text-sm"
                                        value={localFilters.priceMax || ""}
                                        onChange={(e) =>
                                            updateLocalFilter(
                                                "priceMax",
                                                e.target.value ? Number(e.target.value) : null
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {}
                    <div className="mb-8">
                        <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
                            Bedrooms
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {bedroomOptions.map((option) => (
                                <button
                                    key={`bed-${option.label}`}
                                    onClick={() =>
                                        updateLocalFilter(
                                            "beds",
                                            localFilters.beds === option.value ? null : option.value
                                        )
                                    }
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${localFilters.beds === option.value
                                            ? "bg-brand-dark text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {}
                    <div className="mb-8">
                        <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
                            Bathrooms
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {bathroomOptions.map((option) => (
                                <button
                                    key={`bath-${option.value}`}
                                    onClick={() =>
                                        updateLocalFilter(
                                            "baths",
                                            localFilters.baths === option.value ? null : option.value
                                        )
                                    }
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${localFilters.baths === option.value
                                            ? "bg-brand-dark text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {}
                    {propertyTypes.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
                                Property Type
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {propertyTypes.map((type) => (
                                    <label
                                        key={type.id}
                                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={localFilters.propertyTypes.includes(type.id)}
                                            onChange={() => togglePropertyType(type.id)}
                                            className="w-4 h-4 text-brand-dark border-gray-300 rounded focus:ring-brand-dark"
                                        />
                                        <span className="text-sm text-gray-700">{type.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {}
                    <div className="mb-8">
                        <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
                            Square Meters
                        </h3>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-xs text-gray-500 uppercase mb-1">
                                    Min SQM
                                </label>
                                <input
                                    type="number"
                                    placeholder="No min"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-dark text-sm"
                                    value={localFilters.sqftMin || ""}
                                    onChange={(e) =>
                                        updateLocalFilter(
                                            "sqftMin",
                                            e.target.value ? Number(e.target.value) : null
                                        )
                                    }
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs text-gray-500 uppercase mb-1">
                                    Max SQM
                                </label>
                                <input
                                    type="number"
                                    placeholder="No max"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-dark text-sm"
                                    value={localFilters.sqftMax || ""}
                                    onChange={(e) =>
                                        updateLocalFilter(
                                            "sqftMax",
                                            e.target.value ? Number(e.target.value) : null
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {}
                    <div className="mb-8">
                        <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
                            Parking Spots
                        </h3>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-xs text-gray-500 uppercase mb-1">
                                    Min
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-dark text-sm bg-white"
                                    value={localFilters.parkingMin || ""}
                                    onChange={(e) =>
                                        updateLocalFilter(
                                            "parkingMin",
                                            e.target.value ? Number(e.target.value) : null
                                        )
                                    }
                                >
                                    {parkingOptions.map((opt) => (
                                        <option key={`pmin-${opt.value}`} value={opt.value || ""}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs text-gray-500 uppercase mb-1">
                                    Max
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-dark text-sm bg-white"
                                    value={localFilters.parkingMax || ""}
                                    onChange={(e) =>
                                        updateLocalFilter(
                                            "parkingMax",
                                            e.target.value ? Number(e.target.value) : null
                                        )
                                    }
                                >
                                    <option value="">No max</option>
                                    {parkingOptions.slice(1).map((opt) => (
                                        <option key={`pmax-${opt.value}`} value={opt.value?.toString() || ""}>
                                            {opt.value}+ spots
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {}
                    <div className="mb-8">
                        <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
                            Year Built
                        </h3>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-xs text-gray-500 uppercase mb-1">
                                    Min Year
                                </label>
                                <input
                                    type="number"
                                    placeholder="e.g. 1990"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-dark text-sm"
                                    value={localFilters.yearBuiltMin || ""}
                                    onChange={(e) =>
                                        updateLocalFilter(
                                            "yearBuiltMin",
                                            e.target.value ? Number(e.target.value) : null
                                        )
                                    }
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs text-gray-500 uppercase mb-1">
                                    Max Year
                                </label>
                                <input
                                    type="number"
                                    placeholder="e.g. 2024"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-dark text-sm"
                                    value={localFilters.yearBuiltMax || ""}
                                    onChange={(e) =>
                                        updateLocalFilter(
                                            "yearBuiltMax",
                                            e.target.value ? Number(e.target.value) : null
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {}
                    {features.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">
                                Home Features
                            </h3>
                            <p className="text-xs text-gray-500 mb-4">
                                Search for amenities
                            </p>
                            <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
                                {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
                                    <div key={category} className="mb-4">
                                        <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">
                                            {category}
                                        </h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {categoryFeatures.map((feature) => (
                                                <label
                                                    key={feature.id}
                                                    className="flex items-center gap-2 cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={localFilters.features.includes(feature.id)}
                                                        onChange={() => toggleFeature(feature.id)}
                                                        className="w-4 h-4 text-brand-dark border-gray-300 rounded focus:ring-brand-dark"
                                                    />
                                                    <span className="text-sm text-gray-700">{feature.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={handleReset}
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 uppercase tracking-wide"
                    >
                        Reset
                    </button>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">
                            {filteredCount} of {totalCount} Homes
                        </span>
                        <button
                            onClick={handleApply}
                            className="px-8 py-3 bg-brand-dark text-white text-sm font-medium uppercase tracking-wide rounded-full hover:bg-brand-dark/90 transition-colors"
                        >
                            See Properties
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
