import { motion } from "framer-motion";
import { MapPin, Shield, Clock, IndianRupee, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactUsModal } from "./ContactUsModal";
import { AddPropertyModal } from "./AddPropertyModal";
import { AddAmenitiesModal } from "./AddAmenitiesModal";
import { AddDistanceTableModal } from "./AddDistanceTableModal";
import { FeedbackModal } from "./FeedbackModal";
import { ScoreTableModal } from "./ScoreTableModal";
import heroImg from "@/assets/bangalore-hero.jpg";

const HeroSection = () => (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Bangalore cityscape at golden hour" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient opacity-85" />
      </div>

      {/* Floating action buttons (Desktop only) - relocated to naturally scroll with the page */}
      <div className="hidden md:flex flex-col items-end gap-2 absolute top-24 right-4 z-20">
        <ContactUsModal className="rounded-lg font-semibold h-9 px-4 text-sm shadow-md bg-card/90 hover:bg-card text-foreground border border-border transition-colors w-48" />
        <AddPropertyModal className="rounded-lg font-semibold h-9 px-4 text-sm shadow-md bg-card/90 hover:bg-card text-foreground border border-border transition-colors w-48" />
        <AddAmenitiesModal className="rounded-lg font-semibold h-9 px-4 text-sm shadow-md bg-card/90 hover:bg-card text-foreground border border-border transition-colors w-48" />
        <AddDistanceTableModal className="rounded-lg font-semibold h-9 px-4 text-sm shadow-md bg-card/90 hover:bg-card text-foreground border border-border transition-colors w-48" />
        <ScoreTableModal className="rounded-lg font-semibold h-9 px-4 text-sm shadow-md bg-card/90 hover:bg-card text-foreground border border-border transition-colors w-48" variant="secondary" />
        <FeedbackModal className="rounded-lg font-semibold h-9 px-4 text-sm shadow-md bg-card/90 hover:bg-card text-foreground border border-border transition-colors w-48" variant="outline" />
      </div>

      <div className="w-full relative z-10 py-20 px-4 sm:px-12 lg:px-24 flex flex-col items-start text-left">
        <div className="w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-start gap-2 mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium border border-primary/30">
              <Brain className="w-4 h-4" />
              AI-Powered Rental Intelligence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-primary-foreground mb-6 px-4"
          >
            Find Your Perfect
            <span className="text-gradient-primary block">Home in Bangalore</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-primary-foreground/70 mb-8 leading-relaxed w-full max-w-2xl mr-auto"
          >
            The AI matchmaker for working professionals earning ₹30K–₹50K.
            <span className="block mt-2">We rank homes by budget fit, commute, safety & your real needs — not random listings.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-start gap-4"
          >
            <Button size="lg" className="text-lg px-8 py-6 rounded-xl font-semibold animate-pulse-glow">
              Find My Home
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 rounded-xl font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              See How It Works
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-start gap-6 mt-12"
          >
            {[
              { icon: IndianRupee, label: "₹5K – ₹25K Rent" },
              { icon: MapPin, label: "Bangalore Focus" },
              { icon: Shield, label: "Safety Scored" },
              { icon: Clock, label: "Commute-Aware" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-primary-foreground/60 text-sm">
                <item.icon className="w-4 h-4 text-primary" />
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
);

export default HeroSection;
