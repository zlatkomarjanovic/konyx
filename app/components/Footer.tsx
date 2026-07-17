"use client";

import { useLayoutEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { Container } from "./Container";
import { useTheme } from "./ThemeProvider";

const footerLinks = [
  { href: "#templates", label: "Templates" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#", label: "Contact" },
];

export function Footer() {
  const brandRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const { theme, mounted } = useTheme();
  const fillId =
    mounted && theme === "dark" ? "footer-konyx-fill-dark" : "footer-konyx-fill";
  const innerShadowFill =
    mounted && theme === "dark"
      ? "rgba(255, 255, 255, 0.07)"
      : "rgba(24, 24, 27, 0.065)";
  const innerHighlightFill =
    mounted && theme === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(255, 255, 255, 0.55)";

  const brandTextProps = {
    x: 0,
    y: 158,
    fontSize: 192,
    fontWeight: 700 as const,
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    textLength: 1000,
    lengthAdjust: "spacing" as const,
  };

  useLayoutEffect(() => {
    if (brandRef.current) {
      gsap.set(brandRef.current, { y: 100 });
    }
  }, []);

  useLenis(({ scroll }) => {
    const brand = brandRef.current;
    const footer = footerRef.current;
    if (!brand || !footer) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      gsap.set(brand, { y: 0 });
      return;
    }

    const footerTop = scroll + footer.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;
    const scrollStart = footerTop - viewportHeight * 1.35;
    const scrollEnd = footerTop - viewportHeight * 0.72;
    const progress = gsap.utils.clamp(
      0,
      1,
      (scroll - scrollStart) / (scrollEnd - scrollStart),
    );

    gsap.set(brand, { y: 100 - progress * 100 });
  });

  return (
    <footer
      ref={footerRef}
      className="relative bg-white pb-8 pt-10 dark:bg-black"
    >
      <Container className="relative z-10">
        <div ref={brandRef} className="footer-brand-outline-wrap mb-[1rem]">
          <svg
            className="footer-brand-outline-svg"
            viewBox="0 0 1000 192"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <clipPath id="footer-konyx-clip">
                <text {...brandTextProps}>KONYX</text>
              </clipPath>
              <filter
                id="footer-konyx-shadow-blur"
                x="-8%"
                y="-8%"
                width="116%"
                height="116%"
              >
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.35" />
              </filter>
              <linearGradient
                id="footer-konyx-fill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stopColor="#F6F6F7" stopOpacity="1" />
                <stop offset="55%" stopColor="#F6F6F7" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
              </linearGradient>
              <linearGradient
                id="footer-konyx-fill-dark"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stopColor="#000000" stopOpacity="1" />
                <stop offset="55%" stopColor="#000000" stopOpacity="1" />
                <stop offset="100%" stopColor="#000000" stopOpacity="1" />
              </linearGradient>
            </defs>
            <g clipPath="url(#footer-konyx-clip)">
              <text
                {...brandTextProps}
                fill={innerShadowFill}
                stroke="none"
                filter="url(#footer-konyx-shadow-blur)"
                transform="translate(-1.5, -1.5)"
              >
                KONYX
              </text>
              <text
                {...brandTextProps}
                fill={innerHighlightFill}
                stroke="none"
                filter="url(#footer-konyx-shadow-blur)"
                transform="translate(1.5, 1.5)"
              >
                KONYX
              </text>
            </g>
            <text
              {...brandTextProps}
              fill={`url(#${fillId})`}
              stroke="currentColor"
              strokeWidth="1"
              strokeLinejoin="round"
              strokeLinecap="round"
              shapeRendering="geometricPrecision"
              vectorEffect="non-scaling-stroke"
              paintOrder="stroke fill"
            >
              KONYX
            </text>
          </svg>
        </div>

        <div className="flex flex-col items-start gap-6 border-t border-border/60 pt-8 md:flex-row md:items-center md:justify-between dark:border-white/10">
          <span className="font-serif text-xl tracking-tight text-foreground">
            Konyx
          </span>
          <nav>
            <ul className="flex flex-wrap items-center gap-6">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Konyx
          </p>
        </div>
      </Container>
    </footer>
  );
}
