-- Admin Panel & Main Site Database Schema
-- Consolidate tables for: properties, agents, site_config, hero_sections, site_statistics, content_blocks, navigation_items, media_library, form_configs, page_meta

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PROPERTIES & AGENTS (from original schema.sql + enhancements)
-- ============================================

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  city TEXT NOT NULL,
  address TEXT,
  state TEXT,
  zip_code TEXT,
  bedrooms INTEGER,
  bathrooms NUMERIC(3,1),
  half_baths INTEGER DEFAULT 0,
  price NUMERIC(12,2) NOT NULL,
  description TEXT,
  property_type TEXT, -- e.g., 'condo', 'house', 'apartment'
  status TEXT DEFAULT 'active', -- 'active', 'pending', 'sold', 'off-market'
  square_feet INTEGER,
  lot_size NUMERIC(10,2),
  year_built INTEGER,
  is_featured BOOLEAN DEFAULT false,
  featured_order INTEGER,
  images JSONB DEFAULT '[]'::jsonb, -- Array of image URLs
  amenities JSONB DEFAULT '[]'::jsonb, -- Array of amenities
  category TEXT, -- 'city-skylines', 'water-views', 'farm-ranch', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Enhancements from subsequent migrations
  is_exclusive BOOLEAN DEFAULT false,
  badge_text TEXT,
  badge_expires_at TIMESTAMP WITH TIME ZONE,
  listing_type TEXT DEFAULT 'sale' CHECK (listing_type IN ('sale', 'rent')),
  neighborhood TEXT,
  search_vector tsvector
);

-- Featured properties table (for carousel)
CREATE TABLE IF NOT EXISTS featured_properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  display_order INTEGER NOT NULL,
  title_override TEXT, -- Optional custom title for carousel
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(property_id)
);

-- Agents table
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  bio TEXT,
  photo_url TEXT,
  title TEXT, -- e.g., 'Senior Agent', 'Broker'
  specialties JSONB DEFAULT '[]'::jsonb,
  social_links JSONB DEFAULT '{}'::jsonb, -- {linkedin, twitter, instagram}
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Enhancements
  is_featured BOOLEAN DEFAULT false,
  featured_order INTEGER DEFAULT 0,
  specialties_list TEXT[], -- Renamed from 'specialties' in migration to avoid conflict, or usually just add to original JSONB. 
                           -- Checking schema.sql, original was JSONB. Migration added TEXT[]. 
                           -- Let's keep both for now if they serve different purposes, or consolidate. 
                           -- looking at 20250123_admin_panel_phase1.sql: ADD COLUMN IF NOT EXISTS specialties TEXT[]
                           -- This conflicts with JSONB. Postgres allows same name if type different? No.
                           -- Likely the migration failed or user meant to ALTER. 
                           -- effectively we'll use `specialties` as JSONB as per original schema 
                           -- AND languages
  languages TEXT[],
  search_vector tsvector
);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Admin users metadata table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin', -- 'admin', 'super_admin'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- 2. SITE CONFIGURATION & CMS TABLES
-- ============================================

