import { PrimaryButton } from "./PrimaryButton";

export function Hero() {
  return (
    <div className="max-w-[33rem]" data-reveal="hero">
      <p className="text-sm font-light text-muted/70" data-reveal-item>
        Your users recognize AI slop
      </p>
      <h1
        className="mt-3 font-serif text-3xl leading-[1.12] tracking-tight text-foreground md:text-4xl lg:text-[2.75rem]"
        data-reveal-item
      >
        Skip <span className="italic text-accent">twenty prompts</span> before your
        agent stops <span className="italic text-accent">producing slop</span>.
      </h1>
      <p
        className="mt-5 text-sm leading-relaxed text-muted/80 md:text-base"
        data-reveal-item
      >
        Stop burning prompts and tokens on a landing page that still looks like
        typical AI slop without any taste. Start with senior-designer-quality,
        industry-specific, ready to customize in minutes, not days.
      </p>
      <div className="mt-8" data-reveal-item>
        <PrimaryButton href="#templates" className="h-10 px-5">
          Browse templates
        </PrimaryButton>
      </div>
    </div>
  );
}
