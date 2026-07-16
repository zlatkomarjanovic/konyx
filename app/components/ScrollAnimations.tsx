"use client";

import { useEffect } from "react";
import gsap from "gsap";

type RevealPreset = {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  stagger?: number;
};

const PRESETS: Record<string, RevealPreset> = {
  hero: {
    from: { opacity: 0, y: 36, scale: 0.97, filter: "blur(14px)" },
    to: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.15, ease: "power3.out" },
    stagger: 0.11,
  },
  "blur-in": {
    from: { opacity: 0, filter: "blur(16px)", scale: 1.02 },
    to: { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.1, ease: "power2.out" },
  },
  "slide-left": {
    from: { opacity: 0, x: -56, filter: "blur(6px)" },
    to: { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.05, ease: "power3.out" },
  },
  "rise-stagger": {
    from: { opacity: 0, y: 64, filter: "blur(8px)" },
    to: { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" },
    stagger: 0.1,
  },
  "scale-stagger": {
    from: { opacity: 0, y: 48, scale: 0.9, filter: "blur(12px)" },
    to: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.1, ease: "power3.out" },
    stagger: 0.09,
  },
  "pop-stagger": {
    from: { opacity: 0, y: 40, scale: 0.86, rotateX: 8, filter: "blur(10px)" },
    to: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      duration: 1.15,
      ease: "back.out(1.2)",
    },
    stagger: 0.12,
  },
  "fade-up": {
    from: { opacity: 0, y: 28, filter: "blur(4px)" },
    to: { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power2.out" },
  },
};

function getTargets(container: HTMLElement) {
  const items = container.querySelectorAll<HTMLElement>("[data-reveal-item]");
  return items.length > 0 ? [...items] : [container];
}

function playReveal(container: HTMLElement, presetKey: string) {
  const preset = PRESETS[presetKey];
  if (!preset) return;

  const targets = getTargets(container);
  gsap.fromTo(targets, preset.from, {
    ...preset.to,
    stagger: preset.stagger,
    onComplete: () => {
      gsap.set(targets, { clearProps: "filter" });
    },
  });
}

function primeHidden(container: HTMLElement, presetKey: string) {
  const preset = PRESETS[presetKey];
  if (!preset) return;

  gsap.set(getTargets(container), preset.from);
}

export function ScrollAnimations() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      document.documentElement.classList.add("scroll-animations-ready");
      return;
    }

    const heroContainer = document.querySelector<HTMLElement>("[data-reveal='hero']");
    const heroItems = heroContainer?.querySelectorAll<HTMLElement>("[data-reveal-item]");

    if (heroContainer && heroItems && heroItems.length > 0) {
      gsap.set(heroItems, PRESETS.hero.from);
      gsap.to(heroItems, {
        ...PRESETS.hero.to,
        stagger: PRESETS.hero.stagger,
        delay: 0.12,
        onComplete: () => gsap.set(heroItems, { clearProps: "filter" }),
      });
    }

    const scrollContainers = gsap.utils.toArray<HTMLElement>(
      "[data-reveal]:not([data-reveal='hero'])",
    );

    scrollContainers.forEach((container) => {
      const presetKey = container.dataset.reveal;
      if (presetKey) primeHidden(container, presetKey);
    });

    const revealed = new WeakSet<HTMLElement>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const container = entry.target as HTMLElement;
          if (revealed.has(container)) return;

          const presetKey = container.dataset.reveal;
          if (!presetKey || presetKey === "hero") return;

          revealed.add(container);
          playReveal(container, presetKey);
          observer.unobserve(container);
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.08,
      },
    );

    scrollContainers.forEach((container) => observer.observe(container));

    document.documentElement.classList.add("scroll-animations-ready");

    const safetyTimer = window.setTimeout(() => {
      scrollContainers.forEach((container) => {
        if (revealed.has(container)) return;

        const presetKey = container.dataset.reveal;
        if (!presetKey) return;

        const targets = getTargets(container);
        const stuck = targets.some(
          (target) => Number.parseFloat(window.getComputedStyle(target).opacity) < 0.2,
        );

        if (stuck) {
          revealed.add(container);
          playReveal(container, presetKey);
        }
      });
    }, 4000);

    return () => {
      window.clearTimeout(safetyTimer);
      observer.disconnect();
      gsap.killTweensOf("[data-reveal], [data-reveal-item]");
      document.documentElement.classList.remove("scroll-animations-ready");
    };
  }, []);

  return null;
}
