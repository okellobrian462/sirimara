import type { MetadataRoute } from "next";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { SITE_URL } from "@/lib/seo/site";
import { slugifyAgentName } from "@/lib/agentSlug";

// Refresh at most once per day.
export const revalidate = 86400;

type SitemapItem = MetadataRoute.Sitemap[number];

type StaticRoute = {
  path: string;
  changeFrequency?: SitemapItem["changeFrequency"];
  priority: number;
};

// `/world-of-elliman` and the `/buy/new-york-ny`, `/rent/new-york-ny` demo pages
// are intentionally excluded (template/demo content featuring another brand).
const STATIC_ROUTES: StaticRoute[] = [
  { path: "", changeFrequency: "daily", priority: 1 },
  { path: "/buy", changeFrequency: "daily", priority: 0.9 },
  { path: "/rent", changeFrequency: "daily", priority: 0.9 },
  { path: "/sell", changeFrequency: "weekly", priority: 0.8 },
  { path: "/exclusives", changeFrequency: "weekly", priority: 0.7 },
  { path: "/new-development", changeFrequency: "weekly", priority: 0.7 },
  { path: "/insights", changeFrequency: "weekly", priority: 0.7 },
  { path: "/agents", changeFrequency: "weekly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.5 },
  { path: "/property-management", changeFrequency: "monthly", priority: 0.5 },
  { path: "/valuation", changeFrequency: "monthly", priority: 0.5 },
  { path: "/leadership", changeFrequency: "monthly", priority: 0.4 },
  { path: "/world-of-sirimara", changeFrequency: "monthly", priority: 0.4 },
  { path: "/search", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SECRET_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If the DB isn't configured, still serve the static portion of the sitemap.
  if (!supabaseUrl || !supabaseKey) {
    return entries;
  }

  const supabase = createSupabaseClient(supabaseUrl, supabaseKey);

  try {
    const [{ data: properties }, { data: newsletters }, { data: agents }] =
      await Promise.all([
        supabase.from("properties").select("slug, updated_at, status"),
        supabase.from("newsletters").select("slug, updated_at"),
        supabase.from("agents").select("first_name, last_name, updated_at, is_active"),
      ]);

    properties?.forEach((p) => {
      if (p.status !== "active") return;
      entries.push({
        url: `${SITE_URL}/listing/${encodeURIComponent(String(p.slug || "").trim())}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });

    newsletters?.forEach((n) => {
      entries.push({
        url: `${SITE_URL}/insights/${n.slug}`,
        lastModified: n.updated_at ? new Date(n.updated_at) : now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });

    agents?.forEach((a) => {
      if (!a.is_active) return;
      entries.push({
        url: `${SITE_URL}/agents/${slugifyAgentName(a.first_name, a.last_name)}`,
        lastModified: a.updated_at ? new Date(a.updated_at) : now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });
  } catch (error) {
    console.error("sitemap: error fetching dynamic routes:", error);
  }

  return entries;
}