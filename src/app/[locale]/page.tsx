// src/app/[locale]/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";

import { FAQ, FAQSkeleton } from "@/components/home/FAQ";
import { B2BPortal } from "@/components/home/B2BPortal";
import { Gallery, GallerySkeleton } from "@/components/home/Gallery";
import { Hero } from "@/components/home/Hero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TrustBar, TrustBarSkeleton } from "@/components/home/TrustBar";
import { UmrahFeature } from "@/components/home/WakalaFeature";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { FAQJsonLd, SpeakableJsonLd } from "@/components/shared/JsonLd";
import { buildLocalizedPageMetadata } from "@/lib/page-metadata";
import { localizePath } from "@/lib/utils";

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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <FAQJsonLd locale={locale as "en" | "ur"} />
      <SpeakableJsonLd
        path={localizePath(locale as "en" | "ur", "/")}
        cssSelectors={["#home-h1", "#home-lede"]}
      />
      <Hero h1Id="home-h1" pId="home-lede" />
      <ErrorBoundary fallback={<TrustBarSkeleton />}>
        <Suspense fallback={<TrustBarSkeleton />}>
          <TrustBar />
        </Suspense>
      </ErrorBoundary>
      <ServicesGrid />
      <UmrahFeature />
      <B2BPortal />
      <ErrorBoundary fallback={<GallerySkeleton />}>
        <Suspense fallback={<GallerySkeleton />}>
          <Gallery />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<FAQSkeleton />}>
        <Suspense fallback={<FAQSkeleton />}>
          <FAQ />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
