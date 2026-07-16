import Link from "next/link";
import { notFound } from "next/navigation";
import { templates } from "@/lib/templates";

type TemplatePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { slug } = await params;
  const template = templates.find((item) => item.slug === slug);

  if (!template) {
    notFound();
  }

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6 py-24">
      <p className="text-sm font-medium text-muted">{template.name}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        Coming soon
      </h1>
      <p className="mt-4 max-w-md text-center text-muted">
        This template page is under construction. Check back soon for previews,
        details, and purchase options.
      </p>
      <Link
        href="/#templates"
        className="mt-8 inline-flex h-10 items-center rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
      >
        Back to templates
      </Link>
    </div>
  );
}
