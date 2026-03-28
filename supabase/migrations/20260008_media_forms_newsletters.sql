-- Migration: media library, forms, and newsletters

-- Media library (Cloudinary-backed asset management)
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

COMMENT ON TABLE public.media_library IS 'Centralized media asset management';

CREATE INDEX idx_media_library_type ON public.media_library USING btree (media_type);
CREATE INDEX idx_media_library_tags ON public.media_library USING gin (tags);

ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access media_library"
    ON public.media_library FOR SELECT USING (true);

CREATE POLICY "Admins access media_library"
    ON public.media_library
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

-- Form configs (dynamic form definitions)
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

COMMENT ON TABLE public.form_configs IS 'Configuration for site forms';

CREATE INDEX idx_form_configs_key ON public.form_configs USING btree (form_key);

ALTER TABLE public.form_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins access form_configs"
    ON public.form_configs
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

-- Form submissions (contact/enquiry submissions)
CREATE TABLE public.form_submissions (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    form_type text NOT NULL,
    data jsonb NOT NULL,
    status text DEFAULT 'new'::text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT form_submissions_pkey PRIMARY KEY (id)
);

CREATE INDEX idx_form_submissions_type ON public.form_submissions USING btree (form_type);
CREATE INDEX idx_form_submissions_status ON public.form_submissions USING btree (status);
CREATE INDEX idx_form_submissions_created ON public.form_submissions USING btree (created_at);

ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit forms"
    ON public.form_submissions FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins access form_submissions"
    ON public.form_submissions
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

-- Newsletters (published newsletter articles)
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

ALTER TABLE public.newsletters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access"
    ON public.newsletters FOR SELECT USING (true);

CREATE POLICY "Admin write access"
    ON public.newsletters
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

-- Newsletter subscribers
CREATE TABLE public.newsletter_subscribers (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    email text NOT NULL,
    subscribed_at timestamp with time zone DEFAULT now(),
    is_active boolean DEFAULT true,
    unsubscribed_at timestamp with time zone,
    CONSTRAINT newsletter_subscribers_pkey PRIMARY KEY (id),
    CONSTRAINT newsletter_subscribers_email_key UNIQUE (email)
);

CREATE INDEX idx_newsletter_email ON public.newsletter_subscribers USING btree (email);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
    ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view and manage subscribers"
    ON public.newsletter_subscribers
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
