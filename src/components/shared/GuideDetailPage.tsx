// src/components/shared/GuideDetailPage.tsx
import { notFound } from "next/navigation";

import { useTranslations } from "next-intl";

import { FileCheck2 } from "lucide-react";

import { GUIDES, type GuideSlug, type Locale } from "@/lib/constants";

import { PageHero } from "@/components/shared/PageHero";
import { Badge } from "@/components/ui/Badge";

interface GuideDetailPageProps {
  locale: Locale;
  slug: GuideSlug;
}

export function GuideDetailPage({ locale, slug }: GuideDetailPageProps) {
  const guide = GUIDES.find((item) => item.slug === slug);
  const guideT = useTranslations(`guidePages.${slug}`);
  const common = useTranslations("common");
  const checklist = guideT.raw("checklist") as string[];
  const sections = guideT.raw("sections") as Array<{ title: string; body: string }>;

  if (!guide) {
    notFound();
  }

  return (
    <div className="pb-20">
      <PageHero
        locale={locale}
        eyebrow={guideT("eyebrow")}
        title={guideT("title")}
        description={guideT("description")}
        image={guide.image}
        imageAlt={guideT("title")}
        primaryHref="/contact"
        primaryLabel={common("askOffice")}
        secondaryHref="/guides"
        secondaryLabel={common("allGuides")}
        aside={
          <div className="rounded-[1.75rem] border border-accent-foreground/10 bg-accent-foreground/10 p-5 text-accent-foreground backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-gold">
              {common("readTime")}
            </p>
            <p className="mt-2 font-display text-3xl font-bold">
              {guide.readMinutes} {common("minutesShort")}
            </p>
          </div>
        }
      />

      <section className="mx-auto mt-12 grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="rounded-[2rem] border border-border bg-surface-elevated p-6 shadow-brand md:p-8">
          <Badge>{guideT("checklistTitle")}</Badge>
          <div className="mt-6 space-y-4">
            {checklist.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <FileCheck2 className="mt-1 h-5 w-5 text-accent" />
                <p className="text-sm leading-7 text-foreground-muted">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[1.5rem] bg-surface p-5">
            <p className="text-sm leading-7 text-foreground-muted">{guideT("note")}</p>
          </div>
        </aside>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <article
              key={section.title}
              className="rounded-[2rem] border border-border bg-surface-elevated p-6 shadow-brand md:p-8"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-accent">
                {common("topic")} {index + 1}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground">
                {section.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-foreground-muted">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
