import Header from '@/components/Header';
import { ChevronDown, Plus, Search, Heart, Camera, MapPin, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

export default function RentalsSearchPage() {

    const listings = [
        {
            id: 1,
            address: '815 FIFTH AVE DUPLEX',
            city: 'New York, NY',
            price: '$140,000',
            period: '/ Month',
            beds: '3 BR',
            baths: '3 BA, 1 HALF BA',
            sqft: '3,600 SF',
            image: 'https://media.elliman.com/6a931dd6-79fd-4b53-869e-b4ec3b72feaf.jpg',
            status: 'DOUGLAS ELLIMAN EXCLUSIVE',
            badge: null
        },
        {
            id: 2,
            address: '1045 MADISON Ave 14',
            city: 'New York, NY',
            price: '$95,000',
            period: '/ Month',
            beds: '5 BR',
            baths: '4 BA, 1 HALF BA',
            sqft: '3,952 SF',
            image: 'https://media.elliman.com/e9afee0d-fb1f-4224-a89b-144eb65e6bd1.jpg',
            status: 'DOUGLAS ELLIMAN EXCLUSIVE',
            badge: 'LEASE SIGNED'
        },
        {
            id: 3,
            address: '432 PARK Ave 44A',
            city: 'New York, NY',
            price: '$80,000',
            period: '/ Month',
            beds: '4 BR',
            baths: '4 BA, 1 HALF BA',
            sqft: '4,430 SF',
            image: 'https://media.elliman.com/124d506d-b67b-485d-9f12-8e570abe3a5c.jpg',
            status: 'DOUGLAS ELLIMAN EXCLUSIVE',
            badge: null
        },
        {
            id: 4,
            address: '7 E 69TH ST',
            city: 'New York, NY',
            price: '$65,000',
            period: '/ Month',
            beds: '6 BR',
            baths: '6 BA, 3 HALF BA',
            sqft: '8,800 SF',
            image: 'https://media.elliman.com/dadbca2d-ded4-44e3-9287-0d93519cbad8.jpg',
            status: 'DOUGLAS ELLIMAN EXCLUSIVE',
            badge: 'PRICE REDUCED'
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            <Header theme="light" />

            { }
            <div className="bg-[#4d525c] pt-28 pb-16 text-center px-6"> { }
                <h2 className="text-white text-3xl md:text-4xl font-light tracking-[0.2em] mb-4 font-serif">
                    FIND YOUR FAVORITE PLACE TO BE
                </h2>
                <p className="text-white/90 text-sm tracking-wide font-light">
                    We are experts in the luxury rental market.
                </p>
            </div>

            { }
            <div className="sticky top-[88px] z-40 bg-white border-b border-gray-200 shadow-sm">

                { }
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 bg-white border border-gray-300 rounded px-4 py-3 flex items-center gap-2 max-w-4xl shadow-sm">
                            <div className="flex items-center gap-2 bg-[#4d525c] text-white px-3 py-1 rounded text-xs font-semibold tracking-wide uppercase">
                                New York City
                                <button className="hover:text-red-300"><Plus className="rotate-45 w-3 h-3" /></button>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter location"
                                className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400 font-light"
                            />
                            <div className="flex items-center gap-4 text-gray-400">
                                <button className="hover:text-black"><Camera className="w-5 h-5" /></button>
                                <button className="hover:text-black"><MapPin className="w-5 h-5" /></button>
                                <button className="hover:text-black"><Search className="w-5 h-5" /></button>
                            </div>
                        </div>
                    </div>
                </div>

                { }
                <div className="container mx-auto px-6 py-3 flex justify-between items-center text-xs font-semibold tracking-widest uppercase text-brand-dark">
                    <div className="flex items-center gap-8">
                        <button className="flex items-center gap-2 hover:opacity-70">
                            For Rent <ChevronDown className="w-3 h-3" />
                        </button>
                        <button className="flex items-center gap-2 hover:opacity-70">
                            Price <ChevronDown className="w-3 h-3" />
                        </button>
                        <button className="flex items-center gap-2 hover:opacity-70">
                            Bed / Bath <ChevronDown className="w-3 h-3" />
                        </button>
                        {/* <button className="flex items-center gap-2 hover:opacity-70">
                            Property Type <ChevronDown className="w-3 h-3" />
                        </button> */}
                        <div className="w-[1px] h-4 bg-gray-300 mx-2"></div>
                        <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                            <SlidersHorizontal className="w-3 h-3" />
                            All Filters
                        </button>
                    </div>

                    <button className="flex items-center gap-2 hover:opacity-70">
                        View: Map and List <ChevronDown className="w-3 h-3" />
                    </button>
                </div>
            </div>

            { }
            <div className="flex h-[calc(100vh-250px)]">
                { }
                <div className="w-full lg:w-3/5 overflow-y-auto p-6 bg-white">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h1 className="text-2xl font-serif text-brand-dark mb-1">Luxury listings for rent in New York City</h1>
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">18 of 3,547 Homes</p>
                        </div>
                        <div className="flex items-center gap-6 text-[10px] font-bold tracking-[0.2em] text-brand-dark uppercase">
                            <div className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                                <span>Compare</span>
                                <div className="w-8 h-4 bg-gray-200 rounded-full relative">
                                    <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full shadow-sm"></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 cursor-pointer">
                                Featured Image: Default <ChevronDown className="w-3 h-3" />
                            </div>
                            <div className="flex items-center gap-2 cursor-pointer">
                                Sort By: DE Exclusives <ChevronDown className="w-3 h-3" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
                        {listings.map((listing) => (
                            <div key={listing.id} className="group cursor-pointer">
                                { }
                                <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-gray-100">
                                    <img
                                        src={listing.image}
                                        alt={listing.address}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {listing.badge && (
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                                            {listing.badge}
                                        </div>
                                    )}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                                    </div>
                                    <button className="absolute bottom-4 right-4 w-8 h-8 flex items-center justify-center bg-transparent text-white hover:scale-110 transition-transform">
                                        <Heart className="w-6 h-6" />
                                    </button>
                                </div>

                                { }
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="flex items-end gap-1">
                                            <h2 className="text-2xl font-serif text-brand-dark">{listing.price}</h2>
                                            <span className="text-[10px] font-bold tracking-widest uppercase mb-1.5 text-gray-500">{listing.period}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs font-bold tracking-[0.1em] text-brand-dark uppercase mb-4">
                                        {listing.address}, {listing.city}
                                    </p>

                                    <div className="flex items-center gap-6 text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">
                                        <span>{listing.beds}</span>
                                        <span>{listing.baths}</span>
                                        {listing.sqft && <span>{listing.sqft}</span>}
                                    </div>

                                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-6 border bg-white flex items-center justify-center text-[6px] font-serif">DE</div>
                                            <span className="text-[9px] font-bold tracking-[0.2em] text-brand-dark uppercase">{listing.status}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                { }
                <div className="hidden lg:block w-2/5 bg-[#EAE8E4] relative overflow-hidden">
                    { }
                    <svg className="w-full h-full absolute inset-0 text-brand-dark" viewBox="0 0 100 100" preserveAspectRatio="none">
                        { }
                        <path
                            d="M60 20 L80 30 L85 50 L90 80 L70 90 L50 85 L40 60 Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                            className="opacity-50"
                        />
                        { }
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-white/80 backdrop-blur px-6 py-4 shadow-lg text-center">
                            <MapPin className="w-8 h-8 mx-auto mb-2 text-brand-dark" />
                            <p className="text-xs font-bold tracking-widest uppercase text-brand-dark">Map View Interactive</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
