import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import SiteJsonLd from "@/components/seo/SiteJsonLd";
import { LOGO_URL, SITE_URL } from "@/lib/seo/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await fetchSiteConfig();
  const siteName = config.company_name || "Sirimara";
  const title = `${siteName} | Luxury Real Estate and Homes for Sale`;
  const description = `Browse our wide range of luxury homes for sale and rent. Contact our real estate agents to find your dream home with ${siteName}.`;
  const logoUrl = config.logo_image_url || LOGO_URL;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    applicationName: config.company_name || "Sirimara",
    keywords: [
      "luxury real estate",
      "homes for sale",
      "homes for rent",
      "property",
      "real estate agents",
      "Kenya real estate",
      "Nairobi real estate",
      siteName,
    ],
    alternates: {
      canonical: "/",
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      type: "website",
      url: SITE_URL,
      siteName,
      title,
      description,
      locale: "en_US",
      images: [
        {
          url: logoUrl,
          width: 512,
          height: 512,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [logoUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "https://ext.same-assets.com/2757429726/4046794085.svg",
      apple: logoUrl,
    },
  };
}

import { SearchProvider } from "@/context/SearchContext";
import { ModalProvider } from "@/context/ModalContext";
import { SiteConfigProvider } from "@/context/SiteConfigContext";

import ThemeProvider from "@/components/ThemeProvider";
import { fetchSiteConfig } from "@/lib/content/fetchSiteConfig";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await fetchSiteConfig();
  const themeColors = config.theme_colors || {
    primary: 'var(--brand-dark)',
    primary_hover: '#252438',
    accent: '#8B5CF6'
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
        <SiteJsonLd
          name={config.company_name || undefined}
          logoUrl={config.logo_image_url || undefined}
          phone={config.phone}
          email={config.email}
          address={config.contact_address}
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ThemeProvider colors={themeColors} />
        <SiteConfigProvider config={config}>
          <SearchProvider>
            <ModalProvider>
              <ClientBody>
                {children}

              </ClientBody>
            </ModalProvider>
          </SearchProvider>
        </SiteConfigProvider>
      </body>
    </html>
  );
}