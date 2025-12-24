-- Enhanced search functionality for properties and agents
-- Adds listing types, full-text search vectors, and search optimization

-- 1. Add listing_type and neighborhood columns to properties table
ALTER TABLE properties 
  ADD COLUMN IF NOT EXISTS listing_type TEXT DEFAULT 'sale' 
  CHECK (listing_type IN ('sale', 'rent'));

ALTER TABLE properties 
  ADD COLUMN IF NOT EXISTS neighborhood TEXT;

-- Create index for listing type
CREATE INDEX IF NOT EXISTS idx_properties_listing_type ON properties(listing_type);

-- 2. Add search vector columns for full-text search
ALTER TABLE properties 
  ADD COLUMN IF NOT EXISTS search_vector tsvector;

ALTER TABLE agents 
  ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- 3. Create indexes for search vectors
CREATE INDEX IF NOT EXISTS idx_properties_search ON properties USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS idx_agents_search ON agents USING GIN(search_vector);

-- 4. Create function to update properties search vector
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

-- 5. Create function to update agents search vector
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

-- 6. Create triggers
DROP TRIGGER IF EXISTS properties_search_vector_trigger ON properties;
CREATE TRIGGER properties_search_vector_trigger
  BEFORE INSERT OR UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION properties_search_vector_update();

DROP TRIGGER IF EXISTS agents_search_vector_trigger ON agents;
CREATE TRIGGER agents_search_vector_trigger
  BEFORE INSERT OR UPDATE ON agents
  FOR EACH ROW EXECUTE FUNCTION agents_search_vector_update();

-- 7. Update existing rows to populate search vectors
UPDATE properties SET search_vector = 
  setweight(to_tsvector('english', COALESCE(address, '')), 'A') ||
  setweight(to_tsvector('english', COALESCE(city, '')), 'A') ||
  setweight(to_tsvector('english', COALESCE(state, '')), 'B') ||
  setweight(to_tsvector('english', COALESCE(zip_code, '')), 'C') ||
  setweight(to_tsvector('english', COALESCE(neighborhood, '')), 'B');

UPDATE agents SET search_vector = 
  setweight(to_tsvector('english', COALESCE(first_name, '')), 'A') ||
  setweight(to_tsvector('english', COALESCE(last_name, '')), 'A') ||
  setweight(to_tsvector('english', COALESCE(title, '')), 'B') ||
  setweight(to_tsvector('english', COALESCE(bio, '')), 'C');

-- 8. Seed some rental properties (update random properties to be rentals)
UPDATE properties 
SET listing_type = 'rent'
WHERE id IN (
  SELECT id FROM properties 
  WHERE status = 'active' 
  ORDER BY RANDOM() 
  LIMIT (SELECT COUNT(*) / 3 FROM properties WHERE status = 'active')
);

COMMENT ON COLUMN properties.listing_type IS 'Type of listing: sale or rent';
COMMENT ON COLUMN properties.search_vector IS 'Full-text search vector for properties';
COMMENT ON COLUMN agents.search_vector IS 'Full-text search vector for agents';
