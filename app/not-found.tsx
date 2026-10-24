import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "@/lib/i18n-server";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const t = await getTranslations();
  return (
    <main id="contenido" className="not-found page-wrap">
      <h1>{t("Página no encontrada")}</h1>
      <p>{t("La dirección no existe o ya no está disponible")}</p>
      <Link className="button button-primary" href="/">{t("Volver al inicio")}</Link>
    </main>
  );
}
