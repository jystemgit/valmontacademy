import { getLanguage, getTranslations } from "@/lib/i18n-server";
import { localeInfo } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import academyLogo from "@/assets/ValmontAcademyLogoNoBG.png";
import { site } from "@/lib/site";
import { developmentDimensions, educationalModel, pillars } from "@/lib/academy-content";
import "./home.css";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const t = await getTranslations();
  const locale = await getLanguage();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: `${site.url}/`,
        description: t(site.description),
        logo: new URL(academyLogo.src, site.url).href,
        founder: {
          "@type": "Person",
          name: "Augusto Valmont",
          url: "https://augustovalmont.com",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: `${site.url}/`,
        inLanguage: localeInfo[locale].html,
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <main id="contenido" className="home-page">
        <section aria-labelledby="hero-title" className="home-hero page-wrap" id="inicio">
          <div className="home-hero-copy">
            <p className="eyebrow">Valmont Academy</p>
            <h1 id="hero-title">{t("La construcción del ideal humano")}</h1>
            <p className="home-lede">
              {t("Una institución dedicada a transformar a la humanidad mediante el conocimiento, la virtud, el autodominio y la búsqueda deliberada de la excelencia")}
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/historia">{t("Descubrir la Academia")}</Link>
            </div>
          </div>
          <div className="hero-emblem home-hero-emblem">
            <Image
              alt={t("Emblema oficial de Valmont Academy")}
              src={academyLogo}
              width={560}
              height={560}
              sizes="(max-width: 760px) 70vw, (max-width: 1200px) 40vw, 480px"
              preload
            />
          </div>
        </section>

        <section aria-labelledby="mission-title" className="home-section home-mission page-wrap" id="mision">
          <p className="eyebrow">{t("Nuestra misión")}</p>
          <div>
            <h2 id="mission-title">{t("Transformar a la humanidad hacia el ideal excelente y soberano")}</h2>
            <p className="home-lede">
              {t("Contribuir a formar individuos más capaces, conscientes, virtuosos y responsables, que puedan dirigir su vida con criterio propio y poner su desarrollo al servicio de algo más que sí mismos")}
            </p>
          </div>
        </section>

        <section aria-labelledby="home-philosophy-title" className="home-section page-wrap" id="theodromia">
          <div className="home-section-heading">
            <div>
              <p className="eyebrow">{t("El fundamento")}</p>
              <h2 id="home-philosophy-title">Theodromía</h2>
            </div>
            <div>
              <p className="home-lede">
                {t("«El camino hacia lo divino» es una filosofía de autodominio, sabiduría, virtud, responsabilidad, transformación y trascendencia, no una promesa sobrenatural")}
              </p>
              <p className="home-supporting">{t("Siete pilares para orientar la formación y hacer de los principios una conducta, no solo un discurso")}</p>
            </div>
          </div>
          <div className="home-pillar-list">
            {pillars.map((pillar) => (
              <article className="home-pillar" key={pillar.name}>
                <div>
                  <h3>{t(pillar.name)}</h3>
                  <p className="home-pillar-origin" lang="el-Latn">{pillar.original}</p>
                </div>
                <p>{t(pillar.description)}</p>
              </article>
            ))}
          </div>
          <div className="hero-actions">
            <Link className="text-link" href="/filosofia">{t("Explorar la Theodromía")}</Link>
          </div>
        </section>

        <section aria-labelledby="home-development-title" className="home-section page-wrap" id="desarrollo">
          <div className="home-section-heading">
            <div>
              <p className="eyebrow">{t("La transformación humana")}</p>
              <h2 id="home-development-title">{t("Una persona, todas sus dimensiones")}</h2>
            </div>
            <p className="home-lede">
              {t("No alcanza con saber más: construir el propio ideal exige desarrollar criterio, autodominio, capacidades y virtud, integrando lo que pensamos con lo que hacemos")}
            </p>
          </div>
          <div className="home-dimension-grid">
            {developmentDimensions.map((dimension) => (
              <article key={dimension.name}>
                <h3>{t(dimension.name)}</h3>
                <p>{t(dimension.description)}</p>
              </article>
            ))}
          </div>
          <p className="home-footnote">
            {t("Son dimensiones de una misma persona, no programas actualmente disponibles; el desarrollo depende del aprendizaje, el esfuerzo y la conducta sostenida")}
          </p>
        </section>

        <section aria-labelledby="home-model-title" className="home-section page-wrap" id="modelo">
          <div className="home-section-heading">
            <div>
              <p className="eyebrow">{t("El modelo de formación")}</p>
              <h2 id="home-model-title">{t("Aprender para poder actuar")}</h2>
            </div>
            <p className="home-lede">
              {t("El modelo previsto conecta el estudio con la experiencia, la orientación y la práctica personal, para que aprender se traduzca en mejores decisiones, conductas y capacidades")}
            </p>
          </div>
          <div className="home-model-grid">
            {educationalModel.map((item) => (
              <article key={item.title}>
                <h3>{t(item.title)}</h3>
                <p>{t(item.text)}</p>
              </article>
            ))}
          </div>
          <div className="home-model-bottom">
            <p className="home-footnote">{t("Modelo educativo en desarrollo, sin cursos, mentorías ni programas operativos anunciados")}</p>
            <Link className="button button-primary" href="/formacion">{t("Conocer el modelo de formación")}</Link>
          </div>
        </section>

        <section aria-labelledby="home-vision-title" className="home-vision" id="vision">
          <div className="page-wrap home-vision-inner">
            <p className="eyebrow">{t("La visión institucional")}</p>
            <div>
              <h2 id="home-vision-title">{t("Una institución para el largo plazo")}</h2>
              <p className="home-lede">
                {t("Aspiramos a construir una institución duradera y de alcance internacional, donde el conocimiento, los métodos educativos y una comunidad comprometida amplíen las posibilidades del desarrollo humano")}
              </p>
              <p className="home-supporting">
                {t("Valmont Academy está en su etapa fundacional: esta es la dirección que orienta su construcción, no una expansión ya alcanzada")}
              </p>
              <div className="hero-actions">
                <Link className="text-link" href="/historia">{t("Conocer la Academia")}</Link>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="home-origin-title" className="home-section home-origin page-wrap" id="origen">
          <div>
            <p className="eyebrow">{t("El origen y el fundador")}</p>
            <h2 id="home-origin-title">{t("De una búsqueda personal a un propósito compartido")}</h2>
          </div>
          <div>
            <p className="home-founder">Augusto Valmont</p>
            <p className="home-founder-idea">{t("Construir el hombre ideal, construir el ideal")}</p>
            <p className="home-lede">
              {t("La Academia nace de la búsqueda de excelencia de su fundador y del propósito de convertirla en una institución que contribuya al desarrollo de otros, con principios y una misión capaces de perdurar más allá de una persona")}
            </p>
            <div className="hero-actions">
              <Link className="text-link" href="/historia">{t("Conocer el origen de la Academia")}</Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="home-closing-title" className="home-section home-closing page-wrap" id="explorar">
          <p className="eyebrow">Valmont Academy</p>
          <h2 id="home-closing-title">{t("El ideal no se contempla, se construye")}</h2>
          <p className="home-lede">
            {t("El camino empieza con una responsabilidad propia: aprender con rigor, actuar con integridad y convertir la capacidad en una contribución real")}
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/filosofia">{t("Explorar Valmont Academy")}</Link>
          </div>
        </section>
      </main>
    </>
  );
}
