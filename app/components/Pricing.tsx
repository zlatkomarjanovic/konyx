import { pricingPlans } from "@/lib/pricing";
import { PricingCard } from "./PricingCard";
import { SectionTag } from "./SectionTag";

export function Pricing() {
  return (
    <section
      id="pricing"
      className="section-min-viewport bg-white dark:bg-black md:flex md:flex-col md:justify-center"
    >
      <div className="w-full p-4">
        <div className="relative overflow-hidden rounded-[3rem] border border-border/70 bg-[#f4f6f9] dark:border-white/10 dark:bg-[#0a0a0a]">
          <div
            className="benefits-dot-pattern pointer-events-none absolute inset-0 opacity-60 dark:opacity-40"
            aria-hidden
          />

          <div className="relative mx-auto w-full max-w-container px-6 py-20 sm:py-28 md:py-28">
            <div className="mx-auto max-w-2xl text-center" data-reveal="blur-in">
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

            <div
              className="mt-14 grid gap-5 lg:grid-cols-3 lg:gap-6"
              data-reveal="pop-stagger"
            >
              {pricingPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={plan.highlighted ? "lg:-mt-2 lg:mb-2" : undefined}
                  data-reveal-item
                >
                  <PricingCard
                    plan={plan}
                    compact={plan.id === "single-page" || plan.id === "agency"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
