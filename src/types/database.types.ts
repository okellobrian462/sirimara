export interface Property {
    id: string;
    title: string;
    slug: string;
    city: string;
    address?: string;
    state?: string;
    zip_code?: string;
    bedrooms?: number;
    bathrooms?: number;
    half_baths?: number;
    price: number;
    description?: string;
    property_type?: string;
    status: 'active' | 'pending' | 'sold' | 'off-market';
    square_feet?: number;
    sqft?: number; // Added for compatibility with some mappings
    lot_size?: number;
    year_built?: number;
    is_featured: boolean;
    featured_order?: number;
    images: string[];
    amenities: string[];
    category?: string;
    badge_text?: string | null;
    latitude?: number;
    longitude?: number;
    is_exclusive?: boolean;
    listing_type?: 'sale' | 'rent';
    created_at: string;
    updated_at: string;
}

export interface FeaturedProperty {
    id: string;
    property_id: string;
    display_order: number;
    title_override?: string;
    created_at: string;
    property?: Property;
}

export interface Agent {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    bio?: string;
    photo_url?: string;
    title?: string;
    specialties: string[];
    social_links: {
        linkedin?: string;
        twitter?: string;
        instagram?: string;
    };
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface NewsletterSubscriber {
    id: string;
    email: string;
    subscribed_at: string;
    is_active: boolean;
    unsubscribed_at?: string;
}

export interface AdminUser {
    id: string;
    email: string;
    full_name?: string;
    role: 'admin' | 'super_admin';
    created_at: string;
    last_login?: string;
}

export type PropertyFormData = Omit<Property, 'id' | 'created_at' | 'updated_at'>;
