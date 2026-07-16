"use client";

import Link from "next/link";
import { useLenis } from "lenis/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Container } from "./Container";
import { PrimaryButton } from "./PrimaryButton";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "#templates", label: "Templates" },
  { href: "#pricing", label: "Pricing" },
  { href: "#benefits", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useLenis(({ scroll }) => {
    setScrolled(scroll > 0);

    if (scroll <= 10) {
      setVisible(true);
    } else if (scroll > lastScrollY.current + 8) {
      setVisible(false);
    } else if (scroll < lastScrollY.current - 8) {
      setVisible(true);
    }

    lastScrollY.current = scroll;
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const showNav = visible || mobileOpen;

  return (
    <>
      <header
        className={`navbar-shell fixed inset-x-0 top-0 z-50 bg-background/90 backdrop-blur-sm ${
          showNav ? "navbar-shell-visible" : "navbar-shell-hidden"
        } ${scrolled ? "border-b border-border" : "border-b border-transparent"}`}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-10">
              <Link
                href="/"
                className="font-serif text-xl tracking-tight text-foreground"
              >
                Konyx
              </Link>

              <ul className="hidden items-center gap-8 md:flex">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <PrimaryButton
                href="#templates"
                className="hidden h-8 px-3.5 md:inline-flex"
              >
                Browse templates
              </PrimaryButton>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((open) => !open)}
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </nav>
        </Container>

        {mobileOpen && (
          <div className="border-t border-border md:hidden">
            <Container className="py-4">
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="block text-sm text-muted transition-colors hover:text-foreground"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <PrimaryButton
                    href="#templates"
                    className="h-8 w-full px-3.5"
                    onClick={() => setMobileOpen(false)}
                  >
                    Browse templates
                  </PrimaryButton>
                </li>
              </ul>
            </Container>
          </div>
        )}
      </header>
      <div aria-hidden className="h-16 shrink-0" />
    </>
  );
}
