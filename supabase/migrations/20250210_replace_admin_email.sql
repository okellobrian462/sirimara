-- Migration to replace admin@ellliman.com with admin@sirimara.com and use the new ID
-- First remove the old admin record if it exists
DELETE FROM public.admin_users WHERE email = 'admin@ellliman.com';

-- Insert or update the new admin user with the provided ID
INSERT INTO public.admin_users (id, email, full_name, role)
VALUES ('742c31bf-d94b-45d2-906a-8de86a6d8954', 'admin@sirimara.com', 'Admin User', 'super_admin')
ON CONFLICT (id) DO UPDATE SET 
    email = 'admin@sirimara.com',
    role = 'super_admin';

-- Update site_config if necessary
UPDATE public.site_config
SET value = '"admin@sirimara.com"'::jsonb
WHERE key = 'admin_email';
