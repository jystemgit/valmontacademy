"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import academyLogo from "@/assets/ValmontAcademyLogoNoBG.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSelector } from "@/components/language-selector";
import type { Locale } from "@/lib/i18n";

type HeaderProps = {
  locale: Locale;
  navigation: { href: string; label: string }[];
  labels: {
    home: string;
    main: string;
    mobile: string;
    open: string;
    close: string;
    language: string;
    languageError: string;
    languagePending: string;
  };
};

export function SiteHeader({ locale, navigation, labels }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        isOpen &&
        event.target instanceof Node &&
        !buttonRef.current?.contains(event.target) &&
        !navigationRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          aria-label={labels.home}
          className="brand-logo navbar-brand"
          href="/"
          onClick={closeMenu}
        >
          <Image
            alt="Valmont Academy"
            src={academyLogo}
            width={80}
            height={80}
            sizes="(max-width: 760px) 68px, 80px"
            preload
          />
          <span className="navbar-brand-name">Valmont Academy</span>
        </Link>

        <nav aria-label={labels.main} className="desktop-nav">
          {navigation.filter((link) => link.href !== "/admision").map((link) => (
            <Link href={link.href} key={link.href} aria-current={pathname === link.href ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <LanguageSelector locale={locale} label={labels.language} errorLabel={labels.languageError} pendingLabel={labels.languagePending} />
          {navigation.filter((link) => link.href === "/admision").map((link) => (
            <Link href={link.href} key={link.href} className="nav-cta" aria-current={pathname === link.href ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? labels.close : labels.open}
          className={`menu-toggle${isOpen ? " is-open" : ""}`}
          onClick={() => setIsOpen((open) => !open)}
          ref={buttonRef}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        aria-label={labels.mobile}
        className={`mobile-nav${isOpen ? " is-open" : ""}`}
        id="mobile-navigation"
        inert={!isOpen}
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest("a")) closeMenu();
        }}
        ref={navigationRef}
      >
        <LanguageSelector locale={locale} label={labels.language} errorLabel={labels.languageError} pendingLabel={labels.languagePending} />
        {navigation.map((link) => (
          <Link href={link.href} key={link.href} className={link.href === "/admision" ? "nav-cta" : undefined} aria-current={pathname === link.href ? "page" : undefined}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
