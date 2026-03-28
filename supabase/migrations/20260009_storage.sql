-- Migration: storage buckets and access policies
-- Creates the three storage buckets used by the app and their RLS policies.
-- Run via Supabase SQL editor or supabase/migrations; the storage schema is
-- managed by Supabase, but bucket rows and policies live in storage.buckets /
-- storage.objects and can be seeded here.

-- Buckets
INSERT INTO storage.buckets (id, name, public)
VALUES
    ('property-images', 'property-images', true),
    ('agent-photos',    'agent-photos',    true),
    ('videos',          'videos',          true)
ON CONFLICT (id) DO NOTHING;

-- Public read policies
CREATE POLICY "Public Access Property Images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'property-images');

CREATE POLICY "Public Access Agent Photos"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'agent-photos');

CREATE POLICY "Public Access Videos"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'videos');

-- Admin upload policies
CREATE POLICY "Admin Upload Property Images"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'property-images'
        AND EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid())
    );

CREATE POLICY "Admin Upload Agent Photos"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'agent-photos'
        AND EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid())
    );

CREATE POLICY "Admin Upload Videos"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'videos'
        AND EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid())
    );

-- Admin delete policies
CREATE POLICY "Admin Delete Property Images"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'property-images'
        AND EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid())
    );

CREATE POLICY "Admin Delete Agent Photos"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'agent-photos'
        AND EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid())
    );

CREATE POLICY "Admin Delete Videos"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'videos'
        AND EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid())
    );
