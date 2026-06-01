// src/app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { verifyRevalidateSignature } from "@/lib/cms/revalidate-utils";

export const runtime = "nodejs";

const bodySchema = z
  .object({
    tags: z.array(z.string().min(1).max(64)).max(50).optional(),
    paths: z.array(z.string().min(1).max(256)).max(50).optional(),
  })
  .strict();

export async function POST(request: NextRequest): Promise<Response> {
  const rawBody = await request.text();
  const signature = request.headers.get("x-tfc-signature");

  if (!verifyRevalidateSignature(rawBody, signature)) {
    return NextResponse.json(
      { error: "Unauthorized", code: "REVALIDATE_UNAUTHORIZED" },
      { status: 401 },
    );
  }

  let parsedJson: unknown;

  try {
    parsedJson = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { error: "Validation failed", code: "VALIDATION_FAILED" },
      { status: 400 },
    );
  }

  const parsed = bodySchema.safeParse(parsedJson);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", code: "VALIDATION_FAILED" },
      { status: 400 },
    );
  }

  const tags = parsed.data.tags ?? [];
  const paths = parsed.data.paths ?? [];

  if (tags.some((tag) => !tag.startsWith("cms:"))) {
    return NextResponse.json(
      { error: "Invalid tag", code: "INVALID_TAG" },
      { status: 400 },
    );
  }

  if (paths.some((path) => !path.startsWith("/") || path.includes(".."))) {
    return NextResponse.json(
      { error: "Invalid path", code: "INVALID_PATH" },
      { status: 400 },
    );
  }

  try {
    for (const tag of tags) {
      revalidateTag(tag, "max");
    }

    for (const path of paths) {
      revalidatePath(path);
    }
  } catch (error) {
    console.error({ action: "revalidate_failed", error });
    return NextResponse.json(
      { error: "Internal error", code: "INTERNAL_ERROR" },
      { status: 500 },
    );
  }

  console.info({ action: "revalidate", tags, paths });

  return NextResponse.json({
    ok: true,
    data: {
      revalidatedTags: tags,
      revalidatedPaths: paths,
    },
  });
}
