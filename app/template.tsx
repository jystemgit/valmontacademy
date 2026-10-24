"use client";

import { useEffect, useRef, type ReactNode } from "react";

const revealSelector = "main h1, main h2, main h3, main p, main article, main aside, main .dimension, main .hero-actions, main .hero-emblem";

export default function PageTemplate({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const revealed = new WeakSet<Element>();
    const targets = [...root.querySelectorAll<HTMLElement>(revealSelector)].filter(
      (element) => !element.parentElement?.closest(revealSelector),
    );
    const observer = new IntersectionObserver((entries) => {
      let order = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        revealed.add(entry.target);
        if (preference.matches) continue;

        const animation = entry.target.animate(
          [
            { opacity: 0, transform: "translateY(18px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            id: "page-reveal",
            duration: 650,
            delay: Math.min(order++ * 60, 180),
            easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
            fill: "backwards",
          },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { rootMargin: "0px 0px -24px 0px", threshold: 0 });

    function updateMotion() {
      observer.disconnect();
      for (const animation of animations) animation.cancel();
      animations.clear();
      if (!preference.matches) {
        targets.filter((element) => !revealed.has(element)).forEach((element) => observer.observe(element));
      }
    }

    function revealFocused(event: FocusEvent) {
      if (!(event.target instanceof Node)) return;
      for (const animation of animations) {
        if (animation.effect instanceof KeyframeEffect && animation.effect.target?.contains(event.target)) {
          animation.cancel();
          animations.delete(animation);
        }
      }
    }

    updateMotion();
    preference.addEventListener("change", updateMotion);
    root.addEventListener("focusin", revealFocused);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", updateMotion);
      root.removeEventListener("focusin", revealFocused);
    };
  }, [children]);

  return <div ref={rootRef} className="page-content">{children}</div>;
}
