import createNextIntlPlugin from "next-intl/plugin";
import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const CMS_PAGE_CACHE = "public, s-maxage=300, stale-while-revalidate=600";
const CMS_DYNAMIC_PAGE_CACHE =
  "public, s-maxage=60, stale-while-revalidate=120";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tfctours.com",
      },
      {
        protocol: "https",
        hostname: "www.tfctours.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:locale/services",
        headers: [{ key: "Cache-Control", value: CMS_PAGE_CACHE }],
      },
      {
        source: "/:locale/guides",
        headers: [{ key: "Cache-Control", value: CMS_PAGE_CACHE }],
      },
      {
        source: "/:locale/tours",
        headers: [{ key: "Cache-Control", value: CMS_PAGE_CACHE }],
      },
      {
        source: "/:locale/umrah",
        headers: [{ key: "Cache-Control", value: CMS_PAGE_CACHE }],
      },
      {
        source: "/:locale/p/:slug",
        headers: [{ key: "Cache-Control", value: CMS_DYNAMIC_PAGE_CACHE }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
