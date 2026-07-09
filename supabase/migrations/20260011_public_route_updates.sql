-- Migration: public route updates
-- Renames public URLs while preserving existing CMS page keys used for content sections.

UPDATE public.navigation_items
SET url = CASE
    WHEN url = '/sales' THEN '/buy'
    WHEN url LIKE '/sales/%' THEN regexp_replace(url, '^/sales', '/buy')
    WHEN url = '/rentals' THEN '/rent'
    WHEN url LIKE '/rentals/%' THEN regexp_replace(url, '^/rentals', '/rent')
    WHEN url = '/newsletters' THEN '/insights'
    WHEN url LIKE '/newsletters/%' THEN regexp_replace(url, '^/newsletters', '/insights')
    ELSE url
END
WHERE url = '/sales'
    OR url LIKE '/sales/%'
    OR url = '/rentals'
    OR url LIKE '/rentals/%'
    OR url = '/newsletters'
    OR url LIKE '/newsletters/%';

UPDATE public.page_sections
SET
    cta_primary_link = CASE
        WHEN cta_primary_link = '/sales' THEN '/buy'
        WHEN cta_primary_link LIKE '/sales/%' THEN regexp_replace(cta_primary_link, '^/sales', '/buy')
        WHEN cta_primary_link = '/rentals' THEN '/rent'
        WHEN cta_primary_link LIKE '/rentals/%' THEN regexp_replace(cta_primary_link, '^/rentals', '/rent')
        WHEN cta_primary_link = '/newsletters' THEN '/insights'
        WHEN cta_primary_link LIKE '/newsletters/%' THEN regexp_replace(cta_primary_link, '^/newsletters', '/insights')
        ELSE cta_primary_link
    END,
    cta_secondary_link = CASE
        WHEN cta_secondary_link = '/sales' THEN '/buy'
        WHEN cta_secondary_link LIKE '/sales/%' THEN regexp_replace(cta_secondary_link, '^/sales', '/buy')
        WHEN cta_secondary_link = '/rentals' THEN '/rent'
        WHEN cta_secondary_link LIKE '/rentals/%' THEN regexp_replace(cta_secondary_link, '^/rentals', '/rent')
        WHEN cta_secondary_link = '/newsletters' THEN '/insights'
        WHEN cta_secondary_link LIKE '/newsletters/%' THEN regexp_replace(cta_secondary_link, '^/newsletters', '/insights')
        ELSE cta_secondary_link
    END
WHERE cta_primary_link IN ('/sales', '/rentals', '/newsletters')
    OR cta_primary_link LIKE '/sales/%'
    OR cta_primary_link LIKE '/rentals/%'
    OR cta_primary_link LIKE '/newsletters/%'
    OR cta_secondary_link IN ('/sales', '/rentals', '/newsletters')
    OR cta_secondary_link LIKE '/sales/%'
    OR cta_secondary_link LIKE '/rentals/%'
    OR cta_secondary_link LIKE '/newsletters/%';

UPDATE public.stories_items
SET url = CASE
    WHEN url = '/sales' THEN '/buy'
    WHEN url LIKE '/sales/%' THEN regexp_replace(url, '^/sales', '/buy')
    WHEN url = '/rentals' THEN '/rent'
    WHEN url LIKE '/rentals/%' THEN regexp_replace(url, '^/rentals', '/rent')
    WHEN url = '/newsletters' THEN '/insights'
    WHEN url LIKE '/newsletters/%' THEN regexp_replace(url, '^/newsletters', '/insights')
    ELSE url
END
WHERE url = '/sales'
    OR url LIKE '/sales/%'
    OR url = '/rentals'
    OR url LIKE '/rentals/%'
    OR url = '/newsletters'
    OR url LIKE '/newsletters/%';

UPDATE public.page_meta
SET page_path = CASE
    WHEN page_path = '/sales' THEN '/buy'
    WHEN page_path LIKE '/sales/%' THEN regexp_replace(page_path, '^/sales', '/buy')
    WHEN page_path = '/rentals' THEN '/rent'
    WHEN page_path LIKE '/rentals/%' THEN regexp_replace(page_path, '^/rentals', '/rent')
    WHEN page_path = '/newsletters' THEN '/insights'
    WHEN page_path LIKE '/newsletters/%' THEN regexp_replace(page_path, '^/newsletters', '/insights')
    ELSE page_path
END
WHERE page_path = '/sales'
    OR page_path LIKE '/sales/%'
    OR page_path = '/rentals'
    OR page_path LIKE '/rentals/%'
    OR page_path = '/newsletters'
    OR page_path LIKE '/newsletters/%';
