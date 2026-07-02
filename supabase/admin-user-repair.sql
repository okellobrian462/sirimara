-- Repair/admin bootstrap for Supabase Auth + public.admin_users.
--
-- Preferred flow:
-- 1. Create the user in Supabase Dashboard > Authentication > Users.
-- 2. Set the email below, then run this file in Supabase SQL Editor.
--
-- Do not create password users by inserting directly into auth.users. Supabase
-- Auth also needs identity metadata, and missing rows can break password login
-- with "Database error querying schema".

DO $$
DECLARE
    admin_email text := 'admin@sirimara.com';
    admin_user_id uuid;
BEGIN
    SELECT id INTO admin_user_id
    FROM auth.users
    WHERE email = admin_email;

    IF admin_user_id IS NULL THEN
        RAISE EXCEPTION 'No Supabase Auth user found for %. Create the user in Authentication > Users first, then rerun this SQL.', admin_email;
    END IF;

    INSERT INTO public.admin_users (id, email, full_name, role)
    VALUES (admin_user_id, admin_email, 'Admin User', 'super_admin')
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        role = EXCLUDED.role;
END $$;
