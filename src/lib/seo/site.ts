// Central SEO constants for Sirimara Realty.
// Override the canonical domain via NEXT_PUBLIC_SITE_URL in .env / deployment env.
// Values mirror the current `site_config` rows in Supabase (branding/contact/social).

const envSiteUrl =
  typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SITE_URL : undefined;

export const SITE_URL = (envSiteUrl || "https://sirimararealty.com").replace(/\/+$/, "");

export const SITE_NAME = "Sirimara Realty";
export const COMPANY_NAME = "Sirimara Realty Ltd";

export const DEFAULT_META_TITLE = "Sirimara | Luxury Real Estate and Homes for Sale";
export const DEFAULT_META_DESCRIPTION =
  "Browse our wide range of luxury homes for sale and rent. Contact our real estate agents to find your dream home with Sirimara.";

// Company logo (served from the Supabase Storage public bucket).
export const LOGO_URL =
  "https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/lev3aq4ufda_1774532231734.png";

export const CONTACT = {
  phone: "+254 794 176 914",
  email: "info@sirimararealty.com",
  streetAddress: "No. 25, Apple Cross Road, Lavington, Nairobi, Kenya",
  addressLocality: "Nairobi",
  addressCountry: "KE",
};

export const SOCIALS = {
  facebook: "https://facebook.com/",
  instagram: "https://instagram.com/",
  twitter: "https://twitter.com/",
  linkedin: "https://linkedin.com/company/",
};