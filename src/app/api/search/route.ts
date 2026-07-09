import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { slugifyAgentFirstName } from '@/lib/agentSlug';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') || 'all'; 
    const limit = parseInt(searchParams.get('limit') || '10');

    const minPrice = parseInt(searchParams.get('min_price') || '0');
    const maxPrice = parseInt(searchParams.get('max_price') || '1000000000');
    const beds = parseInt(searchParams.get('beds') || '0');
    const baths = parseInt(searchParams.get('baths') || '0');

    if (!query || query.length < 2) {
        return NextResponse.json({ results: [], total: 0 });
    }

    const supabase = await createClient();

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

    const results: SearchResult[] = [];

    try {
        
        if (type === 'buy' || type === 'all') {
            let propertyQuery = supabase
                .from('properties')
                .select('id, address, city, state, zip_code, price, images, slug, bedrooms, bathrooms')
                .eq('status', 'active')
                .eq('listing_type', 'sale')
                .gte('price', minPrice)
                .lte('price', maxPrice);

            if (beds > 0) propertyQuery = propertyQuery.gte('bedrooms', beds);
            if (baths > 0) propertyQuery = propertyQuery.gte('bathrooms', baths);

            
            propertyQuery = propertyQuery.or(`address.ilike.%${query}%,city.ilike.%${query}%,zip_code.ilike.%${query}%,neighborhood.ilike.%${query}%`);

            const { data: buyProperties } = await propertyQuery.limit(limit);

            if (buyProperties) {
                results.push(...buyProperties.map(p => ({
                    id: p.id,
                    type: 'property' as const,
                    subtype: 'buy' as const,
                    title: p.address,
                    subtitle: `${p.city}, ${p.state} ${p.zip_code}`,
                    image: p.images?.[0] || '',
                    url: `/listing/${p.slug}`,
                    metadata: {
                        price: p.price,
                        bedrooms: p.bedrooms,
                        bathrooms: p.bathrooms
                    }
                })));
            }
        }

        
        if (type === 'rent' || type === 'all') {
            let propertyQuery = supabase
                .from('properties')
                .select('id, address, city, state, zip_code, price, images, slug, bedrooms, bathrooms')
                .eq('status', 'active')
                .eq('listing_type', 'rent') 
                .gte('price', minPrice)
                .lte('price', maxPrice);

            if (beds > 0) propertyQuery = propertyQuery.gte('bedrooms', beds);
            if (baths > 0) propertyQuery = propertyQuery.gte('bathrooms', baths);

            propertyQuery = propertyQuery.or(`address.ilike.%${query}%,city.ilike.%${query}%,zip_code.ilike.%${query}%,neighborhood.ilike.%${query}%`);

            const { data: rentProperties } = await propertyQuery.limit(limit);

            if (rentProperties) {
                results.push(...rentProperties.map(p => ({
                    id: p.id,
                    type: 'property' as const,
                    subtype: 'rent' as const,
                    title: p.address,
                    subtitle: `${p.city}, ${p.state} ${p.zip_code}`,
                    image: p.images?.[0] || '',
                    url: `/listing/${p.slug}`,
                    metadata: {
                        price: p.price,
                        bedrooms: p.bedrooms,
                        bathrooms: p.bathrooms
                    }
                })));
            }
        }

        
        if (type === 'agents' || type === 'all') {
            const { data: agents } = await supabase
                .from('agents')
                .select('id, first_name, last_name, title, photo_url')
                .eq('is_active', true)
                .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,title.ilike.%${query}%`)
                .limit(limit);

            if (agents) {
                results.push(...agents.map(a => ({
                    id: a.id,
                    type: 'agent' as const,
                    title: `${a.first_name} ${a.last_name}`,
                    subtitle: a.title || 'Real Estate Agent',
                    image: a.photo_url || '',
                    url: `/agents/${slugifyAgentFirstName(a.first_name)}`,
                    metadata: {}
                })));
            }
        }

        
        const sortedResults = results.sort((a, b) => {
            if (a.type === 'property' && b.type === 'agent') return -1;
            if (a.type === 'agent' && b.type === 'property') return 1;
            return 0;
        });

        return NextResponse.json({
            results: sortedResults.slice(0, limit),
            total: sortedResults.length
        });

    } catch (error) {
        console.error('Search API error:', error);
        return NextResponse.json(
            { error: 'Search failed', results: [], total: 0 },
            { status: 500 }
        );
    }
}
