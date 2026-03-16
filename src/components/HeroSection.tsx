import { motion } from "framer-motion";
import { MapPin, Shield, Clock, IndianRupee, Brain, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/bangalore-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Bangalore cityscape at golden hour" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient opacity-85" />
      </div>

      <div className="w-full relative z-10 py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium border border-primary/30">
              <Brain className="w-4 h-4" />
              AI-Powered Rental Intelligence
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative w-full max-w-xl">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by area, landmark or office location..."
                className="w-full h-12 pl-12 pr-28 rounded-xl bg-card/95 backdrop-blur-sm border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                Search
              </button>
            </div>
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
            className="text-lg md:text-xl text-primary-foreground/70 max-w-xl mx-auto mb-8 leading-relaxed"
          >
            The AI matchmaker for working professionals earning ₹30K–₹50K. 
            We rank homes by budget fit, commute, safety & your real needs — not random listings.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
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
            className="flex flex-wrap justify-center gap-6 mt-12"
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
};

export default HeroSection;
