import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { CmsBlock, type CmsBlockData } from "@/components/cms/CmsBlock";
import { PageHero } from "@/components/shared/PageHero";
import { getPage } from "@/lib/cms/fetchers";
import {
  buildCmsPageMetadata,
  getLocaleFromParams,
  type LocaleParams,
} from "@/lib/page-metadata";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: LocaleParams & Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocaleFromParams(params);
  const page = await getPage(slug, locale);

  return buildCmsPageMetadata(
    locale,
    `p/${slug}`,
    page?.metaTitle ?? page?.title ?? "The Flight Centre",
    page?.metaDescription ??
      page?.description ??
      "Travel information from The Flight Centre Travel & Tours.",
  );
}

export default async function CmsPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getLocaleFromParams(params);
  setRequestLocale(locale);

  const page = await getPage(slug, locale);

  if (!page || page.status !== "published") {
    notFound();
  }

  const blocks = page.bodyBlocks as unknown as CmsBlockData[];

  return (
    <div className="pb-24">
      <PageHero
        locale={locale}
        eyebrow="TFC"
        title={page.title}
        description={page.description ?? ""}
        image={page.heroImage ?? "/images/og-image.jpg"}
        imageAlt={page.title}
      />
      <div className="mx-auto max-w-4xl space-y-12 px-6 py-16">
        {blocks.map((block, index) => (
          <CmsBlock key={`${block.type}-${index}`} block={block} />
        ))}
      </div>
    </div>
  );
}
