import { Container } from "./Container";
import { FaqAccordion } from "./FaqAccordion";
import { SectionTag } from "./SectionTag";

export function Faq() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden py-section-sm md:py-section"
    >
      <div className="faq-section-bg pointer-events-none absolute inset-0" aria-hidden />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center" data-reveal="blur-in">
          <SectionTag>Questions</SectionTag>

          <h2 className="mt-6 font-serif text-3xl leading-tight tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] dark:text-white">
            <span className="text-muted/70 dark:text-white/45">Got questions? </span>
            We&apos;ve got answers
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg dark:text-white/50">
            Explore our frequently asked questions to find what you need about
            templates, licensing, and how Konyx fits into your workflow.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <FaqAccordion />
        </div>
      </Container>
    </section>
  );
}
