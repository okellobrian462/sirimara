-- Migration: agents table

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

CREATE INDEX idx_agents_email ON public.agents USING btree (email);
CREATE INDEX idx_agents_search ON public.agents USING gin (search_vector);

CREATE TRIGGER update_agents_updated_at
    BEFORE UPDATE ON public.agents
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER agents_search_vector_trigger
    BEFORE INSERT OR UPDATE ON public.agents
    FOR EACH ROW EXECUTE FUNCTION public.agents_search_vector_update();

-- RLS
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active agents"
    ON public.agents FOR SELECT
    USING (is_active = true);

CREATE POLICY "Admins can manage agents"
    ON public.agents
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
