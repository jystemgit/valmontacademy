import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getLanguage, getTranslations } from "@/lib/i18n-server";
import { localeInfo } from "@/lib/i18n";
import { navigation } from "@/lib/navigation";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLanguage();
  const t = await getTranslations();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: t(site.title),
      template: "%s | Valmont Academy",
    },
    description: t(site.description),
    applicationName: site.name,
    category: "education",
    openGraph: {
      url: "/",
      title: t(site.title),
      description: t(site.description),
      locale: localeInfo[locale].og,
      siteName: site.name,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: t("Valmont Academy — Filosofía, conocimiento y autodominio"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t(site.title),
      description: t(site.description),
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLanguage();
  const t = await getTranslations();
  return (
    <html lang={localeInfo[locale].html}>
      <body className={geist.variable}>
        <a className="skip-link" href="#contenido">{t("Saltar al contenido")}</a>
        <SiteHeader
          locale={locale}
          navigation={navigation.map((item) => ({ ...item, label: t(item.label) }))}
          labels={{
            home: t("Valmont Academy, inicio"),
            main: t("Navegación principal"),
            mobile: t("Navegación móvil"),
            open: t("Abrir navegación"),
            close: t("Cerrar navegación"),
            language: t("Cambiar idioma"),
            languageError: t("No se pudo cambiar el idioma, intentá nuevamente"),
            languagePending: t("Cambiando idioma"),
          }}
        />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
