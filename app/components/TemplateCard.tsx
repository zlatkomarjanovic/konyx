import Link from "next/link";
import { CATEGORY_LABELS, type Template } from "@/lib/templates";

type TemplateCardProps = {
  template: Template;
};

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Link
      href={`/templates/${template.slug}`}
      className="group block overflow-hidden rounded-lg border border-border bg-background transition-all hover:-translate-y-0.5 hover:border-foreground/20"
    >
      <div className="aspect-video bg-surface-secondary">
        <div className="flex h-full items-center justify-center text-sm text-muted">
          Preview
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-lg text-foreground">{template.name}</h3>
          <span className="shrink-0 text-sm font-medium text-foreground">
            ${template.price}
          </span>
        </div>
        <p className="mt-1.5 text-sm text-muted">
          {CATEGORY_LABELS[template.category]}
        </p>
      </div>
    </Link>
  );
}
