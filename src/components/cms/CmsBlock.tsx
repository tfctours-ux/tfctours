import Image from "next/image";

import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { sanitizeHtml } from "@/lib/cms/sanitize";

export type CmsBlockData =
  | { type: "richText"; html: string }
  | { type: "image"; url: string; alt: string; caption?: string }
  | {
      type: "cta";
      text: string;
      href: string;
      variant?: "primary" | "secondary";
    }
  | { type: "faq"; items: { question: string; answer: string }[] };

export function CmsBlock({ block }: { block: CmsBlockData }) {
  if (block.type === "richText") {
    return (
      <div
        className="prose prose-neutral max-w-none dark:prose-invert prose-a:text-accent prose-headings:font-display prose-headings:text-foreground prose-p:text-foreground-muted"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(block.html) }}
      />
    );
  }

  if (block.type === "image") {
    return (
      <figure className="overflow-hidden rounded-[2rem] border border-border bg-surface-elevated shadow-brand">
        <div className="relative aspect-[16/9]">
          <Image
            src={block.url}
            alt={block.alt}
            fill
            sizes="(min-width: 1024px) 896px, calc(100vw - 48px)"
            className="object-cover"
          />
        </div>
        {block.caption ? (
          <figcaption className="px-5 py-4 text-sm text-foreground-muted">
            {block.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (block.type === "cta") {
    return (
      <div className="text-center">
        <Button
          href={block.href}
          variant={block.variant === "secondary" ? "outline" : "primary"}
          showArrow
        >
          {block.text}
        </Button>
      </div>
    );
  }

  return <Accordion items={block.items} />;
}
