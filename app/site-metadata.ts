import type { Metadata } from "next";
import { languages, translations, type Locale } from "./i18n";
import { manualTranslations } from "./manual-i18n";

export const localeMetadata: Record<Locale, { languageTag: string; openGraphLocale: string }> = {
  ja: { languageTag: "ja-JP", openGraphLocale: "ja_JP" },
  en: { languageTag: "en-US", openGraphLocale: "en_US" },
  de: { languageTag: "de-DE", openGraphLocale: "de_DE" },
  "zh-Hans": { languageTag: "zh-CN", openGraphLocale: "zh_CN" },
  "zh-Hant": { languageTag: "zh-TW", openGraphLocale: "zh_TW" },
  fr: { languageTag: "fr-FR", openGraphLocale: "fr_FR" },
  ko: { languageTag: "ko-KR", openGraphLocale: "ko_KR" },
  es: { languageTag: "es-ES", openGraphLocale: "es_ES" },
  it: { languageTag: "it-IT", openGraphLocale: "it_IT" },
  vi: { languageTag: "vi-VN", openGraphLocale: "vi_VN" },
  th: { languageTag: "th-TH", openGraphLocale: "th_TH" },
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.GITHUB_PAGES === "true"
    ? "https://capswitch.suruyatu.com"
    : "https://capswitch-app.donpok.chatgpt.site");

const localePath = (locale: Locale) => `/${locale}/`;

const languageAlternates = Object.fromEntries(
  languages.map(({ code }) => [localeMetadata[code].languageTag, localePath(code)]),
);

export function isLocale(value: string): value is Locale {
  return languages.some(({ code }) => code === value);
}

export function buildLocaleMetadata(locale: Locale): Metadata {
  const copy = translations[locale];
  const title = `Capswitch — ${copy.hero.join(" ")}`;
  const description = `${copy.heroLead} ${copy.tour.descriptions[2]}`;
  const path = localePath(locale);
  const { openGraphLocale } = localeMetadata[locale];

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: path,
      languages: { ...languageAlternates, "x-default": "/" },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Capswitch",
      type: "website",
      locale: openGraphLocale,
      alternateLocale: languages
        .filter(({ code }) => code !== locale)
        .map(({ code }) => localeMetadata[code].openGraphLocale),
      images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

export function buildManualMetadata(locale: Locale): Metadata {
  const copy = manualTranslations[locale];
  const title = `${copy.title} — Capswitch`;
  const description = copy.lead;
  const path = `/${locale}/manual/`;
  const manualAlternates = Object.fromEntries(
    languages.map(({ code }) => [localeMetadata[code].languageTag, `/${code}/manual/`]),
  );
  const { openGraphLocale } = localeMetadata[locale];

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: path,
      languages: { ...manualAlternates, "x-default": "/en/manual/" },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Capswitch",
      type: "article",
      locale: openGraphLocale,
      alternateLocale: languages
        .filter(({ code }) => code !== locale)
        .map(({ code }) => localeMetadata[code].openGraphLocale),
      images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

const englishMetadata = buildLocaleMetadata("en");

export const rootMetadata: Metadata = {
  ...englishMetadata,
  alternates: {
    canonical: "/",
    languages: { ...languageAlternates, "x-default": "/" },
  },
  openGraph: {
    ...englishMetadata.openGraph,
    url: "/",
  },
};
