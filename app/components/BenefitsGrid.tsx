import { benefits } from "@/lib/benefits";
import { BenefitAnimatedIcon } from "./BenefitAnimatedIcon";
import { Container } from "./Container";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";
import { SectionTag } from "./SectionTag";

export function BenefitsGrid() {
  return (
    <section id="benefits" className="relative overflow-hidden bg-white py-section-sm dark:bg-black md:py-section">
      <Container className="relative">
        <div
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
          data-reveal="slide-left"
        >
          <SectionTag>Why choose Konyx</SectionTag>

          <h2 className="mt-8 font-serif text-3xl tracking-tight text-foreground md:text-5xl md:leading-tight">
            Your starting point should
            <br />
            look <span className="italic text-accent">designed</span>, not generated
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted/80 md:text-base">
            Your business deserves better than slop. Konyx gives you layouts,
            tokens, and reskin workflows that hold up under client scrutiny, so
            you spend less time fixing obvious AI tells and more time shipping.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <PrimaryButton href="#templates" className="h-10 px-5">
              Browse templates
            </PrimaryButton>
            <SecondaryButton href="#pricing" className="h-10 px-5">
              View pricing
            </SecondaryButton>
          </div>
        </div>

        <div className="relative mt-20">
          <div
            aria-hidden
            className="benefits-dot-pattern pointer-events-none absolute inset-0"
            style={{
              maskImage:
                "linear-gradient(to right, black 0%, black 38%, transparent 78%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 0%, black 38%, transparent 78%)",
            }}
          />

          <div
            className="relative grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16"
            data-reveal="rise-stagger"
          >
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="flex flex-col items-center text-center"
              data-reveal-item
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-[rgba(10,15,41,0.08)] bg-white dark:border-white/10 dark:bg-card">
                <BenefitAnimatedIcon name={benefit.icon} delay={index * 0.3} />
              </div>
              <h3 className="mt-5 text-lg font-medium leading-snug text-foreground">
                {benefit.title}
              </h3>
              <p className="mt-2 max-w-[17rem] text-sm leading-relaxed text-black/55 dark:text-muted/80">
                {benefit.description}
              </p>
            </div>
          ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
