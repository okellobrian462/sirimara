-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('agent-photos', 'agent-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for property-images
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'property-images');

CREATE POLICY "Admin Upload"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'property-images' AND
    (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
  );

CREATE POLICY "Admin Delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'property-images' AND
    (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
  );

-- Policies for agent-photos
CREATE POLICY "Public Access Agents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'agent-photos');

CREATE POLICY "Admin Upload Agents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'agent-photos' AND
    (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
  );

CREATE POLICY "Admin Delete Agents"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'agent-photos' AND
    (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
  );
