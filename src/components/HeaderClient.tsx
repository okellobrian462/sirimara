'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Crosshair } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/context/SearchContext';

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
}

interface HeaderClientProps {
    theme?: 'light' | 'dark';
    isScrolled?: boolean;
    mainNav: NavigationItem[];
    secondaryNav: NavigationItem[];
}

export default function HeaderClient({ theme = 'light', isScrolled: externalIsScrolled, mainNav, secondaryNav }: HeaderClientProps) {
    const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery } = useSearch();
    const [internalIsScrolled, setInternalIsScrolled] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [activeSearchTab, setActiveSearchTab] = useState<'buy' | 'rent' | 'agents'>('buy');
    const router = useRouter();

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
        ? 'text-[#181728]'
        : isScrolled
            ? (theme === 'dark' ? 'text-[#181728]' : 'text-white')
            : (theme === 'dark' ? 'text-[#181728]' : 'text-white');

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

    // Check if a nav item should have a dropdown
    const hasDropdown = (label: string) => {
        const upperLabel = label.toUpperCase();
        return upperLabel === 'BUY' || upperLabel === 'RENT' || upperLabel === 'AGENTS';
    };

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
                            <div className="flex items-center gap-4">
                                <button onClick={() => setIsSearchOpen(true)} className="hover:opacity-80 p-2 -ml-2">
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>
                            <nav className="hidden md:flex gap-6 text-xs tracking-widest font-medium h-full items-center">
                                {mainNav.map((item) => (
                                    <div
                                        key={item.id}
                                        className="relative h-full flex items-center h-12"
                                        onMouseEnter={() => hasDropdown(item.label) ? handleMouseEnter(item.label.toLowerCase()) : null}
                                    >
                                        <Link
                                            href={item.url}
                                            className="hover:opacity-80"
                                            target={item.opens_in_new_tab ? '_blank' : undefined}
                                            rel={item.opens_in_new_tab ? 'noopener noreferrer' : undefined}
                                        >
                                            {item.label}
                                        </Link>

                                        {/* Dropdown Card for BUY */}
                                        {activeDropdown === 'buy' && item.label.toUpperCase() === 'BUY' && (
                                            <div className="absolute top-[calc(100%+16px)] left-[-24px] w-[380px] bg-white shadow-2xl border border-gray-100 p-8 flex flex-col gap-6 text-[#181728] animate-in fade-in slide-in-from-top-2 duration-300">
                                                <div>
                                                    <h4 className="text-[10px] font-bold tracking-[0.2em] mb-4 uppercase text-gray-500">FIND YOUR NEXT PROPERTY</h4>
                                                    <div className="relative group">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter location, address, ZIP..."
                                                            className="w-full border-b border-gray-200 py-3 text-sm focus:border-black outline-none transition-colors pr-10"
                                                        />
                                                        <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-4">
                                                    <Link href="/sales/new-york-ny" className="text-[10px] font-bold tracking-[0.2em] uppercase hover:text-gray-500 transition-colors">find all sales properties</Link>
                                                    <Link href="/agents" className="text-[10px] font-bold tracking-[0.2em] uppercase hover:text-gray-500 transition-colors">find an elliman agent</Link>
                                                    <Link href="/sales/new-york-ny/home-types=commercial-office" className="text-[10px] font-bold tracking-[0.2em] uppercase hover:text-gray-500 transition-colors">find commercial properties</Link>
                                                </div>
                                            </div>
                                        )}

                                        {/* Dropdown Card for RENT */}
                                        {activeDropdown === 'rent' && item.label.toUpperCase() === 'RENT' && (
                                            <div className="absolute top-[calc(100%+16px)] left-[-24px] w-[380px] bg-white shadow-2xl border border-gray-100 p-8 flex flex-col gap-6 text-[#181728] animate-in fade-in slide-in-from-top-2 duration-300">
                                                <div>
                                                    <h4 className="text-[10px] font-bold tracking-[0.2em] mb-4 uppercase text-gray-500">FIND YOUR NEXT RENTAL PROPERTY</h4>
                                                    <div className="relative group">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter location, address, ZIP..."
                                                            className="w-full border-b border-gray-200 py-3 text-sm focus:border-black outline-none transition-colors pr-10"
                                                        />
                                                        <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-4">
                                                    <Link href="/rentals/new-york-ny" className="text-[10px] font-bold tracking-[0.2em] uppercase hover:text-gray-500 transition-colors">find all rental properties</Link>
                                                    <Link href="/agents" className="text-[10px] font-bold tracking-[0.2em] uppercase hover:text-gray-500 transition-colors">find an elliman agent</Link>
                                                    <Link href="/sales/new-york-ny/home-types=commercial-office" className="text-[10px] font-bold tracking-[0.2em] uppercase hover:text-gray-500 transition-colors">find commercial properties</Link>
                                                </div>
                                            </div>
                                        )}

                                        {/* Dropdown Card for AGENTS */}
                                        {activeDropdown === 'agents' && item.label.toUpperCase() === 'AGENTS' && (
                                            <div className="absolute top-[calc(100%+16px)] right-[-100px] w-[380px] bg-white shadow-2xl border border-gray-100 p-8 flex flex-col gap-6 text-[#181728] animate-in fade-in slide-in-from-top-2 duration-300">
                                                <div>
                                                    <h4 className="text-[10px] font-bold tracking-[0.2em] mb-4 uppercase text-gray-500">FIND AN ELLIMAN AGENT</h4>
                                                    <div className="relative group">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter agent name, state or office address"
                                                            className="w-full border-b border-gray-200 py-3 text-sm focus:border-black outline-none transition-colors pr-10"
                                                        />
                                                        <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-4">
                                                    <Link href="/agents" className="text-[10px] font-bold tracking-[0.2em] uppercase hover:text-gray-500 transition-colors">CONNECT WITH OUR AGENTS</Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </div>

                        {/* Logo Section */}
                        <div className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 ${textColor} transition-colors duration-300`}>
                            <Link href="/">
                                <svg className={`${isScrolled ? 'h-8' : 'h-10'} w-auto transition-all duration-300`} viewBox="0 0 4934 1024" xmlns="http://www.w3.org/2000/svg">
                                    <path style={{ fill: 'currentColor' }} d="M915.053 235.732h-194.504v6.004h12.069c26.401 0.023 38.402 13.296 38.402 48.775v342c0 35.507-12.025 48.775-38.449 48.775h-12.023v6.025h194.504c164.582 0 262.479-95.749 262.479-225.79 0-130.039-97.897-225.79-262.479-225.79zM915.053 674.046l-85.169-0.021v-425.048h85.169c141.75 0 200.006 92.712 200.006 212.545 0 119.836-56.441 212.524-200.006 212.524zM1364.571 380.234c-91.906 0-159.176 67.435-159.176 156.528 0 90.331 67.877 156.577 159.176 156.577s159.158-66.246 159.158-156.577c0-89.093-67.272-156.528-159.158-156.528zM1370.561 681.286c-66.062 0-103.903-60.828-103.903-156.556 0-81.289 33.043-132.447 91.906-132.447 66.064 0 103.91 61.407 103.91 156.528 0 82.483-33.043 132.468-91.906 132.468l-0.007 0.007zM1874.446 681.279h-12.002c-26.422 0-38.447-13.242-38.447-48.773v-249.523l-4.803 0.256c-30.040 1.82-63.083 3.011-87.689 3.011h-12.023v6.025h12.023c26.424 0 38.426 13.221 38.426 48.752v185.451c-37.239 33.122-62.473 42.768-93.093 42.768-33.043 0-55.855-24.688-55.855-83.086v-203.178l-4.803 0.256c-30.038 1.82-63.081 3.011-87.71 3.011h-12.002v6.025h12.002c26.452 0 38.449 13.221 38.449 48.752v152.96c0 68.022 42.035 99.347 95.495 99.347 35.442 0 60.679-10.256 107.518-57.209v51.181l4.803 3.011c30.038-1.799 63.081-3.011 87.71-3.011h12.002v-6.028zM3589.236 323.27c21.364 0 38.703-17.354 38.703-38.775s-17.338-38.798-38.703-38.798c-21.364 0-38.703 17.354-38.703 38.798s17.338 38.775 38.703 38.775zM4151.855 632.499v-152.906c0-68.068-39.028-99.349-89.484-99.349-35.444 0-58.252 12.011-107.52 62.606-11.427-42.747-44.451-62.606-84.689-62.606-33.629 0-56.483 11.425-101.516 57.181v-58.559l-98.49 22.426v6.028h6.004c26.415 0 38.423 13.242 38.423 48.773v176.407c0 35.53-12.009 48.775-38.423 48.775h-17.478c-26.415 0-38.447-13.245-38.447-48.775v-253.656l-98.49 22.449v6.028h6.004c26.415 0 38.423 13.242 38.423 48.773v176.407c0 35.53-12.009 48.775-38.423 48.775l-21.737 0.012c-26.438 0-38.447-13.245-38.447-48.775v-402.806h-6.004l-92.509 21.070v6.025h6.028c26.415 0 38.447 13.245 38.447 48.775v326.935c0 35.53-12.032 48.775-38.447 48.775h-15.081c-26.415 0-38.447-13.245-38.447-48.775v-402.806h-5.981l-92.509 21.070v6.025h6.004c26.415 0 38.447 13.245 38.447 48.775v326.935c0 35.53-12.032 48.775-38.447 48.775h-12.032v6.025l611.7-0.009v-6.028h-21.644c-26.415 0-38.447-13.245-38.447-48.775v-185.449c28.858-24.69 50.479-30.694 75.078-30.694 36.631 0 61.882 24.667 61.882 83.088v133.055c0 35.53-12.009 48.775-38.423 48.775h-12.032v6.028h154.95v-6.028h-11.985c-26.461 0-38.447-13.245-38.447-48.775v-152.906c0-10.838-1.187-20.489-3.002-28.919 31.209-27.683 53.434-34.313 79.29-34.313 36.631 0 61.859 24.667 61.859 83.088v133.057c0 35.53-12.009 48.773-38.447 48.773h-12.009v6.028h154.95v-6.028h-12.009c-26.415 0-38.447-13.242-38.447-48.773v-0.007zM3216.733 590.729l-13.475 28.081c-14.639 33.452-39.866 55.242-102.959 55.242l-123.857-0.023v-213.127h98.583c44.73 0 61.417 11.657 66.537 36.278 0.791 3.223 3.049 15.323 4.189 21.539h3.747v-128.849h-3.747c-1.14 6.26-3.584 19.389-4.329 22.214-5.283 24.129-22.063 35.598-66.397 35.598h-98.56v-196.315h125.766c57.623 0 76.893 18.662 78.010 46.673 0.023 0.191 0.047 0.398 0.070 0.61 0.303 3.81 0.768 9.926 1.071 14.131h4.911v-77.11l-319.162 0.044v6.028h12.009c26.461 0 38.447 13.265 38.447 48.773v345.016c0 33.124-12.009 45.763-38.447 45.763h-12.009v6.007h308.247c14.406 0 18.013-6.007 26.438-34.313l18.013-61.41-3.095-0.849zM4817.385 681.274c-26.438 0-38.47-13.245-38.47-48.775v-152.906c0-68.068-42.031-99.349-95.488-99.349-35.444 0-60.649 10.212-107.52 57.181v-58.582l-98.49 22.449v6.028h6.004c26.438 0 38.423 13.242 38.423 48.773v176.407c0 35.53-11.985 48.775-38.423 48.775h-10.961c-26.321-0.051-38.284-13.305-38.284-48.768v-152.327c0-68.045-41.449-99.956-102.726-99.956-61.254 0-100.887 38.542-120.111 81.287l7.796 3.598c18.618-39.736 55.855-61.41 94.883-61.41 38.447 0 66.095 21.679 66.095 84.305v21.679c-91.904 43.937-177.199 42.138-177.199 116.797 0 46.366 33.652 66.856 69.679 66.856 37.236 0 66.676-19.272 107.52-61.41v55.382l4.794 3.011c30.045-1.799 63.092-3.011 87.692-3.011h153.786v-6.028h-12.009c-26.438 0-38.447-13.242-38.447-48.773v-185.451c30.627-25.274 54.668-30.694 81.082-30.694 40.239 0 67.887 24.667 67.887 83.088v133.057c0 35.53-12.032 48.773-38.447 48.773h-12.032v6.028h154.95v-6.028l-11.985-0.005zM4380.113 620.474c-32.442 32.491-50.455 41.535-75.078 41.535-31.837 0-46.848-19.88-46.848-46.976 0-40.925 37.818-57.181 121.926-96.33v101.772zM2662.47 439.843c0-29.524 22.807-47.555 60.067-47.555 33.024 0 71.471 19.249 79.267 83.675l6.633-0.586-3.817-70.079c-4.864-4.184-10.473-7.568-14.941-9.903-15.057-7.687-37.12-15.16-67.142-15.16-58.275 0-96.14 27.704-96.14 75.848 0 111.4 161.583 87.336 161.583 172.207 0 32.512-26.415 53.001-63.651 53.001-42.636 0-78.080-19.27-102.726-90.31l-6.586 1.799 13.731 72.038c5.027 3.833 11.846 7.592 17.478 10.417 0.465 0.258 0.954 0.493 1.443 0.726 1.21 0.61 2.351 1.145 3.375 1.659 0.233 0.095 0.465 0.212 0.721 0.303 0.861 0.419 1.652 0.794 2.304 1.073 19.782 8.897 41.635 14.343 70.26 14.343 59.462 0 99.7-35.53 99.7-92.153 0-107.753-161.559-95.118-161.559-161.343zM2052.291 645.141h-90.089c-28.826 0-39.033-10.233-39.033-25.277 0-13.242 15.611-30.113 43.83-41.558 13.212 4.229 27.639 6.637 42.643 6.637 67.272 0 117.12-43.965 117.12-102.363 0-45.759-29.41-84.305-82.863-98.157l103.792 7.848v-45.763c-69.674 33.101-108.611 25.274-164.466 36.11-51.658 10.256-90.691 45.177-90.691 99.956 0 41.558 24.63 75.262 63.083 91.522-43.252 21.679-75.688 44.567-75.688 74.049 0 26.487 21.625 39.736 53.46 43.96-43.25 21.676-69.066 49.985-69.066 77.668 0 36.133 33.019 68.045 120.709 68.045 98.52 0 169.386-49.964 169.386-114.998 0-43.96-22.205-77.691-102.109-77.691l-0.016 0.012zM1947.197 470.554c0-45.177 17.406-78.885 55.855-78.885 46.839 0 69.066 43.965 69.066 102.966 0 45.154-17.429 78.86-56.462 78.86-46.255 0-68.466-43.96-68.466-102.945l0.007 0.005zM2000.047 805.315c-73.891 0-99.105-24.085-99.105-55.382 0-17.473 8.413-36.743 46.255-56.599h102.109c74.475 0 91.276 11.422 91.276 34.311 0 45.156-61.866 77.67-140.535 77.67zM2274.318 632.511v-402.806h-5.99l-92.509 21.070v6.025h6.014c26.422 0 38.447 13.245 38.447 48.775v326.935c0 35.53-12.025 48.775-38.447 48.775h-12.025v6.025h154.982v-6.025h-12.025c-26.422 0-38.447-13.245-38.447-48.775zM2565.748 632.511v-152.327c0-68.045-41.449-99.956-102.703-99.956-61.277 0-100.911 38.542-120.134 81.289l7.82 3.598c18.618-39.738 55.855-61.41 94.906-61.41 38.423 0 66.048 21.679 66.048 84.305v21.676c-91.904 43.937-177.175 42.14-177.175 116.797 0 46.366 33.652 66.856 69.655 66.856 37.236 0 66.676-19.27 107.52-61.41v55.382l4.817 3.011c30.045-1.799 63.069-3.011 87.692-3.011h12.009v-6.025h-12.009c-26.438 0-38.423-13.245-38.423-48.775h-0.023zM2511.686 620.479c-32.419 32.493-50.432 41.535-75.078 41.535-31.814 0-46.825-19.88-46.825-46.974 0-40.927 37.818-57.181 121.903-96.333v101.772z" fill="currentColor"></path>
                                    <path style={{ fill: 'currentColor' }} d="M470.747 203.822c-138.434 0-250.982 112.823-250.982 251.595s112.549 251.588 250.982 251.588c138.436 0 250.982-112.821 250.982-251.588s-112.547-251.595-250.982-251.595zM447.675 672.596c-109.169-11.842-194.141-104.929-194.141-217.179 0-112.252 84.972-205.338 194.141-217.181v434.361zM494.947 672.596v-434.361c99.606 10.723 178.949 89.13 192.453 187.845h-48.397c-9.563-55.845-46.707-102.102-96.223-125.235v125.235h64.15v47.951h-64.15v135.951c52.899-24.821 91.163-75.593 97.913-135.951h47.834c-9.008 103.799-90.602 187.273-193.58 198.565zM399.841 610.545v-309.7c-58.522 27.085-98.474 86.314-98.474 154.571-0.563 68.822 39.952 127.486 98.474 155.129zM470.747 146.286c-169.944 0-308.379 138.772-308.379 309.131s138.435 309.131 308.379 309.131c169.946 0 308.379-138.772 308.379-309.131s-138.434-309.131-308.379-309.131zM470.747 733.519c-153.064 0-277.433-124.672-277.433-278.102s124.368-278.109 277.433-278.109c153.064 0 277.427 124.672 277.427 278.109s-124.363 278.102-277.427 278.102z" fill="currentColor"></path>
                                </svg>
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
                                            ? 'text-[#181728] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#181728]'
                                            : 'text-gray-400 hover:text-[#181728]'
                                            }`}
                                    >
                                        BUY
                                    </button>
                                    <button
                                        onClick={() => setActiveSearchTab('rent')}
                                        className={`text-xs font-bold tracking-[0.15em] uppercase pb-4 transition-all relative ${activeSearchTab === 'rent'
                                            ? 'text-[#181728] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#181728]'
                                            : 'text-gray-400 hover:text-[#181728]'
                                            }`}
                                    >
                                        RENT
                                    </button>
                                    <button
                                        onClick={() => setActiveSearchTab('agents')}
                                        className={`text-xs font-bold tracking-[0.15em] uppercase pb-4 transition-all relative ${activeSearchTab === 'agents'
                                            ? 'text-[#181728] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#181728]'
                                            : 'text-gray-400 hover:text-[#181728]'
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
                                                        <Link href="/search?type=buy" onClick={() => setIsSearchOpen(false)} className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#181728] hover:text-gray-500 transition-colors">
                                                            Find all sales properties
                                                        </Link>
                                                        <Link href="/agents" onClick={() => setIsSearchOpen(false)} className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#181728] hover:text-gray-500 transition-colors">
                                                            Find an Elliman agent
                                                        </Link>
                                                        <Link href="/search?type=buy&category=commercial" onClick={() => setIsSearchOpen(false)} className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#181728] hover:text-gray-500 transition-colors">
                                                            Find commercial properties
                                                        </Link>
                                                    </>
                                                )}
                                                {activeSearchTab === 'rent' && (
                                                    <>
                                                        <Link href="/search?type=rent" onClick={() => setIsSearchOpen(false)} className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#181728] hover:text-gray-500 transition-colors">
                                                            Find all rental properties
                                                        </Link>
                                                        <Link href="/agents" onClick={() => setIsSearchOpen(false)} className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#181728] hover:text-gray-500 transition-colors">
                                                            Find an Elliman agent
                                                        </Link>
                                                    </>
                                                )}
                                                {activeSearchTab === 'agents' && (
                                                    <Link href="/agents" onClick={() => setIsSearchOpen(false)} className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#181728] hover:text-gray-500 transition-colors">
                                                        Browse all agents
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        /* Realtime Results */
                                        <div>
                                            <div className="flex items-center gap-2 mb-4 text-[#181728] text-[10px] tracking-[0.2em] font-medium uppercase">
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
                                                                <span className="text-lg font-serif text-[#181728] group-hover:text-blue-900 transition-colors">
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
                                <X className="w-7 h-7 text-[#181728]" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
