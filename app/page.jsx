
import Navbar from "@/Components/Navbar/mainNavContainer";
import HeroContent from "@/Components/Hero/HeroContent";
import Allfeatures from "@/Components/Features/Allfeatures";
import { DashboardPreview } from "@/Components/Features/dashboard-preview";
import { PricingSection } from "@/Components/Features/pricing-section";
import CTA from "@/Components/Features/CTA"
import Footer from "@/Components/Footer/Footer";



export default function Home() {
  return (
    <div className="w-[100vw] h-[100dvh] overflow-x-hidden ">
      <header>
        <Navbar />
        <HeroContent />
      </header>
      <main>
        <Allfeatures />
        <DashboardPreview />
     <CTA />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
