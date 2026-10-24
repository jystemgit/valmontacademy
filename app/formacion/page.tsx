import { getTranslations } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata() {
  return pageMetadata(
    "Formación integral",
    "La página de Formación de Valmont Academy estará disponible próximamente",
    "/formacion",
  );
}

export default async function EducationPage() {
  const t = await getTranslations();
  return (
    <main id="contenido" className="education-coming-soon page-wrap">
      <h1>{t("Próximamente...")}</h1>
    </main>
  );
}
