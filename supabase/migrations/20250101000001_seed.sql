-- Seed Data
-- Consolidated from various migrations

-- ============================================
-- 0. STORAGE BUCKETS
-- ============================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('agent-photos', 'agent-photos', true)
ON CONFLICT (id) DO NOTHING;


-- ============================================
-- 1. SITE CONFIGURATION
-- ============================================

INSERT INTO site_config (key, value, category) VALUES
  ('company_name', '"Douglas Elliman"', 'branding'),
  ('tagline', '"Leaders in Luxury Real Estate"', 'branding'),
  ('phone', '"1-800-ELLIMAN"', 'contact'),
  ('email', '"info@elliman.com"', 'contact'),
  ('facebook_url', '"https://facebook.com/douglaselliman"', 'social'),
  ('instagram_url', '"https://instagram.com/douglaselliman"', 'social'),
  ('twitter_url', '"https://twitter.com/elliman"', 'social'),
  ('linkedin_url', '"https://linkedin.com/company/douglas-elliman"', 'social'),
  ('default_meta_title', '"Douglas Elliman | Luxury Real Estate"', 'seo'),
  ('default_meta_description', '"Leaders in luxury real estate with exceptional agents in key markets worldwide."', 'seo'),
  ('logo_header_svg', '""', 'branding'),
  ('newsletter_text', '"The latest in luxury property, lifestyle & culture, curated just for you."', 'content'),
  ('newsletter_placeholder', '"ENTER YOUR EMAIL"', 'content'),
  ('property_showcase_title', '"THE NEXT MOVE IS YOURS"', 'content'),
  ('property_showcase_subtitle', '"Local Experts, Global Reach"', 'content'),
  ('footer_disclaimer_1', '"The Source of the Displayed Data is Either the Property Owner or Public Record Provided by Non-Governmental Third Parties. It is Believed to be Reliable but Not Guaranteed. For Colorado Viewers, Information About Non-Commercial Properties is Provided Exclusively for Your Personal, Non-Commercial Use."', 'legal'),
  ('footer_disclaimer_2', '" EQUAL EMPLOYMENT OPPORTUNITY PROVIDER. ALL MATERIAL PRESENTED HEREIN IS INTENDED FOR INFORMATION PURPOSES ONLY. WHILE THIS INFORMATION IS BELIEVED TO BE CORRECT, IT IS REPRESENTED SUBJECT TO ERRORS, OMISSIONS, CHANGES, OR WITHDRAWAL WITHOUT NOTICE. ALL PROPERTY INFORMATION, INCLUDING, BUT NOT LIMITED TO SQUARE FOOTAGE, ROOM COUNT, NUMBER OF BEDROOMS, AND THE SCHOOL DISTRICT IN PROPERTY LISTINGS SHOULD BE VERIFIED BY YOUR OWN ATTORNEY, ARCHITECT, OR ZONING EXPERT. EQUAL HOUSING OPPORTUNITY. LISTING DATA REFRESHED ON NOV 28 2025 AT 11:12 PM."', 'legal'),
  ('footer_disclaimer_3', '"DOUGLAS ELLIMAN IS A LICENSED REAL ESTATE BROKER IN CALIFORNIA WITH LICENSE # 01947727, COLORADO WITH LICENSE # EC100053892, CONNECTICUT WITH LICENSE # REB.0314827, THE DISTRICT OF COLUMBIA WITH LICENSE # REO40000160, FLORIDA WITH LICENSE # CQ1020232, MARYLAND WITH LICENSE # 645270, MASSACHUSETTS WITH LICENSE # 422764, NEVADA WITH LICENSE # 1454643, NEW JERSEY WITH LICENSE # 0572105, NEW YORK WITH LICENSE # 10991211812, TEXAS WITH LICENSE # 9008706, AND VIRGINIA WITH LICENSE # 0226035659."', 'legal'),
  ('footer_powered_by', '"POWERED BY PURLIN.AI"', 'legal'),
  ('contact_address', '"575 MADISON AVENUE, NEW YORK, NY 10022"', 'contact'),
  ('footer_section_titles', '{"company_title": "Company", "resources_title": "Resources", "portfolio_title": "Brand Portfolio", "markets_title": "Our Markets"}', 'content'),
  ('theme_colors', '{"primary": "#181728", "primary_hover": "#252438", "accent": "#8B5CF6"}', 'theme')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- 1a. ADMIN USERS
-- ============================================

INSERT INTO admin_users (id, email, full_name, role)
VALUES ('47838213-c39c-4135-9d1a-a924307c77d6', 'admin@ellliman.com', 'Admin User', 'super_admin')
ON CONFLICT (id) DO UPDATE SET
  role = 'super_admin';


-- ============================================
-- 2. PROPERTIES
-- ============================================

