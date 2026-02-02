import RentalsSearchClient from "@/app/rentals/RentalsSearchClient";
import type { PageSection } from "@/lib/content/fetchPageSections";
import { createClient } from "@/lib/supabase/server";
import type { Listing } from "@/lib/types/listing";
import type { Property } from "@/types/database.types";

interface RentalsSearchSectionProps {
    section: PageSection;
}

export default async function RentalsSearchSection({ section }: RentalsSearchSectionProps) {
    const supabase = await createClient();

    const { data: properties } = await supabase
        .from("properties")
        .select("*")
        .eq("listing_type", "rent")
        .eq("status", "active");

    const listings: Listing[] = ((properties as unknown as Property[]) || []).map((p: Property) => ({
        id: p.id,
        slug: p.slug || p.id,
        address: p.address || "",
        city: p.city || "",
        state: p.state || "",
        zip: p.zip_code || "",
        price: p.price,
        priceFormatted: `$${p.price.toLocaleString()}`,
        listingType: "rental",
        beds: p.bedrooms || 0,
        baths: p.bathrooms || 0,
        halfBaths: p.half_baths || 0,
        sqft: p.sqft ?? null,
        images: p.images || [],
        status: "DOUGLAS ELLIMAN EXCLUSIVE",
        badge: p.badge_text || null,
        latitude: p.latitude || 40.7128,
        longitude: p.longitude || -74.0060,
        exclusive: p.is_exclusive || false,
    }));

    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    return (
        <RentalsSearchClient
            listings={listings}
            googleMapsApiKey={googleMapsApiKey}
            hideHero={true} // New prop we need to add to the client
        />
    );
}
