import { motion } from "framer-motion";
import { UserPlus, SlidersHorizontal, MapPin, Star } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Tell Us About You",
    description: "Salary band, family type, single or married — quick cards, no long forms.",
  },
  {
    icon: SlidersHorizontal,
    step: "02",
    title: "Set Your Preferences",
    description: "Rent budget (₹5K–₹25K), BHK type, office location, commute limit, safety priority.",
  },
  {
    icon: MapPin,
    step: "03",
    title: "Get Matched Homes",
    description: "AI ranks every home with a transparent match score. Budget, commute, safety — all broken down.",
  },
  {
    icon: Star,
    step: "04",
    title: "Compare & Decide",
    description: "Shortlist up to 3 homes, compare side-by-side, get AI recommendations, contact owners directly.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-secondary" id="how-it-works">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">How It Works</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-4 text-secondary-foreground">
            From Confused to <span className="text-gradient-primary">Confident</span> in 4 Steps
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              <div className="text-6xl font-extrabold text-primary/10 mb-4">{step.step}</div>
              <div className="w-14 h-14 rounded-2xl score-gradient flex items-center justify-center mb-4">
                <step.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-secondary-foreground">{step.title}</h3>
              <p className="text-secondary-foreground/60 leading-relaxed">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 right-0 translate-x-1/2 w-12 h-0.5 bg-primary/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
