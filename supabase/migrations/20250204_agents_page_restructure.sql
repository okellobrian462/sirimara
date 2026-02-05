-- Migration to restructure the Agents page

-- 1. Delete unwanted sections from the 'agents' page
-- We want to keep "CONNECT WITH OUR LUXURY REAL ESTATE AGENTS" and "PARTNER WITH THE BEST"
-- Best way is to identify them by title or maybe just clear all and re-insert the ones we want if we can't reliably ID them.
-- However, user said "only keep" so let's try to match by title loosely or rely on the order if we knew it.
-- But safest might be to delete everything that IS NOT those titles.

DELETE FROM page_sections 
WHERE page = 'agents' 
  AND title NOT ILIKE '%CONNECT WITH OUR LUXURY REAL ESTATE AGENTS%' 
  AND title NOT ILIKE '%PARTNER WITH THE BEST%';

-- 2. Insert the new "Our Agents" grid section
-- We'll put it at the end (highest order index)

-- First, find the max order index to append
DO $$
DECLARE
  max_order INTEGER;
BEGIN
  SELECT COALESCE(MAX(order_index), 0) INTO max_order FROM page_sections WHERE page = 'agents';

  INSERT INTO page_sections (
    page,
    section_type,
    title,
    subtitle,
    order_index,
    is_active,
    background_color,
    text_color
  ) VALUES (
    'agents',
    'agents_grid',
    'Our Agents',
    'Meet our team of luxury real estate experts',
    max_order + 1,
    true,
    '#FFFFFF',
    '#181728'
  );
END $$;
