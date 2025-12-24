-- Seed data for Sell page tabs section
INSERT INTO page_sections (page, section_type, title, content, layout_config, order_index, background_color, text_color, is_active)
VALUES (
  'sell',
  'tabs',
  'OUR WORLD IS YOUR SPOTLIGHT',
  'We curate a 360-degree experience that targets the right audience for your home.',
  '{
    "layout": "side-by-side",
    "image_position": "right",
    "show_gradient": false
  }'::jsonb,
  5,
  '#181728',
  '#FFFFFF',
  true
) RETURNING id;

-- Get the section ID (you'll need to replace this with the actual ID after running the above)
-- For now, we'll use a placeholder approach

-- Insert tabs for Sell page spotlight section
-- Note: Replace 'SECTION_ID_HERE' with actual section ID from above INSERT
INSERT INTO tabs_items (section_id, title, description, image_url, order_index) VALUES
  (
    (SELECT id FROM page_sections WHERE page = 'sell' AND section_type = 'tabs' AND title = 'OUR WORLD IS YOUR SPOTLIGHT'),
    'THE POWER OF OUR PRESS',
    'By all measures, Douglas Elliman is one of the leading names in real estate news with over 15 billion mentions worldwide.',
    'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727313622/staging/fsevbcxzzll7gegyk6ml.webp',
    1
  ),
  (
    (SELECT id FROM page_sections WHERE page = 'sell' AND section_type = 'tabs' AND title = 'OUR WORLD IS YOUR SPOTLIGHT'),
    'Elliman magazine',
    'We feature bespoke stories about your property alongside cultural and lifestyle stories to build trust with potential sellers.',
    'https://res.cloudinary.com/dk92v0fkk/image/upload/v1739296414/production/nauvsrs45yyj7cu5vqli.jpg',
    2
  ),
  (
    (SELECT id FROM page_sections WHERE page = 'sell' AND section_type = 'tabs' AND title = 'OUR WORLD IS YOUR SPOTLIGHT'),
    'SOCIAL REACH',
    'Our curated social channels deliver more than 367 million impressions annually, giving your listing the visibility it deserves.',
    'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727313673/staging/gbbwcg4rcys9vbtduwiu.webp',
    3
  );

-- Seed data for Agents page tabs section
INSERT INTO page_sections (page, section_type, title, content, layout_config, order_index, background_color, text_color, is_active)
VALUES (
  'agents',
  'tabs',
  'START YOUR JOURNEY WITH EVERY ADVANTAGE',
  NULL,
  '{
    "layout": "side-by-side",
    "image_position": "right",
    "show_gradient": false
  }'::jsonb,
  2,
  '#181728',
  '#FFFFFF',
  true
);

-- Insert tabs for Agents page
INSERT INTO tabs_items (section_id, title, description, image_url, order_index) VALUES
  (
    (SELECT id FROM page_sections WHERE page = 'agents' AND section_type = 'tabs' AND title = 'START YOUR JOURNEY WITH EVERY ADVANTAGE'),
    'WE DELIVER BESPOKE SERVICE',
    'Our agents provide personalized attention that exceeds far beyond the transaction process.',
    'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727321395/staging/wzqzvjxa5hzs7vwht3ow.webp',
    1
  ),
  (
    (SELECT id FROM page_sections WHERE page = 'agents' AND section_type = 'tabs' AND title = 'START YOUR JOURNEY WITH EVERY ADVANTAGE'),
    'WE INVEST IN INDUSTRY-LEADING TECHNOLOGY',
    'Our tools and resources enable agents to provide tailored insights a step ahead of the market.',
    'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727321421/staging/atcwrxvujecqg4bj6th6.webp',
    2
  ),
  (
    (SELECT id FROM page_sections WHERE page = 'agents' AND section_type = 'tabs' AND title = 'START YOUR JOURNEY WITH EVERY ADVANTAGE'),
    'WE CONNECT YOU TO OUR UNPARALLELED NETWORK',
    'Our network empowers agents to curate a wealth of possibilities that ensure your real estate success.',
    'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727321446/staging/tszojcqli2d4dyg54vun.webp',
    3
  );
