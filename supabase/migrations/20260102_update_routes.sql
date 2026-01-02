-- update routes from /sales/new-york-ny to /sales and /rentals/new-york-ny to /rentals

-- 1. Update simple URL columns
UPDATE navigation_items
SET url = '/sales'
WHERE url = '/sales/new-york-ny';

UPDATE navigation_items
SET url = '/rentals'
WHERE url = '/rentals/new-york-ny';

-- 2. Update JSONB configuration (dropdown_config)
-- Using text replacement to handle all occurrences within the JSON structure
-- This handles straight links "url": "/sales/new-york-ny" 
-- AND sub-links "url": "/sales/new-york-ny/foo" -> "/sales/foo"

UPDATE navigation_items
SET dropdown_config = REPLACE(dropdown_config::text, '/sales/new-york-ny', '/sales')::jsonb
WHERE dropdown_config::text LIKE '%/sales/new-york-ny%';

UPDATE navigation_items
SET dropdown_config = REPLACE(dropdown_config::text, '/rentals/new-york-ny', '/rentals')::jsonb
WHERE dropdown_config::text LIKE '%/rentals/new-york-ny%';
