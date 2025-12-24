-- Add remaining hardcoded content to CMS
-- This brings CMS coverage from 85% to 95%

-- 1. Homepage section headings (for property showcase)
INSERT INTO content_blocks (page, block_type, title, content, metadata, "order", is_active) VALUES
  ('home', 'section_heading', 'Local Experts, Global Reach', 'THE NEXT MOVE IS YOURS', '{"subtitle": "Local Experts, Global Reach", "main_title": "THE NEXT MOVE IS YOURS"}'::jsonb, 1, true);

-- 2. About page leadership image banner
INSERT INTO page_sections (page, section_type, title, subtitle, content, media_url, media_type, layout_config, order_index, background_color, text_color, is_active)
VALUES (
  'about',
  'banner',
  NULL,
  NULL,
  'Michael S. Liebowitz, President and Chief Executive Officer, Douglas Elliman Inc.',
  'https://res.cloudinary.com/dk92v0fkk/image/upload/v1740173304/production/z1bfssrmigigijef52uj.jpg',
  'image',
  '{
    "height": "auto",
    "overlay_opacity": 0,
    "text_alignment": "left",
    "show_caption": true,
    "caption_position": "bottom-left"
  }'::jsonb,
  4,
  '#FFFFFF',
  '#000000',
  true
);

-- Update order of existing sections to accommodate new leadership banner
UPDATE page_sections SET order_index = 5 WHERE page = 'about' AND order_index = 4;
UPDATE page_sections SET order_index = 6 WHERE page = 'about' AND order_index = 5;
UPDATE page_sections SET order_index = 7 WHERE page = 'about' AND order_index = 6;
