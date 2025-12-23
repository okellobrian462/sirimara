-- Admin Panel Phase 1 Database Migration
-- Creates tables for: site_config, hero_sections, site_statistics, content_blocks, navigation_items, media_library, form_configs, page_meta

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. SITE CONFIGURATION
-- ============================================
CREATE TABLE IF NOT EXISTS site_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  category TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_site_config_category ON site_config(category);
CREATE INDEX IF NOT EXISTS idx_site_config_key ON site_config(key);

-- Insert default configuration
INSERT INTO site_config (key, value, category) VALUES
  ('company_name', '"Douglas Elliman"', 'branding'),
  ('tagline', '"Leaders in Luxury Real Estate"', 'branding'),
  ('phone', '"1-800-ELLIMAN"', 'contact'),
  ('email', '"info@elliman.com"', 'contact'),
  ('facebook_url', '"https://facebook.com/douglaselliman"', 'social'),
  ('instagram_url', '"https://instagram.com/douglaselliman"', 'social'),
  ('twitter_url', '"https://twitter.com/elliman"', 'social'),
  ('linkedin_url', '"https://linkedin.com/company/douglas-elliman"', 'social'),
  ('default_meta_title', '"Douglas Elliman | Luxury Real Estate"', 'seo'),
  ('default_meta_description', '"Leaders in luxury real estate with exceptional agents in key markets worldwide."', 'seo')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- 2. HERO SECTIONS
-- ============================================
CREATE TABLE IF NOT EXISTS hero_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page TEXT NOT NULL,
  section_key TEXT NOT NULL,
  headline TEXT,
  subheadline TEXT,
  cta_text TEXT,
  cta_link TEXT,
  media_type TEXT CHECK (media_type IN ('image', 'video')),
  media_url TEXT,
  overlay_opacity INTEGER DEFAULT 30,
  is_active BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(page, section_key)
);

CREATE INDEX IF NOT EXISTS idx_hero_sections_page ON hero_sections(page);
CREATE INDEX IF NOT EXISTS idx_hero_sections_active ON hero_sections(is_active);

