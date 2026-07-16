import { PrimaryButton } from "./PrimaryButton";

export function Hero() {
  return (
    <div className="max-w-[33rem]">
      <h1 className="font-serif text-3xl leading-[1.12] tracking-tight text-foreground md:text-4xl lg:text-[2.75rem]">
        Skip <span className="italic text-accent">twenty prompts</span> before your
        agent stops <span className="italic text-accent">producing slop</span>.
      </h1>
      <p className="mt-5 text-sm leading-relaxed text-muted/80 md:text-base">
        Stop burning prompts and tokens on a landing page that still looks like
        typical AI slop without any taste. Start with senior-designer-quality,
        industry-specific, ready to customize in minutes, not days.
      </p>
      <div className="mt-8">
        <PrimaryButton href="#templates" className="h-11 px-6 text-sm font-medium">
          Browse templates
        </PrimaryButton>
      </div>
    </div>
  );
}
