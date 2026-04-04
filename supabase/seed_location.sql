-- Run this script in your Supabase SQL Editor to seed the location config.
-- This will add (or update) the 'location' key in your site_config table.
-- The default coordinates here are for Douglas Elliman's New York HQ as an example.

INSERT INTO public.site_config (key, value, category)
VALUES (
    'location',
    '{"lat": -1.2696389, "lng": 36.7700556}'::jsonb,
    'general'
)
ON CONFLICT (key) DO UPDATE 
SET value = EXCLUDED.value;
