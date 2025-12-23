-- Seed Property Categories based on existing data

-- City Skylines (New York, Miami, etc properties that likely offer city views)
UPDATE properties 
SET category = 'City Skylines' 
WHERE category IS NULL 
AND (
  city ILIKE '%New York%' 
  OR city ILIKE '%Miami%' 
  OR city ILIKE '%Los Angeles%'
  OR description ILIKE '%skyline%'
  OR description ILIKE '%city view%'
);

-- Water Views (Properties with water related terms)
UPDATE properties 
SET category = 'Water Views' 
WHERE category IS NULL 
AND (
  description ILIKE '%waterfront%' 
  OR description ILIKE '%ocean%' 
  OR description ILIKE '%sea%' 
  OR description ILIKE '%bay%' 
  OR description ILIKE '%river%'
  OR description ILIKE '%lake%'
  OR description ILIKE '%beach%'
);

-- Farm & Ranch (Based on keywords or property type if available)
UPDATE properties 
SET category = 'Farm & Ranch' 
WHERE category IS NULL 
AND (
  description ILIKE '%farm%' 
  OR description ILIKE '%ranch%' 
  OR description ILIKE '%equestrian%' 
  OR description ILIKE '%acres%'
  OR property_type ILIKE '%land%'
);

-- Under $2 Million (Price based)
UPDATE properties 
SET category = 'Under $2 Million' 
WHERE category IS NULL 
AND price < 2000000;

-- Just Listed (Newest properties, fallback for remaining)
UPDATE properties 
SET category = 'Just Listed' 
WHERE category IS NULL 
AND created_at > NOW() - INTERVAL '6 months';

-- Fallback for any remaining active properties
UPDATE properties 
SET category = 'Feature Property' 
WHERE category IS NULL 
AND status = 'active';
