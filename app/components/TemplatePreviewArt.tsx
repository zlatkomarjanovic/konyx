import type { TemplateCategory } from "@/lib/templates";

const ACCENTS: Record<
  TemplateCategory,
  { back: string; mid: string; front: string }
> = {
  templates: { back: "#dbeafe", mid: "#e0e7ff", front: "#ede9fe" },
  shaders: { back: "#ddd6fe", mid: "#fbcfe8", front: "#bfdbfe" },
  components: { back: "#dbeafe", mid: "#e9d5ff", front: "#cffafe" },
  prompts: { back: "#ccfbf1", mid: "#dbeafe", front: "#e0f2fe" },
  skills: { back: "#fef3c7", mid: "#fce7f3", front: "#dbeafe" },
  images: { back: "#fecdd3", mid: "#fde68a", front: "#bae6fd" },
  gradients: { back: "#c4b5fd", mid: "#f9a8d4", front: "#93c5fd" },
};

function WindowChrome() {
  return (
    <div className="flex items-center gap-1.5 px-2.5 pt-2.5">
      <span className="h-1.5 w-1.5 rounded-full bg-foreground/15" />
      <span className="h-1.5 w-1.5 rounded-full bg-foreground/15" />
      <span className="h-1.5 w-1.5 rounded-full bg-foreground/15" />
    </div>
  );
}

type TemplatePreviewArtProps = {
  category: TemplateCategory;
};

export function TemplatePreviewArt({ category }: TemplatePreviewArtProps) {
  const colors = ACCENTS[category];

  return (
    <div className="relative h-full w-full overflow-hidden bg-surface">
      <div
        className="template-card-window template-card-window-back absolute left-[12%] top-[16%] h-[52%] w-[50%] -rotate-3 opacity-90"
        style={{ backgroundColor: colors.back }}
      >
        <WindowChrome />
        <div className="mx-2.5 mt-1.5 h-2 rounded-full bg-white/60 dark:bg-white/10" />
      </div>
      <div
        className="template-card-window template-card-window-mid absolute left-[24%] top-[22%] z-10 h-[52%] w-[50%] opacity-95"
        style={{ backgroundColor: colors.mid }}
      >
        <WindowChrome />
        <div className="mx-2.5 mt-1.5 h-2 rounded-full bg-white/60 dark:bg-white/10" />
      </div>
      <div
        className="template-card-window template-card-window-front absolute left-[36%] top-[28%] z-20 h-[52%] w-[50%] rotate-2"
        style={{ backgroundColor: colors.front }}
      >
        <WindowChrome />
        <div className="mx-2.5 mt-1.5 h-2 rounded-full bg-white/60 dark:bg-white/10" />
        <div className="mx-2.5 mt-2 h-1.5 w-[50%] rounded-full bg-white/40 dark:bg-white/10" />
        <div className="mx-2.5 mt-1.5 h-1.5 w-[68%] rounded-full bg-white/40 dark:bg-white/10" />
      </div>
    </div>
  );
}
