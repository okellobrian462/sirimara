import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'buy';

    if (!query || query.length < 2) {
        return NextResponse.json({ results: [] });
    }

    const supabase = await createClient();

    try {
        if (type === 'agents') {
            const { data, error } = await supabase
                .from('agents')
                .select('id, first_name, last_name, title, photo_url')
                .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%`)
                .eq('is_active', true)
                .limit(10);

            if (error) throw error;

            return NextResponse.json({
                type: 'agents',
                results: data.map(agent => ({
                    id: agent.id,
                    primaryText: `${agent.first_name} ${agent.last_name}`,
                    secondaryText: agent.title || 'Real Estate Agent',
                    image: agent.photo_url,
                    url: `/agents/${agent.id}`
                }))
            });
        } else {
            // For Buy/Rent search, suggest Places (Cities)
            // We'll search for unique cities that match the query
            const { data, error } = await supabase
                .from('properties')
                .select('city, state')
                .ilike('city', `%${query}%`)
                .not('city', 'is', null) // Ensure unique cities only technically requires a GROUP BY or distinct
                .limit(50); // Fetch more to process distinct in memory if simple distinct query is hard via SDK

            if (error) throw error;

            // Deduplicate cities client-side (or server-side here)
            const uniquePlaces = new Map();
            data.forEach(p => {
                const key = `${p.city}, ${p.state}`;
                if (!uniquePlaces.has(key)) {
                    uniquePlaces.set(key, {
                        id: key,
                        primaryText: p.city,
                        secondaryText: p.state,
                        url: `/search?q=${p.city}&type=${type}` // Clicking a place goes to search results for that place
                    });
                }
            });

            return NextResponse.json({
                type: 'places',
                results: Array.from(uniquePlaces.values()).slice(0, 10)
            });
        }
    } catch (error) {
        console.error('Search API Error:', error);
        return NextResponse.json({ results: [] }, { status: 500 });
    }
}
