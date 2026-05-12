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
  return buildServiceMetadata(params, "travel-insurance");
}

export default async function TravelInsurancePage({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = await getLocaleFromParams(params);

  return (
    <>
      <Breadcrumb />
      <ServiceDetailPage locale={locale} slug="travel-insurance" />
    </>
  );
}
