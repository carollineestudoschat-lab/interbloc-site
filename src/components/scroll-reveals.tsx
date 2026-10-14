"use client";

import { useEffect } from "react";

/** Progressive enhancement: content is visible before JS and without an observer. */
export function ScrollReveals() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!("IntersectionObserver" in window)) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    let observer: IntersectionObserver | undefined;

    const configure = () => {
      observer?.disconnect();
      if (preference.matches) {
        elements.forEach((element) => element.classList.remove("reveal-entered"));
        return;
      }

      try {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(({ target, isIntersecting }) => {
              if (!isIntersecting) return;
              const element = target as HTMLElement;
              element.classList.add("reveal-entered");
              element.dataset.revealed = "true";
              observer?.unobserve(element);
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
        );
        elements.forEach((element) => {
          if (!element.dataset.revealed) observer?.observe(element);
        });
      } catch {
        // Keep the server-rendered content visible if the browser API fails.
        observer?.disconnect();
      }
    };

    configure();
    preference.addEventListener("change", configure);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", configure);
      elements.forEach((element) => element.classList.remove("reveal-entered"));
    };
  }, []);

  return null;
}
