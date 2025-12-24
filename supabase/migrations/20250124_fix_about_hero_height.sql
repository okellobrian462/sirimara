-- Fix About page hero to fill viewport
-- Change height from 80vh to screen

UPDATE page_sections
SET layout_config = jsonb_set(
    layout_config,
    '{height}',
    '"screen"'
)
WHERE page = 'about' 
  AND section_type = 'hero'
  AND order_index = 1;
