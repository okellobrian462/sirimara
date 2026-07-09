-- Add videos field to properties table
ALTER TABLE "public"."properties" 
ADD COLUMN IF NOT EXISTS "videos" "jsonb" DEFAULT '[]'::"jsonb";

-- Update existing properties to have empty videos array if NULL
UPDATE "public"."properties" 
SET "videos" = '[]'::jsonb 
WHERE "videos" IS NULL;

-- Add a comment to document the videos field
COMMENT ON COLUMN "public"."properties"."videos" IS 'Array of video URLs for the property (stored as JSONB)';

-- Recreate the taxonomy view after adding videos so frontend listing pages can read p.videos.
DROP VIEW IF EXISTS public.properties_with_taxonomy;
CREATE VIEW public.properties_with_taxonomy AS
SELECT
    p.id,
    p.title,
    p.slug,
    p.city,
    p.address,
    p.state,
    p.zip_code,
    p.bedrooms,
    p.bathrooms,
    p.half_baths,
    p.price,
    p.description,
    p.property_type,
    p.status,
    p.square_feet,
    p.lot_size,
    p.year_built,
    p.is_featured,
    p.featured_order,
    p.images,
    p.videos,
    p.amenities,
    p.category,
    p.created_at,
    p.updated_at,
    p.is_exclusive,
    p.badge_text,
    p.badge_expires_at,
    p.listing_type,
    p.neighborhood,
    p.search_vector,
    p.category_id,
    p.type_id,
    p.contract_type_id,
    pc.name AS category_name,
    pc.slug AS category_slug,
    pt.name AS type_name,
    pt.slug AS type_slug,
    pct.name AS contract_type_name,
    pct.slug AS contract_type_slug,
    COALESCE((
        SELECT jsonb_agg(jsonb_build_object('id', pf.id, 'name', pf.name, 'slug', pf.slug, 'category', pf.category))
        FROM public.property_feature_links pfl
        JOIN public.property_features pf ON pfl.feature_id = pf.id
        WHERE pfl.property_id = p.id AND pf.is_active = true
    ), '[]'::jsonb) AS features
FROM public.properties p
LEFT JOIN public.property_categories pc ON p.category_id = pc.id
LEFT JOIN public.property_types pt ON p.type_id = pt.id
LEFT JOIN public.property_contract_types pct ON p.contract_type_id = pct.id;

COMMENT ON VIEW public.properties_with_taxonomy IS 'Properties enriched with taxonomy data';
