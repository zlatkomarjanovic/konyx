import Link from "next/link";
import { CATEGORY_LABELS, type Template } from "@/lib/templates";
import { SectionTag } from "./SectionTag";
import { TemplatePreviewArt } from "./TemplatePreviewArt";

type TemplateCardProps = {
  template: Template;
};

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Link
      href={`/templates/${template.slug}`}
      className="template-card group block p-4"
    >
      <div className="template-card-frame overflow-hidden p-2">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
          <TemplatePreviewArt category={template.category} />
        </div>
      </div>

      <div className="pt-3">
        <div className="flex items-center justify-between gap-3">
          <SectionTag className="px-2.5 py-0.5 text-xs text-muted">
            {CATEGORY_LABELS[template.category]}
          </SectionTag>
          <span className="text-sm font-medium text-foreground/80">
            ${template.price}
          </span>
        </div>
        <h3 className="mt-3 font-serif text-xl leading-tight tracking-tight text-foreground">
          {template.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted/80">
          {template.description}
        </p>
      </div>
    </Link>
  );
}
