-- Seed data for Homepage using the new page_sections system
-- Homepage uses the special hero_home_variant template with bottom navigation

-- First Hero Section (with bottom navigation)
INSERT INTO page_sections (page, section_type, title, subtitle, content, media_url, media_type, cta_primary_text, cta_primary_link, layout_config, order_index, background_color, text_color)
VALUES (
  'home',
  'hero',
  'DISCOVER LUXURY LIVING',
  NULL,
  NULL,
  'https://res.cloudinary.com/dk92v0fkk/video/upload/v1719863494/staging/wn5vuskal80l65an2app.mp4',
  'video',
  'START YOUR SEARCH',
  '/search',
  '{
    "height": "screen",
    "overlay_opacity": 20,
    "text_alignment": "center",
    "show_scroll_indicator": false,
    "show_bottom_nav": true,
    "variant": "home"
  }'::jsonb,
  1,
  '#000000',
  '#FFFFFF'
);

-- Second Hero Section (standard)
INSERT INTO page_sections (page, section_type, title, content, cta_primary_text, cta_primary_link, media_url, media_type, layout_config, order_index, background_color, text_color)
VALUES (
  'home',
  'hero',
  'EXPERIENCE UNPARALLELED SERVICE',
  NULL,
  'EXPLORE EXCLUSIVES',
  '/exclusives',
  'https://ext.same-assets.com/2757429726/2803648720.jpeg',
  'image',
  '{
    "height": "screen",
    "overlay_opacity": 30,
    "text_alignment": "center",
    "show_scroll_indicator": false,
    "variant": "default"
  }'::jsonb,
  2,
  '#000000',
  '#FFFFFF'
);

-- Third Hero Section (standard)
INSERT INTO page_sections (page, section_type, title, content, cta_primary_text, cta_primary_link, media_url, media_type, layout_config, order_index, background_color, text_color)
VALUES (
  'home',
  'hero',
  'FIND YOUR DREAM HOME',
  NULL,
  'VIEW PROPERTIES',
  '/search',
  'https://ext.same-assets.com/2757429726/2776369223.jpeg',
  'image',
  '{
    "height": "screen",
    "overlay_opacity": 30,
    "text_alignment": "center",
    "show_scroll_indicator": false,
    "variant": "default"
  }'::jsonb,
  3,
  '#000000',
  '#FFFFFF'
);

-- Note: Property carousel and grid sections are handled by HomeClient component
-- These use dynamic data from the properties table and don't need page_sections entries
