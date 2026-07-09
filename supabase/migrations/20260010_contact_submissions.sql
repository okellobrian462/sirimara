-- Migration: contact submissions storage and admin visibility
-- Stores contact, valuation, and agent-profile enquiry forms in the table used by /admin/contact-submissions.

CREATE TABLE IF NOT EXISTS public.form_submissions (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    form_type text NOT NULL,
    data jsonb NOT NULL,
    status text DEFAULT 'new'::text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT form_submissions_pkey PRIMARY KEY (id)
);

ALTER TABLE public.form_submissions
    ADD COLUMN IF NOT EXISTS form_type text NOT NULL DEFAULT 'contact',
    ADD COLUMN IF NOT EXISTS data jsonb NOT NULL DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS status text DEFAULT 'new'::text,
    ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now(),
    ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();

CREATE INDEX IF NOT EXISTS idx_form_submissions_type
    ON public.form_submissions USING btree (form_type);

CREATE INDEX IF NOT EXISTS idx_form_submissions_status
    ON public.form_submissions USING btree (status);

CREATE INDEX IF NOT EXISTS idx_form_submissions_created
    ON public.form_submissions USING btree (created_at);

DROP TRIGGER IF EXISTS update_form_submissions_updated_at ON public.form_submissions;
CREATE TRIGGER update_form_submissions_updated_at
    BEFORE UPDATE ON public.form_submissions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can submit forms" ON public.form_submissions;
CREATE POLICY "Public can submit forms"
    ON public.form_submissions FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Admins access form_submissions" ON public.form_submissions;
CREATE POLICY "Admins access form_submissions"
    ON public.form_submissions
    USING (EXISTS (
        SELECT 1
        FROM public.admin_users
        WHERE admin_users.id = auth.uid()
    ));
