-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_slug ON properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_category ON properties(category);
CREATE INDEX IF NOT EXISTS idx_properties_is_featured ON properties(is_featured);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_featured_properties_order ON featured_properties(display_order);
CREATE INDEX IF NOT EXISTS idx_agents_email ON agents(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agents_updated_at
  BEFORE UPDATE ON agents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Properties policies
-- Public read access for active properties
CREATE POLICY "Public can view active properties"
  ON properties FOR SELECT
  USING (status = 'active');

-- Admins can do everything
CREATE POLICY "Admins can do everything with properties"
  ON properties FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Featured properties policies
CREATE POLICY "Public can view featured properties"
  ON featured_properties FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage featured properties"
  ON featured_properties FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Agents policies
CREATE POLICY "Public can view active agents"
  ON agents FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage agents"
  ON agents FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Newsletter subscribers policies
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view and manage subscribers"
  ON newsletter_subscribers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Admin users policies
CREATE POLICY "Admins can view admin users"
  ON admin_users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Super admins can manage admin users"
  ON admin_users FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.role = 'super_admin'
    )
  );

-- Insert some seed data for testing
INSERT INTO properties (title, slug, city, address, bedrooms, bathrooms, half_baths, price, description, status, category, images)
VALUES
  (
    'Setai Skyhome: 6,000+ SF Oceanfront & Skyline Views',
    '200-e-59th-st-ph32-new-york-ny-10022/10482080',
    'MIAMI BEACH',
    '101 20th Street',
    5,
    5,
    0,
    24950000,
    'Spectacular oceanfront residence with breathtaking skyline views.',
    'active',
    'city-skylines',
    '["https://ext.same-assets.com/2757429726/2776369223.jpeg"]'::jsonb
  ),
  (
    'Sophistication Meets Serenity',
    '291-palm-ave-miami-beach-fl-33139',
    'NEW YORK',
    '200 E 59th St PH32',
    5,
    4,
    1,
    7995000,
    'Elegant residence combining modern luxury with timeless design.',
    'active',
    'city-skylines',
    '["https://ext.same-assets.com/2757429726/2803648720.jpeg"]'::jsonb
  ),
  (
    'Private Vineyard & Architectural Masterpiece in Sonoma',
    '123-miami-st',
    'GLEN ELLEN',
    '1234 Vineyard Lane',
    7,
    7,
    2,
    28500000,
    'Stunning architectural masterpiece on a private vineyard estate.',
    'active',
    'farm-ranch',
    '["https://ext.same-assets.com/2757429726/778226016.jpeg"]'::jsonb
  ),
  (
    'Luxury Penthouse with City Views',
    '456-la-ave',
    'New York',
    '200 E 59th St',
    2,
    3,
    1,
    17990000,
    'Exquisite penthouse with panoramic city views.',
    'active',
    'city-skylines',
    '["https://api.cotality.com/trestle/Media/Property/PHOTO-Jpeg/1100149223/1/MzY3Ny81NzgwLzY/Ni8xMjc1My8xNzY2MzM3NDA2/JwUEZ3EjKhowuXy8szILFnG3L9rBd1zFdbpQaommrSg"]'::jsonb
  ),
  (
    'Waterfront Luxury Estate',
    'waterfront-luxury-estate',
    'Miami Beach',
    '291 Palm Ave',
    4,
    4,
    1,
    5995000,
    'Stunning waterfront property with private beach access.',
    'active',
    'water-views',
    '["https://dvvjkgh94f2v6.cloudfront.net/523fa3e6/420661812/83dcefb7.jpeg"]'::jsonb
  ),
  (
    'Modern Miami Residence',
    'modern-miami-residence',
    'Miami',
    '123 Miami St',
    3,
    4,
    0,
    2900000,
    'Contemporary design with luxury finishes throughout.',
    'active',
    'just-listed',
    '["https://ext.same-assets.com/2757429726/2050726427.jpeg"]'::jsonb
  ),
  (
    'Los Angeles Contemporary Home',
    'la-contemporary-home',
    'Los Angeles',
    '456 LA Ave',
    3,
    4,
    0,
    6500000,
    'Sleek modern home in prime Los Angeles location.',
    'active',
    'city-skylines',
    '["https://ext.same-assets.com/2757429726/2626763149.jpeg"]'::jsonb
  )
ON CONFLICT (slug) DO NOTHING;
