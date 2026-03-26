-- Migration: Property Taxonomy Tables for Kenyan Market
-- Creates CMS-editable categories, types, features, and contract types

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PROPERTY CATEGORIES (e.g., Commercial, Residential, etc.)
-- ============================================
CREATE TABLE IF NOT EXISTS "public"."property_categories" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "order_index" INTEGER DEFAULT 0,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE "public"."property_categories" IS 'Property categories for the Kenyan market (Commercial, Residential, etc.)';

-- ============================================
-- 2. PROPERTY TYPES (e.g., Apartments, House, Land, etc.)
-- ============================================
CREATE TABLE IF NOT EXISTS "public"."property_types" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "order_index" INTEGER DEFAULT 0,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE "public"."property_types" IS 'Property types for the Kenyan market (Apartments, House, Land, etc.)';

-- ============================================
-- 3. PROPERTY CONTRACT TYPES (For Sale, To Let)
-- ============================================
CREATE TABLE IF NOT EXISTS "public"."property_contract_types" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "order_index" INTEGER DEFAULT 0,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE "public"."property_contract_types" IS 'Contract types: For Sale, To Let';

-- ============================================
-- 4. PROPERTY FEATURES/AMENITIES
-- ============================================
CREATE TABLE IF NOT EXISTS "public"."property_features" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "category" TEXT DEFAULT 'general',
    "order_index" INTEGER DEFAULT 0,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE "public"."property_features" IS 'Property features/amenities (Swimming Pool, Gym, Parking, etc.)';

-- ============================================
-- 5. PROPERTY-FEATURE LINKS (Many-to-Many)
-- ============================================
CREATE TABLE IF NOT EXISTS "public"."property_feature_links" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "property_id" UUID NOT NULL REFERENCES "public"."properties"("id") ON DELETE CASCADE,
    "feature_id" UUID NOT NULL REFERENCES "public"."property_features"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE("property_id", "feature_id")
);

COMMENT ON TABLE "public"."property_feature_links" IS 'Links properties to their features (many-to-many)';

-- ============================================
-- 6. ADD FOREIGN KEY COLUMNS TO PROPERTIES TABLE
-- ============================================

-- Add category_id column
ALTER TABLE "public"."properties" 
ADD COLUMN IF NOT EXISTS "category_id" UUID REFERENCES "public"."property_categories"("id");

-- Add type_id column  
ALTER TABLE "public"."properties"
ADD COLUMN IF NOT EXISTS "type_id" UUID REFERENCES "public"."property_types"("id");

-- Add contract_type_id column
ALTER TABLE "public"."properties"
ADD COLUMN IF NOT EXISTS "contract_type_id" UUID REFERENCES "public"."property_contract_types"("id");

-- ============================================
-- 7. CREATE INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS "idx_property_categories_slug" ON "public"."property_categories"("slug");
CREATE INDEX IF NOT EXISTS "idx_property_categories_active" ON "public"."property_categories"("is_active");

CREATE INDEX IF NOT EXISTS "idx_property_types_slug" ON "public"."property_types"("slug");
CREATE INDEX IF NOT EXISTS "idx_property_types_active" ON "public"."property_types"("is_active");

CREATE INDEX IF NOT EXISTS "idx_property_contract_types_slug" ON "public"."property_contract_types"("slug");
CREATE INDEX IF NOT EXISTS "idx_property_contract_types_active" ON "public"."property_contract_types"("is_active");

CREATE INDEX IF NOT EXISTS "idx_property_features_slug" ON "public"."property_features"("slug");
CREATE INDEX IF NOT EXISTS "idx_property_features_active" ON "public"."property_features"("is_active");
CREATE INDEX IF NOT EXISTS "idx_property_features_category" ON "public"."property_features"("category");

CREATE INDEX IF NOT EXISTS "idx_property_feature_links_property" ON "public"."property_feature_links"("property_id");
CREATE INDEX IF NOT EXISTS "idx_property_feature_links_feature" ON "public"."property_feature_links"("feature_id");

