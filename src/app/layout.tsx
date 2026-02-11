import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

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

  return {
    title: `${siteName} | Luxury Real Estate and Homes for Sale`,
    description: `Browse our wide range of luxury homes for sale and rent. Contact our real estate agents to find your dream home with ${siteName}.`,
    icons: {
      icon: "https://ext.same-assets.com/2757429726/4046794085.svg",
    },
  };
}


import { SearchProvider } from "@/context/SearchContext";
import { ModalProvider } from "@/context/ModalContext";
import { SiteConfigProvider } from "@/context/SiteConfigContext";
import CookieConsent from "@/components/CookieConsent";
import ThemeProvider from "@/components/ThemeProvider";
import { fetchSiteConfig } from "@/lib/content/fetchSiteConfig";

// ...

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await fetchSiteConfig();
  const themeColors = config.theme_colors || {
    primary: '#181728',
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
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ThemeProvider colors={themeColors} />
        <SiteConfigProvider config={config}>
          <SearchProvider>
            <ModalProvider>
              <ClientBody>
                {children}
                <CookieConsent />
              </ClientBody>
            </ModalProvider>
          </SearchProvider>
        </SiteConfigProvider>
      </body>
    </html>
  );
}