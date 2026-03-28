-- Migration: properties table and feature links
-- Depends on: property taxonomy (20240003)

CREATE TABLE public.properties (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    city text NOT NULL,
    address text,
    state text,
    zip_code text,
    bedrooms integer,
    bathrooms numeric(3,1),
    half_baths integer DEFAULT 0,
    price numeric(12,2) NOT NULL,
    description text,
    property_type text,
    status text DEFAULT 'active'::text,
    square_feet integer,
    lot_size numeric(10,2),
    year_built integer,
    is_featured boolean DEFAULT false,
    featured_order integer,
    images jsonb DEFAULT '[]'::jsonb,
    amenities jsonb DEFAULT '[]'::jsonb,
    category text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    is_exclusive boolean DEFAULT false,
    badge_text text,
    badge_expires_at timestamp with time zone,
    listing_type text DEFAULT 'sale'::text,
    neighborhood text,
    search_vector tsvector,
    category_id uuid,
    type_id uuid,
    contract_type_id uuid,
    CONSTRAINT properties_pkey PRIMARY KEY (id),
    CONSTRAINT properties_slug_key UNIQUE (slug),
    CONSTRAINT properties_listing_type_check CHECK (listing_type = ANY (ARRAY['sale'::text, 'rent'::text])),
    CONSTRAINT properties_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.property_categories(id),
    CONSTRAINT properties_type_id_fkey FOREIGN KEY (type_id) REFERENCES public.property_types(id),
    CONSTRAINT properties_contract_type_id_fkey FOREIGN KEY (contract_type_id) REFERENCES public.property_contract_types(id)
);

CREATE INDEX idx_properties_slug ON public.properties USING btree (slug);
CREATE INDEX idx_properties_status ON public.properties USING btree (status);
CREATE INDEX idx_properties_city ON public.properties USING btree (city);
CREATE INDEX idx_properties_price ON public.properties USING btree (price);
CREATE INDEX idx_properties_is_featured ON public.properties USING btree (is_featured);
CREATE INDEX idx_properties_listing_type ON public.properties USING btree (listing_type);
CREATE INDEX idx_properties_category ON public.properties USING btree (category);
CREATE INDEX idx_properties_category_id ON public.properties USING btree (category_id);
CREATE INDEX idx_properties_type_id ON public.properties USING btree (type_id);
CREATE INDEX idx_properties_contract_type_id ON public.properties USING btree (contract_type_id);
CREATE INDEX idx_properties_search ON public.properties USING gin (search_vector);

CREATE TRIGGER update_properties_updated_at
    BEFORE UPDATE ON public.properties
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER properties_search_vector_trigger
    BEFORE INSERT OR UPDATE ON public.properties
    FOR EACH ROW EXECUTE FUNCTION public.properties_search_vector_update();

-- Many-to-many: properties <-> features
CREATE TABLE public.property_feature_links (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    property_id uuid NOT NULL,
    feature_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT property_feature_links_pkey PRIMARY KEY (id),
    CONSTRAINT property_feature_links_property_id_feature_id_key UNIQUE (property_id, feature_id),
    CONSTRAINT property_feature_links_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE CASCADE,
    CONSTRAINT property_feature_links_feature_id_fkey FOREIGN KEY (feature_id) REFERENCES public.property_features(id) ON DELETE CASCADE
);

COMMENT ON TABLE public.property_feature_links IS 'Links properties to their features (many-to-many)';

CREATE INDEX idx_property_feature_links_property ON public.property_feature_links USING btree (property_id);
CREATE INDEX idx_property_feature_links_feature ON public.property_feature_links USING btree (feature_id);

-- View: properties enriched with taxonomy data
CREATE VIEW public.properties_with_taxonomy AS
SELECT
    p.*,
    pc.name AS category_name,
    pc.slug AS category_slug,
    pt.name AS type_name,
    pt.slug AS type_slug,
    pct.name AS contract_type_name,
    pct.slug AS contract_type_slug,
    COALESCE((
        SELECT jsonb_agg(jsonb_build_object('id', pf.id, 'name', pf.name, 'slug', pf.slug, 'category', pf.category))
        FROM public.property_feature_links pfl
        JOIN public.property_features pf ON pfl.feature_id = pf.id
        WHERE pfl.property_id = p.id AND pf.is_active = true
    ), '[]'::jsonb) AS features
FROM public.properties p
LEFT JOIN public.property_categories pc ON p.category_id = pc.id
LEFT JOIN public.property_types pt ON p.type_id = pt.id
LEFT JOIN public.property_contract_types pct ON p.contract_type_id = pct.id;

COMMENT ON VIEW public.properties_with_taxonomy IS 'Properties enriched with taxonomy data';

-- Featured properties (curated ordering)
CREATE TABLE public.featured_properties (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    property_id uuid,
    display_order integer NOT NULL,
    title_override text,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT featured_properties_pkey PRIMARY KEY (id),
    CONSTRAINT featured_properties_property_id_key UNIQUE (property_id),
    CONSTRAINT featured_properties_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE CASCADE
);

CREATE INDEX idx_featured_properties_order ON public.featured_properties USING btree (display_order);

-- RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_feature_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.featured_properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active properties"
    ON public.properties FOR SELECT
    USING (status = 'active');

CREATE POLICY "Admins can do everything with properties"
    ON public.properties
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

CREATE POLICY "Enable read access for all users"
    ON public.property_feature_links FOR SELECT USING (true);

CREATE POLICY "Admins can do everything with property feature links"
    ON public.property_feature_links
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

CREATE POLICY "Public can view featured properties"
    ON public.featured_properties FOR SELECT USING (true);

CREATE POLICY "Admins can manage featured properties"
    ON public.featured_properties
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