CREATE INDEX IF NOT EXISTS "idx_properties_category_id" ON "public"."properties"("category_id");
CREATE INDEX IF NOT EXISTS "idx_properties_type_id" ON "public"."properties"("type_id");
CREATE INDEX IF NOT EXISTS "idx_properties_contract_type_id" ON "public"."properties"("contract_type_id");

-- ============================================
-- 8. SEED INITIAL DATA FROM KENYAN FORM
-- ============================================

-- Property Categories (from form: Commercial, Godown, Plot, Residential)
INSERT INTO "public"."property_categories" ("name", "slug", "description", "order_index") VALUES
    ('Commercial', 'commercial', 'Commercial properties for business use', 1),
    ('Residential', 'residential', 'Residential properties for living', 2),
    ('Godown', 'godown', 'Storage/warehouse facilities', 3),
    ('Plot', 'plot', 'Land plots for development', 4)
ON CONFLICT ("slug") DO NOTHING;

-- Property Types (from form: Apartments, House, Land, Office Space, Retail Shops, Town House, Warehouse, Yard)
INSERT INTO "public"."property_types" ("name", "slug", "description", "order_index") VALUES
    ('Apartments', 'apartments', 'Multi-unit residential buildings', 1),
    ('House', 'house', 'Standalone residential building', 2),
    ('Land', 'land', 'Undeveloped land', 3),
    ('Office Space', 'office-space', 'Commercial office premises', 4),
    ('Retail Shops', 'retail-shops', 'Commercial retail spaces', 5),
    ('Town House', 'town-house', 'Multi-level attached homes', 6),
    ('Warehouse', 'warehouse', 'Storage and industrial facilities', 7),
    ('Yard', 'yard', 'Open land for industrial/commercial use', 8)
ON CONFLICT ("slug") DO NOTHING;

-- Contract Types (from form: For Sale, To Let)
INSERT INTO "public"."property_contract_types" ("name", "slug", "description", "order_index") VALUES
    ('For Sale', 'for-sale', 'Property available for purchase', 1),
    ('To Let', 'to-let', 'Property available for rent/lease', 2)
ON CONFLICT ("slug") DO NOTHING;

-- Property Features (sample from form - user can add more via CMS)
-- Categories: security, utilities, recreational, interior, exterior
INSERT INTO "public"."property_features" ("name", "slug", "category", "order_index") VALUES
    -- Security features
    ('24 Hour Security', '24-hour-security', 'security', 1),
    ('Electric Fence', 'electric-fence', 'security', 2),
    ('CCTV', 'cctv', 'security', 3),
    ('Guarded Security', 'guarded-security', 'security', 4),
    ('Intercom', 'intercom', 'security', 5),
    
    -- Utilities
    ('Backup Generator', 'backup-generator', 'utilities', 10),
    ('Borehole', 'borehole', 'utilities', 11),
    ('Solar Water Heater', 'solar-water-heater', 'utilities', 12),
    ('High Speed Internet', 'high-speed-internet', 'utilities', 13),
    
    -- Recreational
    ('Swimming Pool', 'swimming-pool', 'recreational', 20),
    ('Gym', 'gym', 'recreational', 21),
    ('Garden', 'garden', 'recreational', 22),
    ('Children Play Area', 'children-play-area', 'recreational', 23),
    ('Entertainment Area', 'entertainment-area', 'recreational', 24),
    ('Sauna', 'sauna', 'recreational', 25),
    ('Steam', 'steam', 'recreational', 26),
    
    -- Interior features
    ('Built in Cupboards', 'built-in-cupboards', 'interior', 30),
    ('DSQ', 'dsq', 'interior', 31),
    ('Jaccuzi', 'jaccuzi', 'interior', 32),
    ('Laundry', 'laundry', 'interior', 33),
    ('Lift', 'lift', 'interior', 34),
    ('Parking', 'parking', 'interior', 35),
    ('All En-suite', 'all-en-suite', 'interior', 36),
    ('Walk-in Closets', 'walk-in-closets', 'interior', 37),
    
    -- Exterior features
    ('Balcony', 'balcony', 'exterior', 40),
    ('Terrace', 'terrace', 'exterior', 41),
    ('Private Patio', 'private-patio', 'exterior', 42)
