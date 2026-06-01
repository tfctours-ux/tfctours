// src/components/layout/Navbar.tsx
import { getLocale, getTranslations } from "next-intl/server";

import { NavbarClient, type NavbarLink } from "@/components/layout/NavbarClient";
import { getNavLinks } from "@/lib/cms";
import { NAV_LINKS, type Locale } from "@/lib/constants";

export async function Navbar() {
  const locale = (await getLocale()) as Locale;
  const cmsLinks = await getNavLinks(locale);
  const links =
    cmsLinks && cmsLinks.length > 0
      ? cmsLinks
      : await getFallbackNavLinks(locale);

  return <NavbarClient links={links} locale={locale} />;
}

async function getFallbackNavLinks(locale: Locale): Promise<NavbarLink[]> {
  const t = await getTranslations({ locale, namespace: "nav" });

  return NAV_LINKS.map((item, index) => ({
    key: item.key,
    href: item.href,
    label: t(item.key),
    isExternal: false,
    sortOrder: index,
  }));
}
