import { BenefitsGrid } from "./components/BenefitsGrid";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Pricing } from "./components/Pricing";
import { StoreSection } from "./components/StoreSection";
import { getProducts } from "@/lib/products";

export const revalidate = 120;

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <StoreSection products={products} />
        <BenefitsGrid />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
