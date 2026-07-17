export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "included",
    question: "What's included with a Konyx template?",
    answer:
      "Every template ships with a full Next.js project, design tokens, section components, and a reskin guide. You get production-ready layouts, not a loose collection of blocks you still have to wire together.",
  },
  {
    id: "customize",
    question: "Can I customize templates with Cursor or Claude Code?",
    answer:
      "Yes. Konyx templates are built for AI-assisted reskinning. Swap copy, colors, and imagery with clear file structure and prompts that keep output looking designed instead of generated.",
  },
  {
    id: "industries",
    question: "What industries do you cover?",
    answer:
      "We focus on high-trust verticals like dental, wellness, real estate, and agency sites, where generic AI output usually falls flat and polish matters most.",
  },
  {
    id: "licensing",
    question: "How does licensing work?",
    answer:
      "Single-page and full-site licenses cover client projects you build and ship. Agency plans include extended usage for teams with multiple active builds. Full terms are included with every purchase.",
  },
  {
    id: "updates",
    question: "Do you provide updates after purchase?",
    answer:
      "Template updates and bug fixes are included for the lifetime of the product. When we ship improvements to components or dependencies, you can pull them into existing projects.",
  },
];
