# Sirimara

Sirimara is a Next.js real estate site with a Supabase-backed admin panel for properties, agents, CMS content, newsletters, forms, media, and site configuration.

## Fresh Database

Use Supabase for the current codebase. The app is already written against Supabase Auth, Storage, RLS policies, Postgres JSONB, views, and the Supabase query client.

For a new database:

1. Create a fresh Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL Editor.
3. Create an auth user.
4. Insert that user into `public.admin_users`.
5. Copy `.env.example` to `.env.local` and fill in your project values.

Full instructions are in `SETUP.md`.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Admin panel: `http://localhost:3000/admin/login`

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```
