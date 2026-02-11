-- 1. Create Newsletters Table
CREATE TABLE IF NOT EXISTS newsletters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  cover_image_url TEXT,
  description TEXT, -- Short description for gallery
  content TEXT, -- Rich text HTML content for the article
  category TEXT DEFAULT 'INSIDER',
  published_date DATE DEFAULT CURRENT_DATE,
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON newsletters FOR SELECT USING (true);
CREATE POLICY "Admin write access" ON newsletters FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
);

-- 2. Migrate existing data from stories_items (if any)
-- We'll manually insert the seed data here to be safe and ensure clean state
INSERT INTO newsletters (title, slug, cover_image_url, category, order_index, content)
VALUES 
(
  'Sirimara Magazine', 
  'sirimara-magazine', 
  'https://res.cloudinary.com/dk92v0fkk/image/upload/v1737654654/production/qgevgchdh6kyemffd58v.jpg', 
  'MAGAZINE',
  1,
  '<p>The Spring/Summer 2025 issue of Sirimara Magazine explores the intersection of art, design, and real estate.</p><h3>Featured Stories</h3><ul><li>The Art of Living: Inside the homes of top collectors</li><li>Design Trends: What''s next in luxury interiors</li><li>Market Report: Global real estate outlook</li></ul>'
),
(
  'Equestrian Magazine', 
  'equestrian-magazine', 
  'https://res.cloudinary.com/dk92v0fkk/image/upload/v1753809337/production/pn7iqfezdagcejexbklp.jpg', 
  'MAGAZINE',
  2,
  '<p>Celebrating the equestrian lifestyle, from Wellington to the Hamptons.</p><h3>In This Issue</h3><p>Discover premier equestrian properties and meet the riders who define the sport.</p>'
),
(
  'Vicinity: Upper East Side', 
  'vicinity-magazine', 
  'https://res.cloudinary.com/dk92v0fkk/image/upload/v1743602943/production/wg7lok4hyiaxse4lf6ja.jpg', 
  'NEIGHBORHOOD',
  3,
  '<p>Your neighborhood guide to the Upper East Side.</p><h3>Neighborhood Highlights</h3><p>From museum mile to the best coffee shops, explore what makes the UES unique.</p>'
),
(
  'Vicinity: The North Fork', 
  'nfvicinity-magazine', 
  'https://res.cloudinary.com/dk92v0fkk/image/upload/v1744905781/production/lucliw2ltwgbs3rd5bqk.jpg', 
  'NEIGHBORHOOD',
  4,
  '<p>Discover the rustic charm and vineyards of the North Fork.</p><h3>Escape to the Fork</h3><p>A guide to the best wineries, farm stands, and waterfront homes.</p>'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  cover_image_url = EXCLUDED.cover_image_url,
  content = EXCLUDED.content;


-- 3. Update Navigation (Using navigation_items table correctly)
UPDATE navigation_items
SET label = 'NEWSLETTERS', url = '/newsletters'
WHERE menu_location = 'header_secondary' AND label = 'WORLD OF ELLIMAN';

UPDATE navigation_items
SET label = 'Newsletters', url = '/newsletters'
WHERE menu_location = 'footer_resources' AND label = 'World of Sirimara';


-- 4. Cleanup Old Sections
-- Delete WOE sections
DELETE FROM page_sections 
WHERE page = 'world-of-sirimara' 
AND section_type IN ('woe_story', 'woe_banner');

-- We can also delete the 'woe_modules' section if we are going to use a custom page at /newsletters
-- But maybe let's keep it as legacy or delete it to be clean.
-- Since I'm creating a dedicated /newsletters page file, I don't need the CMS page section anymore.
DELETE FROM page_sections
WHERE page = 'world-of-sirimara' AND section_type = 'woe_modules';


-- 5. Add Metadata
INSERT INTO page_meta (page_path, title, description)
VALUES ('/newsletters', 'Newsletters | Sirimara', 'Explore our latest insights, magazines, and market reports.')
ON CONFLICT (page_path) DO UPDATE SET title = EXCLUDED.title;