INSERT INTO properties (title, slug, city, address, bedrooms, bathrooms, half_baths, price, description, status, category, images, listing_type, neighborhood)
VALUES
  (
    'Setai Skyhome: 6,000+ SF Oceanfront & Skyline Views',
    '200-e-59th-st-ph32-new-york-ny-10022/10482080',
    'MIAMI BEACH',
    '101 20th Street',
    5,
    5,
    0,
    24950000,
    'Spectacular oceanfront residence with breathtaking skyline views.',
    'active',
    'City Skylines',
    '["https://ext.same-assets.com/2757429726/2776369223.jpeg"]'::jsonb,
    'sale',
    'South Beach'
  ),
  (
    'Sophistication Meets Serenity',
    '291-palm-ave-miami-beach-fl-33139',
    'NEW YORK',
    '200 E 59th St PH32',
    5,
    4,
    1,
    7995000,
    'Elegant residence combining modern luxury with timeless design.',
    'active',
    'City Skylines',
    '["https://ext.same-assets.com/2757429726/2803648720.jpeg"]'::jsonb,
    'sale',
    'Midtown'
  ),
  (
    'Private Vineyard & Architectural Masterpiece in Sonoma',
    '123-miami-st',
    'GLEN ELLEN',
    '1234 Vineyard Lane',
    7,
    7,
    2,
    28500000,
    'Stunning architectural masterpiece on a private vineyard estate.',
    'active',
    'Farm & Ranch',
    '["https://ext.same-assets.com/2757429726/778226016.jpeg"]'::jsonb,
    'sale',
    'Sonoma Valley'
  ),
  (
    'Luxury Penthouse with City Views',
    '456-la-ave',
    'New York',
    '200 E 59th St',
    2,
    3,
    1,
    17990000,
    'Exquisite penthouse with panoramic city views.',
    'active',
    'City Skylines',
    '["https://api.cotality.com/trestle/Media/Property/PHOTO-Jpeg/1100149223/1/MzY3Ny81NzgwLzY/Ni8xMjc1My8xNzY2MzM3NDA2/JwUEZ3EjKhowuXy8szILFnG3L9rBd1zFdbpQaommrSg"]'::jsonb,
    'sale',
    'Uppper East Side'
  ),
  (
    'Waterfront Luxury Estate',
    'waterfront-luxury-estate',
    'Miami Beach',
    '291 Palm Ave',
    4,
    4,
    1,
    5995000,
    'Stunning waterfront property with private beach access.',
    'active',
    'Water Views',
    '["https://dvvjkgh94f2v6.cloudfront.net/523fa3e6/420661812/83dcefb7.jpeg"]'::jsonb,
    'rent',
    'Palm Island'
  ),
  (
    'Modern Miami Residence',
    'modern-miami-residence',
    'Miami',
    '123 Miami St',
    3,
    4,
    0,
    2900000,
    'Contemporary design with luxury finishes throughout.',
    'active',
    'Just Listed',
    '["https://ext.same-assets.com/2757429726/2050726427.jpeg"]'::jsonb,
    'sale',
    'Downtown'
  ),
  (
    'Los Angeles Contemporary Home',
    'la-contemporary-home',
    'Los Angeles',
    '456 LA Ave',
    3,
    4,
    0,
    6500000,
    'Sleek modern home in prime Los Angeles location.',
    'active',
    'City Skylines',
    '["https://ext.same-assets.com/2757429726/2626763149.jpeg"]'::jsonb,
    'sale',
    'Hollywood Hills'
  )
ON CONFLICT (slug) DO UPDATE SET
  category = EXCLUDED.category,
  listing_type = EXCLUDED.listing_type,
  neighborhood = EXCLUDED.neighborhood;

-- ============================================
-- 3. NAVIGATION ITEMS
-- ============================================

-- Header Main
INSERT INTO navigation_items (menu_location, label, url, order_index, is_active, has_dropdown, dropdown_type, dropdown_config) VALUES
('header_main', 'BUY', '/sales/new-york-ny', 1, true, true, 'search', '{
  "search_placeholder": "Enter location, address, ZIP...",
  "search_type": "buy",
  "quick_links": [
    {"label": "Find All Sales Properties", "url": "/sales"},
    {"label": "Find an Elliman Agent", "url": "/agents"},
    {"label": "Find Commercial Properties", "url": "/sales/home-types=commercial-office"}
  ]
}'::jsonb),
('header_main', 'RENT', '/rentals/new-york-ny', 2, true, true, 'search', '{
  "search_placeholder": "Enter location, address, ZIP...",
  "search_type": "rent",
  "quick_links": [
    {"label": "Find All Rental Properties", "url": "/rentals"},
    {"label": "Find an Elliman Agent", "url": "/agents"},
    {"label": "Find Commercial Properties", "url": "/sales/home-types=commercial-office"}
  ]
}'::jsonb),
('header_main', 'SELL', '/sell', 3, true, false, NULL, NULL),
('header_main', 'AGENTS', '/agents', 4, true, true, 'search', '{
  "search_placeholder": "Enter agent name, state or office address",
  "search_type": "agents",
  "quick_links": [
    {"label": "Connect With Our Agents", "url": "/agents"}
  ]
}'::jsonb);

-- Header Secondary
INSERT INTO navigation_items (menu_location, label, url, order_index, is_active) VALUES
('header_secondary', 'NEW DEVELOPMENT', '/new-development', 1, true),
('header_secondary', 'WORLD OF ELLIMAN', '/world-of-elliman', 2, true);

-- Footer Company
INSERT INTO navigation_items (menu_location, label, url, order_index, is_active) VALUES
('footer_company', 'About Us', '/about', 1, true),
('footer_company', 'Leadership', '/leadership', 2, true),
('footer_company', 'Offices', '#', 3, true),
('footer_company', 'Contact Us', '#contact', 4, true);

-- Footer Resources
INSERT INTO navigation_items (menu_location, label, url, order_index, is_active) VALUES
('footer_resources', 'World of Elliman', '/world-of-elliman', 1, true),
('footer_resources', 'Elliman Exclusives', '#', 2, true);

-- Footer Brand Portfolio
INSERT INTO navigation_items (menu_location, label, url, order_index, is_active) VALUES
('footer_portfolio', 'New Development', '/new-development', 1, true),
('footer_portfolio', 'Commercial', '#', 2, true),
('footer_portfolio', 'Farm & Ranch', '#', 3, true);

-- Footer Markets
INSERT INTO navigation_items (menu_location, label, url, order_index, is_active) VALUES
('footer_markets', 'California', '#', 1, true),
('footer_markets', 'Colorado', '#', 2, true),
('footer_markets', 'Connecticut', '#', 3, true),
('footer_markets', 'Florida', '#', 4, true),
('footer_markets', 'Massachusetts', '#', 5, true),
('footer_markets', 'Mid-Atlantic', '#', 6, true),
('footer_markets', 'Nevada', '#', 7, true),
('footer_markets', 'New Jersey', '#', 8, true),
('footer_markets', 'New York', '#', 9, true),
('footer_markets', 'New York City', '#', 10, true),
('footer_markets', 'Texas', '#', 11, true),
('footer_markets', 'Vermont', '#', 12, true);

