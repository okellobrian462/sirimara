import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageCarousel from '@/components/listing/ImageCarousel';
import ExpandableFeaturesList from '@/components/listing/ExpandableFeaturesList';
import Link from 'next/link';
import type { Metadata } from "next";
import { COMPANY_NAME, SITE_URL } from "@/lib/seo/site";
import { slugifyAgentName } from "@/lib/agentSlug";

const PROPERTY_SELECT =
  "slug, title, address, city, state, zip_code, price, listing_type, description, images, bedrooms, bathrooms, square_feet, year_built, created_at, updated_at";

// Normalizes the route segment(s) into a single, trimmed lookup value.
function normalizeLookupSlug(slug: string | string[] | undefined): string {
  const raw = Array.isArray(slug) ? slug[0] : slug;
  const segment = raw ?? "";

  // Catch-all route segments arrive percent-encoded (e.g.
  // "Luxury%20residence%20in%20Kileleshwa"), so spaces never reach us as
  // spaces and an exact slug lookup would always miss. Decode first, then trim.
  // Malformed sequences (e.g. a literal "%" in a slug) are left as-is instead
  // of throwing URIError.
  let decoded = segment;
  try {
    decoded = decodeURIComponent(segment);
  } catch {
    decoded = segment;
  }

  return decoded.trim();
}

// Resolves a property from the `properties_with_taxonomy` view by slug, then
// falls back to a whitespace/case tolerant match, and finally by id.
// Generic over `Select` so Supabase's query result keeps its inferred shape.
async function findPropertyBySlugOrId<Select extends string>(select: Select, lookupSlug: string) {
  const supabase = await createClient();

  if (!lookupSlug) return null;

  // Fast path: exact slug match.
  const { data: property } = await supabase
    .from('properties_with_taxonomy')
    .select(select)
    .eq('slug', lookupSlug)
    .maybeSingle();

  if (property) return property;

  // Legacy/imported listings occasionally store stray leading/trailing
  // whitespace or inconsistent casing in their slug (for example
  // "Premium 2 bedroom Skyline view apartment "). A trailing space is dropped
  // from the URL by the browser, so an exact match would 404. Fall back to a
  // whitespace- and case-tolerant match so those links still resolve.
  const { data: looseMatches } = await supabase
    .from('properties_with_taxonomy')
    .select(select)
    .ilike('slug', `%${lookupSlug.replace(/[%_]/g, '')}%`);

  const looseMatch = (looseMatches ?? []).find((row) => {
    const rowSlug = (row as unknown as { slug?: string | null }).slug;
    return String(rowSlug ?? '').trim().toLowerCase() === lookupSlug.toLowerCase();
  });

  if (looseMatch) return looseMatch;

  // Finally, allow lookup by id (used by admin/preview links).
  const { data: propertyById } = await supabase
    .from('properties_with_taxonomy')
    .select(select)
    .eq('id', lookupSlug)
    .maybeSingle();

  return propertyById ?? null;
}

async function fetchPropertyForSeo(lookupSlug: string) {
  return findPropertyBySlugOrId(PROPERTY_SELECT, lookupSlug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lookupSlug = normalizeLookupSlug(slug);
  const property = await fetchPropertyForSeo(lookupSlug);
  if (!property) return {};

  const listingLabel = property.listing_type === "rent" ? "For Rent" : "For Sale";
  const address = property.address || property.title || "Property";
  const location = [property.city, property.state].filter(Boolean).join(", ");
  const title = `${address} - ${listingLabel} | ${COMPANY_NAME}`;
  const description = property.description
    ? property.description.replace(/\s+/g, " ").trim().slice(0, 160)
    : `${address}${location ? ` in ${location}` : ""} - ${listingLabel}. Contact ${COMPANY_NAME} for details.`;
  const images = Array.isArray(property.images) ? property.images.filter(Boolean) : [];
  const canonicalSlug = String(property.slug || lookupSlug).trim();
  const canonicalPath = `/listing/${encodeURIComponent(canonicalSlug)}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${canonicalPath}`,
      title,
      description,
      images: images.length ? images.slice(0, 5) : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.slice(0, 1),
    },
  };
}

