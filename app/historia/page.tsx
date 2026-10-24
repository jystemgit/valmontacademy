import { getTranslations } from "@/lib/i18n-server";
import Link from "next/link";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata() {
  return pageMetadata(
  "Historia y propósito institucional",
  "El origen de Valmont Academy, su fundador Augusto Valmont y la cultura, los estándares y la visión de una institución en construcción",
  "/historia",
  );
}

export default async function HistoryPage() {
  const t = await getTranslations();
  return (
    <main id="contenido">
      <section aria-labelledby="history-title" className="section page-wrap route-intro">
        <div className="section-intro">
          <p className="eyebrow">{t("Historia · La institución por dentro")}</p>
          <div>
            <h1 id="history-title">{t("Una búsqueda personal, una construcción institucional")}</h1>
            <p className="section-lede">
              {t("Valmont Academy nace de la búsqueda de excelencia de Augusto Valmont y del propósito de convertir esa búsqueda en un camino de formación que otras personas puedan recorrer con criterio propio")}</p>
          </div>
        </div>
        <div className="philosophy-note">
          <p>
            {t("«Construir el hombre ideal, construir el ideal» expresa el origen de esa búsqueda: aprender, formar el carácter y traducir las decisiones en acciones, sin recibir un ideal impuesto")}</p>
          <p className="muted">
            {t("La institución está en su etapa fundacional, no presentamos una trayectoria consolidada ni hitos que todavía no existen")}</p>
        </div>
        <div className="hero-actions">
          <a className="text-link" href="https://augustovalmont.com" target="_blank" rel="noopener noreferrer">
            {t("Conocer a Augusto Valmont")}</a>
        </div>
      </section>
      <section aria-labelledby="culture-title" className="section section-tinted">
        <div className="page-wrap">
          <div className="section-intro">
            <p className="eyebrow">{t("Cultura y estándares")}</p>
            <div>
              <h2 id="culture-title">{t("La exigencia empieza por la propia conducta")}</h2>
              <p className="section-lede">
                {t("La cultura que buscamos construir se apoya en los principios de la Theodromía: honestidad intelectual, responsabilidad, práctica sostenida y capacidad de reconocer y corregir los errores")}</p>
            </div>
          </div>
          <div className="model-grid">
            <article className="model-item">
              <h3>{t("Rigor sin dogmatismo")}</h3>
              <p>{t("Buscar la verdad, revisar las propias ideas y distinguir lo que sabemos de lo que aspiramos a comprender")}</p>
            </article>
            <article className="model-item">
              <h3>{t("Exigencia sin superioridad")}</h3>
              <p>{t("El compromiso y la conducta importan más que el prestigio, sin rangos artificiales entre miembros")}</p>
            </article>
            <article className="model-item">
              <h3>{t("Capacidades demostrables")}</h3>
              <p>{t("El desarrollo debe reflejarse en decisiones, acciones y resultados, no únicamente en declaraciones de intención")}</p>
            </article>
            <article className="model-item">
              <h3>{t("Una institución que pueda perdurar")}</h3>
              <p>{t("Construir principios y sistemas educativos capaces de evolucionar más allá de su fundador, con una aspiración de alcance internacional")}</p>
            </article>
          </div>
          <p className="section-footnote">
            {t("Estos principios orientan la construcción institucional; no sustituyen reglamentos ni procedimientos definitivos, todavía en desarrollo")}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/admision">{t("Conocer el compromiso de pertenecer")}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
