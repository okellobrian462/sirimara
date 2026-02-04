-- Add Legal Content Component Template
INSERT INTO component_templates (name, component_type, description, default_config) VALUES
  ('legal_content', 'legal', 'Legal document content with rich text formatting', 
   '{"show_last_modified": true, "show_toc": false}'::jsonb)
ON CONFLICT (name) DO NOTHING;

-- Seed Terms of Service Page Sections
-- 1. Hero
INSERT INTO page_sections (page, section_type, title, subtitle, content, media_url, media_type, layout_config, order_index, background_color, text_color, template_id)
SELECT 
  'terms-of-service', 
  'hero', 
  'TERMS OF USE', 
  'DOUGLAS ELLIMAN', 
  NULL, 
  'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727311016/staging/zkbtspvuvdutxii11lzk.webp', 
  'image', 
  '{"height": "60vh", "overlay_opacity": 40, "text_alignment": "center", "variant": "default"}'::jsonb, 
  1, 
  '#181728', 
  '#FFFFFF', 
  id
FROM component_templates WHERE name = 'hero_fullscreen'
AND NOT EXISTS (SELECT 1 FROM page_sections WHERE page = 'terms-of-service' AND section_type = 'hero');

-- 2. Legal Content
INSERT INTO page_sections (page, section_type, title, subtitle, content, media_url, media_type, layout_config, order_index, background_color, text_color, template_id)
SELECT 
  'terms-of-service', 
  'legal', 
  'TERMS AND CONDITIONS OF USE', 
  NULL, 
  '<p><strong>Last Modified: 4/9/2025</strong></p>
<p><strong>IMPORTANT NOTICE:</strong> PLEASE NOTE THAT THESE TERMS AND CONDITIONS OF USE REQUIRE THAT DISPUTES BE RESOLVED IN THE CITY OF NEW YORK, THAT YOU WAIVE ANY RIGHT TO JURY TRIAL, AND THAT YOU WAIVE ANY RIGHT TO BRING CLASS ACTIONS AGAINST US. PLEASE REVIEW SECTIONS 11.7, ENTITLED "JURISDICTION; CHOICE OF LAW; WAIVER OF JURY TRIAL", AND 11.8, ENTITLED "LIMITATIONS ON ACTIONS", FOR COMPLETE DETAILS.</p>
<p>Welcome to Douglas Elliman Real Estate. Through the Douglas Elliman Real Estate website, located at www.elliman.com, and our affiliated sites, including without limitation ellimaninspirations.elliman.com (collectively, the "Site"), you can browse and search real estate listings in our designated service areas.</p>
<p>Your use of the Site is subject to these Terms and Conditions of Use, which include the Privacy Policy, located at [url], ("Terms"). You must agree to these Terms before using the Site or any of the services offered through the Site (collectively, the "Service"). These Terms constitute a binding contract between Douglas Elliman, LLC ("Douglas Elliman", "we" or "us") and you ("you"). BY USING THE SITE, YOU AGREE TO THESE TERMS. IF YOU DO NOT AGREE TO THESE TERMS, PLEASE DO NOT ACCESS OR USE THE SITE.</p>
<p>We suggest that you print out a copy of these Terms for your records.</p>
<h3>1. REGISTRATION</h3>
<p>1. Scope of Use. The purpose of this Site is to assist customers and brokers in contacting Douglas Elliman and its agents concerning the real estate rental and sales listings set forth herein and any other services offered by Douglas Elliman. You represent that you are a prospective purchaser, seller, lessee or lessor of real property in the geographic areas where Douglas Elliman is licensed and operating with a bona fide interest in the purchase, sale or lease of such real property.</p>
<p>2. Registration Required. You must complete the Site registration process to create an account with a user name and password (the "Account") in order to make full use of the Service.</p>
<p>3. Minimum Age. You must be eighteen (18) years of age or older to register for an Account.</p>
<p>4. Password and Identity. You may not share your password with anyone else. Any use of the Service through your Account will be deemed as being used by you. Douglas Elliman is entitled to rely on the contact and other information that is supplied to us through your Account. Your Account is non-transferable and non-assignable.</p>
<p>5. Consent to Contact. BY REGISTERING FOR AN ACCOUNT, YOU CONSENT TO RECEIVE PERSONALIZED EMAILS, TELEPHONE CALLS AND/OR FAXES FROM DOUGLAS ELLIMAN. You must always provide accurate, current and complete information to Douglas Elliman for the Service. You must update such information in a timely manner to maintain its accuracy and completeness.</p>
<p>6. Broker Restrictions. Any real estate broker, salesperson, agent, or similar state licensed real estate professional ("Real Estate Agent") who uses any Content for its customer must first enter into a co-brokerage agreement with Douglas Elliman. We authorize the Real Estate Board of New York ("REBNY") and/or REBNY Listing Service ("RLS") brokers (and each of their duly authorized representatives) to access the Site for the purposes of verifying compliance with the provisions of these Terms, the Co-Brokerage Agreement between Douglas Elliman...</p>
', 
  NULL, 
  'none', 
  '{"show_last_modified": true, "last_modified_date": "2025-04-09"}'::jsonb, 
  2, 
  '#FFFFFF', 
  '#000000', 
  id