export default async function ListingDetailPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const resolvedParams = await params;
    const slugArray = resolvedParams.slug;
    const lookupSlug = normalizeLookupSlug(slugArray);

    const property = await findPropertyBySlugOrId('*', lookupSlug);

    if (!property) {
        return notFound();
    }

    const supabase = await createClient();

    
    const { data: agent } = await supabase
        .from('agents')
        .select('*')
        .eq('is_active', true)
        .limit(1)
        .single();

    const data = {
        address: property.address || "Address Unavailable",
        location: `${property.city || ''}, ${property.state || ''} ${property.zip_code || ''}`.trim().toUpperCase(),
        price: property.price ? `KES ${property.price.toLocaleString()}` : "Price Upon Request",
        beds: property.bedrooms ? `${property.bedrooms} BR` : "",
        baths: property.bathrooms ? `${property.bathrooms} BA${property.half_baths ? `, ${property.half_baths} HALF BA` : ''}` : "",
        sqft: property.square_feet ? `APPROX. ${property.square_feet.toLocaleString()} SF` : '',
        images: property.images || [],
        videos: Array.isArray(property.videos) ? property.videos : [],
        
        square_feet: property.square_feet,
        lot_size: property.lot_size,
        property_type: property.type_name || property.property_type || null,
        year_built: property.year_built,
        listing_id: property.id ? property.id.split('-')[0].toUpperCase() : null,
        features: property.features || [],
        agent: {
            name: agent ? `${agent.first_name} ${agent.last_name}` : 'Sirimara Agent',
            image: agent?.photo_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
            phone: agent?.phone || '+254 700 000000',
            title: agent?.title || 'Licensed Real Estate Salesperson'
        }
    };

    const listingUrl = `${SITE_URL}/listing/${encodeURIComponent(String(property.slug || lookupSlug).trim())}`;

    return (
        <main className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "RealEstateListing",
                        name: property.title || data.address,
                        description: property.description || `${data.address} - ${data.location}${data.price ? ` ${data.price}.` : ""}`,
                        url: listingUrl,
                        image: Array.isArray(property.images) ? property.images.filter(Boolean) : undefined,
                        datePosted: property.created_at || undefined,
                        offers: {
                            "@type": "Offer",
                            url: listingUrl,
                            price: property.price ?? undefined,
                            priceCurrency: "KES",
                            availability: "https://schema.org/InStock"
                        },
                        address: {
                            "@type": "PostalAddress",
                            streetAddress: property.address || undefined,
                            addressLocality: property.city || undefined,
                            addressRegion: property.state || undefined,
                            postalCode: property.zip_code || undefined,
                            addressCountry: "KE"
                        },
                        numberOfBedrooms: property.bedrooms ?? undefined,
                        numberOfBathroomsTotal: property.bathrooms ?? undefined,
                        floorSize: property.square_feet
                            ? { "@type": "QuantitativeValue", value: property.square_feet, unitCode: "FTK" }
                            : undefined,
                        yearBuilt: property.year_built ?? undefined,
                        realEstateAgent: agent && agent.first_name
                            ? {
                                "@type": "RealEstateAgent",
                                name: `${agent.first_name} ${agent.last_name}`,
                                url: `${SITE_URL}/agents/${slugifyAgentName(agent.first_name, agent.last_name)}`,
                                telephone: agent.phone || undefined,
                                image: agent.photo_url || undefined
                            }
                            : undefined,
                        seller: {
                            "@type": "Organization",
                            name: COMPANY_NAME,
                            url: SITE_URL
                        }
                    })
                }}
            />
            <Header theme="dark" />

            {}
            <ImageCarousel images={data.images} videos={data.videos} address={data.address} />

            {}
            <section className="bg-[#F8F8F8] py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center space-y-4 mb-12">
                        <h1 className="text-3xl md:text-[44px] font-sans font-normal tracking-[0.1em] text-brand-dark uppercase">
                            {data.address}
                        </h1>
                        <p className="text-sm md:text-base tracking-[0.15em] text-gray-500 uppercase">
                            {data.location}
                        </p>

                        <div className="w-12 h-[1px] bg-gray-400 mx-auto my-10"></div>

                        <div className="space-y-4">
                            <h2 className="text-5xl md:text-[64px] font-sans font-normal text-brand-dark">
                                {data.price}
                            </h2>
                        </div>
                    </div>

                    {}
                    <div className="w-full h-[1px] bg-gray-200"></div>
                    <div className="flex flex-wrap justify-center items-center gap-x-12 md:gap-x-20 py-8 text-brand-dark">
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
                                <svg className="w-5 h-5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <path d="M8 4H4v4M16 20h4v-4" />
                                </svg>
                                <span className="text-sm font-medium tracking-[0.2em] uppercase">{data.sqft}</span>
                            </div>
                        )}
                    </div>
                    <div className="w-full h-[1px] bg-gray-200"></div>

                    {}
                    <div className="py-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                        {}
                        <div>
                            <h3 className="text-[13px] font-semibold tracking-[0.1em] text-brand-dark uppercase mb-6">Details</h3>
                            <div className="space-y-4 text-[#333333] tracking-[0.02em] text-[15px]">
                                {data.square_feet && <p>{data.square_feet.toLocaleString()} Sq Ft</p>}
                                {data.lot_size && <p>{data.lot_size.toLocaleString()} Sq Ft Lot Size</p>}
                                {data.property_type && <p>{data.property_type}</p>}
                                {data.year_built && <p>Built in {data.year_built}</p>}
                                {data.listing_id && <p>MLS/Listing ID {data.listing_id}</p>}
                            </div>
                        </div>

                        {}
                        <div>
                            <h3 className="text-[13px] font-semibold tracking-[0.1em] text-brand-dark uppercase mb-6">Amenities & Features</h3>
                            <ExpandableFeaturesList features={data.features} />
                        </div>
                    </div>
                    {}
                </div>
            </section>

            <Footer />
        </main>
    );
}
