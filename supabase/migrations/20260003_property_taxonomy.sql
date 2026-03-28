-- Migration: property taxonomy
-- Lookup tables for property categories, types, contract types, and features.
-- Must be created before the properties table (foreign keys).

-- Property categories (Commercial, Residential, etc.)
CREATE TABLE public.property_categories (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    order_index integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT property_categories_pkey PRIMARY KEY (id),
    CONSTRAINT property_categories_slug_key UNIQUE (slug)
);

COMMENT ON TABLE public.property_categories IS 'Property categories for the Kenyan market (Commercial, Residential, etc.)';

CREATE INDEX idx_property_categories_slug ON public.property_categories USING btree (slug);
CREATE INDEX idx_property_categories_active ON public.property_categories USING btree (is_active);

CREATE TRIGGER update_property_categories_updated_at
    BEFORE UPDATE ON public.property_categories
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Property types (Apartments, House, Land, etc.)
CREATE TABLE public.property_types (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    order_index integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT property_types_pkey PRIMARY KEY (id),
    CONSTRAINT property_types_slug_key UNIQUE (slug)
);

COMMENT ON TABLE public.property_types IS 'Property types for the Kenyan market (Apartments, House, Land, etc.)';

CREATE INDEX idx_property_types_slug ON public.property_types USING btree (slug);
CREATE INDEX idx_property_types_active ON public.property_types USING btree (is_active);

CREATE TRIGGER update_property_types_updated_at
    BEFORE UPDATE ON public.property_types
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Contract types (For Sale, To Let)
CREATE TABLE public.property_contract_types (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    order_index integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT property_contract_types_pkey PRIMARY KEY (id),
    CONSTRAINT property_contract_types_slug_key UNIQUE (slug)
);

COMMENT ON TABLE public.property_contract_types IS 'Contract types: For Sale, To Let';

CREATE INDEX idx_property_contract_types_slug ON public.property_contract_types USING btree (slug);
CREATE INDEX idx_property_contract_types_active ON public.property_contract_types USING btree (is_active);

CREATE TRIGGER update_property_contract_types_updated_at
    BEFORE UPDATE ON public.property_contract_types
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Property features/amenities (Swimming Pool, Gym, Parking, etc.)
CREATE TABLE public.property_features (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    category text DEFAULT 'general'::text,
    order_index integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT property_features_pkey PRIMARY KEY (id),
    CONSTRAINT property_features_slug_key UNIQUE (slug)
);

COMMENT ON TABLE public.property_features IS 'Property features/amenities (Swimming Pool, Gym, Parking, etc.)';

CREATE INDEX idx_property_features_slug ON public.property_features USING btree (slug);
CREATE INDEX idx_property_features_active ON public.property_features USING btree (is_active);
CREATE INDEX idx_property_features_category ON public.property_features USING btree (category);

CREATE TRIGGER update_property_features_updated_at
    BEFORE UPDATE ON public.property_features
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS for all taxonomy tables
ALTER TABLE public.property_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_contract_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_features ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Enable read access for all users" ON public.property_categories FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.property_types FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.property_contract_types FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.property_features FOR SELECT USING (true);

-- Admin write
CREATE POLICY "Admins can do everything with property categories"
    ON public.property_categories
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

CREATE POLICY "Admins can do everything with property types"
    ON public.property_types
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

CREATE POLICY "Admins can do everything with property contract types"
    ON public.property_contract_types
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

CREATE POLICY "Admins can do everything with property features"
    ON public.property_features
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
