import { getTranslations } from "@/lib/i18n-server";
import Image from "next/image";
import Link from "next/link";
import academyLogo from "@/assets/ValmontAcademyLogoNoBG.png";
import { navigation } from "@/lib/navigation";

export async function SiteFooter() {
  const t = await getTranslations();
  return (
    <footer className="site-footer">
      <div className="page-wrap footer-inner">
        <div className="footer-identity">
          <Link aria-label={t("Valmont Academy, volver al inicio")} className="brand-logo footer-brand-logo" href="/">
            <Image alt="Valmont Academy" src={academyLogo} width={80} height={80} sizes="80px" />
          </Link>
          <p className="footer-mission">
            {t("Transformar a la humanidad hacia el ideal excelente y soberano")}
          </p>
        </div>
        <div className="footer-links">
          <nav aria-label={t("Navegación del pie de página")} className="footer-nav">
            {navigation.map((link) => (
              <Link href={link.href} key={link.href}>{t(link.label)}</Link>
            ))}
          </nav>
          <p className="copyright">© {new Date().getFullYear()} Valmont Academy</p>
        </div>
      </div>
    </footer>
  );
}
