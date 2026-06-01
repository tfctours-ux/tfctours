// src/app/sitemap.ts
import type { MetadataRoute } from "next";

import { GUIDES, SERVICES, getBaseUrl } from "@/lib/constants";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

interface RouteSpec {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}

// Manually-curated static routes (everything that is NOT a service or guide).
const STATIC_ROUTES: RouteSpec[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/umrah", changeFrequency: "weekly", priority: 0.95 },
  { path: "/umrah-calculator", changeFrequency: "monthly", priority: 0.80 },
  { path: "/tour-calculator", changeFrequency: "monthly", priority: 0.80 },
  { path: "/tours", changeFrequency: "weekly", priority: 0.90 },
  { path: "/services", changeFrequency: "weekly", priority: 0.90 },
  { path: "/guides", changeFrequency: "monthly", priority: 0.70 },
  { path: "/about", changeFrequency: "monthly", priority: 0.70 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.70 },
];

const SERVICE_ROUTES: RouteSpec[] = SERVICES.map((service) => ({
  path: service.href,
  changeFrequency: "weekly" as const,
  priority: service.featured ? 0.85 : 0.80,
}));

const GUIDE_ROUTES: RouteSpec[] = GUIDES.map((guide) => ({
  path: guide.href,
  changeFrequency: "monthly" as const,
  priority: 0.75,
}));

const ALL_ROUTES: RouteSpec[] = [
  ...STATIC_ROUTES,
  ...SERVICE_ROUTES,
  ...GUIDE_ROUTES,
];

function normalizePriority(priority: number) {
  return Number(priority.toFixed(2));
}

// Build-time baseline lastModified. Bumping NEXT_PUBLIC_BUILD_TIME
// (set during CI build) will surface as a fresh sitemap signal.
const LAST_MODIFIED = process.env.NEXT_PUBLIC_BUILD_TIME
  ? new Date(process.env.NEXT_PUBLIC_BUILD_TIME)
  : new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();

  const englishEntries: MetadataRoute.Sitemap = ALL_ROUTES.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${base}${path}`,
      lastModified: LAST_MODIFIED,
      changeFrequency,
      priority: normalizePriority(priority),
      alternates: {
        languages: {
          "en-PK": `${base}${path}`,
          "ur-PK": `${base}${path === "/" ? "/ur" : `/ur${path}`}`,
          "x-default": `${base}${path}`,
        },
      },
    }),
  );

  const urduEntries: MetadataRoute.Sitemap = ALL_ROUTES.map(
    ({ path, changeFrequency, priority }) => {
      const urduPath = path === "/" ? "/ur" : `/ur${path}`;
      return {
        url: `${base}${urduPath}`,
        lastModified: LAST_MODIFIED,
        changeFrequency,
        priority: normalizePriority(Math.max(priority - 0.05, 0.5)),
        alternates: {
          languages: {
            "en-PK": `${base}${path}`,
            "ur-PK": `${base}${urduPath}`,
            "x-default": `${base}${path}`,
          },
        },
      };
    },
  );

  return [...englishEntries, ...urduEntries];
}