-- Footer Legal
INSERT INTO navigation_items (menu_location, label, url, order_index, is_active, opens_in_new_tab) VALUES
('footer_legal', 'Terms', '#', 1, true, false),
('footer_legal', 'Privacy', '#', 2, true, false),
('footer_legal', 'NYS Housing Discrimination Disclosure Notice & Form', 'https://www.elliman.com/pdf/nys-housing-discrimination-disclosure.pdf', 3, true, true),
('footer_legal', 'NYS Standard Operating Procedure', 'https://www.elliman.com/pdf/nys-standard-operating-procedure.pdf', 4, true, true),
('footer_legal', 'NYS Tenants'' Rights to Reasonable Accommodations for Persons with Disabilities', 'https://www.elliman.com/pdf/nys-tenants-rights.pdf', 5, true, true),
('footer_legal', 'California Consumer Privacy Act Notice', 'https://www.elliman.com/pdf/california-ccpa-notice.pdf', 6, true, true),
('footer_legal', 'Texas Consumer Protection Notice', 'https://www.elliman.com/pdf/texas-consumer-protection.pdf', 7, true, true),
('footer_legal', 'Texas Real Estate Commission Information About Brokerage Services', 'https://www.elliman.com/pdf/texas-trec-brokerage-services.pdf', 8, true, true),
('footer_legal', 'Text of New York City Human Rights Law', 'https://www.elliman.com/pdf/nyc-human-rights-law.pdf', 9, true, true),
('footer_legal', 'New York City Commission on Human Rights', 'https://www.nyc.gov/site/cchr/index.page', 10, true, true),
('footer_legal', 'NYC Source of Income Discrimination Information', 'https://www.elliman.com/pdf/nyc-source-income-discrimination.pdf', 11, true, true),
('footer_legal', 'NYC Source of Income Discrimination Tenant FAQs', 'https://www.elliman.com/pdf/nyc-source-income-tenant-faqs.pdf', 12, true, true);


-- ============================================
-- 7. COMPONENT TEMPLATES
-- ============================================

INSERT INTO component_templates (name, component_type, description, default_config) VALUES
  ('hero_fullscreen', 'hero', 'Full-screen hero with video/image background and centered text', '{"height": "screen", "overlay_opacity": 30, "text_alignment": "center", "show_scroll_indicator": false, "variant": "default"}'::jsonb),
  ('hero_home_variant', 'hero', 'Homepage hero with bottom navigation overlay', '{"height": "screen", "overlay_opacity": 20, "text_alignment": "center", "show_scroll_indicator": false, "show_bottom_nav": true, "variant": "home"}'::jsonb),
  ('hero_80vh', 'hero', 'Shorter hero section (80% viewport height)', '{"height": "80vh", "overlay_opacity": 30, "text_alignment": "center", "show_scroll_indicator": true, "variant": "default"}'::jsonb),
  ('stats_3column', 'stats', 'Three-column statistics display', '{"columns": 3, "show_border": true, "show_intro_text": true}'::jsonb),
  ('quote_centered', 'quote', 'Centered quote with attribution and decorative quotation marks', '{"text_alignment": "center", "show_quotation_marks": true, "show_author_image": false}'::jsonb),
  ('banner_cta', 'banner', 'Full-width banner with CTA buttons and overlay', '{"height": "80vh", "overlay_opacity": 30, "text_alignment": "center", "cta_layout": "horizontal"}'::jsonb),
  ('contact_dual_cta', 'contact', 'Contact section with two CTA buttons (phone and email)', '{"layout": "horizontal", "show_intro_text": true}'::jsonb),
  ('tabs_spotlight', 'tabs', 'Interactive tabs section with image switching', '{"layout": "side-by-side", "image_position": "right", "show_gradient": true}'::jsonb),
  ('property_search', 'property_search_sales', 'Full property search interface with map and filters', '{"show_map": true, "initial_view": "list"}'::jsonb),
  ('development_grid', 'development_grid', 'Grid of new developments', '{"columns": 4}'::jsonb),
  ('logo_grid', 'logo_grid', 'Grid of brand logos', '{"background_color": "#F8F8F8"}'::jsonb),
  ('property_showcase', 'property_showcase', 'Property showcase with category tabs', '{"show_tabs": true, "max_properties": 4}'::jsonb),
  ('newsletter', 'newsletter', 'Newsletter signup section', '{"layout": "horizontal"}'::jsonb),
  ('woe_full_bleed', 'woe_story', 'Full bleed story with video/image background', '{"variant": "story"}'::jsonb),
  ('woe_grouped_banner', 'woe_banner', 'Two-column grouped banner section', '{}'::jsonb),
  ('woe_market_modules', 'woe_modules', 'Grid of featured publications', '{}'::jsonb),
  ('leadership_hero', 'leadership_hero', 'Leadership page hero with scroll indicator', '{}'::jsonb),
  ('leader_tile_row', 'leadership_tiles', 'Large leadership image and bio tiles', '{"reversed": false}'::jsonb),
  ('regional_accordion', 'accordion', 'Accordion section for regional content', '{}'::jsonb)
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 8. PAGE SECTIONS & ITEMS
-- ============================================

-- ABOUT PAGE
-- Hero
INSERT INTO page_sections (page, section_type, title, subtitle, content, media_url, media_type, layout_config, order_index, background_color, text_color)
VALUES ('about', 'hero', 'We Are The Ultimate Destination For Luxury Real Estate', 'About Us', NULL, 'https://res.cloudinary.com/dk92v0fkk/video/upload/v1719863494/staging/wn5vuskal80l65an2app.mp4', 'video', '{"height": "80vh", "overlay_opacity": 20, "text_alignment": "center", "show_scroll_indicator": true, "variant": "default"}'::jsonb, 1, '#181728', '#FFFFFF');

-- Stats
INSERT INTO page_sections (page, section_type, title, content, layout_config, order_index, background_color, text_color, template_id)
VALUES ('about', 'stats', NULL, 'Our legacy is built on a proven track record of exceptional service and unmatched global reach.', '{"columns": 3, "show_border": true, "show_intro_text": true, "stats_category": "company"}'::jsonb, 2, '#181728', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'stats_3column'));

-- Quote
INSERT INTO page_sections (page, section_type, content, layout_config, order_index, background_color, text_color, template_id)
VALUES ('about', 'quote', 'We are number one in the luxury markets we serve because we understand the high-net-worth mindset and we are where our clients want to be.', '{"text_alignment": "center", "show_quotation_marks": true, "author": "Michael S. Liebowitz", "author_title": "President and Chief Executive Officer, Douglas Elliman Inc."}'::jsonb, 3, '#181728', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'quote_centered'));

