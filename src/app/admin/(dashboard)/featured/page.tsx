import { createClient } from '@/lib/supabase/server';
import FeaturedClient, { FeaturedProperty } from './FeaturedClient';

async function getFeaturedProperties() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('featured_properties')
        .select(`
            id,
            property_id,
            display_order,
            property:properties (
                id,
                title,
                address,
                price,
                images,
                city
            )
        `)
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching featured properties:', error);
        return [];
    }

    return data || [];
}

export default async function FeaturedPage() {
    const featuredProperties = await getFeaturedProperties();

    return <FeaturedClient initialFeatured={featuredProperties as unknown as FeaturedProperty[]} />;
}
