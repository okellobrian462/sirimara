-- Add tabs section support to CMS
-- This allows for interactive tabbed content sections

-- 1. Add 'tabs' template to component_templates
INSERT INTO component_templates (name, component_type, description, default_config) VALUES
  (
    'tabs_spotlight',
    'tabs',
    'Interactive tabs section with image switching',
    '{
      "layout": "side-by-side",
      "image_position": "right",
      "show_gradient": true
    }'::jsonb
  );

-- 2. Create tabs_items table to store individual tab content
CREATE TABLE IF NOT EXISTS tabs_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_id UUID NOT NULL REFERENCES page_sections(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  order_index INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tabs_items_section ON tabs_items(section_id);
CREATE INDEX IF NOT EXISTS idx_tabs_items_order ON tabs_items(order_index);

-- Enable RLS
ALTER TABLE tabs_items ENABLE ROW LEVEL SECURITY;

-- Public can view active tabs
CREATE POLICY "Public can view active tabs"
  ON tabs_items FOR SELECT
  USING (is_active = true);

-- Admins can manage tabs
CREATE POLICY "Admins can manage tabs"
  ON tabs_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

COMMENT ON TABLE tabs_items IS 'Individual tab items for tabs sections';
COMMENT ON COLUMN tabs_items.section_id IS 'Reference to parent page_sections entry';
COMMENT ON COLUMN tabs_items.title IS 'Tab title/heading';
COMMENT ON COLUMN tabs_items.description IS 'Tab description/content';
COMMENT ON COLUMN tabs_items.image_url IS 'Image to display when tab is active';
