-- Seed data for About page using the new page_sections system
-- This demonstrates how the About page content can be managed via CMS

-- Hero Section
INSERT INTO page_sections (page, section_type, title, subtitle, content, media_url, media_type, layout_config, order_index, background_color, text_color)
VALUES (
  'about',
  'hero',
  'We Are The Ultimate Destination For Luxury Real Estate',
  'About Us',
  NULL,
  'https://res.cloudinary.com/dk92v0fkk/video/upload/v1719863494/staging/wn5vuskal80l65an2app.mp4',
  'video',
  '{
    "height": "80vh",
    "overlay_opacity": 20,
    "text_alignment": "center",
    "show_scroll_indicator": true,
    "variant": "default"
  }'::jsonb,
  1,
  '#181728',
  '#FFFFFF'
);

-- Stats Section
INSERT INTO page_sections (page, section_type, title, content, layout_config, order_index, background_color, text_color)
VALUES (
  'about',
  'stats',
  NULL,
  'Our legacy is built on a proven track record of exceptional service and unmatched global reach.',
  '{
    "columns": 3,
    "show_border": true,
    "show_intro_text": true,
    "stats_category": "company"
  }'::jsonb,
  2,
  '#181728',
  '#FFFFFF'
);

-- Quote Section
INSERT INTO page_sections (page, section_type, content, layout_config, order_index, background_color, text_color)
VALUES (
  'about',
  'quote',
  'We are number one in the luxury markets we serve because we understand the high-net-worth mindset and we are where our clients want to be.',
  '{
    "text_alignment": "center",
    "show_quotation_marks": true,
    "author": "Michael S. Liebowitz",
    "author_title": "President and Chief Executive Officer, Douglas Elliman Inc."
  }'::jsonb,
  3,
  '#181728',
  '#FFFFFF'
);

-- Recruitment Banner
INSERT INTO page_sections (page, section_type, title, content, media_url, media_type, cta_primary_text, cta_primary_link, layout_config, order_index, background_color, text_color)
VALUES (
  'about',
  'banner',
  'We Invest in Agents Who Challenge The Status Quo',
  'And we make sure our world knows it.',
  'https://res.cloudinary.com/dk92v0fkk/image/upload/v1744044938/production/vcmrnoboeb2zlhcsj4b4.jpg',
  'image',
  'Join Us',
  '/recruitment',
  '{
    "height": "80vh",
    "overlay_opacity": 30,
    "text_alignment": "center",
    "cta_layout": "horizontal"
  }'::jsonb,
  4,
  '#181728',
  '#FFFFFF'
);

-- Market Makers Banner
INSERT INTO page_sections (page, section_type, title, content, media_url, media_type, cta_primary_text, cta_primary_link, layout_config, order_index, background_color, text_color)
VALUES (
  'about',
  'banner',
  'We Are Market Makers',
  'We focus our expertise on the places that inspire and shape the future.',
  'https://res.cloudinary.com/dk92v0fkk/video/upload/v1720562562/staging/ekzk69kr8vx6vkirtnph.mp4',
  'video',
  'Explore Our Featured Cities',
  '/featured-cities',
  '{
    "height": "80vh",
    "overlay_opacity": 30,
    "text_alignment": "center",
    "cta_layout": "horizontal"
  }'::jsonb,
  5,
  '#181728',
  '#FFFFFF'
);

-- Contact Section
INSERT INTO page_sections (page, section_type, title, content, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link, layout_config, order_index, background_color, text_color)
VALUES (
  'about',
  'contact',
  'Ready to Connect?',
  'Let our exceptional team guide you.',
  'Call 1.800.ELLIMAN',
  'tel:1-800-ELLIMAN',
  'info@elliman.com',
  'mailto:info@elliman.com',
  '{
    "layout": "horizontal",
    "show_intro_text": true
  }'::jsonb,
  6,
  '#181728',
  '#FFFFFF'
);
