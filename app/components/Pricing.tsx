import { pricingPlans } from "@/lib/pricing";
import { Container } from "./Container";
import { PricingCard } from "./PricingCard";
import { SectionTag } from "./SectionTag";

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-background py-20 sm:py-28 dark:bg-[#0a0a0a]"
    >
      <div
        className="benefits-dot-pattern pointer-events-none absolute inset-0 opacity-60 dark:opacity-40"
        aria-hidden
      />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <SectionTag>Pricing</SectionTag>

          <h2 className="mt-6 font-serif text-3xl leading-tight tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] dark:text-white">
            <span className="italic text-accent">Tailored plans</span> for every
            stage of your build
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg dark:text-white/50">
            Whether you need one page or a full client roster, pick the license
            that fits and start shipping without the slop.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={plan.highlighted ? "lg:-mt-2 lg:mb-2" : undefined}
            >
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
