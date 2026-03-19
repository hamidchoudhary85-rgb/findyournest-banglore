import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CityFitSection from "@/components/CityFitSection";
import AffordabilitySection from "@/components/AffordabilitySection";
import PropertyListingsSection from "@/components/PropertyListingsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { GeminiChatbot } from "@/components/GeminiChatbot";

import { useState } from "react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <HeroSection />
      <FeaturesSection />
      <PropertyListingsSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <HowItWorksSection />
      <AffordabilitySection />
      <CityFitSection />
      <CTASection />
      <Footer />
      <GeminiChatbot />
    </div>
  );
};

export default Index;
