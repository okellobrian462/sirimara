import Header from "@/components/Header";
import SalesSearchClient from "./SalesSearchClient";
import type { Listing } from "@/lib/types/listing";
import type { Property } from "@/types/database.types";
import { createClient } from "@/lib/supabase/server";

export default async function SalesSearchPage() {
    const supabase = await createClient();

    const { data: properties } = await supabase
        .from("properties")
        .select("*")
        .eq("listing_type", "sale")
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
        listingType: "sale",
        beds: p.bedrooms || 0,
        baths: p.bathrooms || 0,
        halfBaths: p.half_baths || 0,
        sqft: p.sqft ?? null,
        images: p.images || [],
        status: "DOUGLAS ELLIMAN EXCLUSIVE", // Default or fetch if available
        badge: p.badge_text || null,
        latitude: p.latitude || 40.7128,
        longitude: p.longitude || -74.0060,
        exclusive: p.is_exclusive || false,
    }));

    // Get Google Maps API key from environment variable
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    return (
        <main className="min-h-screen bg-white">
            <Header theme="light" />
            <SalesSearchClient listings={listings} googleMapsApiKey={googleMapsApiKey} />
        </main>
    );
}
