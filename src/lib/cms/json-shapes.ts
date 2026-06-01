// src/lib/cms/json-shapes.ts
export type GuideSection = {
  title: string;
  body: string;
};

export type PageBlock =
  | { type: "heading"; level: 2 | 3 | 4; text: string; id?: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "callout"; tone: "info" | "warning" | "success"; text: string }
  | { type: "image"; url: string; alt: string; caption?: string }
  | {
      type: "cta";
      label: string;
      href: string;
      variant?: "primary" | "secondary";
    };
