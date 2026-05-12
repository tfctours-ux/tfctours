import type { Metadata } from "next";

import { FAQ } from "@/components/home/FAQ";
import { B2BPortal } from "@/components/home/B2BPortal";
import { Gallery } from "@/components/home/Gallery";
import { Hero } from "@/components/home/Hero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TrustBar } from "@/components/home/TrustBar";
import { UmrahFeature } from "@/components/home/WakalaFeature";
import { buildLocalizedPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return buildLocalizedPageMetadata(params, "home.meta", "/", [
    "travel agency pakistan",
    "umrah packages",
    "international tours",
    "ticket booking",
  ]);
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <UmrahFeature />
      <B2BPortal />
      <Gallery />
      <FAQ />
    </>
  );
}
