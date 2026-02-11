# Sirimara Admin Panel Setup Guide

## Prerequisites
- Node.js installed
- Supabase account and project created

## Step 1: Environment Variables

Create a `.env.local` file in the root directory with the following content:

```env
NEXT_PUBLIC_SUPABASE_URL=https://bbvrobnjlyzckyzgjuoi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJidnJvYm5qbHl6Y2t5emdqdW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4NDk5OTAsImV4cCI6MjA1MDQyNTk5MH0.sb_publishable_Orvlmg6DOcEpgy9HPUlxxQ_Aem8iXdz
```

> **Note**: You can find these values in your Supabase project dashboard under Settings > API

## Step 2: Run Database Schema

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Open the file `supabase/schema.sql` from this project
4. Copy the entire contents
5. Paste into the Supabase SQL Editor
6. Click "Run" to execute the schema

This will create:
- All necessary tables (properties, featured_properties, agents, newsletter_subscribers, admin_users)
- Indexes for performance
- Row Level Security (RLS) policies
- Seed data with sample properties

## Step 3: Create Admin User

After running the schema, you need to create an admin user:

1. In Supabase dashboard, go to Authentication > Users
2. Click "Add user" > "Create new user"
3. Enter email and password (e.g., `admin@sirimara.com` / `your-secure-password`)
4. Click "Create user"
5. Copy the user ID from the users table
6. Go back to SQL Editor and run:

```sql
INSERT INTO admin_users (id, email, full_name, role)
VALUES ('YOUR_USER_ID_HERE', 'admin@sirimara.com', 'Admin User', 'super_admin');
```

Replace `YOUR_USER_ID_HERE` with the actual user ID you copied.

## Step 4: Install Dependencies

```bash
npm install
```

## Step 5: Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Step 6: Access Admin Panel

1. Navigate to `http://localhost:3000/admin/login`
2. Sign in with the admin credentials you created
3. You'll be redirected to the admin dashboard

## Admin Panel Features

### Dashboard
- View statistics (total properties, featured properties, subscribers)
- See recent properties
- Quick action links

### Properties Management
- View all properties in a table
- Search and filter properties
- Add new properties with full details
- Edit existing properties
- Delete properties
- Toggle featured status

### Featured Properties
- Manage properties shown in the homepage carousel
- Reorder featured properties

### Newsletter Subscribers
- View all email subscribers
- Export subscriber list

## Frontend Features

The homepage now dynamically fetches:
- Featured properties for the carousel
- Property listings from the database
- All data is real-time from Supabase

## Troubleshooting

### "Unauthorized: Not an admin user" error
- Make sure you've added your user to the `admin_users` table
- Check that the user ID matches exactly

### "Infinite recursion detected in policy" error
This occurs when RLS policies on `admin_users` create circular dependencies. To fix:
1. Run the SQL script in `supabase/fix-admin-rls.sql` in your Supabase SQL Editor
2. This will replace the recursive policies with non-recursive ones
3. Alternatively, for local development only, you can disable RLS: `ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;`


### Properties not showing on homepage
- Verify the schema was run successfully
- Check that properties have `status = 'active'`
- For featured properties, ensure `is_featured = true`

### Database connection errors
- Verify environment variables are set correctly
- Check that `.env.local` file exists in the root directory
- Restart the development server after adding environment variables

## Next Steps

You can now:
1. Add more properties through the admin panel
2. Customize the featured properties carousel
3. Manage newsletter subscribers
4. Extend the admin panel with additional features (agents, analytics, etc.)
