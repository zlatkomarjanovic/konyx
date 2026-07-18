import { BenefitsGrid } from "./components/BenefitsGrid";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Pricing } from "./components/Pricing";
import { StoreSection } from "./components/StoreSection";
import { getCatalog } from "@/lib/products";

export const revalidate = 120;

export default async function Home() {
  const { products, filters } = await getCatalog();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <StoreSection products={products} filters={filters} />
        <BenefitsGrid />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