FROM component_templates WHERE name = 'legal_content'
AND NOT EXISTS (SELECT 1 FROM page_sections WHERE page = 'terms-of-service' AND section_type = 'legal');


-- Seed Privacy Policy Page Sections
-- 1. Hero
INSERT INTO page_sections (page, section_type, title, subtitle, content, media_url, media_type, layout_config, order_index, background_color, text_color, template_id)
SELECT 
  'privacy-policy', 
  'hero', 
  'PRIVACY POLICY', 
  'DOUGLAS ELLIMAN', 
  NULL, 
  'https://res.cloudinary.com/dk92v0fkk/image/upload/v1727311016/staging/zkbtspvuvdutxii11lzk.webp', 
  'image', 
  '{"height": "60vh", "overlay_opacity": 40, "text_alignment": "center", "variant": "default"}'::jsonb, 
  1, 
  '#181728', 
  '#FFFFFF', 
  id
FROM component_templates WHERE name = 'hero_fullscreen'
AND NOT EXISTS (SELECT 1 FROM page_sections WHERE page = 'privacy-policy' AND section_type = 'hero');

-- 2. Legal Content
INSERT INTO page_sections (page, section_type, title, subtitle, content, media_url, media_type, layout_config, order_index, background_color, text_color, template_id)
SELECT 
  'privacy-policy', 
  'legal', 
  'PRIVACY POLICY', 
  NULL, 
  '<p><strong>Last Modified: 4/9/2025</strong></p>
<p>Douglas Elliman Real Estate ("Douglas Elliman", "we", "us" or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.elliman.com and our affiliated sites (collectively, the "Site"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>
<h3>1. COLLECTION OF YOUR INFORMATION</h3>
<p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
<h4>Personal Data</h4>
<p>Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards.</p>
<h4>Derivative Data</h4>
<p>Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</p>
<h3>2. USE OF YOUR INFORMATION</h3>
<p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
<ul>
<li>Create and manage your account.</li>
<li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
<li>Email you regarding your account or order.</li>
<li>Enable user-to-user communications.</li>
<li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
<li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
<li>Increase the efficiency and operation of the Site.</li>
<li>mdMonitor and analyze usage and trends to improve your experience with the Site.</li>
<li>Notify you of updates to the Site.</li>
<li>Offer new products, services, and/or recommendations to you.</li>
</ul>
', 
  NULL, 
  'none', 
  '{"show_last_modified": true, "last_modified_date": "2025-04-09"}'::jsonb, 
  2, 
  '#FFFFFF', 
  '#000000', 
  id
FROM component_templates WHERE name = 'legal_content'
AND NOT EXISTS (SELECT 1 FROM page_sections WHERE page = 'privacy-policy' AND section_type = 'legal');

-- Update Navigation Links
UPDATE navigation_items 
SET url = '/terms-of-service' 
WHERE menu_location = 'footer_legal' AND label = 'Terms';

UPDATE navigation_items 
SET url = '/privacy-policy' 
WHERE menu_location = 'footer_legal' AND label = 'Privacy';

-- Add Page Meta for SEO
INSERT INTO page_meta (page_path, title, description, keywords)
VALUES 
  ('/terms-of-service', 'Terms of Service | Douglas Elliman', 
   'Read our terms and conditions of use for the Douglas Elliman website.', 
   ARRAY['terms', 'legal', 'conditions', 'use']),
  ('/privacy-policy', 'Privacy Policy | Douglas Elliman', 
   'Learn how we protect your privacy at Douglas Elliman.', 
   ARRAY['privacy', 'data protection', 'legal', 'policy'])
ON CONFLICT (page_path) DO NOTHING;
