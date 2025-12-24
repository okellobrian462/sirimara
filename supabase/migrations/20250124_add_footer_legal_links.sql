-- Add footer legal links to navigation_items table
-- This replaces the hardcoded placeholder links in Footer.tsx

INSERT INTO navigation_items (menu_location, label, url, parent_id, order_index, is_active, opens_in_new_tab) VALUES
  ('footer_legal', 'NYS Housing Discrimination Disclosure Notice & Form', 'https://www.elliman.com/pdf/nys-housing-discrimination-disclosure.pdf', NULL, 1, true, true),
  ('footer_legal', 'NYS Standard Operating Procedure', 'https://www.elliman.com/pdf/nys-standard-operating-procedure.pdf', NULL, 2, true, true),
  ('footer_legal', 'NYS Tenants'' Rights to Reasonable Accommodations for Persons with Disabilities', 'https://www.elliman.com/pdf/nys-tenants-rights.pdf', NULL, 3, true, true),
  ('footer_legal', 'California Consumer Privacy Act Notice', 'https://www.elliman.com/pdf/california-ccpa-notice.pdf', NULL, 4, true, true),
  ('footer_legal', 'Texas Consumer Protection Notice', 'https://www.elliman.com/pdf/texas-consumer-protection.pdf', NULL, 5, true, true),
  ('footer_legal', 'Texas Real Estate Commission Information About Brokerage Services', 'https://www.elliman.com/pdf/texas-trec-brokerage-services.pdf', NULL, 6, true, true),
  ('footer_legal', 'Text of New York City Human Rights Law', 'https://www.elliman.com/pdf/nyc-human-rights-law.pdf', NULL, 7, true, true),
  ('footer_legal', 'New York City Commission on Human Rights', 'https://www.nyc.gov/site/cchr/index.page', NULL, 8, true, true),
  ('footer_legal', 'NYC Source of Income Discrimination Information', 'https://www.elliman.com/pdf/nyc-source-income-discrimination.pdf', NULL, 9, true, true),
  ('footer_legal', 'NYC Source of Income Discrimination Tenant FAQs', 'https://www.elliman.com/pdf/nyc-source-income-tenant-faqs.pdf', NULL, 10, true, true);
