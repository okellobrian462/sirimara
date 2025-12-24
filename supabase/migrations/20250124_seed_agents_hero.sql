-- Seed data for Agents page hero section
INSERT INTO page_sections (page, section_type, title, subtitle, content, media_url, media_type, layout_config, order_index, background_color, text_color, is_active)
VALUES (
  'agents',
  'hero',
  'CONNECT WITH OUR LUXURY REAL ESTATE AGENTS',
  'AGENTS',
  NULL,
  'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727311016/staging/zkbtspvuvdutxii11lzk.webp',
  'image',
  '{
    "height": "screen",
    "overlay_opacity": 20,
    "text_alignment": "center",
    "show_scroll_indicator": true,
    "variant": "agents",
    "search_placeholder": "Enter agent name, state or office address"
  }'::jsonb,
  1,
  '#181728',
  '#FFFFFF',
  true
);
