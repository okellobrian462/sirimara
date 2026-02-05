-- Create videos bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos', 'videos', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for videos bucket
CREATE POLICY "Public Access Videos" ON storage.objects FOR SELECT USING (bucket_id = 'videos');
CREATE POLICY "Admin Upload Videos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'videos' AND (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())));
CREATE POLICY "Admin Delete Videos" ON storage.objects FOR DELETE USING (bucket_id = 'videos' AND (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())));
