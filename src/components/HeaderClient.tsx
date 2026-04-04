'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Crosshair } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/context/SearchContext';
import SirimaraLogo from '@/components/icons/SirimaraLogo';
import UnifiedSearch from '@/components/search/UnifiedSearch';
import { useSiteConfig } from '@/context/SiteConfigContext';

interface SearchResult {
    id: string;
    primaryText: string;
    secondaryText?: string;
    image?: string;
    url?: string;
}

interface NavigationItem {
    id: string;
    label: string;
    url: string;
    opens_in_new_tab: boolean;
    has_dropdown?: boolean;
    dropdown_type?: string | null;
    dropdown_config?: Record<string, unknown>;
}

interface HeaderClientProps {
    theme?: 'light' | 'dark';
    isScrolled?: boolean;
    mainNav: NavigationItem[];
    secondaryNav: NavigationItem[];
    logoSvg?: string | null;
    logoImage?: string | null;
}

export default function HeaderClient({ theme = 'light', isScrolled: externalIsScrolled, mainNav, secondaryNav, logoSvg, logoImage }: HeaderClientProps) {
    const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery } = useSearch();
    const config = useSiteConfig();
    const [internalIsScrolled, setInternalIsScrolled] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [activeSearchTab, setActiveSearchTab] = useState<'buy' | 'rent' | 'agents'>('buy');
    const router = useRouter();

    const siteName = config.company_name || 'Sirimara';
    const siteNameUpper = siteName.toUpperCase();


    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.length >= 2) {
                try {
                    const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&type=${activeSearchTab}`);
                    const data = await response.json();
                    setSearchResults(data.results || []);
                } catch (error) {
                    console.error('Failed to fetch search results', error);
                }
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, activeSearchTab]);

    const handleSearch = () => {
        if (!searchQuery.trim()) return;

        setIsSearchOpen(false);
        const params = new URLSearchParams();
        params.set('q', searchQuery);
        params.set('type', activeSearchTab);

        router.push(`/search?${params.toString()}`);
    };

    const handleResultClick = (url: string) => {
        if (!url) return;
        setIsSearchOpen(false);
        router.push(url);
    };
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const isScrolled = externalIsScrolled ?? internalIsScrolled;

    useEffect(() => {
        const handleScroll = () => {
            setInternalIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Background classes:
    // If search is open, always white background with dark text (looks like search overlay)
    // Otherwise, depend on theme and scroll
    const bgClass = isSearchOpen || activeDropdown
        ? 'bg-white shadow-lg'
        : isScrolled
            ? (theme === 'dark' ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-black/80 backdrop-blur-md')
            : (theme === 'dark' ? 'bg-white' : 'bg-transparent');

    const textColor = isSearchOpen || activeDropdown
        ? 'text-brand-primary'
        : isScrolled
            ? (theme === 'dark' ? 'text-brand-primary' : 'text-white')
            : (theme === 'dark' ? 'text-brand-primary' : 'text-white');

    const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (name: string) => {
        if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
        setActiveDropdown(name);
    };

    const handleMouseLeave = () => {
        dropdownTimeout.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 300);
    };

    // Dropdown state is now driven by database
    // No need for hardcoded hasDropdown function

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass} ${isScrolled || isSearchOpen || activeDropdown ? 'py-4' : 'py-6'}`}
                onMouseLeave={handleMouseLeave}
            >
                <div className="px-6 relative h-12 flex items-center justify-between">
                    {/* Normal Header Content */}
                    <div className="w-full flex items-center justify-between">
                        {/* Left Section: Navigation */}
                        <div className={`flex items-center gap-8 ${textColor}`}>
                            {/* Hide search icon for now
                            <div className="flex items-center gap-4">
                                <Link href="/search" className="hover:opacity-80 p-2 -ml-2">
                                    <Search className="w-5 h-5" />
                                </Link>
                            </div>
                            */}
                            <nav className="hidden md:flex gap-6 text-xs tracking-widest font-medium h-full items-center">
                                {mainNav.map((item) => (
                                    <div
                                        key={item.id}
                                        className="relative h-full flex items-center h-12"
                                        onMouseEnter={() => item.has_dropdown ? handleMouseEnter(item.label.toLowerCase()) : null}
                                    >
                                        <Link
                                            href={item.url}
                                            className="hover:opacity-80"
                                            target={item.opens_in_new_tab ? '_blank' : undefined}
                                            rel={item.opens_in_new_tab ? 'noopener noreferrer' : undefined}
                                        >
                                            {item.label}
                                        </Link>

                                        {/* Dynamic Dropdown - Rendered from database config */}
                                        {item.has_dropdown && activeDropdown === item.label.toLowerCase() && item.dropdown_config && (
                                            <div className="absolute top-[calc(100%+16px)] left-[-24px] w-[380px] bg-white shadow-2xl border border-gray-100 p-8 flex flex-col gap-6 text-brand-primary animate-in fade-in slide-in-from-top-2 duration-300">
                                                {item.dropdown_type === 'search' && (
                                                    <>
                                                        <div>
                                                            <h4 className="text-[10px] font-bold tracking-[0.2em] mb-4 uppercase text-gray-500">
                                                                {item.dropdown_config.search_type === 'agents'
                                                                    ? `FIND A ${siteNameUpper} AGENT`
                                                                    : item.dropdown_config.search_type === 'rent'
                                                                        ? 'FIND YOUR NEXT RENTAL PROPERTY'
                                                                        : 'FIND YOUR NEXT PROPERTY'}
                                                            </h4>

                                                            <UnifiedSearch
                                                                searchType={(item.dropdown_config.search_type as 'buy' | 'rent' | 'agents') || 'buy'}
                                                                placeholder={item.dropdown_config.search_placeholder as string}
                                                                className="w-full"
                                                            />
                                                        </div>

                                                        {/* Quick Links from config */}
                                                        {item.dropdown_config.quick_links && (
                                                            <div className="flex flex-col gap-4">
                                                                {(item.dropdown_config.quick_links as { url: string; label: string }[]).map((link, idx) => (
                                                                    <Link
                                                                        key={idx}
                                                                        href={link.url}
                                                                        className="text-[10px] font-bold tracking-[0.2em] uppercase hover:text-gray-500 transition-colors"
                                                                    >
                                                                        {link.label}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </div>

                        {/* Logo Section */}
                        <div className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 ${textColor} transition-colors duration-300`}>
                            <Link href="/">
                                {logoImage ? (
                                    <img
                                        src={logoImage}
                                        alt={siteName}
                                        className={`${isScrolled ? 'h-8' : 'h-10'} w-auto transition-all duration-300 object-contain`}
                                    />

                                ) : logoSvg ? (
                                    <div
                                        className={`${isScrolled ? 'h-8' : 'h-10'} w-auto transition-all duration-300 [&>svg]:h-full [&>svg]:w-auto [&>svg]:fill-current`}
                                        dangerouslySetInnerHTML={{ __html: logoSvg }}
                                    />
                                ) : (
                                    <SirimaraLogo className={`${isScrolled ? 'h-8' : 'h-10'} w-auto transition-all duration-300`} />
                                )}

                            </Link>
                        </div>

                        {/* Right Section: Additional Navigation */}
                        <div className={`hidden md:flex gap-6 transition-opacity duration-300 ${textColor} text-xs tracking-widest font-medium`}>
                            {secondaryNav.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.url}
                                    className="hover:opacity-80"
                                    target={item.opens_in_new_tab ? '_blank' : undefined}
                                    rel={item.opens_in_new_tab ? 'noopener noreferrer' : undefined}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>


                    </div>
                </div>
            </header>

            {/* Search Modal Dropdown - Positioned below header */}
            {isSearchOpen && (
                <div className="fixed top-[88px] left-0 right-0 z-40 bg-white shadow-lg border-t border-gray-100">
                    <div className="container mx-auto px-6 py-8 max-w-7xl">
                        <div className="flex items-start gap-6">
                            <div className="flex-1 max-w-4xl mx-auto">
                                <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                                    <input
                                        autoFocus
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        placeholder={
                                            activeSearchTab === 'agents'
                                                ? "Search by agent name..."
                                                : "Enter your location, address, ZIP, property ID or agent name"
                                        }
                                        className="flex-1 text-base text-gray-500 outline-none placeholder:text-gray-400 bg-transparent"
                                    />
                                    <div className="flex items-center gap-3 shrink-0">
                                        <button
                                            onClick={() => {
                                                setSearchQuery('');
                                                // Optionally, you might want to close search or clear input only
                                                // setIsSearchOpen(false); // Removed as per original Crosshair behavior
                                            }}
                                            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                                        >
                                            <Crosshair className="w-6 h-6 text-gray-600" />
                                        </button>
                                        <button
                                            onClick={handleSearch}
                                            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                                        >
                                            <Search className="w-6 h-6 text-gray-600" />
                                        </button>
                                    </div>
                                </div>

                                {/* Tabs Row */}
                                {/* Tabs Row */}
                                <div className="flex gap-8 mt-6 border-b border-gray-100 mb-8">
                                    <button
                                        onClick={() => setActiveSearchTab('buy')}
                                        className={`text-xs font-bold tracking-[0.15em] uppercase pb-4 transition-all relative ${activeSearchTab === 'buy'
                                            ? 'text-brand-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-primary'
                                            : 'text-gray-400 hover:text-brand-primary'
                                            }`}
                                    >
                                        BUY
                                    </button>
                                    <button
                                        onClick={() => setActiveSearchTab('rent')}
                                        className={`text-xs font-bold tracking-[0.15em] uppercase pb-4 transition-all relative ${activeSearchTab === 'rent'
                                            ? 'text-brand-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-primary'
                                            : 'text-gray-400 hover:text-brand-primary'
                                            }`}
                                    >
                                        RENT
                                    </button>
                                    <button
                                        onClick={() => setActiveSearchTab('agents')}
                                        className={`text-xs font-bold tracking-[0.15em] uppercase pb-4 transition-all relative ${activeSearchTab === 'agents'
                                            ? 'text-brand-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-primary'
                                            : 'text-gray-400 hover:text-brand-primary'
                                            }`}
                                    >
                                        AGENTS
                                    </button>
                                </div>

                                {/* Results Area */}
                                <div className="animate-in fade-in duration-200 min-h-[200px]">
                                    {searchQuery.length < 2 ? (
                                        /* Initial State - Links */
                                        <div>
                                            <h4 className="text-[10px] font-bold tracking-[0.2em] mb-6 uppercase text-gray-500">
                                                {activeSearchTab === 'agents' ? 'Find an Agent' : 'Find Your Next Property'}
                                            </h4>
                                            <div className="flex flex-col gap-4 items-start">
                                                {activeSearchTab === 'buy' && (
                                                    <>
                                                        <Link href="/search?type=buy" onClick={() => setIsSearchOpen(false)} className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-primary hover:text-gray-500 transition-colors">
                                                            Find all sales properties
                                                        </Link>
                                                        <Link href="/agents" onClick={() => setIsSearchOpen(false)} className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-dark hover:text-gray-500 transition-colors">
                                                            Find a {siteName} agent
                                                        </Link>
                                                        <Link href="/search?type=buy&category=commercial" onClick={() => setIsSearchOpen(false)} className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-dark hover:text-gray-500 transition-colors">
                                                            Find commercial properties
                                                        </Link>
                                                    </>
                                                )}
                                                {activeSearchTab === 'rent' && (
                                                    <>
                                                        <Link href="/search?type=rent" onClick={() => setIsSearchOpen(false)} className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-dark hover:text-gray-500 transition-colors">
                                                            Find all rental properties
                                                        </Link>
                                                        <Link href="/agents" onClick={() => setIsSearchOpen(false)} className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-dark hover:text-gray-500 transition-colors">
                                                            Find a {siteName} agent
                                                        </Link>

                                                    </>
                                                )}
                                                {activeSearchTab === 'agents' && (
                                                    <Link href="/agents" onClick={() => setIsSearchOpen(false)} className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-dark hover:text-gray-500 transition-colors">
                                                        Browse all agents
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        /* Realtime Results */
                                        <div>
                                            <div className="flex items-center gap-2 mb-4 text-brand-primary text-[10px] tracking-[0.2em] font-medium uppercase">
                                                {activeSearchTab === 'agents' ? (
                                                    <>
                                                        <Search className="w-3 h-3" />
                                                        <span>Matching Agents</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <MapPin className="w-3 h-3" />
                                                        <span>Matching Places</span>
                                                    </>
                                                )}
                                            </div>
                                            {searchResults.length > 0 ? (
                                                <div className="space-y-4">
                                                    {searchResults.map((result) => (
                                                        <div
                                                            key={result.id}
                                                            onClick={() => handleResultClick(result.url || '#')}
                                                            className="group cursor-pointer flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg -mx-2 transition-colors"
                                                        >
                                                            {result.image && (
                                                                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-100">
                                                                    <img src={result.image} alt={result.primaryText} className="w-full h-full object-cover" />
                                                                </div>
                                                            )}
                                                            <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
                                                                <span className="text-lg font-serif text-brand-primary group-hover:text-blue-900 transition-colors">
                                                                    {result.primaryText}
                                                                </span>
                                                                {result.secondaryText && (
                                                                    <span className="text-[10px] tracking-widest uppercase text-gray-500 font-medium">
                                                                        {result.secondaryText}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-sm text-gray-500 py-4">No results found.</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="p-2 hover:bg-gray-50 rounded-full transition-colors shrink-0"
                            >
                                <X className="w-7 h-7 text-brand-primary" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
