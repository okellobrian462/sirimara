import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.preview.same-app.com"],
  async redirects() {
    return [
      {
        source: "/sales",
        destination: "/buy",
        permanent: true,
      },
      {
        source: "/sales/:path*",
        destination: "/buy/:path*",
        permanent: true,
      },
      {
        source: "/rentals",
        destination: "/rent",
        permanent: true,
      },
      {
        source: "/rentals/:path*",
        destination: "/rent/:path*",
        permanent: true,
      },
      {
        source: "/newsletters",
        destination: "/insights",
        permanent: true,
      },
      {
        source: "/newsletters/:path*",
        destination: "/insights/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
