-- Seed data for Sell page using the new page_sections system

-- Hero Section
INSERT INTO page_sections (page, section_type, title, subtitle, content, media_url, media_type, layout_config, order_index, background_color, text_color)
VALUES (
  'sell',
  'hero',
  'WE LEAD IN THE MOST HIGHLY COVETED LUXURY MARKETS',
  'SELL WITH US',
  'Our agents are local experts, record breakers, and trusted advocates for you.',
  'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727313545/staging/if0tunyrf2dsgrf6eeec.webp',
  'image',
  '{
    "height": "screen",
    "overlay_opacity": 40,
    "text_alignment": "center",
    "show_scroll_indicator": true,
    "variant": "default"
  }'::jsonb,
  1,
  '#000000',
  '#FFFFFF'
);

-- Stats Section (uses existing stats from database)
INSERT INTO page_sections (page, section_type, title, content, cta_primary_text, layout_config, order_index, background_color, text_color)
VALUES (
  'sell',
  'stats',
  'THE NUMBERS SPEAK FOR THEMSELVES',
  'We deliver results that matter. Our proven track record and market expertise ensure your property gets the attention it deserves.',
  'VIEW OUR MARKET REPORTS',
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

-- Agent Advantage Banner
INSERT INTO page_sections (page, section_type, title, content, cta_primary_text, cta_primary_link, media_url, media_type, layout_config, order_index, background_color, text_color)
VALUES (
  'sell',
  'banner',
  'OUR AGENT ADVANTAGE',
  'Our agents have the knowledge, experience, and professional network to price, promote and put your property in front of the most highly qualified buyers.',
  'FIND AN AGENT',
  '/agents',
  'https://res.cloudinary.com/dk92v0fkk/image/upload/v1732501450/staging-test/vrvgksmitdbeff170j1y.jpg',
  'image',
  '{
    "height": "600px",
    "overlay_opacity": 50,
    "text_alignment": "center",
    "cta_layout": "horizontal"
  }'::jsonb,
  3,
  '#000000',
  '#FFFFFF'
);

-- Note: SellSpotlight and SellStories are interactive components with tabs/grids
-- These would need custom section types or could be added as content_blocks
-- For now, we'll keep them as standalone components and add them to the page manually

-- Contact/Valuation Section
INSERT INTO page_sections (page, section_type, title, content, cta_primary_text, cta_primary_link, layout_config, order_index, background_color, text_color)
VALUES (
  'sell',
  'contact',
  'GET YOUR HOME VALUATION',
  'Discover what your property is worth with a complimentary market analysis from our experts.',
  'REQUEST A VALUATION',
  '/valuation',
  '{
    "layout": "horizontal",
    "show_intro_text": true
  }'::jsonb,
  4,
  '#F8F8F8',
  '#181728'
);
