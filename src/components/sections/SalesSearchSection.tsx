import SalesSearchClient from "@/app/buy/SalesSearchClient";
import type { PageSection } from "@/lib/content/fetchPageSections";
import { createClient } from "@/lib/supabase/server";
import { fetchSiteConfig } from "@/lib/content/fetchSiteConfig";
import type { Listing, PropertyWithTaxonomy, PropertyFeature } from "@/lib/types/listing";
import type { Property } from "@/types/database.types";

interface SalesSearchSectionProps {
    section: PageSection;
}

export default async function SalesSearchSection({ section }: SalesSearchSectionProps) {
    const supabase = await createClient();
    const config = await fetchSiteConfig();
    const siteName = (config.company_name || 'Sirimara').toUpperCase();

    
    const { data: properties } = await supabase
        .from("properties_with_taxonomy")
        .select(`*, property_contract_types!inner(name, slug)`)
        .eq("status", "active")
        .or('name.eq.For Sale', { referencedTable: 'property_contract_types' });

    
    const [{ data: propertyTypes }, { data: features }] = await Promise.all([
        supabase.from("property_types").select("id, name, slug").eq("is_active", true).order("order_index"),
        supabase.from("property_features").select("id, name, category").eq("is_active", true).order("category").order("name"),
    ]);

    const listings: Listing[] = ((properties as unknown as PropertyWithTaxonomy[]) || []).map((p: PropertyWithTaxonomy) => ({
        id: p.id,
        slug: p.slug || p.id,
        address: p.address || "",
        city: p.city || "",
        state: p.state || "",
        zip: p.zip_code || "",
        price: p.price,
        priceFormatted: `KES ${p.price.toLocaleString()}`,
        listingType: "sale",
        beds: p.bedrooms || 0,
        baths: p.bathrooms || 0,
        halfBaths: p.half_baths || 0,
        sqft: p.square_feet ?? null,
        images: p.images || [],
        status: `${siteName} EXCLUSIVE`,
        badge: p.badge_text || null,
        latitude: p.latitude || -1.2921,
        longitude: p.longitude || 36.8219,
        exclusive: p.is_exclusive || false,
        propertyTypeId: p.type_id || null,
        featureIds: Array.isArray(p.features) ? p.features.map((f: PropertyFeature) => f.id) : [],
    }));

    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    return (
        <SalesSearchClient
            listings={listings}
            googleMapsApiKey={googleMapsApiKey}
            heroData={{
                title: section.title,
                subtitle: section.subtitle,
                background_color: section.background_color,
                text_color: section.text_color
            }}
            propertyTypes={propertyTypes || []}
            features={features || []}
        />
    );
}
