import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { languages } from "../../i18n";
import { ManualPage } from "../../manual-page";
import { buildManualMetadata, isLocale } from "../../site-metadata";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const dynamicParams = false;

export function generateStaticParams() {
  return languages.map(({ code }) => ({ locale: code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? buildManualMetadata(locale) : {};
}

export default async function LocaleManualPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <ManualPage publicBasePath={publicBasePath} initialLocale={locale} />;
}
