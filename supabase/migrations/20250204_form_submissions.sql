-- Create form_submissions table
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_type TEXT NOT NULL, -- 'contact', 'valuation', etc.
  data JSONB NOT NULL,
  status TEXT DEFAULT 'new', -- 'new', 'read', 'archived'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public to insert (submit forms)
CREATE POLICY "Public can submit forms" ON form_submissions FOR INSERT WITH CHECK (true);

-- Allow admins to view/manage submissions
CREATE POLICY "Admins can view submissions" ON form_submissions FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
);

-- Create index for form type and status
CREATE INDEX IF NOT EXISTS idx_form_submissions_type ON form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON form_submissions(status);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created ON form_submissions(created_at);
