-- Migration: site configuration tables
-- Site-wide config, statistics, and per-page SEO metadata.

-- Site config (key-value store for settings)
CREATE TABLE public.site_config (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    key text NOT NULL,
    value jsonb NOT NULL,
    category text NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT site_config_pkey PRIMARY KEY (id),
    CONSTRAINT site_config_key_key UNIQUE (key)
);

COMMENT ON TABLE public.site_config IS 'Stores site-wide configuration settings';

CREATE INDEX idx_site_config_key ON public.site_config USING btree (key);
CREATE INDEX idx_site_config_category ON public.site_config USING btree (category);

ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access site_config"
    ON public.site_config FOR SELECT USING (true);

CREATE POLICY "Admins access site_config"
    ON public.site_config
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

-- Site statistics (company stats displayed across the site)
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

COMMENT ON TABLE public.site_statistics IS 'Stores company statistics displayed across the site';

CREATE INDEX idx_site_statistics_category ON public.site_statistics USING btree (category);
CREATE INDEX idx_site_statistics_active ON public.site_statistics USING btree (is_active);

ALTER TABLE public.site_statistics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access site_statistics"
    ON public.site_statistics FOR SELECT USING (is_active = true);

CREATE POLICY "Admins access site_statistics"
    ON public.site_statistics
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

-- Page meta (SEO metadata per page path)
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

COMMENT ON TABLE public.page_meta IS 'SEO and meta information for pages';

CREATE INDEX idx_page_meta_path ON public.page_meta USING btree (page_path);

ALTER TABLE public.page_meta ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access page_meta"
    ON public.page_meta FOR SELECT USING (true);

CREATE POLICY "Admins access page_meta"
    ON public.page_meta
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
