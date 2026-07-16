export type BenefitIconName =
  | "sparkles"
  | "layers"
  | "clock"
  | "coins"
  | "code"
  | "rocket";

export type Benefit = {
  icon: BenefitIconName;
  title: string;
  description: string;
};

export const benefits: Benefit[] = [
  {
    icon: "sparkles",
    title: "Get senior quality",
    description:
      "Layouts, typography, and motion that feel designed, not generated in a hurry on pass twelve.",
  },
  {
    icon: "layers",
    title: "Stand out in the sea of slop",
    description:
      "Your site won't look like every other AI-built landing page from the same three prompt templates.",
  },
  {
    icon: "clock",
    title: "Save time on prompting",
    description:
      "Skip the back-and-forth. Start from something that already works and reskin it in minutes.",
  },
  {
    icon: "coins",
    title: "Save money on tokens",
    description:
      "Fewer retries, fewer rewrites, fewer wasted credits trying to get one section right.",
  },
  {
    icon: "code",
    title: "Focus on building your software",
    description:
      "Stop burning cycles on marketing pages. Spend your time on the product people actually pay for.",
  },
  {
    icon: "rocket",
    title: "Ship from day one",
    description:
      "Production-ready Next.js, Cursor rules, and prompt kits included, so you launch, not tinker.",
  },
];
