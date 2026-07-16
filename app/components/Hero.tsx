export function Hero() {
  return (
    <div className="max-w-xl">
      <h1 className="font-serif text-4xl leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-[3.25rem]">
        Start from something that already looks right
      </h1>
      <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
        Premium Next.js templates for dental, wellness, real estate, and agency
        sites — built to reskin fast with Cursor or Claude Code.
      </p>
      <div className="mt-8">
        <a
          href="#included"
          className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-6 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
        >
          See what&apos;s included
        </a>
      </div>
    </div>
  );
}
