
import Navbar from "@/components/Navbar/mainNavContainer";
import HeroContent from "@/components/Hero/HeroContent";
import Allfeatures from "@/components/Features/Allfeatures";
import { DashboardPreview } from "@/components/Features/dashboard-preview";
import { PricingSection } from "@/components/Features/pricing-section";
import CTA from "@/components/Features/CTA"
import Footer from "@/components/Footer/Footer";



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
