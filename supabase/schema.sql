-- Sirimara fresh Supabase schema
-- Run this file in the Supabase SQL Editor for a new project.
-- It creates the tables, views, triggers, storage buckets, RLS policies,
-- and minimal seed data expected by the current Next.js codebase.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.agents_search_vector_update()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.search_vector :=
        setweight(to_tsvector('english', COALESCE(NEW.first_name, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.last_name, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(NEW.bio, '')), 'C');
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.properties_search_vector_update()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.search_vector :=
        setweight(to_tsvector('english', COALESCE(NEW.address, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.city, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.state, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(NEW.zip_code, '')), 'C') ||
        setweight(to_tsvector('english', COALESCE(NEW.neighborhood, '')), 'B');
    RETURN NEW;
END;
$$;

CREATE TABLE public.admin_users (
    id uuid NOT NULL,
    email text NOT NULL,
    full_name text,
    role text DEFAULT 'admin'::text,
    created_at timestamp with time zone DEFAULT now(),
    last_login timestamp with time zone,
    CONSTRAINT admin_users_pkey PRIMARY KEY (id),
    CONSTRAINT admin_users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

INSERT INTO public.admin_users (id, email, full_name, role)
SELECT id, email, 'Admin User', 'super_admin'
FROM auth.users
WHERE email = 'admin@sirimara.com'
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role;

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

CREATE TABLE public.agents (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    phone text,
    bio text,
    photo_url text,
    title text,
    specialties jsonb DEFAULT '[]'::jsonb,
    social_links jsonb DEFAULT '{}'::jsonb,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    is_featured boolean DEFAULT false,
    featured_order integer DEFAULT 0,
    specialties_list text[],
    languages text[],
    search_vector tsvector,
    profile_data jsonb DEFAULT '{}'::jsonb,
    CONSTRAINT agents_pkey PRIMARY KEY (id),
    CONSTRAINT agents_email_key UNIQUE (email)
);

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
    latitude numeric(10,7),
    longitude numeric(10,7),
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

CREATE TABLE public.component_templates (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    component_type text NOT NULL,
    description text,
    default_config jsonb DEFAULT '{}'::jsonb,
    preview_image_url text,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT component_templates_pkey PRIMARY KEY (id),
    CONSTRAINT component_templates_name_key UNIQUE (name)
);

CREATE TABLE public.page_sections (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    page text NOT NULL,
    section_type text NOT NULL,
    title text,
    subtitle text,
    content text,
    media_url text,
    media_type text,
    layout_config jsonb DEFAULT '{}'::jsonb,
    cta_primary_text text,
    cta_primary_link text,
    cta_secondary_text text,
    cta_secondary_link text,
    background_color text DEFAULT '#FFFFFF'::text,
    text_color text DEFAULT '#000000'::text,
    order_index integer NOT NULL,
    is_active boolean DEFAULT true,
    template_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT page_sections_pkey PRIMARY KEY (id),
    CONSTRAINT page_sections_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.component_templates(id)
);

CREATE TABLE public.hero_sections (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    page text NOT NULL,
    section_key text NOT NULL,
    headline text,
    subheadline text,
    cta_text text,
    cta_link text,
    media_type text,
    media_url text,
    overlay_opacity numeric(3,2) DEFAULT 0.35,
    is_active boolean DEFAULT true,
    "order" integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT hero_sections_pkey PRIMARY KEY (id),
    CONSTRAINT hero_sections_page_section_key_key UNIQUE (page, section_key),
    CONSTRAINT hero_sections_media_type_check CHECK (media_type IS NULL OR media_type = ANY (ARRAY['image'::text, 'video'::text]))
);

CREATE TABLE public.content_blocks (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    page text NOT NULL,
    block_type text NOT NULL,
    title text,
    content text,
    metadata jsonb DEFAULT '{}'::jsonb,
    "order" integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT content_blocks_pkey PRIMARY KEY (id)
);

CREATE TABLE public.tabs_items (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    section_id uuid NOT NULL,
    title text NOT NULL,
    description text,
    image_url text,
    order_index integer NOT NULL,
    layout_config jsonb DEFAULT '{}'::jsonb,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT tabs_items_pkey PRIMARY KEY (id),
    CONSTRAINT tabs_items_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.page_sections(id) ON DELETE CASCADE
);

CREATE TABLE public.stories_items (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    section_id uuid,
    title text NOT NULL,
    image_url text,
    category text DEFAULT 'INSIDER'::text,
    url text,
    sort_order integer DEFAULT 0,
    layout_config jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT stories_items_pkey PRIMARY KEY (id),
    CONSTRAINT stories_items_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.page_sections(id) ON DELETE CASCADE
);

CREATE TABLE public.navigation_items (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    menu_location text NOT NULL,
    label text NOT NULL,
    url text NOT NULL,
    parent_id uuid,
    order_index integer DEFAULT 0,
    is_active boolean DEFAULT true,
    icon text,
    dropdown_config jsonb,
    has_dropdown boolean DEFAULT false,
    dropdown_type text,
    opens_in_new_tab boolean DEFAULT false,
    CONSTRAINT navigation_items_pkey PRIMARY KEY (id),
    CONSTRAINT navigation_items_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.navigation_items(id) ON DELETE CASCADE
);

CREATE TABLE public.site_config (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    key text NOT NULL,
    value jsonb NOT NULL,
    category text NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT site_config_pkey PRIMARY KEY (id),
    CONSTRAINT site_config_key_key UNIQUE (key)
);

CREATE TABLE public.site_statistics (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    label text NOT NULL,
    value text NOT NULL,
    sublabel text,
    category text DEFAULT 'general'::text,
    order_index integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT site_statistics_pkey PRIMARY KEY (id)
);

CREATE TABLE public.page_meta (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    page_path text NOT NULL,
    title text,
    description text,
    keywords text[],
    og_image text,
    canonical_url text,
    noindex boolean DEFAULT false,
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT page_meta_pkey PRIMARY KEY (id),
    CONSTRAINT page_meta_page_path_key UNIQUE (page_path)
);

CREATE TABLE public.media_library (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    filename text NOT NULL,
    cloudinary_url text NOT NULL,
    cloudinary_id text NOT NULL,
    media_type text,
    file_size integer,
    dimensions jsonb,
    alt_text text,
    tags text[],
    uploaded_by uuid,
    uploaded_at timestamp with time zone DEFAULT now(),
    CONSTRAINT media_library_pkey PRIMARY KEY (id),
    CONSTRAINT media_library_media_type_check CHECK (media_type = ANY (ARRAY['image'::text, 'video'::text])),
    CONSTRAINT media_library_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES auth.users(id)
);

CREATE TABLE public.form_configs (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    form_key text NOT NULL,
    title text NOT NULL,
    fields jsonb NOT NULL,
    submit_text text DEFAULT 'Submit'::text,
    success_message text,
    email_recipients text[],
    is_active boolean DEFAULT true,
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT form_configs_pkey PRIMARY KEY (id),
    CONSTRAINT form_configs_form_key_key UNIQUE (form_key)
);

CREATE TABLE public.form_submissions (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    form_type text NOT NULL,
    data jsonb NOT NULL,
    status text DEFAULT 'new'::text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT form_submissions_pkey PRIMARY KEY (id)
);

CREATE TABLE public.newsletters (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    cover_image_url text,
    description text,
    content text,
    category text DEFAULT 'INSIDER'::text,
    published_date date DEFAULT CURRENT_DATE,
    is_featured boolean DEFAULT false,
    order_index integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT newsletters_pkey PRIMARY KEY (id),
    CONSTRAINT newsletters_slug_key UNIQUE (slug)
);

CREATE TABLE public.newsletter_subscribers (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    email text NOT NULL,
    subscribed_at timestamp with time zone DEFAULT now(),
    is_active boolean DEFAULT true,
    unsubscribed_at timestamp with time zone,
    CONSTRAINT newsletter_subscribers_pkey PRIMARY KEY (id),
    CONSTRAINT newsletter_subscribers_email_key UNIQUE (email)
);

CREATE INDEX idx_property_categories_slug ON public.property_categories USING btree (slug);
CREATE INDEX idx_property_categories_active ON public.property_categories USING btree (is_active);
CREATE INDEX idx_property_types_slug ON public.property_types USING btree (slug);
CREATE INDEX idx_property_types_active ON public.property_types USING btree (is_active);
CREATE INDEX idx_property_contract_types_slug ON public.property_contract_types USING btree (slug);
CREATE INDEX idx_property_contract_types_active ON public.property_contract_types USING btree (is_active);
CREATE INDEX idx_property_features_slug ON public.property_features USING btree (slug);
CREATE INDEX idx_property_features_active ON public.property_features USING btree (is_active);
CREATE INDEX idx_property_features_category ON public.property_features USING btree (category);
CREATE INDEX idx_agents_email ON public.agents USING btree (email);
CREATE INDEX idx_agents_search ON public.agents USING gin (search_vector);
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
CREATE INDEX idx_property_feature_links_property ON public.property_feature_links USING btree (property_id);
CREATE INDEX idx_property_feature_links_feature ON public.property_feature_links USING btree (feature_id);
CREATE INDEX idx_featured_properties_order ON public.featured_properties USING btree (display_order);
CREATE INDEX idx_page_sections_page ON public.page_sections USING btree (page);
CREATE INDEX idx_page_sections_active ON public.page_sections USING btree (is_active);
CREATE INDEX idx_page_sections_order ON public.page_sections USING btree (order_index);
CREATE INDEX idx_hero_sections_page ON public.hero_sections USING btree (page);
CREATE INDEX idx_hero_sections_active ON public.hero_sections USING btree (is_active);
CREATE INDEX idx_hero_sections_order ON public.hero_sections USING btree ("order");
CREATE INDEX idx_content_blocks_page ON public.content_blocks USING btree (page);
CREATE INDEX idx_content_blocks_type ON public.content_blocks USING btree (block_type);
CREATE INDEX idx_content_blocks_active ON public.content_blocks USING btree (is_active);
CREATE INDEX idx_content_blocks_order ON public.content_blocks USING btree ("order");
CREATE INDEX idx_tabs_items_section ON public.tabs_items USING btree (section_id);
CREATE INDEX idx_tabs_items_order ON public.tabs_items USING btree (order_index);
CREATE INDEX idx_navigation_items_location ON public.navigation_items USING btree (menu_location);
CREATE INDEX idx_navigation_items_parent ON public.navigation_items USING btree (parent_id);
CREATE INDEX idx_navigation_has_dropdown ON public.navigation_items USING btree (has_dropdown) WHERE (has_dropdown = true);
CREATE INDEX idx_site_config_key ON public.site_config USING btree (key);
CREATE INDEX idx_site_config_category ON public.site_config USING btree (category);
CREATE INDEX idx_site_statistics_category ON public.site_statistics USING btree (category);
CREATE INDEX idx_site_statistics_active ON public.site_statistics USING btree (is_active);
CREATE INDEX idx_page_meta_path ON public.page_meta USING btree (page_path);
CREATE INDEX idx_media_library_type ON public.media_library USING btree (media_type);
CREATE INDEX idx_media_library_tags ON public.media_library USING gin (tags);
CREATE INDEX idx_form_configs_key ON public.form_configs USING btree (form_key);
CREATE INDEX idx_form_submissions_type ON public.form_submissions USING btree (form_type);
CREATE INDEX idx_form_submissions_status ON public.form_submissions USING btree (status);
CREATE INDEX idx_form_submissions_created ON public.form_submissions USING btree (created_at);
CREATE INDEX idx_newsletter_email ON public.newsletter_subscribers USING btree (email);

CREATE TRIGGER update_property_categories_updated_at BEFORE UPDATE ON public.property_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_property_types_updated_at BEFORE UPDATE ON public.property_types FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_property_contract_types_updated_at BEFORE UPDATE ON public.property_contract_types FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_property_features_updated_at BEFORE UPDATE ON public.property_features FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON public.agents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER agents_search_vector_trigger BEFORE INSERT OR UPDATE ON public.agents FOR EACH ROW EXECUTE FUNCTION public.agents_search_vector_update();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER properties_search_vector_trigger BEFORE INSERT OR UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION public.properties_search_vector_update();
CREATE TRIGGER update_page_sections_updated_at BEFORE UPDATE ON public.page_sections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_hero_sections_updated_at BEFORE UPDATE ON public.hero_sections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_content_blocks_updated_at BEFORE UPDATE ON public.content_blocks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

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

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_contract_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_feature_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.featured_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.component_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tabs_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own admin record" ON public.admin_users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Authenticated users can view admin users" ON public.admin_users FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage admin users" ON public.admin_users USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable read access for all users" ON public.property_categories FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.property_types FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.property_contract_types FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.property_features FOR SELECT USING (true);
CREATE POLICY "Admins can do everything with property categories" ON public.property_categories USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Admins can do everything with property types" ON public.property_types USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Admins can do everything with property contract types" ON public.property_contract_types USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Admins can do everything with property features" ON public.property_features USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

CREATE POLICY "Public can view active agents" ON public.agents FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage agents" ON public.agents USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

CREATE POLICY "Public can view active properties" ON public.properties FOR SELECT USING (status = 'active');
CREATE POLICY "Admins can do everything with properties" ON public.properties USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Enable read access for all users" ON public.property_feature_links FOR SELECT USING (true);
CREATE POLICY "Admins can do everything with property feature links" ON public.property_feature_links USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Public can view featured properties" ON public.featured_properties FOR SELECT USING (true);
CREATE POLICY "Admins can manage featured properties" ON public.featured_properties USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

CREATE POLICY "Public can view active templates" ON public.component_templates FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage templates" ON public.component_templates USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Public can view active page sections" ON public.page_sections FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage page sections" ON public.page_sections USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Public can view active hero sections" ON public.hero_sections FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage hero sections" ON public.hero_sections USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Public can view active content blocks" ON public.content_blocks FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage content blocks" ON public.content_blocks USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Public can view active tabs" ON public.tabs_items FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage tabs" ON public.tabs_items USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Public read access stories" ON public.stories_items FOR SELECT USING (true);
CREATE POLICY "Admin write access stories" ON public.stories_items USING (auth.role() = 'authenticated');
CREATE POLICY "Public read access navigation_items" ON public.navigation_items FOR SELECT USING (is_active = true);
CREATE POLICY "Admins access navigation_items" ON public.navigation_items USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

CREATE POLICY "Public read access site_config" ON public.site_config FOR SELECT USING (true);
CREATE POLICY "Admins access site_config" ON public.site_config USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Public read access site_statistics" ON public.site_statistics FOR SELECT USING (is_active = true);
CREATE POLICY "Admins access site_statistics" ON public.site_statistics USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Public read access page_meta" ON public.page_meta FOR SELECT USING (true);
CREATE POLICY "Admins access page_meta" ON public.page_meta USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

CREATE POLICY "Public read access media_library" ON public.media_library FOR SELECT USING (true);
CREATE POLICY "Admins access media_library" ON public.media_library USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Admins access form_configs" ON public.form_configs USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Public can submit forms" ON public.form_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins access form_submissions" ON public.form_submissions USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Public read access" ON public.newsletters FOR SELECT USING (true);
CREATE POLICY "Admin write access" ON public.newsletters USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view and manage subscribers" ON public.newsletter_subscribers USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

INSERT INTO storage.buckets (id, name, public)
VALUES
    ('property-images', 'property-images', true),
    ('agent-photos', 'agent-photos', true),
    ('videos', 'videos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access Property Images" ON storage.objects FOR SELECT USING (bucket_id = 'property-images');
CREATE POLICY "Public Access Agent Photos" ON storage.objects FOR SELECT USING (bucket_id = 'agent-photos');
CREATE POLICY "Public Access Videos" ON storage.objects FOR SELECT USING (bucket_id = 'videos');
CREATE POLICY "Admin Upload Property Images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'property-images' AND EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Admin Upload Agent Photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'agent-photos' AND EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Admin Upload Videos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'videos' AND EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Admin Delete Property Images" ON storage.objects FOR DELETE USING (bucket_id = 'property-images' AND EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Admin Delete Agent Photos" ON storage.objects FOR DELETE USING (bucket_id = 'agent-photos' AND EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Admin Delete Videos" ON storage.objects FOR DELETE USING (bucket_id = 'videos' AND EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

INSERT INTO public.property_categories (name, slug, description, order_index)
VALUES
    ('Residential', 'residential', 'Homes, apartments, and private residences', 1),
    ('Commercial', 'commercial', 'Offices, retail, hospitality, and commercial property', 2),
    ('Land', 'land', 'Development plots and land parcels', 3)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.property_types (name, slug, description, order_index)
VALUES
    ('Apartment', 'apartment', 'Apartment and flat listings', 1),
    ('House', 'house', 'Standalone and townhouse listings', 2),
    ('Villa', 'villa', 'Luxury villa listings', 3),
    ('Office', 'office', 'Office and workspace listings', 4),
    ('Land', 'land', 'Land listings', 5)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.property_contract_types (name, slug, description, order_index)
VALUES
    ('For Sale', 'for-sale', 'Properties listed for sale', 1),
    ('To Let', 'to-let', 'Properties listed for rent', 2)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.property_features (name, slug, category, order_index)
VALUES
    ('Swimming Pool', 'swimming-pool', 'amenities', 1),
    ('Gym', 'gym', 'amenities', 2),
    ('Parking', 'parking', 'amenities', 3),
    ('Garden', 'garden', 'outdoor', 4),
    ('Security', 'security', 'services', 5),
    ('Balcony', 'balcony', 'interior', 6)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.site_config (key, value, category)
VALUES
    ('location', '{"lat": -1.2696389, "lng": 36.7700556}'::jsonb, 'general'),
    ('logo_header_svg', '""'::jsonb, 'branding'),
    ('newsletter_text', '"The latest in luxury property, lifestyle & culture, curated just for you."'::jsonb, 'content'),
    ('newsletter_placeholder', '"ENTER YOUR EMAIL"'::jsonb, 'content'),
    ('footer_powered_by', '"POWERED BY PURLIN.AI"'::jsonb, 'legal')
ON CONFLICT (key) DO UPDATE
SET value = EXCLUDED.value,
    category = EXCLUDED.category,
    updated_at = now();

INSERT INTO public.navigation_items (menu_location, label, url, order_index)
VALUES
    ('header', 'Sales', '/sales', 1),
    ('header', 'Rentals', '/rentals', 2),
    ('header', 'New Development', '/new-development', 3),
    ('header', 'Agents', '/agents', 4),
    ('footer', 'About', '/about', 1),
    ('footer', 'Contact', '/valuation', 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.hero_sections (page, section_key, headline, subheadline, cta_text, cta_link, media_type, media_url, overlay_opacity, "order")
VALUES
    ('home', 'main', 'Sirimara', 'Luxury property advisory for distinctive homes and investments.', 'Start Search', '/search', 'image', NULL, 0.35, 1),
    ('sales', 'main', 'Sales', 'Explore properties listed for sale.', 'View Listings', '/sales', 'image', NULL, 0.35, 1),
    ('rentals', 'main', 'Rentals', 'Find refined homes available to let.', 'View Rentals', '/rentals', 'image', NULL, 0.35, 1)
ON CONFLICT (page, section_key) DO NOTHING;

INSERT INTO public.content_blocks (page, block_type, title, content, metadata, "order")
VALUES
    ('home', 'intro', 'Sirimara', 'Add homepage content from the admin panel.', '{}'::jsonb, 1),
    ('about', 'intro', 'About Sirimara', 'Add company content from the admin panel.', '{}'::jsonb, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.site_statistics (label, value, sublabel, category, order_index)
VALUES
    ('Markets', '1', 'Kenya-focused luxury property', 'general', 1),
    ('Listings', '0', 'Add listings from the admin panel', 'general', 2),
    ('Advisors', '0', 'Add agents from the admin panel', 'general', 3)
ON CONFLICT DO NOTHING;
