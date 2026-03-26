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

async function getCategories() {
    const supabase = await createClient();

    const { data: categories, error } = await supabase
        .from('property_categories')
        .select('id, name, slug')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

    if (error) {
        console.error('Error fetching categories:', error);
        return [];
    }

    return categories || [];
}

export default async function PropertiesPage() {
    const [properties, categories] = await Promise.all([getProperties(), getCategories()]);

    return <PropertiesClient properties={properties} categories={categories} />;
}
