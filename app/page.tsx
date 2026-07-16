import { BenefitsGrid } from "./components/BenefitsGrid";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Pricing } from "./components/Pricing";
import { StoreSection } from "./components/StoreSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <StoreSection />
        <BenefitsGrid />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
