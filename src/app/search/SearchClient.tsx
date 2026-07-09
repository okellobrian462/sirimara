'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';

interface SearchResult {
    id: string;
    type: 'property' | 'agent';
    subtype?: 'buy' | 'rent';
    title: string;
    subtitle: string;
    image: string;
    url: string;
    metadata: {
        price?: number;
        bedrooms?: number;
        bathrooms?: number;
    };
}

export default function SearchClient() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialQuery = searchParams.get('q') || '';
    const initialType = searchParams.get('type') || 'buy';

    const [query, setQuery] = useState(initialQuery);
    const [activeTab, setActiveTab] = useState(initialType);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [beds, setBeds] = useState('');
    const [baths, setBaths] = useState('');

    useEffect(() => {
        const fetchResults = async () => {
            setIsLoading(true);
            try {
                const params = new URLSearchParams();
                params.set('q', query);
                params.set('type', activeTab);
                if (minPrice) params.set('min_price', minPrice);
                if (maxPrice) params.set('max_price', maxPrice);
                if (beds) params.set('beds', beds);
                if (baths) params.set('baths', baths);
                params.set('limit', '50');

                const response = await fetch(`/api/search?${params.toString()}`);
                const data = (await response.json()) as { results: SearchResult[] };
                setResults(data.results || []);
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const timeout = setTimeout(fetchResults, 300);
        return () => clearTimeout(timeout);
    }, [query, activeTab, minPrice, maxPrice, beds, baths]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        const params = new URLSearchParams(searchParams.toString());
        params.set('type', tab);
        router.push(`/search?${params.toString()}`);
    };

    const formatPrice = (price: number) => `$${price.toLocaleString()}`;

    return (
        <div className="min-h-[60vh]">
            <div className="mb-8">
                {}
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-serif text-brand-dark mb-2">
                            {query ? `Results for "${query}"` : 'Search Properties'}
                        </h1>
                        <p className="text-gray-500 uppercase tracking-widest text-xs font-medium">
                            {results.length} {activeTab === 'agents' ? 'Agents' : 'Properties'} Found
                        </p>
                    </div>

                    {}
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        {['buy', 'rent', 'agents'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${activeTab === tab
                                    ? 'bg-white text-brand-dark shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {}
                {activeTab !== 'agents' && (
                    <div className="border-y border-gray-200 py-4 mb-8">
                        <div className="flex flex-wrap gap-4 items-center">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50 text-xs font-bold uppercase tracking-widest md:hidden"
                            >
                                <SlidersHorizontal className="w-4 h-4" /> Filters
                            </button>

                            <div className={`flex-1 flex flex-wrap gap-4 ${showFilters ? 'block w-full mt-4 md:mt-0' : 'hidden md:flex'}`}>
                                {}
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min Price"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        className="w-32 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:border-gray-400"
                                    />
                                    <span className="text-gray-400">-</span>
                                    <input
                                        type="number"
                                        placeholder="Max Price"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        className="w-32 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:border-gray-400"
                                    />
                                </div>

                                {}
                                <select
                                    value={beds}
                                    onChange={(e) => setBeds(e.target.value)}
                                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:border-gray-400"
                                >
                                    <option value="">Beds (Any)</option>
                                    <option value="1">1+</option>
                                    <option value="2">2+</option>
                                    <option value="3">3+</option>
                                    <option value="4">4+</option>
                                </select>

                                <select
                                    value={baths}
                                    onChange={(e) => setBaths(e.target.value)}
                                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:border-gray-400"
                                >
                                    <option value="">Baths (Any)</option>
                                    <option value="1">1+</option>
                                    <option value="2">2+</option>
                                    <option value="3">3+</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-gray-200 aspect-[3/4] mb-4"></div>
                            <div className="h-6 bg-gray-200 w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 w-1/2"></div>
                        </div>
                    ))}
                </div>
            ) : results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {results.map((result) => (
                        <Link
                            key={result.id}
                            href={result.url}
                            className="group block"
                        >
                            <div className="relative overflow-hidden mb-4 aspect-[3/4] bg-gray-100">
                                {result.image ? (
                                    <img
                                        src={result.image}
                                        alt={result.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                        <Search className="w-8 h-8" />
                                    </div>
                                )}

                                {result.type === 'property' && (
                                    <>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <h3 className="text-2xl mb-1 font-serif">
                                                {result.title.split(',')[0]}
                                            </h3>
                                            <div className="text-[10px] tracking-widest uppercase font-medium">
                                                {result.metadata.price && formatPrice(result.metadata.price)}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-sm font-medium text-brand-dark truncate max-w-[200px]">
                                        {result.type === 'agent' ? result.title : result.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                                        {result.type === 'agent'
                                            ? result.subtitle
                                            : `${result.metadata.bedrooms || 0} BD | ${result.metadata.bathrooms || 0} BA`}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <div className="max-w-md mx-auto">
                        <h3 className="text-lg text-gray-900 font-medium mb-2">No results found</h3>
                        <p className="text-gray-500 mb-6">
                            We couldn't find any properties matching your criteria. Try adjusting your filters or search terms.
                        </p>
                        <button
                            onClick={() => {
                                setQuery('');
                                setMinPrice('');
                                setMaxPrice('');
                                setBeds('');
                                setBaths('');
                            }}
                            className="text-xs font-bold uppercase tracking-widest underline hover:text-blue-600"
                        >
                            Clear all filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
