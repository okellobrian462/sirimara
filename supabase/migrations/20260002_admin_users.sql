-- Migration: admin_users table
-- Stores admin user records linked to auth.users.

CREATE TABLE public.admin_users (
    id uuid NOT NULL,
    email text NOT NULL,
    full_name text,
    role text DEFAULT 'admin'::text,
    created_at timestamp with time zone DEFAULT now(),
    last_login timestamp with time zone,
    CONSTRAINT admin_users_pkey PRIMARY KEY (id),
    CONSTRAINT admin_users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own admin record"
    ON public.admin_users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Authenticated users can view admin users"
    ON public.admin_users FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage admin users"
    ON public.admin_users
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);
