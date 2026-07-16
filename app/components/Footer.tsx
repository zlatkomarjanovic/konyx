import { Container } from "./Container";

const footerLinks = [
  { href: "#templates", label: "Templates" },
  { href: "#pricing", label: "Pricing" },
  { href: "#", label: "Terms" },
  { href: "#", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-surface py-12">
      <Container>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
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
