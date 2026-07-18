import Image from "next/image";
import Link from "next/link";
import { getPreviewCategory, type Template } from "@/lib/catalog";
import { SectionTag } from "./SectionTag";
import { TemplatePreviewArt } from "./TemplatePreviewArt";

type TemplateCardProps = {
  template: Template;
};

export function TemplateCard({ template }: TemplateCardProps) {
  const hasRemoteThumbnail = template.thumbnail.startsWith("http");
  const previewCategory = getPreviewCategory(template);

  return (
    <Link
      href={`/templates/${template.slug}`}
      className="template-card group block p-4"
    >
      <div className="template-card-frame overflow-hidden p-2">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
          {hasRemoteThumbnail ? (
            <Image
              src={template.thumbnail}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <TemplatePreviewArt category={previewCategory} />
          )}
        </div>
      </div>

      <div className="pt-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {template.categories.map((category) => (
              <SectionTag key={category.id} className="px-2.5 py-0.5 text-xs text-muted">
                {category.title}
              </SectionTag>
            ))}
          </div>
          <span className="shrink-0 text-sm font-medium text-foreground/80">
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