-- Recruitment Banner
INSERT INTO page_sections (page, section_type, title, content, media_url, media_type, cta_primary_text, cta_primary_link, layout_config, order_index, background_color, text_color, template_id)
VALUES ('about', 'banner', 'We Invest in Agents Who Challenge The Status Quo', 'And we make sure our world knows it.', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1744044938/production/vcmrnoboeb2zlhcsj4b4.jpg', 'image', 'Join Us', '/recruitment', '{"height": "80vh", "overlay_opacity": 30, "text_alignment": "center", "cta_layout": "horizontal"}'::jsonb, 4, '#181728', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'banner_cta'));

-- Leadership Banner
INSERT INTO page_sections (page, section_type, title, subtitle, content, media_url, media_type, layout_config, order_index, background_color, text_color, is_active)
VALUES ('about', 'banner', NULL, NULL, 'Michael S. Liebowitz, President and Chief Executive Officer, Douglas Elliman Inc.', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1740173304/production/z1bfssrmigigijef52uj.jpg', 'image', '{"height": "auto", "overlay_opacity": 0, "text_alignment": "left", "show_caption": true, "caption_position": "bottom-left"}'::jsonb, 5, '#FFFFFF', '#000000', true);

-- Market Makers Banner
INSERT INTO page_sections (page, section_type, title, content, media_url, media_type, cta_primary_text, cta_primary_link, layout_config, order_index, background_color, text_color, template_id)
VALUES ('about', 'banner', 'We Are Market Makers', 'We focus our expertise on the places that inspire and shape the future.', 'https://res.cloudinary.com/dk92v0fkk/video/upload/v1720562562/staging/ekzk69kr8vx6vkirtnph.mp4', 'video', 'Explore Our Featured Cities', '/featured-cities', '{"height": "80vh", "overlay_opacity": 30, "text_alignment": "center", "cta_layout": "horizontal"}'::jsonb, 6, '#181728', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'banner_cta'));

-- Contact
INSERT INTO page_sections (page, section_type, title, content, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link, layout_config, order_index, background_color, text_color, template_id)
VALUES ('about', 'contact', 'Ready to Connect?', 'Let our exceptional team guide you.', 'Call 1.800.ELLIMAN', 'tel:1-800-ELLIMAN', 'info@elliman.com', 'mailto:info@elliman.com', '{"layout": "horizontal", "show_intro_text": true}'::jsonb, 7, '#181728', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'contact_dual_cta'));


-- HOME PAGE
-- Hero 1
INSERT INTO page_sections (page, section_type, title, subtitle, content, media_url, media_type, cta_primary_text, cta_primary_link, layout_config, order_index, background_color, text_color, template_id)
VALUES ('home', 'hero', 'DISCOVER LUXURY LIVING', NULL, NULL, 'https://res.cloudinary.com/dk92v0fkk/video/upload/v1719863494/staging/wn5vuskal80l65an2app.mp4', 'video', 'START YOUR SEARCH', '/search', '{"height": "screen", "overlay_opacity": 20, "text_alignment": "center", "show_scroll_indicator": false, "show_bottom_nav": true, "variant": "home"}'::jsonb, 1, '#000000', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'hero_home_variant'));

-- Hero 2
INSERT INTO page_sections (page, section_type, title, content, cta_primary_text, cta_primary_link, media_url, media_type, layout_config, order_index, background_color, text_color, template_id)
VALUES ('home', 'hero', 'EXPERIENCE UNPARALLELED SERVICE', NULL, 'EXPLORE EXCLUSIVES', '/exclusives', 'https://ext.same-assets.com/2757429726/2803648720.jpeg', 'image', '{"height": "screen", "overlay_opacity": 30, "text_alignment": "center", "show_scroll_indicator": false, "variant": "default"}'::jsonb, 2, '#000000', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'hero_fullscreen'));

-- Hero 3
INSERT INTO page_sections (page, section_type, title, content, cta_primary_text, cta_primary_link, media_url, media_type, layout_config, order_index, background_color, text_color, template_id)
VALUES ('home', 'hero', 'FIND YOUR DREAM HOME', NULL, 'VIEW PROPERTIES', '/search', 'https://ext.same-assets.com/2757429726/2776369223.jpeg', 'image', '{"height": "screen", "overlay_opacity": 30, "text_alignment": "center", "show_scroll_indicator": false, "variant": "default"}'::jsonb, 3, '#000000', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'hero_fullscreen'));

-- Property Showcase
INSERT INTO page_sections (page, section_type, title, subtitle, cta_primary_text, cta_primary_link, layout_config, order_index, background_color, text_color, template_id)
VALUES ('home', 'property_showcase', 'THE NEXT MOVE IS YOURS', 'Local Experts, Global Reach', 'View All Listings', '/sales', '{"show_tabs": true, "max_properties": 4}'::jsonb, 4, '#181728', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'property_showcase'));

-- Newsletter
INSERT INTO page_sections (page, section_type, title, subtitle, layout_config, order_index, background_color, text_color, template_id)
VALUES ('home', 'newsletter', 'The latest in luxury property, lifestyle & culture, curated just for you.', 'ENTER YOUR EMAIL', '{"layout": "horizontal"}'::jsonb, 5, '#181728', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'newsletter'));


-- EXCLUSIVES PAGE
-- Hero
INSERT INTO page_sections (page, section_type, title, subtitle, content, media_url, media_type, layout_config, order_index, background_color, text_color, template_id)
VALUES ('exclusives', 'hero', 'Douglas Elliman Exclusives', 'EXCLUSIVES', 'View our curated collection of premier properties.', 'https://ext.same-assets.com/2757429726/2803648720.jpeg', 'image', '{"height": "60vh", "overlay_opacity": 40, "text_alignment": "center", "variant": "default"}'::jsonb, 1, '#181728', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'hero_80vh'));

-- Search
INSERT INTO page_sections (page, section_type, title, layout_config, order_index, template_id)
VALUES ('exclusives', 'property_search_sales', 'Find Your Exclusive Home', '{"show_map": true, "initial_view": "grid"}'::jsonb, 2, (SELECT id FROM component_templates WHERE name = 'property_search'));

-- WORLD OF ELLIMAN
-- Hero
INSERT INTO page_sections (id, page, section_type, title, subtitle, media_url, media_type, layout_config, order_index, background_color, text_color, template_id)
VALUES ('80000000-0000-0000-0000-000000000001', 'world-of-elliman', 'woe_story', 'elliman', 'Get immersed in the places, people, and lifestyles that inspire our world.', 'https://res.cloudinary.com/dk92v0fkk/video/upload/v1720626100/staging/lr2gqm9cktkmncz9xs5r.mp4', 'video', '{"variant": "hero", "label": "The world of "}'::jsonb, 1, '#000000', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'woe_full_bleed'));

