-- Create a new table for stories items (linked to a page section)
CREATE TABLE IF NOT EXISTS stories_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id UUID REFERENCES page_sections(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'INSIDER',
  url TEXT, -- Optional link
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE stories_items ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public read access" ON stories_items FOR SELECT USING (true);
CREATE POLICY "Admin write access" ON stories_items FOR ALL USING (
  auth.role() = 'authenticated'
);

-- Seed the Sell Stories Section
DO $$
DECLARE
  section_id UUID;
BEGIN

  -- Create the Section
  INSERT INTO page_sections (page, section_type, title, order_index, layout_config)
  VALUES (
    'sell', -- Use page slug string directly
    'stories', -- New section type
    'OUR STORIES ARE YOUR SUCCESS',
    40, -- Place it after the tabs section (which was around 20-30)
    '{"columns": 3}'::jsonb
  )
  RETURNING id INTO section_id;

  -- Insert the items
  INSERT INTO stories_items (section_id, title, image_url, category, sort_order)
  VALUES
  (
    section_id,
    'Stephanie Bo Li Represents Buyer in Record-Setting Sale in Connecticut',
    'https://res.cloudinary.com/dk92v0fkk/image/upload/v1738661172/production/htebpzevs038je1q7upw.jpg',
    'INSIDER',
    10
  ),
  (
    section_id,
    'Elliman’s Patricia Vance Helps Buyer Snag Aman New York Penthouse in Record Deal',
    'https://res.cloudinary.com/dk92v0fkk/image/upload/v1738658928/production/dn5vu5ygsufsrvju51nb.jpg',
    'INSIDER',
    20
  ),
  (
    section_id,
    'Four-Property Compound on Miami’s La Gorce Island Sells for Record-Breaking $122M',
    'https://res.cloudinary.com/dk92v0fkk/image/upload/v1739293162/production/cc2ayll3ggr8ntqi0kei.jpg',
    'INSIDER',
    30
  );

END $$;
