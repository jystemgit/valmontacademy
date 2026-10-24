import { getTranslations } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata() {
  return pageMetadata(
    "Admisión y pertenencia",
    "La información de admisión de Valmont Academy estará disponible próximamente",
    "/admision",
  );
}

export default async function AdmissionPage() {
  const t = await getTranslations();
  return (
    <main id="contenido" className="education-coming-soon page-wrap">
      <h1>{t("Próximamente...")}</h1>
    </main>
  );
}
