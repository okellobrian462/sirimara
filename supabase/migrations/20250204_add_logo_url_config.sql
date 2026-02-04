-- Add logo_image_url to site_config
INSERT INTO site_config (key, value, category)
VALUES ('logo_image_url', '""', 'branding')
ON CONFLICT (key) DO NOTHING;
