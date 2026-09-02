import type { MetadataRoute } from "next";
import { COMPANY_NAME, DEFAULT_META_DESCRIPTION, LOGO_URL } from "@/lib/seo/site";

// Served at /manifest.webmanifest (referenced from the root layout metadata).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY_NAME,
    short_name: "Sirimara",
    description: DEFAULT_META_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#181728",
    theme_color: "#ff7e00",
    icons: [
      {
        src: LOGO_URL,
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}