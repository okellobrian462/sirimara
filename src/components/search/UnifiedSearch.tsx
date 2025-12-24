'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SearchResult {
    id: string;
    type: 'property' | 'agent';
    subtype?: 'buy' | 'rent';
    title: string;
    subtitle: string;
    image: string;
    url: string;
    metadata: Record<string, unknown>;
}

interface UnifiedSearchProps {
    searchType?: 'buy' | 'rent' | 'agents';
    placeholder?: string;
    showTypeToggle?: boolean;
    onSearch?: (query: string, type: string) => void;
    className?: string;
}

/**
 * Unified search component with autocomplete
 * Reusable across header, dropdowns, and hero sections
 */
export default function UnifiedSearch({
    searchType = 'buy',
    placeholder = 'Enter location, address, ZIP...',
    showTypeToggle = false,
    onSearch,
    className = ''
}: UnifiedSearchProps) {
    const [query, setQuery] = useState('');
    const [activeType, setActiveType] = useState(searchType);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);

    // Fetch search results with debounce
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (query.length >= 2) {
                setIsLoading(true);
                try {
                    const response = await fetch(
                        `/api/search?q=${encodeURIComponent(query)}&type=${activeType}&limit=5`
                    );
                    const data = await response.json();
                    setResults(data.results || []);
                    setShowResults(true);
                } catch (error) {
                    console.error('Search failed:', error);
                    setResults([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults([]);
                setShowResults(false);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query, activeType]);

    // Close results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!query.trim()) return;

        if (onSearch) {
            onSearch(query, activeType);
        } else {
            router.push(`/search?q=${encodeURIComponent(query)}&type=${activeType}`);
        }
        setShowResults(false);
    };

    const handleResultClick = (url: string) => {
        router.push(url);
        setShowResults(false);
        setQuery('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setShowResults(false);
        } else if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const formatPrice = (price: number) => `$${price.toLocaleString()}`;

    return (
        <div ref={searchRef} className={`relative ${className}`}>
            {/* Type Toggle (optional) */}
            {showTypeToggle && (
                <div className="flex gap-2 mb-4">
                    {['buy', 'rent', 'agents'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type as 'buy' | 'rent' | 'agents')}
                            className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors ${activeType === type
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            )}

            {/* Search Input */}
            <form onSubmit={handleSearch} className="relative">
                <div className="relative flex items-center bg-white border border-gray-300 focus-within:border-gray-900 transition-colors">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => query.length >= 2 && setShowResults(true)}
                        placeholder={placeholder}
                        className="w-full bg-transparent border-none py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => {
                                setQuery('');
                                setResults([]);
                                setShowResults(false);
                            }}
                            className="p-2 hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-4 h-4 text-gray-400" />
                        </button>
                    )}
                    <button
                        type="submit"
                        className="p-3 hover:bg-gray-100 transition-colors"
                    >
                        <Search className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Autocomplete Results */}
                {showResults && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 shadow-2xl max-h-96 overflow-y-auto z-50">
                        {isLoading ? (
                            <div className="p-8 text-center text-gray-500">
                                <div className="animate-spin w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full mx-auto mb-2"></div>
                                Searching...
                            </div>
                        ) : results.length > 0 ? (
                            <>
                                {results.map((result) => (
                                    <button
                                        key={result.id}
                                        onClick={() => handleResultClick(result.url)}
                                        className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
                                    >
                                        {/* Image */}
                                        <div className="w-16 h-16 flex-shrink-0 bg-gray-100 overflow-hidden">
                                            {result.image ? (
                                                <img
                                                    src={result.image}
                                                    alt={result.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <Search className="w-6 h-6" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="text-sm font-medium text-gray-900 truncate">
                                                    {result.title}
                                                </h4>
                                                {result.subtype && (
                                                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 uppercase">
                                                        {result.subtype}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 truncate">
                                                {result.subtitle}
                                            </p>
                                            {typeof result.metadata?.price === 'number' && (
                                                <p className="text-xs font-medium text-gray-900 mt-1">
                                                    {formatPrice(result.metadata.price)}
                                                </p>
                                            )}
                                        </div>
                                    </button>
                                ))}

                                {/* View All Results */}
                                <button
                                    onClick={handleSearch}
                                    className="w-full p-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors border-t border-gray-200"
                                >
                                    View all results for "{query}"
                                </button>
                            </>
                        ) : query.length >= 2 ? (
                            <div className="p-8 text-center text-gray-500">
                                No results found for "{query}"
                            </div>
                        ) : null}
                    </div>
                )}
            </form>
        </div>
    );
}
