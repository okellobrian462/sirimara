-- Migration: CMS tables
-- Page sections, component templates, navigation, tabs items, and stories items.

-- Component templates (reusable section blueprints)
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

ALTER TABLE public.component_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active templates"
    ON public.component_templates FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage templates"
    ON public.component_templates
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

-- Page sections (CMS content blocks per page)
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

CREATE INDEX idx_page_sections_page ON public.page_sections USING btree (page);
CREATE INDEX idx_page_sections_active ON public.page_sections USING btree (is_active);
CREATE INDEX idx_page_sections_order ON public.page_sections USING btree (order_index);

CREATE TRIGGER update_page_sections_updated_at
    BEFORE UPDATE ON public.page_sections
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active page sections"
    ON public.page_sections FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage page sections"
    ON public.page_sections
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

-- Tabs items (child rows belonging to a tabs-type page section)
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

COMMENT ON TABLE public.tabs_items IS 'Individual tab items for tabs sections';
COMMENT ON COLUMN public.tabs_items.section_id IS 'Reference to parent page_sections entry';

CREATE INDEX idx_tabs_items_section ON public.tabs_items USING btree (section_id);
CREATE INDEX idx_tabs_items_order ON public.tabs_items USING btree (order_index);

ALTER TABLE public.tabs_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active tabs"
    ON public.tabs_items FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage tabs"
    ON public.tabs_items
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));

-- Stories items (editorial story cards)
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

ALTER TABLE public.stories_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access stories"
    ON public.stories_items FOR SELECT USING (true);

CREATE POLICY "Admin write access stories"
    ON public.stories_items
    USING (auth.role() = 'authenticated');

-- Navigation items (header/footer menus)
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

COMMENT ON TABLE public.navigation_items IS 'Navigation menu items for header and footer';
COMMENT ON COLUMN public.navigation_items.has_dropdown IS 'Whether this navigation item has a dropdown menu';

CREATE INDEX idx_navigation_items_location ON public.navigation_items USING btree (menu_location);
CREATE INDEX idx_navigation_items_parent ON public.navigation_items USING btree (parent_id);
CREATE INDEX idx_navigation_has_dropdown ON public.navigation_items USING btree (has_dropdown) WHERE (has_dropdown = true);

ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access navigation_items"
    ON public.navigation_items FOR SELECT USING (is_active = true);

CREATE POLICY "Admins access navigation_items"
    ON public.navigation_items
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));