CREATE TABLE IF NOT EXISTS site_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  category TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  sublabel TEXT,
  category TEXT DEFAULT 'general',
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS navigation_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_location TEXT NOT NULL,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  parent_id UUID REFERENCES navigation_items(id) ON DELETE CASCADE,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  icon TEXT,
  dropdown_config JSONB, -- Added from implication of update_routes migration usage
  has_dropdown BOOLEAN DEFAULT false,
  dropdown_type TEXT, -- 'search', 'links', 'custom'
  opens_in_new_tab BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS media_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  cloudinary_url TEXT NOT NULL,
  cloudinary_id TEXT NOT NULL,
  media_type TEXT CHECK (media_type IN ('image', 'video')),
  file_size INTEGER,
  dimensions JSONB,
  alt_text TEXT,
  tags TEXT[],
  uploaded_by UUID REFERENCES auth.users(id),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS form_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_key TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  fields JSONB NOT NULL,
  submit_text TEXT DEFAULT 'Submit',
  success_message TEXT,
  email_recipients TEXT[],
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS page_meta (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path TEXT UNIQUE NOT NULL,
  title TEXT,
  description TEXT,
  keywords TEXT[],
  og_image TEXT,
  canonical_url TEXT,
  noindex BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2a. ADDITIONAL CMS TABLES (Page Sections, Components, etc.)
-- ============================================

CREATE TABLE IF NOT EXISTS component_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL, -- 'hero_fullscreen', 'hero_home_variant', 'stats_3col', etc.
  component_type TEXT NOT NULL, -- 'hero', 'stats', 'quote', 'banner', 'grid', 'contact', 'tabs'
  description TEXT,
  default_config JSONB DEFAULT '{}'::jsonb,
  preview_image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS page_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page TEXT NOT NULL, -- 'home', 'about', 'sell', etc.
  section_type TEXT NOT NULL, -- 'hero', 'stats', 'quote', 'banner', 'contact', 'grid', 'tabs', 'stories'
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
  template_id UUID REFERENCES component_templates(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

CREATE TABLE IF NOT EXISTS stories_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_id UUID REFERENCES page_sections(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'INSIDER',
  url TEXT, -- Optional link
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. INDEXES
-- ============================================

-- Properties & Agents
CREATE INDEX IF NOT EXISTS idx_properties_slug ON properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_category ON properties(category);
CREATE INDEX IF NOT EXISTS idx_properties_is_featured ON properties(is_featured);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_listing_type ON properties(listing_type);
CREATE INDEX IF NOT EXISTS idx_properties_search ON properties USING GIN(search_vector);

CREATE INDEX IF NOT EXISTS idx_featured_properties_order ON featured_properties(display_order);

CREATE INDEX IF NOT EXISTS idx_agents_email ON agents(email);
CREATE INDEX IF NOT EXISTS idx_agents_search ON agents USING GIN(search_vector);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- CMS
CREATE INDEX IF NOT EXISTS idx_site_config_category ON site_config(category);
CREATE INDEX IF NOT EXISTS idx_site_config_key ON site_config(key);
CREATE INDEX IF NOT EXISTS idx_site_statistics_category ON site_statistics(category);
CREATE INDEX IF NOT EXISTS idx_site_statistics_active ON site_statistics(is_active);
CREATE INDEX IF NOT EXISTS idx_navigation_items_location ON navigation_items(menu_location);
CREATE INDEX IF NOT EXISTS idx_navigation_items_parent ON navigation_items(parent_id);
CREATE INDEX IF NOT EXISTS idx_navigation_has_dropdown ON navigation_items(has_dropdown) WHERE has_dropdown = true;

CREATE INDEX IF NOT EXISTS idx_media_library_type ON media_library(media_type);
CREATE INDEX IF NOT EXISTS idx_media_library_tags ON media_library USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_form_configs_key ON form_configs(form_key);
CREATE INDEX IF NOT EXISTS idx_page_meta_path ON page_meta(page_path);

CREATE INDEX IF NOT EXISTS idx_page_sections_page ON page_sections(page);
CREATE INDEX IF NOT EXISTS idx_page_sections_order ON page_sections(order_index);
CREATE INDEX IF NOT EXISTS idx_page_sections_active ON page_sections(is_active);
CREATE INDEX IF NOT EXISTS idx_tabs_items_section ON tabs_items(section_id);
CREATE INDEX IF NOT EXISTS idx_tabs_items_order ON tabs_items(order_index);

-- ============================================
-- 4. FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Search Vector Updates
CREATE OR REPLACE FUNCTION properties_search_vector_update() 
RETURNS trigger AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', COALESCE(NEW.address, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.city, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.state, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.zip_code, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(NEW.neighborhood, '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION agents_search_vector_update() 
RETURNS trigger AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', COALESCE(NEW.first_name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.last_name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.bio, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply Triggers
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agents_updated_at
  BEFORE UPDATE ON agents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
  
CREATE TRIGGER update_page_sections_updated_at
  BEFORE UPDATE ON page_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER properties_search_vector_trigger
  BEFORE INSERT OR UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION properties_search_vector_update();

CREATE TRIGGER agents_search_vector_trigger
  BEFORE INSERT OR UPDATE ON agents
  FOR EACH ROW EXECUTE FUNCTION agents_search_vector_update();

-- ============================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE component_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE tabs_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories_items ENABLE ROW LEVEL SECURITY;

-- Policies

-- Properties
CREATE POLICY "Public can view active properties" ON properties FOR SELECT USING (status = 'active');
CREATE POLICY "Admins can do everything with properties" ON properties FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));

-- Featured Properties
CREATE POLICY "Public can view featured properties" ON featured_properties FOR SELECT USING (true);
CREATE POLICY "Admins can manage featured properties" ON featured_properties FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));

