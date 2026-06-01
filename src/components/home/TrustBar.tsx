// src/components/home/TrustBar.tsx
import { getLocale, getTranslations } from "next-intl/server";

import { TrustBarClient } from "@/components/home/TrustBarClient";
import { getHomeStats } from "@/lib/cms/fetchers";
import type { HomeStatView } from "@/lib/cms/types";
import { HOME_STATS, type Locale } from "@/lib/constants";

export { TrustBarSkeleton } from "./TrustBarSkeleton";

export async function TrustBar() {
  const locale = (await getLocale()) as Locale;
  const [stats, t] = await Promise.all([
    getHomeStats(locale),
    getTranslations("home.trustBar"),
  ]);
  const resolvedStats =
    stats ??
    HOME_STATS.map<HomeStatView>((stat) => ({
      key: stat.id,
      from: stat.from,
      to: stat.to,
      suffix: stat.suffix,
      label: t(`stats.${stat.id}.label`),
      sortOrder: 0,
    }));

  return <TrustBarClient stats={resolvedStats} />;
}
