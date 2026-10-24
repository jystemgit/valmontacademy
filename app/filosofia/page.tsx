import { getTranslations } from "@/lib/i18n-server";
import Link from "next/link";
import { pageMetadata } from "@/lib/page-metadata";
import { pillars } from "@/lib/academy-content";

export async function generateMetadata() {
  return pageMetadata(
    "Filosofía y Theodromía",
    "Conocé la Theodromía y sus siete pilares, el fundamento filosófico de Valmont Academy: virtud, autodominio, sabiduría y responsabilidad",
    "/filosofia",
  );
}

export default async function PhilosophyPage() {
  const t = await getTranslations();
  return (
    <main id="contenido" className="philosophy-page">
      <section aria-labelledby="philosophy-title" className="philosophy-hero page-wrap">
        <p className="eyebrow">{t("Filosofía")}</p>
        <h1 id="philosophy-title">Theodromía</h1>
        <div className="philosophy-hero-bottom">
          <p className="philosophy-meaning">{t("El camino hacia lo divino")}</p>
          <div className="philosophy-hero-copy">
            <p>{t("No se trata de recibir un ideal, sino de aprender a encarnarlo")}</p>
            <p>{t("La filosofía que da dirección a Valmont Academy: cultivar el carácter, gobernarse y convertir lo que sabemos en una manera consciente de vivir")}</p>
            <a className="text-link" href="#pilares">{t("Descubrir los siete pilares")}</a>
          </div>
        </div>
      </section>

      <section aria-labelledby="foundation-title" className="philosophy-chapter page-wrap">
        <div className="philosophy-chapter-heading">
          <p className="eyebrow">{t("El fundamento")}</p>
          <h2 id="foundation-title">{t("Una filosofía para ser y devenir")}</h2>
        </div>
        <div className="philosophy-foundations">
          <div className="philosophy-foundation-intro">
            <p>{t("Theodromía significa «el camino hacia lo divino» y expresa una búsqueda de virtud, responsabilidad y trascendencia, no una religión convencional ni una promesa sobrenatural")}</p>
            <p>{t("En la Academia, ese ideal se traduce en una exigencia concreta: trabajar sobre uno mismo sin separarse de la realidad ni de la responsabilidad hacia los demás")}</p>
            <a className="text-link" href="https://augustovalmont.com/sobre-mi#mi-filosofia">{t("La filosofía en palabras del fundador")}</a>
          </div>
          <div className="philosophy-tenets">
            <article>
              <h3>{t("Pertenecer a una realidad mayor")}</h3>
              <p>{t("La idea del TODO invita a pensarnos como parte de una realidad interdependiente, una perspectiva filosófica que exige considerar las consecuencias de nuestros actos")}</p>
            </article>
            <article>
              <h3>{t("Gobernar el ego, no borrarlo")}</h3>
              <p>{t("La identidad y la ambición pueden dar dirección; el trabajo es reconocer sus límites para que no se conviertan en vanidad, autoengaño o dominio sobre otros")}</p>
            </article>
            <article>
              <h3>{t("El propósito se construye")}</h3>
              <p>{t("No esperar un destino escrito: elegir una dirección, ponerla a prueba y darle forma mediante decisiones, trabajo y responsabilidad")}</p>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="pillars-title" className="philosophy-chapter page-wrap" id="pilares">
        <div className="philosophy-chapter-heading">
          <p className="eyebrow">{t("Los siete pilares")}</p>
          <h2 id="pillars-title">{t("Principios que se vuelven conducta")}</h2>
          <p>{t("Sus siete pilares orientan toda la formación, no son una materia opcional: aprender a pensar, decidir y actuar con coherencia es parte de un mismo camino")}</p>
        </div>
        <div className="philosophy-pillar-grid">
          {pillars.map((pillar) => (
            <article className="philosophy-pillar" key={pillar.name}>
              <p className="philosophy-pillar-origin" lang="el-Latn">{pillar.original}</p>
              <h3>{t(pillar.name)}</h3>
              <p>{t(pillar.description)}</p>
            </article>
          ))}
          <aside className="philosophy-excellence">
            <p className="eyebrow">Areté</p>
            <h3>{t("La excelencia como horizonte")}</h3>
            <p>{t("No un rango ni una superioridad sobre otros, sino el compromiso de desarrollar el potencial y corregir lo que limita su expresión")}</p>
          </aside>
        </div>
      </section>

      <section aria-labelledby="practice-title" className="philosophy-chapter page-wrap">
        <div className="philosophy-chapter-heading">
          <p className="eyebrow">{t("La práctica")}</p>
          <h2 id="practice-title">{t("Integrar, no negar")}</h2>
        </div>
        <div className="philosophy-practice">
          <article>
            <h3>{t("Reconocer las contradicciones")}</h3>
            <p>{t("Aceptar que existen impulsos y tensiones no significa justificar cualquier conducta; significa conocerlos, establecer límites y elegir cómo actuar")}</p>
          </article>
          <article>
            <h3>{t("Escuchar la emoción, decidir con criterio")}</h3>
            <p>{t("El autodominio no exige dejar de sentir, sino comprender lo que sentimos y responder sin entregar la dirección de nuestra vida a un impulso")}</p>
          </article>
          <article>
            <h3>{t("Usar la capacidad para contribuir")}</h3>
            <p>{t("El poder es un medio, nunca un fin; desarrollar mayores capacidades exige responder por su uso")}</p>
          </article>
        </div>
      </section>

      <section aria-labelledby="philosophy-closing-title" className="philosophy-closing page-wrap">
        <p className="eyebrow">{t("De la filosofía a la vida")}</p>
        <h2 id="philosophy-closing-title">{t("Que tus principios se vean en lo que hacés")}</h2>
        <p>{t("En Valmont Academy, la filosofía no acompaña a la formación desde afuera: define para qué aprender, cómo actuar y qué responsabilidad asumir con cada nueva capacidad")}</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/formacion">{t("Explorar la formación")}</Link>
          <Link className="text-link" href="/historia">{t("Conocer la institución por dentro")}</Link>
        </div>
      </section>
    </main>
  );
}
