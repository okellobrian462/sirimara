-- Migration: normalize stray whitespace on property slugs/titles
-- Depends on: properties (20260004)

-- The listing detail route looks properties up by slug, but browsers strip
-- leading/trailing spaces from URLs. A record stored with a trailing space,
-- e.g. slug = 'Premium 2 bedroom Skyline view apartment ', can therefore never
-- be reached by its canonical URL and the page returns 404.
--
-- This is idempotent: it only touches rows that actually carry surrounding
-- whitespace, and it is safe to re-run.

UPDATE public.properties
SET slug = btrim(slug)
WHERE slug IS DISTINCT FROM btrim(slug);

UPDATE public.properties
SET title = btrim(title)
WHERE title IS DISTINCT FROM btrim(title);
