import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageCarousel from '@/components/listing/ImageCarousel';
import { Plus } from 'lucide-react';

export default async function ListingDetailPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const resolvedParams = await params;
    const slugArray = resolvedParams.slug;
    const lookupSlug = Array.isArray(slugArray) ? slugArray[0] : slugArray;

    const supabase = await createClient();

    // Fetch property by slug
    // We also check 'id' in case the slug passed is actually an ID (backward compatibility or direct link)
    let { data: property } = await supabase
        .from('properties')
        .select('*')
        .eq('slug', lookupSlug)
        .single();

    if (!property) {
        // Try fetching by ID as fallback if slug lookup failed
        const { data: propertyById } = await supabase
            .from('properties')
            .select('*')
            .eq('id', lookupSlug)
            .single();

        property = propertyById;
    }

    if (!property) {
        return notFound();
    }

    // Fetch a random active agent to display as contact
    // In a real scenario, this would link to the specific listing agent(s)
    const { data: agent } = await supabase
        .from('agents')
        .select('*')
        .eq('is_active', true)
        .limit(1)
        .single();

    const data = {
        address: property.address || "Address Unavailable",
        location: `${property.city || ''}, ${property.state || ''} ${property.zip_code || ''}`.trim().toUpperCase(),
        price: property.price ? `$${property.price.toLocaleString()}` : "Price Upon Request",
        beds: property.bedrooms ? `${property.bedrooms} BR` : "",
        baths: property.bathrooms ? `${property.bathrooms} BA${property.half_baths ? `, ${property.half_baths} HALF BA` : ''}` : "",
        sqft: property.sqft ? `Approx. ${property.sqft.toLocaleString()} SF` : '',
        images: property.images || [],
        agent: {
            name: agent ? `${agent.first_name} ${agent.last_name}` : 'Sirimara Agent',
            image: agent?.photo_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
            phone: agent?.phone || '212.891.7000',
            title: agent?.title || 'Licensed Real Estate Salesperson'
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Header theme="dark" />

            {/* Image Hero Section */}
            <ImageCarousel images={data.images} address={data.address} />

            {/* Property Info Container */}
            <section className="bg-[#F8F8F8] py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center space-y-4 mb-12">
                        <h1 className="text-3xl md:text-[44px] font-sans font-normal tracking-[0.1em] text-[#181728] uppercase">
                            {data.address}
                        </h1>
                        <p className="text-sm md:text-base tracking-[0.15em] text-gray-500 uppercase">
                            {data.location}
                        </p>

                        <div className="w-12 h-[1px] bg-gray-400 mx-auto my-10"></div>

                        <div className="space-y-4">
                            <h2 className="text-5xl md:text-[64px] font-sans font-normal text-[#181728]">
                                {data.price}
                            </h2>
                            <button className="text-[10px] tracking-[0.2em] font-bold text-[#181728] uppercase border-b border-[#181728] pb-1 hover:opacity-70 transition-opacity">
                                Estimate My Mortgage
                            </button>
                        </div>
                    </div>

                    {/* Stats Divider Lines */}
                    <div className="w-full h-[1px] bg-gray-200"></div>
                    <div className="flex flex-wrap justify-center items-center gap-x-12 md:gap-x-20 py-8 text-[#181728]">
                        {data.beds && (
                            <div className="flex items-center gap-3 py-4">
                                <svg className="w-6 h-6 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <path d="M2.5 12h19M2.5 12V6.5a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2V12M2.5 12v5.5a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2V12m-16-7.5v5m13-5v5" />
                                </svg>
                                <span className="text-sm font-medium tracking-[0.2em] uppercase">{data.beds}</span>
                            </div>
                        )}
                        {data.baths && (
                            <div className="flex items-center gap-3 py-4">
                                <svg className="w-6 h-6 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <path d="M4 11h16M7 7h10M6 15h12v3a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-3z" />
                                </svg>
                                <span className="text-sm font-medium tracking-[0.2em] uppercase">{data.baths}</span>
                            </div>
                        )}
                        {data.sqft && (
                            <div className="flex items-center gap-3 py-4">
                                <svg className="w-6 h-6 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18" />
                                </svg>
                                <span className="text-sm font-medium tracking-[0.2em] uppercase">{data.sqft}</span>
                            </div>
                        )}
                    </div>
                    <div className="w-full h-[1px] bg-gray-200"></div>

                    {/* Exclusive Badge */}
                    <div className="flex justify-center items-center gap-3 mt-12 opacity-60">
                        <div className="w-4 h-4 rounded-full border border-[#181728] flex items-center justify-center text-[10px] font-bold">
                            SM
                        </div>
                        <span className="text-[10px] tracking-[0.2em] font-semibold uppercase text-[#181728]">
                            Sirimara Exclusive
                        </span>
                    </div>
                </div>
            </section>

            {/* Agent Section */}
            <section className="bg-white py-20 border-t border-gray-100">
                <div className="container mx-auto px-6 max-w-xl text-center">
                    <h3 className="text-base tracking-[0.3em] uppercase text-[#181728] mb-12 font-medium">
                        Get in touch with our agents
                    </h3>

                    <div className="bg-white border border-gray-50 shadow-sm p-8 flex flex-col items-center">
                        <div className="w-40 h-40 mb-6 overflow-hidden">
                            <img
                                src={data.agent.image}
                                alt={data.agent.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h4 className="text-lg font-sans text-[#181728] mb-2">{data.agent.name}</h4>
                        <p className="text-sm text-gray-500 mb-1">{data.agent.phone}</p>
                        <p className="text-sm text-gray-500 mb-1">{data.agent.title}</p>
                        <p className="text-sm text-gray-400 mb-8 uppercase">SIRIMARA REAL ESTATE</p>

                        <button className="px-12 py-4 bg-[#100B28] text-white rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-[#100B28]/90 transition-colors">
                            Connect
                        </button>
                    </div>
                </div>
            </section>

            {/* Mortgage CTA Section */}
            <section className="bg-[#F8F8F8] py-40 border-t border-gray-100">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-sans font-normal tracking-[0.1em] text-[#181728] uppercase mb-10">
                        Estimate My Mortgage
                    </h2>
                    <button className="flex justify-center items-center gap-3 mx-auto text-xs tracking-[0.2em] font-semibold uppercase text-[#181728] hover:opacity-70 transition-opacity">
                        <Plus className="w-5 h-5" />
                        Get Started
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
