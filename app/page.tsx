import { BenefitsGrid } from "./components/BenefitsGrid";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Pricing } from "./components/Pricing";
import { StoreSection } from "./components/StoreSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <StoreSection />
        <BenefitsGrid />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
