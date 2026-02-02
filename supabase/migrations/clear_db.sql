-- SQL to clear the database (Drop all tables)
-- Run this to clean the slate before running the new migrations.

-- Drop tables with CASCADE to handle foreign key dependencies automatically
DROP TABLE IF EXISTS stories_items CASCADE;
DROP TABLE IF EXISTS tabs_items CASCADE;
DROP TABLE IF EXISTS page_sections CASCADE;
DROP TABLE IF EXISTS component_templates CASCADE;
DROP TABLE IF EXISTS page_meta CASCADE;
DROP TABLE IF EXISTS form_configs CASCADE;
DROP TABLE IF EXISTS media_library CASCADE;
DROP TABLE IF EXISTS navigation_items CASCADE;
DROP TABLE IF EXISTS content_blocks CASCADE;
DROP TABLE IF EXISTS site_statistics CASCADE;
DROP TABLE IF EXISTS hero_sections CASCADE;
DROP TABLE IF EXISTS site_config CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS newsletter_subscribers CASCADE;
DROP TABLE IF EXISTS agents CASCADE;
DROP TABLE IF EXISTS featured_properties CASCADE;
DROP TABLE IF EXISTS properties CASCADE;

-- Optional: Drop functions if you want a truly clean slate (schema.sql uses CREATE OR REPLACE so this is optional)
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;
DROP FUNCTION IF EXISTS properties_search_vector_update CASCADE;
DROP FUNCTION IF EXISTS agents_search_vector_update CASCADE;

-- Drop Storage Policies (to avoid conflicts when re-running schema.sql)
DROP POLICY IF EXISTS "Public Access Property Images" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload Property Images" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete Property Images" ON storage.objects;
DROP POLICY IF EXISTS "Public Access Agent Photos" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload Agent Photos" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete Agent Photos" ON storage.objects;

-- Optional: Clear storage buckets (if you want to re-seed them)
-- DELETE FROM storage.buckets WHERE id IN ('property-images', 'agent-photos');
