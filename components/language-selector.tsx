"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { setLanguage } from "@/app/actions/language";
import { localeInfo, locales, type Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  label: string;
  errorLabel: string;
  pendingLabel: string;
};

export function LanguageSelector({ locale, label, errorLabel, pendingLabel }: Props) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [pending, startTransition] = useTransition();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const focusOnOpenRef = useRef<number | null>(null);
  const id = useId();

  useEffect(() => {
    if (open && focusOnOpenRef.current !== null) {
      menuRef.current?.querySelectorAll<HTMLButtonElement>("button")[focusOnOpenRef.current]?.focus();
      focusOnOpenRef.current = null;
    }
  }, [open]);

  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        event.stopPropagation();
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", closeOutside);
    rootRef.current?.addEventListener("keydown", closeOnEscape);
    const root = rootRef.current;
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      root?.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function focusOption(index: number) {
    menuRef.current?.querySelectorAll<HTMLButtonElement>("button")[index]?.focus();
  }

  function changeLanguage(next: Locale) {
    setOpen(false);
    triggerRef.current?.focus();
    if (next === locale) return;
    setError(false);
    startTransition(async () => {
      try {
        await setLanguage(next);
      } catch (cause) {
        console.error("Language preference could not be saved", cause);
        setError(true);
      }
    });
  }

  return (
    <div
      className="language-selector"
      ref={rootRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        className="language-trigger"
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        aria-busy={pending}
        disabled={pending}
        ref={triggerRef}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const index = event.key === "ArrowDown" ? 0 : locales.length - 1;
            if (open) {
              focusOption(index);
            } else {
              focusOnOpenRef.current = index;
              setOpen(true);
            }
          }
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
        </svg>
        <span lang="en">{localeInfo[locale].label}</span>
        <svg className={open ? "language-chevron is-open" : "language-chevron"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        className={`language-menu${open ? " is-open" : ""}`}
        role="menu"
        aria-label={label}
        id={id}
        ref={menuRef}
        inert={!open}
        onKeyDown={(event) => {
          const options = [...(menuRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? [])];
          const index = options.findIndex((button) => button === event.target);
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            focusOption((index + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
          } else if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            focusOption(event.key === "Home" ? 0 : options.length - 1);
          }
        }}
      >
        {locales.map((option) => (
          <button
            role="menuitemradio"
            aria-checked={locale === option}
            type="button"
            key={option}
            lang="en"
            onClick={() => changeLanguage(option)}
          >
            <span>{localeInfo[option].label}</span>
            {locale === option && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m20 6-11 11-5-5" />
              </svg>
            )}
          </button>
        ))}
      </div>
      {pending && <span className="sr-only" role="status">{pendingLabel}</span>}
      {error && <p className="language-error" role="alert">{errorLabel}</p>}
    </div>
  );
}
