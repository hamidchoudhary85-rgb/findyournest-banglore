import { motion } from "framer-motion";
import { Brain, MapPin, Shield, IndianRupee, Route, Search, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Smart Onboarding",
    description: "AI asks simple questions about your salary, family, and office — then auto-generates perfect filters. No long forms.",
    gradient: "score-gradient",
  },
  {
    icon: IndianRupee,
    title: "Budget Intelligence",
    description: "AI recommends a safe rent range based on your salary and warns you if a pick will hurt your finances by month-end.",
    gradient: "accent-gradient",
  },
  {
    icon: Route,
    title: "Commute-Aware Ranking",
    description: "Homes ranked by real travel time — not just distance. A 5km traffic nightmare loses to a 9km metro-connected gem.",
    gradient: "score-gradient",
  },
  {
    icon: Shield,
    title: "Safety Score",
    description: "Practical safety confidence from gated access, street lighting, police proximity, and community reviews. Advisory, not a guarantee.",
    gradient: "accent-gradient",
  },
  {
    icon: Search,
    title: "Natural Language Search",
    description: '"Show me 1BHK under ₹12K near Manyata Tech Park" — just type what you need and AI converts it into filters.',
    gradient: "score-gradient",
  },
  {
    icon: BarChart3,
    title: "Transparent Match Score",
    description: "Every listing shows a breakdown: Budget 28/30, Commute 25/30, Safety 15/15. You see why each home scored what it did.",
    gradient: "accent-gradient",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background" id="features">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Why NearNest</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-4">
            Not More Listings. <span className="text-gradient-primary">Better Decisions.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We solve the five biggest pain points of relocating: affordability, city ignorance, distance confusion, safety uncertainty, and decision overload.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:card-glow transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.gradient} flex items-center justify-center mb-5`}>
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
