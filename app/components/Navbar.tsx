"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 bg-background/90 backdrop-blur-sm transition-[border-color,background-color] duration-400 ${
        scrolled ? "border-b border-border" : "border-b border-transparent"
      }`}
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
            <PrimaryButton href="#templates" className="hidden h-9 px-4 text-sm font-medium md:inline-flex">
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
                  className="h-9 w-full px-4 text-sm font-medium"
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
  );
}
