import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Pricing } from "./components/Pricing";
import { StoreSection } from "./components/StoreSection";
import { WhatsIncluded } from "./components/WhatsIncluded";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <StoreSection />
        <WhatsIncluded />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