-- Agents
CREATE POLICY "Public can view active agents" ON agents FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage agents" ON agents FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));

-- Newsletter
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view and manage subscribers" ON newsletter_subscribers FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));

-- Admin Users
CREATE POLICY "Users can view their own admin record" ON admin_users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Authenticated users can view admin users" ON admin_users FOR SELECT USING (auth.role() = 'authenticated'); 
CREATE POLICY "Authenticated users can manage admin users" ON admin_users FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- CMS Tables (Generalized)
CREATE POLICY "Public read access site_config" ON site_config FOR SELECT USING (true);
CREATE POLICY "Public read access site_statistics" ON site_statistics FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access navigation_items" ON navigation_items FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access media_library" ON media_library FOR SELECT USING (true);
CREATE POLICY "Public read access page_meta" ON page_meta FOR SELECT USING (true);
CREATE POLICY "Public can view active templates" ON component_templates FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active page sections" ON page_sections FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active tabs" ON tabs_items FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access stories" ON stories_items FOR SELECT USING (true);

-- Admin Write Access for CMS Tables
CREATE POLICY "Admins access site_config" ON site_config FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Admins access site_statistics" ON site_statistics FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Admins access navigation_items" ON navigation_items FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Admins access media_library" ON media_library FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Admins access form_configs" ON form_configs FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Admins access page_meta" ON page_meta FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Admins can manage templates" ON component_templates FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Admins can manage page sections" ON page_sections FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Admins can manage tabs" ON tabs_items FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));
CREATE POLICY "Admin write access stories" ON stories_items FOR ALL USING (auth.role() = 'authenticated'); 

-- ============================================
-- 6. STORAGE POLICIES
-- ============================================

-- Policies for property-images
CREATE POLICY "Public Access Property Images" ON storage.objects FOR SELECT USING (bucket_id = 'property-images');
CREATE POLICY "Admin Upload Property Images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'property-images' AND (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())));
CREATE POLICY "Admin Delete Property Images" ON storage.objects FOR DELETE USING (bucket_id = 'property-images' AND (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())));

-- Policies for agent-photos
CREATE POLICY "Public Access Agent Photos" ON storage.objects FOR SELECT USING (bucket_id = 'agent-photos');
CREATE POLICY "Admin Upload Agent Photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'agent-photos' AND (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())));
CREATE POLICY "Admin Delete Agent Photos" ON storage.objects FOR DELETE USING (bucket_id = 'agent-photos' AND (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())));

-- Documentation
COMMENT ON TABLE site_config IS 'Stores site-wide configuration settings';
COMMENT ON TABLE site_statistics IS 'Stores company statistics displayed across the site';
COMMENT ON TABLE navigation_items IS 'Navigation menu items for header and footer';
COMMENT ON TABLE media_library IS 'Centralized media asset management';
COMMENT ON TABLE form_configs IS 'Configuration for site forms';
COMMENT ON TABLE page_meta IS 'SEO and meta information for pages';
COMMENT ON TABLE tabs_items IS 'Individual tab items for tabs sections';
COMMENT ON COLUMN tabs_items.section_id IS 'Reference to parent page_sections entry';
COMMENT ON COLUMN navigation_items.has_dropdown IS 'Whether this navigation item has a dropdown menu';

