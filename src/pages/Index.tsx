import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CityFitSection from "@/components/CityFitSection";
import AffordabilitySection from "@/components/AffordabilitySection";
import PropertyListingsSection from "@/components/PropertyListingsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PropertyListingsSection />
      <HowItWorksSection />
      <AffordabilitySection />
      <CityFitSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
