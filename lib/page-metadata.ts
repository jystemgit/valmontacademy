import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getLanguage, getTranslations } from "@/lib/i18n-server";
import { localeInfo } from "@/lib/i18n";

export async function pageMetadata(sourceTitle: string, sourceDescription: string, path: string): Promise<Metadata> {
  const t = await getTranslations();
  const title = t(sourceTitle);
  const description = t(sourceDescription);
  const locale = await getLanguage();
  const socialTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      type: "website",
      locale: localeInfo[locale].og,
      siteName: site.name,
      images: [{
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: t("Valmont Academy — Filosofía, conocimiento y autodominio"),
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
