-- Create page_sections table for flexible, reusable page content
CREATE TABLE IF NOT EXISTS page_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page TEXT NOT NULL, -- 'home', 'about', 'sell', etc.
  section_type TEXT NOT NULL, -- 'hero', 'stats', 'quote', 'banner', 'contact', 'grid'
  title TEXT,
  subtitle TEXT,
  content TEXT,
  media_url TEXT,
  media_type TEXT, -- 'image', 'video', 'none'
  layout_config JSONB DEFAULT '{}'::jsonb,
  cta_primary_text TEXT,
  cta_primary_link TEXT,
  cta_secondary_text TEXT,
  cta_secondary_link TEXT,
  background_color TEXT DEFAULT '#FFFFFF',
  text_color TEXT DEFAULT '#000000',
  order_index INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_page_sections_page ON page_sections(page);
CREATE INDEX IF NOT EXISTS idx_page_sections_order ON page_sections(order_index);
CREATE INDEX IF NOT EXISTS idx_page_sections_active ON page_sections(is_active);

-- Enable RLS
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;

-- Public can view active sections
CREATE POLICY "Public can view active page sections"
  ON page_sections FOR SELECT
  USING (is_active = true);

-- Admins can manage all sections
CREATE POLICY "Admins can manage page sections"
  ON page_sections FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Trigger for updated_at
CREATE TRIGGER update_page_sections_updated_at
  BEFORE UPDATE ON page_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create component_templates table for reusable templates
CREATE TABLE IF NOT EXISTS component_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL, -- 'hero_fullscreen', 'hero_home_variant', 'stats_3col', etc.
  component_type TEXT NOT NULL, -- 'hero', 'stats', 'quote', 'banner', 'grid', 'contact'
  description TEXT,
  default_config JSONB DEFAULT '{}'::jsonb,
  preview_image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE component_templates ENABLE ROW LEVEL SECURITY;

-- Public can view active templates
CREATE POLICY "Public can view active templates"
  ON component_templates FOR SELECT
  USING (is_active = true);

-- Admins can manage templates
CREATE POLICY "Admins can manage templates"
  ON component_templates FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Seed component templates
INSERT INTO component_templates (name, component_type, description, default_config) VALUES
  (
    'hero_fullscreen',
    'hero',
    'Full-screen hero with video/image background and centered text',
    '{
      "height": "screen",
      "overlay_opacity": 30,
      "text_alignment": "center",
      "show_scroll_indicator": false,
      "variant": "default"
    }'::jsonb
  ),
  (
    'hero_home_variant',
    'hero',
    'Homepage hero with bottom navigation overlay',
    '{
      "height": "screen",
      "overlay_opacity": 20,
      "text_alignment": "center",
      "show_scroll_indicator": false,
      "show_bottom_nav": true,
      "variant": "home"
    }'::jsonb
  ),
  (
    'hero_80vh',
    'hero',
    'Shorter hero section (80% viewport height)',
    '{
      "height": "80vh",
      "overlay_opacity": 30,
      "text_alignment": "center",
      "show_scroll_indicator": true,
      "variant": "default"
    }'::jsonb
  ),
  (
    'stats_3column',
    'stats',
    'Three-column statistics display',
    '{
      "columns": 3,
      "show_border": true,
      "show_intro_text": true
    }'::jsonb
  ),
  (
    'quote_centered',
    'quote',
    'Centered quote with attribution and decorative quotation marks',
    '{
      "text_alignment": "center",
      "show_quotation_marks": true,
      "show_author_image": false
    }'::jsonb
  ),
  (
    'banner_cta',
    'banner',
    'Full-width banner with CTA buttons and overlay',
    '{
      "height": "80vh",
      "overlay_opacity": 30,
      "text_alignment": "center",
      "cta_layout": "horizontal"
    }'::jsonb
  ),
  (
    'contact_dual_cta',
    'contact',
    'Contact section with two CTA buttons (phone and email)',
    '{
      "layout": "horizontal",
      "show_intro_text": true
    }'::jsonb
  );

-- Add template_id to page_sections for linking
ALTER TABLE page_sections ADD COLUMN template_id UUID REFERENCES component_templates(id);
