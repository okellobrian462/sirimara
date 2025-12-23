import { createClient } from '@/lib/supabase/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Property, Agent } from '@/types/database.types';

interface SearchPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Reusing formatting logic
const formatBeds = (beds?: number) => beds ? `${beds} BR` : '';
const formatBaths = (baths?: number, halfBaths?: number) => {
    const parts = [];
    if (baths) parts.push(`${baths} BA`);
    if (halfBaths) parts.push(`${halfBaths} HALF BA`);
    return parts.join(', ');
};
const formatPrice = (price: number) => `$${price.toLocaleString()}`;

export default async function SearchPage(props: SearchPageProps) {
    const searchParams = await props.searchParams;
    const query = typeof searchParams.q === 'string' ? searchParams.q : '';
    const type = typeof searchParams.type === 'string' ? searchParams.type : 'buy';

    let results: (Property | Agent)[] = [];
    const supabase = await createClient();

    if (query) {
        if (type === 'agents') {
            const { data } = await supabase
                .from('agents')
                .select('*')
                .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%`)
                .eq('is_active', true);
            results = (data as Agent[]) || [];
        } else {
            // Properties search (buy/rent)
            const { data } = await supabase
                .from('properties')
                .select('*')
                .or(`address.ilike.%${query}%,city.ilike.%${query}%,zip_code.ilike.%${query}%`)
                .eq('status', 'active');

            // If we had a 'listing_type' column we would filter by type === 'rent' ? 'rent' : 'sale'
            // For now, returning all matches
            results = (data as Property[]) || [];
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <Header theme="dark" />

            <main className="container mx-auto px-6 pt-32 pb-12 min-h-[60vh]">
                <div className="mb-12">
                    <h1 className="text-3xl font-serif text-[#181728] mb-4">
                        Search Results: <span className="font-sans font-bold">"{query}"</span>
                    </h1>
                    <p className="text-gray-500 uppercase tracking-widest text-sm">
                        {results.length} {type === 'agents' ? 'Agents' : 'Properties'} Found
                    </p>
                </div>

                {results.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-lg">
                        <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg text-gray-900 font-medium mb-2">No results found</h3>
                        <p className="text-gray-500">Try adjusting your search terms or checking your spelling.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {type === 'agents' ? (
                            // Agent Cards
                            (results as Agent[]).map((agent) => (
                                <Link key={agent.id} href={`/agents/${agent.id}`} className="group block">
                                    <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-gray-100">
                                        {agent.photo_url ? (
                                            <img
                                                src={agent.photo_url}
                                                alt={`${agent.first_name} ${agent.last_name}`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                No Photo
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-serif text-[#181728] group-hover:text-blue-900 transition-colors">
                                        {agent.first_name} {agent.last_name}
                                    </h3>
                                    <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">
                                        {agent.title || 'Real Estate Agent'}
                                    </p>
                                </Link>
                            ))
                        ) : (
                            // Property Cards
                            (results as Property[]).map((property) => (
                                <Link key={property.id} href={`/listing/${property.slug}`} className="group block">
                                    <div className="relative overflow-hidden mb-4 aspect-[3/4] bg-gray-100">
                                        <img
                                            src={property.images?.[0] || ''}
                                            alt={property.city}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <h3 className="text-2xl mb-1 font-serif">
                                                {property.city}
                                            </h3>
                                            <div className="text-[10px] tracking-widest uppercase font-medium">
                                                {formatPrice(property.price)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-sm font-medium text-[#181728] truncate max-w-[200px]">
                                                {property.address}
                                            </h4>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {formatBeds(property.bedrooms)} | {formatBaths(property.bathrooms, property.half_baths)}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
