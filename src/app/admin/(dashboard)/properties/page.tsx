import { createClient } from '@/lib/supabase/server';
import PropertiesClient from './PropertiesClient';

async function getProperties() {
    const supabase = await createClient();

    const { data: properties, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching properties:', error);
        return [];
    }

    return properties || [];
}

export default async function PropertiesPage() {
    const properties = await getProperties();

    return <PropertiesClient properties={properties} />;
}
