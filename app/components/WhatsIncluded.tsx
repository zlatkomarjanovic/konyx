import { Code2, MessageSquare, TerminalSquare } from "lucide-react";
import { Container } from "./Container";

const items = [
  {
    icon: TerminalSquare,
    label: ".cursor/rules included",
    description:
      "Cursor already knows your architecture and conventions before you type a prompt",
  },
  {
    icon: MessageSquare,
    label: "Reskin prompt kit",
    description:
      "Pre-written prompts to swap branding, copy and sections without breaking layout",
  },
  {
    icon: Code2,
    label: "Full source, no lock-in",
    description:
      "Plain Next.js and Tailwind — nothing proprietary, nothing to migrate away from later",
  },
];

export function WhatsIncluded() {
  return (
    <section id="included" className="bg-surface py-section-sm md:py-section">
      <Container>
        <div className="max-w-lg">
          <p className="text-sm text-muted">Every template</p>
          <h2 className="mt-2 font-serif text-3xl tracking-tight text-foreground md:text-4xl">
            What&apos;s included
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {items.map((item) => (
            <div key={item.label}>
              <item.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
              <h3 className="mt-5 font-serif text-xl text-foreground">
                {item.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