-- Insert existing hero sections
INSERT INTO hero_sections (page, section_key, headline, subheadline, cta_text, cta_link, media_type, media_url, "order") VALUES
  ('home', 'hero_1', 'WHERE DO YOU WANT TO GO?', 'We are leaders in luxury properties.', 'Start Your Search', '#', 'video', 'https://ext.same-assets.com/2757429726/911340418.mp4', 1),
  ('home', 'hero_2', 'DREAM', NULL, 'View Our Exclusives', '/exclusives', 'video', 'https://ext.same-assets.com/2757429726/610197214.mp4', 2),
  ('home', 'hero_3', 'ELLIMAN', 'Get immersed in the places, people, and lifestyles that inspire our world.', 'Explore Now', '/world-of-elliman', 'video', 'https://ext.same-assets.com/2757429726/3846012413.mp4', 3),
  ('about', 'hero_1', 'We Are The Ultimate Destination For Luxury Real Estate', NULL, NULL, NULL, 'video', 'https://res.cloudinary.com/dk92v0fkk/video/upload/v1719863494/staging/wn5vuskal80l65an2app.mp4', 1),
  ('sell', 'hero_1', 'WE LEAD IN THE MOST HIGHLY COVETED LUXURY MARKETS', 'Selling a home is a significant decision. Our agents are here to guide you through every step of the process.', 'Get Started', '#', 'image', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1738658928/production/dn5vu5ygsufsrvju51nb.jpg', 1),
  ('agents', 'hero_1', 'FIND YOUR AGENT', 'Search our network of exceptional agents in key luxury markets.', NULL, NULL, 'image', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1738661172/production/htebpzevs038je1q7upw.jpg', 1),
  ('new-development', 'hero_1', 'NEW DEVELOPMENT', 'Discover the latest luxury developments.', 'Explore', '#', 'image', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1739293162/production/cc2ayll3ggr8ntqi0kei.jpg', 1),
  ('exclusives', 'hero_1', 'YOUR NEXT HOME IS WAITING', 'Our exceptional agents will help you find it.', NULL, NULL, 'image', NULL, 1)
ON CONFLICT (page, section_key) DO NOTHING;

-- ============================================
-- 3. SITE STATISTICS
-- ============================================
CREATE TABLE IF NOT EXISTS site_statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stat_key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  sublabel TEXT,
  category TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_site_statistics_category ON site_statistics(category);
CREATE INDEX IF NOT EXISTS idx_site_statistics_active ON site_statistics(is_active);

-- Insert existing statistics
INSERT INTO site_statistics (stat_key, value, label, sublabel, category, "order") VALUES
  ('agents_count', '6.6K', 'exceptional agents', NULL, 'company', 1),
  ('offices_count', '115', 'offices in key luxury markets', NULL, 'company', 2),
  ('new_development_volume', '$87B', 'IN NEW DEVELOPMENT', NULL, 'company', 3),
  ('sales_volume', '$36.4B', 'In Sales', NULL, 'company', 4),
  ('agents_network', '6.6K+', 'EXCEPTIONAL AGENTS', 'ACROSS THE NETWORK', 'new_development', 1),
  ('offices_luxury', '115', 'OFFICES', 'IN KEY LUXURY LOCATIONS', 'new_development', 2)
ON CONFLICT (stat_key) DO NOTHING;

-- ============================================
-- 4. CONTENT BLOCKS
-- ============================================
CREATE TABLE IF NOT EXISTS content_blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page TEXT NOT NULL,
  block_type TEXT NOT NULL,
  title TEXT,
  content TEXT,
  metadata JSONB,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_content_blocks_page ON content_blocks(page);
CREATE INDEX IF NOT EXISTS idx_content_blocks_type ON content_blocks(block_type);
CREATE INDEX IF NOT EXISTS idx_content_blocks_active ON content_blocks(is_active);

-- Insert existing content blocks
INSERT INTO content_blocks (page, block_type, title, content, metadata, "order") VALUES
  ('sell', 'stats_section', 'OUR EXPERIENCE IS YOUR ADVANTAGE', 'Decades of real estate knowledge and industry-leading insights paired with our unmatched globally connected network, empower our agents to price your home competitively and deliver the right buyer in every market.', '{"cta_text": "SELL WITH US", "cta_link": "#"}', 1),
  ('about', 'quote', NULL, 'We are number one in the luxury markets we serve because we understand the high-net-worth mindset and we are where our clients want to be.', '{"author": "Michael S. Liebowitz", "author_title": "President and Chief Executive Officer, Douglas Elliman Inc."}', 2),
  ('about', 'leadership_intro', 'We Are Guided by a Legacy of Thought Leaders', 'Their voices mentor and support the next generation of trailblazers and culture makers.', '{"cta_text": "Meet Our Leadership", "cta_link": "/leadership"}', 3),
  ('new-development', 'stats_intro', 'WE MAXIMIZE POTENTIAL FOR THOSE WHO BUILD THE WORLD', 'We bring value, creativity, and cultural currency to the world''s most inspired new developments, built upon a legacy of expertise.', NULL, 1)
ON CONFLICT DO NOTHING;

-- ============================================
-- 5. NAVIGATION ITEMS
-- ============================================
CREATE TABLE IF NOT EXISTS navigation_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_location TEXT NOT NULL,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  parent_id UUID REFERENCES navigation_items(id) ON DELETE CASCADE,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  icon TEXT
);

CREATE INDEX IF NOT EXISTS idx_navigation_items_location ON navigation_items(menu_location);
CREATE INDEX IF NOT EXISTS idx_navigation_items_parent ON navigation_items(parent_id);

-- ============================================
-- 6. MEDIA LIBRARY
-- ============================================
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

CREATE INDEX IF NOT EXISTS idx_media_library_type ON media_library(media_type);
CREATE INDEX IF NOT EXISTS idx_media_library_tags ON media_library USING GIN(tags);

-- ============================================
-- 7. FORM CONFIGURATIONS
-- ============================================
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

CREATE INDEX IF NOT EXISTS idx_form_configs_key ON form_configs(form_key);

-- ============================================
-- 8. PAGE META
-- ============================================
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

CREATE INDEX IF NOT EXISTS idx_page_meta_path ON page_meta(page_path);

-- ============================================
-- 9. MODIFY EXISTING TABLES
-- ============================================

-- Add columns to properties table
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS is_exclusive BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS badge_text TEXT,
ADD COLUMN IF NOT EXISTS badge_expires_at TIMESTAMP WITH TIME ZONE;

-- Add columns to agents table
ALTER TABLE agents
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS featured_order INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS specialties TEXT[],
ADD COLUMN IF NOT EXISTS languages TEXT[];

-- ============================================
-- 10. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all new tables
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_meta ENABLE ROW LEVEL SECURITY;

-- Create policies (allow authenticated users to read, only admins to write)
-- Note: Adjust these policies based on your auth setup

-- Public read access for most tables
CREATE POLICY "Public read access" ON site_config FOR SELECT USING (true);
CREATE POLICY "Public read access" ON hero_sections FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON site_statistics FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON content_blocks FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON navigation_items FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON media_library FOR SELECT USING (true);
CREATE POLICY "Public read access" ON page_meta FOR SELECT USING (true);

-- Admin write access (you'll need to define admin role check)
-- Example: CREATE POLICY "Admin write access" ON site_config FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

COMMENT ON TABLE site_config IS 'Stores site-wide configuration settings';
COMMENT ON TABLE hero_sections IS 'Manages hero sections across different pages';
COMMENT ON TABLE site_statistics IS 'Stores company statistics displayed across the site';
COMMENT ON TABLE content_blocks IS 'Flexible content blocks for various pages';
COMMENT ON TABLE navigation_items IS 'Navigation menu items for header and footer';
COMMENT ON TABLE media_library IS 'Centralized media asset management';
COMMENT ON TABLE form_configs IS 'Configuration for site forms';
COMMENT ON TABLE page_meta IS 'SEO and meta information for pages';