-- Equine Life
INSERT INTO page_sections (id, page, section_type, title, subtitle, media_url, media_type, cta_primary_text, cta_primary_link, layout_config, order_index, background_color, text_color, template_id)
VALUES ('80000000-0000-0000-0000-000000000002', 'world-of-elliman', 'woe_story', 'LIVING THE EQUINE LIFE', 'At Home with Horses', 'https://res.cloudinary.com/dk92v0fkk/video/upload/v1730914999/staging-test/dgx2uoymxfoj06t9eq3n.mp4', 'video', 'WHERE TO ROAM', '/world-of-elliman/living-the-equine-life', '{"variant": "story", "label": "At Home with Horses"}'::jsonb, 2, '#000000', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'woe_full_bleed'));

-- Impact
INSERT INTO page_sections (id, page, section_type, title, order_index, template_id)
VALUES ('80000000-0000-0000-0000-000000000003', 'world-of-elliman', 'woe_banner', 'Making An Impact', 3, (SELECT id FROM component_templates WHERE name = 'woe_grouped_banner'));

INSERT INTO tabs_items (section_id, title, description, image_url, order_index)
VALUES 
  ('80000000-0000-0000-0000-000000000003', 'THE RIDE FOR LOVE', 'Making An Impact', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1730937945/staging-test/svju8ywnjrwgvzm7qcf7.webp', 1),
  ('80000000-0000-0000-0000-000000000003', 'THE DRIVING FORCE', 'An Eye for Detail', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1730941028/staging-test/zomzhqs6iw3iilkbizvd.webp', 2);

-- Freedom
INSERT INTO page_sections (id, page, section_type, title, subtitle, media_url, media_type, cta_primary_text, cta_primary_link, layout_config, order_index, background_color, text_color, template_id)
VALUES ('80000000-0000-0000-0000-000000000004', 'world-of-elliman', 'woe_story', 'FINDING FREEDOM', 'Life At Sea', 'https://res.cloudinary.com/dk92v0fkk/video/upload/v1730922184/staging-test/r5mwvpfrszic6p564rzj.mp4', 'video', 'SET YOUR COURSE', '/world-of-elliman/finding-freedom', '{"variant": "story", "label": "Life At Sea"}'::jsonb, 4, '#000000', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'woe_full_bleed'));

-- Aspen
INSERT INTO page_sections (id, page, section_type, title, subtitle, media_url, media_type, cta_primary_text, cta_primary_link, layout_config, order_index, background_color, text_color, template_id)
VALUES ('80000000-0000-0000-0000-000000000005', 'world-of-elliman', 'woe_story', 'THE CALL OF ASPEN', 'Making Moves ', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1730944030/staging-test/tmwrauyo2pma3fhnocdg.webp', 'image', 'hit the slopes', '/world-of-elliman/the-call-of-aspen', '{"variant": "story", "label": "Making Moves "}'::jsonb, 5, '#000000', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'woe_full_bleed'));

-- Market Modules
INSERT INTO page_sections (id, page, section_type, title, subtitle, order_index, template_id)
VALUES ('80000000-0000-0000-0000-000000000006', 'world-of-elliman', 'woe_modules', 'FEATURED PUBLICATIONS', 'Discover our latest curated stories.', 6, (SELECT id FROM component_templates WHERE name = 'woe_market_modules'));

INSERT INTO stories_items (section_id, title, image_url, category, url, sort_order)
VALUES
  ('80000000-0000-0000-0000-000000000006', 'ELLIMAN MAGAZINE', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1737654654/production/qgevgchdh6kyemffd58v.jpg', 'INSIDER', '/elliman-magazine', 1),
  ('80000000-0000-0000-0000-000000000006', 'EQUESTRIAN MAGAZINE', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1753809337/production/pn7iqfezdagcejexbklp.jpg', 'INSIDER', '/equestrian-magazine', 2),
  ('80000000-0000-0000-0000-000000000006', 'VICINITY UPPER EAST SIDE', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1743602943/production/wg7lok4hyiaxse4lf6ja.jpg', 'INSIDER', '/vicinity-magazine', 3),
  ('80000000-0000-0000-0000-000000000006', 'VICINITY THE NORTH FORK', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1744905781/production/lucliw2ltwgbs3rd5bqk.jpg', 'INSIDER', '/nfvicinity-magazine', 4);

-- LEADERSHIP PAGE
-- Hero
INSERT INTO page_sections (id, page, section_type, title, subtitle, content, media_url, media_type, order_index, background_color, text_color, template_id)
VALUES ('90000000-0000-0000-0000-000000000001', 'leadership', 'leadership_hero', 'Real Estate is a People Business First', 'Our Leadership', 'While innovation drives success for our agents and partners, relationships and thoughtful leadership are the most essential.', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1766097063/production/myfyhtalqjqjhtcmxiuk.jpg', 'image', 1, '#181728', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'leadership_hero'));

-- Top Leadership Tiles
INSERT INTO page_sections (id, page, section_type, title, subtitle, order_index, template_id)
VALUES ('90000000-0000-0000-0000-000000000002', 'leadership', 'leadership_tiles', 'Principals', NULL, 2, (SELECT id FROM component_templates WHERE name = 'leader_tile_row'));

INSERT INTO tabs_items (section_id, title, description, image_url, order_index, layout_config)
VALUES 
  ('90000000-0000-0000-0000-000000000002', 'Michael S. Liebowitz', 'President and Chief Executive Officer', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1740419107/production/hpzxerrwbliqrzaogane.png', 1, '{"reversed": false}'::jsonb),
  ('90000000-0000-0000-0000-000000000002', 'Susan de França', 'President & Chief Executive Officer - DE Development Marketing', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1734999307/production/ri0ouilkicfcv6k9okhf.png', 2, '{"reversed": true}'::jsonb);

-- Regional Accordions
INSERT INTO page_sections (id, page, section_type, title, order_index, template_id)
VALUES ('90000000-0000-0000-0000-000000000003', 'leadership', 'accordion', 'Regional Leadership', 3, (SELECT id FROM component_templates WHERE name = 'regional_accordion'));

INSERT INTO tabs_items (section_id, title, description, order_index)
VALUES 
  ('90000000-0000-0000-0000-000000000003', 'Executive Leadership', 'Leadership details coming soon for this region.', 1),
  ('90000000-0000-0000-0000-000000000003', 'New York City', 'Leadership details coming soon for this region.', 2),
  ('90000000-0000-0000-0000-000000000003', 'Long Island, Hamptons & North Fork', 'Leadership details coming soon for this region.', 3),
  ('90000000-0000-0000-0000-000000000003', 'Westchester & New England', 'Leadership details coming soon for this region.', 4),
  ('90000000-0000-0000-0000-000000000003', 'Mid-Atlantic', 'Leadership details coming soon for this region.', 5),
  ('90000000-0000-0000-0000-000000000003', 'New Jersey', 'Leadership details coming soon for this region.', 6),
  ('90000000-0000-0000-0000-000000000003', 'Florida', 'Leadership details coming soon for this region.', 7),
  ('90000000-0000-0000-0000-000000000003', 'California', 'Leadership details coming soon for this region.', 8),
  ('90000000-0000-0000-0000-000000000003', 'Colorado', 'Leadership details coming soon for this region.', 9),
  ('90000000-0000-0000-0000-000000000003', 'Texas', 'Leadership details coming soon for this region.', 10),
  ('90000000-0000-0000-0000-000000000003', 'Nevada', 'Leadership details coming soon for this region.', 11);

-- AGENTS PAGE REFACTOR
-- Hero (Already exist or add if missing)
INSERT INTO page_sections (page, section_type, title, subtitle, content, media_url, media_type, layout_config, order_index, background_color, text_color, template_id)
VALUES ('agents', 'hero', 'PARTNER WITH THE BEST', 'OUR AGENTS', 'Our agents are more than just transaction managers—they are your advisors, local experts, and trusted advocates.', 'https://res.cloudinary.com/dk92v0fkk/video/upload/v1727313545/staging/if0tunyrf2dsgrf6eeec.mp4', 'video', '{"height": "screen", "overlay_opacity": 40, "text_alignment": "center", "variant": "default"}'::jsonb, 1, '#000000', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'hero_fullscreen'));

-- Join Tabs
DO $$
DECLARE
  section_id UUID;
BEGIN
  INSERT INTO page_sections (page, section_type, title, subtitle, layout_config, order_index, background_color, text_color, template_id)
  VALUES ('agents', 'tabs', 'THE DOUGLAS ELLIMAN ADVANTAGE', 'JOIN OUR NETWORK', '{"layout": "side-by-side", "image_position": "right", "show_gradient": true}'::jsonb, 2, '#FFFFFF', '#181728', (SELECT id FROM component_templates WHERE name = 'tabs_spotlight'))
  RETURNING id INTO section_id;

  INSERT INTO tabs_items (section_id, title, description, image_url, order_index)
  VALUES 
    (section_id, 'Unrivaled Support', 'Industry-leading educational training and comprehensive technical support.', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1734999307/production/ri0ouilkicfcv6k9okhf.png', 1),
    (section_id, 'Global Presence', 'Access to an international network of qualified buyers and premier properties.', 'https://ext.same-assets.com/2757429726/2803648720.jpeg', 2),
    (section_id, 'Cutting-Edge Tools', 'Exclusive digital platforms and marketing resources to drive your business.', 'https://ext.same-assets.com/2757429726/2776369223.jpeg', 3);
END $$;

-- Stats
INSERT INTO page_sections (page, section_type, title, subtitle, content, layout_config, order_index, background_color, text_color, template_id)
VALUES ('agents', 'stats', 'OUR NETWORK IS YOUR ADVANTAGE', NULL, 'With thousands of exceptional agents across key luxury markets, we deliver unparalleled service and expertise.', '{"columns": 3, "show_border": true, "show_intro_text": true, "stats_category": "company"}'::jsonb, 3, '#FFFFFF', '#181728', (SELECT id FROM component_templates WHERE name = 'stats_3column'));

-- Insider (Stories)
DO $$
DECLARE
  section_id UUID;
BEGIN
  INSERT INTO page_sections (page, section_type, title, subtitle, order_index, template_id)
  VALUES ('agents', 'stories', 'ELLIMAN INSIDER', 'THE LATEST STORIES', 4, (SELECT id FROM component_templates WHERE name = 'logo_grid')) -- Reusing for grid or create stories template
  RETURNING id INTO section_id;

  INSERT INTO stories_items (section_id, title, image_url, category, url, sort_order)
  VALUES
    (section_id, 'The Future of Real Estate', 'https://ext.same-assets.com/2757429726/2803648720.jpeg', 'INSIDER', '/insider/future', 1),
    (section_id, 'How to Master the Market', 'https://ext.same-assets.com/2757429726/2776369223.jpeg', 'GUIDE', '/insider/guide', 2);
END $$;

-- Contact
INSERT INTO page_sections (page, section_type, title, content, cta_primary_text, cta_primary_link, layout_config, order_index, background_color, text_color, template_id)
VALUES ('agents', 'contact', 'READY TO TAKE THE NEXT STEP?', 'Connect with us to learn more about joining the Douglas Elliman family.', 'SPEAK WITH US', 'tel:1-800-ELLIMAN', '{"layout": "horizontal", "show_intro_text": true}'::jsonb, 5, '#181728', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'contact_dual_cta'));


-- SELL PAGE
-- Hero
INSERT INTO page_sections (page, section_type, title, subtitle, content, media_url, media_type, layout_config, order_index, background_color, text_color, template_id)
VALUES ('sell', 'hero', 'WE LEAD IN THE MOST HIGHLY COVETED LUXURY MARKETS', 'SELL WITH US', 'Our agents are local experts, record breakers, and trusted advocates for you.', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727313545/staging/if0tunyrf2dsgrf6eeec.webp', 'image', '{"height": "screen", "overlay_opacity": 40, "text_alignment": "center", "show_scroll_indicator": true, "variant": "default"}'::jsonb, 1, '#000000', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'hero_fullscreen'));

-- Stats
INSERT INTO page_sections (page, section_type, title, content, cta_primary_text, layout_config, order_index, background_color, text_color, template_id)
VALUES ('sell', 'stats', 'THE NUMBERS SPEAK FOR THEMSELVES', 'We deliver results that matter. Our proven track record and market expertise ensure your property gets the attention it deserves.', 'VIEW OUR MARKET REPORTS', '{"columns": 3, "show_border": true, "show_intro_text": true, "stats_category": "company"}'::jsonb, 2, '#181728', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'stats_3column'));

-- Banner
INSERT INTO page_sections (page, section_type, title, content, cta_primary_text, cta_primary_link, media_url, media_type, layout_config, order_index, background_color, text_color, template_id)
VALUES ('sell', 'banner', 'OUR AGENT ADVANTAGE', 'Our agents have the knowledge, experience, and professional network to price, promote and put your property in front of the most highly qualified buyers.', 'FIND AN AGENT', '/agents', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1732501450/staging-test/vrvgksmitdbeff170j1y.jpg', 'image', '{"height": "600px", "overlay_opacity": 50, "text_alignment": "center", "cta_layout": "horizontal"}'::jsonb, 3, '#000000', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'banner_cta'));

-- Contact
INSERT INTO page_sections (page, section_type, title, content, cta_primary_text, cta_primary_link, layout_config, order_index, background_color, text_color, template_id)
VALUES ('sell', 'contact', 'GET YOUR HOME VALUATION', 'Discover what your property is worth with a complimentary market analysis from our experts.', 'REQUEST A VALUATION', '/valuation', '{"layout": "horizontal", "show_intro_text": true}'::jsonb, 10, '#F8F8F8', '#181728', (SELECT id FROM component_templates WHERE name = 'contact_dual_cta'));

-- Sell Tabs
DO $$
DECLARE
  section_id UUID;
BEGIN
  INSERT INTO page_sections (page, section_type, title, content, layout_config, order_index, background_color, text_color, is_active, template_id)
  VALUES ('sell', 'tabs', 'OUR WORLD IS YOUR SPOTLIGHT', 'We curate a 360-degree experience that targets the right audience for your home.', '{"layout": "side-by-side", "image_position": "right", "show_gradient": false}'::jsonb, 5, '#181728', '#FFFFFF', true, (SELECT id FROM component_templates WHERE name = 'tabs_spotlight'))
  RETURNING id INTO section_id;

  INSERT INTO tabs_items (section_id, title, description, image_url, order_index) VALUES
    (section_id, 'THE POWER OF OUR PRESS', 'By all measures, Douglas Elliman is one of the leading names in real estate news with over 15 billion mentions worldwide.', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727313622/staging/fsevbcxzzll7gegyk6ml.webp', 1),
    (section_id, 'Elliman magazine', 'We feature bespoke stories about your property alongside cultural and lifestyle stories to build trust with potential sellers.', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1739296414/production/nauvsrs45yyj7cu5vqli.jpg', 2),
    (section_id, 'SOCIAL REACH', 'Our curated social channels deliver more than 367 million impressions annually, giving your listing the visibility it deserves.', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727313673/staging/gbbwcg4rcys9vbtduwiu.webp', 3);
END $$;

-- Sell Stories
DO $$
DECLARE
  section_id UUID;
BEGIN
  INSERT INTO page_sections (page, section_type, title, order_index, layout_config)
  VALUES ('sell', 'stories', 'OUR STORIES ARE YOUR SUCCESS', 6, '{"columns": 3}'::jsonb)
  RETURNING id INTO section_id;

  INSERT INTO stories_items (section_id, title, image_url, category, sort_order) VALUES
  (section_id, 'Stephanie Bo Li Represents Buyer in Record-Setting Sale in Connecticut', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1738661172/production/htebpzevs038je1q7upw.jpg', 'INSIDER', 10),
  (section_id, 'Elliman’s Patricia Vance Helps Buyer Snag Aman New York Penthouse in Record Deal', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1738658928/production/dn5vu5ygsufsrvju51nb.jpg', 'INSIDER', 20),
  (section_id, 'Four-Property Compound on Miami’s La Gorce Island Sells for Record-Breaking $122M', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1739293162/production/cc2ayll3ggr8ntqi0kei.jpg', 'INSIDER', 30);
END $$;

-- AGENTS PAGE
-- Hero
INSERT INTO page_sections (page, section_type, title, subtitle, media_url, media_type, layout_config, order_index, background_color, text_color, template_id)
VALUES ('agents', 'hero', 'CONNECT WITH OUR LUXURY REAL ESTATE AGENTS', 'AGENTS', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727311016/staging/zkbtspvuvdutxii11lzk.webp', 'image', '{"height": "screen", "overlay_opacity": 20, "text_alignment": "center", "show_scroll_indicator": true, "variant": "agents", "search_placeholder": "Enter agent name, state or office address"}'::jsonb, 1, '#181728', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'hero_fullscreen'));

-- Tabs
DO $$
DECLARE
  section_id UUID;
BEGIN
  INSERT INTO page_sections (page, section_type, title, content, layout_config, order_index, background_color, text_color, is_active, template_id)
  VALUES ('agents', 'tabs', 'START YOUR JOURNEY WITH EVERY ADVANTAGE', NULL, '{"layout": "side-by-side", "image_position": "right", "show_gradient": false}'::jsonb, 2, '#181728', '#FFFFFF', true, (SELECT id FROM component_templates WHERE name = 'tabs_spotlight'))
  RETURNING id INTO section_id;

  INSERT INTO tabs_items (section_id, title, description, image_url, order_index) VALUES
    (section_id, 'WE DELIVER BESPOKE SERVICE', 'Our agents provide personalized attention that exceeds far beyond the transaction process.', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727321395/staging/wzqzvjxa5hzs7vwht3ow.webp', 1),
    (section_id, 'WE INVEST IN INDUSTRY-LEADING TECHNOLOGY', 'Our tools and resources enable agents to provide tailored insights a step ahead of the market.', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727321421/staging/atcwrxvujecqg4bj6th6.webp', 2),
    (section_id, 'WE CONNECT YOU TO OUR UNPARALLELED NETWORK', 'Our network empowers agents to curate a wealth of possibilities that ensure your real estate success.', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727321446/staging/tszojcqli2d4dyg54vun.webp', 3);
END $$;

-- SALES PAGE
-- Hero
INSERT INTO page_sections (page, section_type, title, subtitle, media_url, media_type, layout_config, order_index, background_color, text_color, template_id)
VALUES ('sales', 'hero', 'FIND YOUR DREAM HOME', 'We are experts in the luxury sales market.', NULL, NULL, '{"height": "auto", "overlay_opacity": 0, "text_alignment": "center", "background_color": "#4d525c"}'::jsonb, 1, '#4d525c', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'hero_fullscreen'));

-- Search Interface
INSERT INTO page_sections (page, section_type, title, order_index, template_id)
VALUES ('sales', 'property_search_sales', 'Sales Search', 2, (SELECT id FROM component_templates WHERE name = 'property_search'));


-- RENTALS PAGE
-- Hero
INSERT INTO page_sections (page, section_type, title, subtitle, media_url, media_type, layout_config, order_index, background_color, text_color, template_id)
VALUES ('rentals', 'hero', 'FIND YOUR FAVORITE PLACE TO BE', 'We are experts in the luxury rental market.', NULL, NULL, '{"height": "auto", "overlay_opacity": 0, "text_alignment": "center", "background_color": "#4d525c"}'::jsonb, 1, '#4d525c', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'hero_fullscreen'));

-- Search Interface
INSERT INTO page_sections (page, section_type, title, order_index, template_id)
VALUES ('rentals', 'property_search_rentals', 'Rentals Search', 2, (SELECT id FROM component_templates WHERE name = 'property_search'));


-- NEW DEVELOPMENT PAGE
-- Hero
INSERT INTO page_sections (page, section_type, title, subtitle, media_url, media_type, layout_config, order_index, background_color, text_color, template_id)
VALUES ('new-development', 'hero', 'NEW DEVELOPMENT', 'Discover the world''s most inspired new developments with Douglas Elliman.', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1733498188/production/s5xv552j7o6j5q4z5z5g.jpg', 'image', '{"height": "screen", "overlay_opacity": 20, "text_alignment": "center", "show_scroll_indicator": true}'::jsonb, 1, '#181728', '#FFFFFF', (SELECT id FROM component_templates WHERE name = 'hero_fullscreen'));

-- Stats
INSERT INTO site_statistics (label, value, sublabel, category, order_index) VALUES
  ('SALES PRICE', '$5,400', 'AVERAGE / SQFT', 'market', 1),
  ('CLOSED SALES', '585', 'TOTAL VOLUME', 'market', 2),
  ('MEDIAN PRICE', '$7.4M', 'CLOSED SALES', 'market', 3),
  ('DAYS ON MKT', '142', 'AVERAGE', 'market', 4),
  ('CLOSED SALES', '$34.4B', 'TOTAL VOLUME', 'company', 1),
  ('NATIONWIDE', '43K+', 'TRANSACTIONS', 'company', 2),
  ('AGENTS', '6,900+', 'NATIONWIDE', 'company', 3),
  ('OFFICES', '100+', 'KEY MARKETS', 'company', 4),
  ('TOTAL SALES', '$1.2B', '2024 YTD', 'new_development', 1),
  ('MARKET SHARE', '24%', 'MANHATTAN', 'new_development', 2),
  ('PIPELINE', '$85B', 'ACTIVE INVENTORY', 'new_development', 3);
INSERT INTO page_sections (page, section_type, title, content, layout_config, order_index, background_color, text_color, template_id)
VALUES ('new-development', 'stats', 'UNRIVALED EXPERTISE', 'Our New Development division is the industry leader, with a portfolio of the most prestigious properties in the world.', '{"columns": 3, "stats_category": "new_development", "show_intro_text": true}'::jsonb, 2, '#FFFFFF', '#181728', (SELECT id FROM component_templates WHERE name = 'stats_simple'));

-- Developments Grid
INSERT INTO page_sections (page, section_type, title, order_index, template_id)
VALUES ('new-development', 'development_grid', 'WE TRANSFORM SKYLINES AND SHAPE CULTURE', 3, (SELECT id FROM component_templates WHERE name = 'development_grid'));

-- Services (Tabs)
INSERT INTO page_sections (page, section_type, title, content, layout_config, order_index, background_color, text_color, template_id)
VALUES ('new-development', 'tabs', 'WE ARE PARTNERS THROUGHOUT THE ENTIRE PROCESS', 'Our team of experts provides the highest level of hands-on support at every turn.', '{"layout": "side-by-side", "image_position": "left", "show_gradient": false}'::jsonb, 4, '#FFFFFF', '#181728', (SELECT id FROM component_templates WHERE name = 'tabs_spotlight'));

-- Logos (Branding)
INSERT INTO page_sections (page, section_type, title, media_url, layout_config, order_index, background_color, text_color, template_id)
VALUES ('new-development', 'logo_grid', 'we are the choice of world-renowned brands', 'http://res.cloudinary.com/daeyhsq50/image/upload/v1710268136/notmplnhap56ym7pmg3r.png', '{"background_color": "#F8F8F8"}'::jsonb, 5, '#F8F8F8', '#181728', (SELECT id FROM component_templates WHERE name = 'logo_grid'));

-- Add tabs items for New Development Services (Placed after section creation)
DO $$
DECLARE
    nd_tabs_section_id uuid;
BEGIN
    SELECT id INTO nd_tabs_section_id FROM page_sections WHERE page = 'new-development' AND section_type = 'tabs' LIMIT 1;

    INSERT INTO tabs_items (section_id, title, description, image_url, order_index)
    VALUES
    (nd_tabs_section_id, 'research + analytics', 'Guided by data-driven insights and a deep understanding of market dynamics, our analysis ensures every project is positioned for success.', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1733498376/production/wpmwbah2g1r8nrafz7jj.jpg', 1),
    (nd_tabs_section_id, 'planning + design', 'Collaborating with world-renowned architects and designers to create residences that define the modern luxury lifestyle.', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1733498315/production/t0y1m0valxjjgovcrsuj.jpg', 2),
    (nd_tabs_section_id, 'branding + marketing', 'Crafting compelling narratives and elevated visual identities that resonate with the global elite.', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1721338194/staging/emdaxu0bvayeflhkeeqx.jpg', 3),
    (nd_tabs_section_id, 'sales + operations', 'Unparalleled expertise in lead generation and conversion, supported by a global network of top-tier professionals.', 'https://res.cloudinary.com/dk92v0fkk/image/upload/v1731963295/staging-test/boqens24o7fqalofhu7e.jpg', 4);
END $$;
