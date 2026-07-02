# Sirimara Fresh Database Setup

This project is already coded around Supabase: the public site, admin panel, auth checks, storage uploads, and server actions all use the Supabase client. For the simplest reliable install, use a fresh Supabase project and import the consolidated schema in this repo.

## What You Need

- Node.js 20+
- A Supabase project
- The project URL and anon key from Supabase Settings > API

## 1. Create a Fresh Supabase Database

1. Create a new Supabase project.
2. Open Supabase SQL Editor.
3. Open `supabase/schema.sql` from this project.
4. Copy the whole file into the SQL Editor.
5. Run it once.

The import creates:

- Admin users table linked to Supabase Auth
- Property tables, taxonomy tables, featured listings, and `properties_with_taxonomy`
- Agents, CMS sections, hero sections, content blocks, navigation, newsletters, subscribers, media, forms, statistics, and site config
- Storage buckets for property images, agent photos, and videos
- RLS policies matching the way the current app reads and writes data
- Minimal seed data for navigation, property taxonomy, site config, and statistics

## 2. Configure Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

The Google Maps key is optional for basic site/admin access, but map features need it.

## 3. Create an Admin User

1. In Supabase, go to Authentication > Users.
2. Create a user with your admin email and password.
3. Open `supabase/admin-user-repair.sql`.
4. Set `admin_email` to the email you created.
5. Run the file in Supabase SQL Editor.

Avoid inserting password users directly into `auth.users`; Supabase Auth also
manages identity metadata, and incomplete manual rows can cause password login
to fail with `Database error querying schema`.

## 4. Install and Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Admin panel: `http://localhost:3000/admin/login`

## Hosting Notes

The easiest hosting combination is:

- Supabase for database, auth, and storage
- Vercel or any Node-capable host for the Next.js website

Set the same environment variables on your host before deploying.

## Why Not MySQL or SQLite Here?

MySQL or SQLite can work for a different version of this project, but this codebase currently depends on Supabase-specific behavior: Auth sessions, Row Level Security, storage buckets, JSONB fields, Postgres views, and the Supabase query API. Keeping Supabase gives you a fresh database without a risky rewrite.

If you later want a full SQLite/MySQL migration, plan for a separate change that replaces Supabase auth, storage, and every `.from(...)` data call with a server-side database layer.
