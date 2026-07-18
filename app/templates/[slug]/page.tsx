import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/app/components/Container";
import { Footer } from "@/app/components/Footer";
import { Navbar } from "@/app/components/Navbar";
import { PrimaryButton } from "@/app/components/PrimaryButton";
import { SecondaryButton } from "@/app/components/SecondaryButton";
import { SectionTag } from "@/app/components/SectionTag";
import { TemplatePreviewArt } from "@/app/components/TemplatePreviewArt";
import { getPreviewCategory } from "@/lib/catalog";
import { getProductBySlug, getProducts } from "@/lib/products";

type TemplatePageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 120;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const hasRemoteThumbnail = product.thumbnail.startsWith("http");
  const checkoutUrl = product.polarCheckoutUrl;
  const previewCategory = getPreviewCategory(product);

  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 md:py-16">
        <Container>
          <Link
            href="/#templates"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Back to store
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
            <div className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-card p-3 dark:border-white/10">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem]">
                {hasRemoteThumbnail ? (
                  <Image
                    src={product.thumbnail}
                    alt=""
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                ) : (
                  <TemplatePreviewArt category={previewCategory} />
                )}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-2">
                {product.categories.map((category) => (
                  <SectionTag key={category.id}>{category.title}</SectionTag>
                ))}
              </div>
              <h1 className="mt-4 font-serif text-4xl tracking-tight text-foreground md:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                {product.description}
              </p>

              <div className="mt-8 flex items-end gap-2">
                <span className="font-serif text-4xl leading-none text-muted">$</span>
                <span className="font-serif text-5xl leading-none tracking-tight text-foreground">
                  {product.price}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {checkoutUrl ? (
                  <PrimaryButton href={checkoutUrl} className="h-10 px-5">
                    Buy now
                  </PrimaryButton>
                ) : (
                  <PrimaryButton href="/#pricing" className="h-10 px-5">
                    View pricing
                  </PrimaryButton>
                )}
                {product.demoUrl ? (
                  <SecondaryButton href={product.demoUrl} className="h-10 px-5">
                    Live preview
                  </SecondaryButton>
                ) : null}
              </div>

              {product.features && product.features.length > 0 ? (
                <ul className="mt-10 space-y-3 border-t border-border/60 pt-8 dark:border-white/10">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-sm leading-relaxed text-foreground/85"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
