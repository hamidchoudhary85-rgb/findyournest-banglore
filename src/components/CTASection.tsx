import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import happyTenants from "@/assets/happy-tenants.jpg";

const CTASection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="relative rounded-3xl overflow-hidden hero-gradient">
          <div className="absolute inset-0 opacity-10">
            <img src={happyTenants} alt="Happy tenants" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 p-12 md:p-20 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-6"
            >
              Moving to Bangalore?
              <br />
              <span className="text-gradient-primary">Let AI Find Your Home.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-primary-foreground/70 text-lg max-w-xl mx-auto mb-10"
            >
              Tell us your salary, budget, office, and needs. We'll rank the best homes with a transparent match score. No random browsing.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button size="lg" className="text-lg px-10 py-6 rounded-xl font-semibold group">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
