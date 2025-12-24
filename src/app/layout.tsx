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

export const metadata: Metadata = {
  title: "Douglas Elliman | Luxury Real Estate and Homes for Sale",
  description: "Browse our wide range of luxury homes for sale and rent. Contact our real estate agents to find your dream home.",
  icons: {
    icon: "https://ext.same-assets.com/2757429726/4046794085.svg",
  },
};

import { SearchProvider } from "@/context/SearchContext";
import { ModalProvider } from "@/context/ModalContext";

// ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <SearchProvider>
          <ModalProvider>
            <ClientBody>{children}</ClientBody>
          </ModalProvider>
        </SearchProvider>
      </body>
    </html>
  );
}