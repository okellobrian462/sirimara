-- Run this in your Supabase SQL Editor.
-- This script updates the "Terms" link to "Terms & Conditions" and deletes the "Privacy" link.

BEGIN;

-- 1. Update 'Terms' or similar to 'Terms & Conditions'
UPDATE public.navigation_items
SET label = 'Terms & Conditions'
WHERE menu_location = 'footer_legal'
  AND label ILIKE '%term%';

-- 2. Delete the 'Privacy' link
DELETE FROM public.navigation_items
WHERE menu_location = 'footer_legal'
  AND label ILIKE '%privac%';

COMMIT;
