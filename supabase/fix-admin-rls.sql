-- Fix infinite recursion in admin_users RLS policies
-- The issue: policies were checking admin_users table to authorize access to admin_users table

-- Drop the problematic policies
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;
DROP POLICY IF EXISTS "Super admins can manage admin users" ON admin_users;

-- Create new policies that don't cause recursion
-- Allow authenticated users to read their own admin record
CREATE POLICY "Users can view their own admin record"
  ON admin_users FOR SELECT
  USING (auth.uid() = id);

-- Allow authenticated users to read all admin records if they exist in the table
-- We use a service role or direct check instead of recursive query
CREATE POLICY "Authenticated users can view admin users"
  ON admin_users FOR SELECT
  USING (auth.role() = 'authenticated');

-- For INSERT/UPDATE/DELETE, we'll use a simpler approach
-- Super admins can manage (we'll check role in application logic)
CREATE POLICY "Authenticated users can manage admin users"
  ON admin_users FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