ON CONFLICT ("slug") DO NOTHING;

-- ============================================
-- 9. MIGRATE EXISTING DATA (Best Effort)
-- ============================================

-- Map existing listing_type values to contract_type_id
UPDATE "public"."properties" p
SET "contract_type_id" = c.id
FROM "public"."property_contract_types" c
WHERE 
    (p."listing_type" = 'sale' AND c.slug = 'for-sale')
    OR (p."listing_type" = 'rent' AND c.slug = 'to-let');

-- Map existing property_type text to type_id (case-insensitive match)
UPDATE "public"."properties" p
SET "type_id" = t.id
FROM "public"."property_types" t
WHERE LOWER(p."property_type") = LOWER(t.slug) 
   OR LOWER(p."property_type") = LOWER(REPLACE(t.slug, '-', ''));

-- Map existing category text to category_id (case-insensitive match)
UPDATE "public"."properties" p
SET "category_id" = c.id
FROM "public"."property_categories" c
WHERE LOWER(p."category") = LOWER(c.slug)
   OR LOWER(p."category") = LOWER(REPLACE(c.slug, '-', ''));

-- ============================================
-- 10. ENABLE RLS AND CREATE POLICIES
-- ============================================

-- Enable RLS on all taxonomy tables
ALTER TABLE "public"."property_categories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."property_types" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."property_contract_types" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."property_features" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."property_feature_links" ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admin access)
-- Drop existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."property_categories";
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."property_types";
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."property_contract_types";
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."property_features";
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."property_feature_links";

CREATE POLICY "Enable read access for all users" ON "public"."property_categories"
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."property_types"
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."property_contract_types"
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."property_features"
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."property_feature_links"
    FOR SELECT USING (true);

-- ============================================
-- 11. CREATE UPDATED AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_property_categories_updated_at ON "public"."property_categories";
CREATE TRIGGER update_property_categories_updated_at 
    BEFORE UPDATE ON "public"."property_categories" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_property_types_updated_at ON "public"."property_types";
CREATE TRIGGER update_property_types_updated_at 
    BEFORE UPDATE ON "public"."property_types" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_property_contract_types_updated_at ON "public"."property_contract_types";
CREATE TRIGGER update_property_contract_types_updated_at 
    BEFORE UPDATE ON "public"."property_contract_types" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_property_features_updated_at ON "public"."property_features";
CREATE TRIGGER update_property_features_updated_at 
    BEFORE UPDATE ON "public"."property_features" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 12. CREATE VIEW FOR PROPERTIES WITH TAXONOMY
-- ============================================
CREATE OR REPLACE VIEW "public"."properties_with_taxonomy" AS
SELECT 
    p.*,
    pc.name as category_name,
    pc.slug as category_slug,
    pt.name as type_name,
    pt.slug as type_slug,
    pct.name as contract_type_name,
    pct.slug as contract_type_slug,
    COALESCE(
        (SELECT jsonb_agg(jsonb_build_object(
            'id', pf.id,
            'name', pf.name,
            'slug', pf.slug,
            'category', pf.category
        ))
        FROM "public"."property_feature_links" pfl
        JOIN "public"."property_features" pf ON pfl.feature_id = pf.id
        WHERE pfl.property_id = p.id AND pf.is_active = true
        ),
        '[]'::jsonb
    ) as features
FROM "public"."properties" p
LEFT JOIN "public"."property_categories" pc ON p.category_id = pc.id
LEFT JOIN "public"."property_types" pt ON p.type_id = pt.id
LEFT JOIN "public"."property_contract_types" pct ON p.contract_type_id = pct.id;

COMMENT ON VIEW "public"."properties_with_taxonomy" IS 'Properties enriched with taxonomy data';
