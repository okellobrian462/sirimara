-- Run in Supabase SQL Editor.
-- site_config: columns are (id, key, value [JSONB], category, updated_at)

BEGIN;

INSERT INTO public.site_config (key, category, value)
VALUES
    (
        'footer_keepingup_title',
        'footer',
        '"Keep up to date with Sirimara Realty"'
    ),
    (
        'google_maps_embed_url',
        'footer',
        '"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.277444359858!2d36.8147115!3d-1.283333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d6118d3b85%3A0x6bba46c5332f9157!2sNairobi%20Central%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1714400000000!5m2!1sen!2sus"'
    )
ON CONFLICT (key) DO UPDATE
SET value = EXCLUDED.value,
    updated_at = now();

COMMIT;
