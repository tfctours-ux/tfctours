import type { Metadata } from "next";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ServiceDetailPage } from "@/components/shared/ServiceDetailPage";
import {
  buildServiceMetadata,
  getLocaleFromParams,
  type LocaleParams,
} from "@/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  return buildServiceMetadata(params, "visit-visa");
}

export default async function VisitVisaPage({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = await getLocaleFromParams(params);

  return (
    <>
      <Breadcrumb />
      <ServiceDetailPage locale={locale} slug="visit-visa" />
    </>
  );
}
