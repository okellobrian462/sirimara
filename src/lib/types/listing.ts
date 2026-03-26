export interface Listing {
    id: string | number;
    slug: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    price: number;
    priceFormatted: string;
    listingType: "rental" | "sale";
    beds: number;
    baths: number;
    halfBaths: number;
    sqft: number | null;
    images: string[];
    status: string;
    badge: string | null;
    latitude: number;
    longitude: number;
    exclusive: boolean;
}

export interface FilterState {
    goal: "rental" | "sale" | "sold";
    priceMin: number | null;
    priceMax: number | null;
    beds: number | null;
    baths: number | null;
    propertyTypes: string[];
    location: string;
    features: string[];
    parkingMin: number | null;
    parkingMax: number | null;
    sqftMin: number | null;
    sqftMax: number | null;
    yearBuiltMin: number | null;
    yearBuiltMax: number | null;
}

export interface MapBounds {
    north: number;
    south: number;
    east: number;
    west: number;
}
