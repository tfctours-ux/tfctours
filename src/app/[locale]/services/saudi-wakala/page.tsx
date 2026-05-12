import { permanentRedirect } from "next/navigation";

import { getLocaleFromParams, type LocaleParams } from "@/lib/page-metadata";
import { localizePath } from "@/lib/utils";

export default async function SaudiWakalaPage({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = await getLocaleFromParams(params);
  permanentRedirect(localizePath(locale, "/umrah"));
}
