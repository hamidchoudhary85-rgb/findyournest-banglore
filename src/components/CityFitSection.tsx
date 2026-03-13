import { motion } from "framer-motion";

const CityFitSection = () => {
  const scores = [
    { label: "Home Match", value: 88, color: "bg-primary" },
    { label: "Commute Fit", value: 91, color: "bg-accent" },
    { label: "Budget Fit", value: 95, color: "bg-primary" },
    { label: "Family Fit", value: 78, color: "bg-accent" },
    { label: "Safety Fit", value: 83, color: "bg-primary" },
  ];

  return (
    <section className="py-24 bg-background" id="city-fit">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">The Wow Factor</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              Not Just a House Score.{" "}
              <span className="text-gradient-primary">A Life Fit Score.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              We don't just score the property — we score how well your entire life fits around it. 
              Budget pressure, daily commute pain, family convenience, safety confidence — all in one glance.
            </p>
            <div className="bg-card border border-border rounded-2xl p-6">
              <p className="text-sm font-medium text-muted-foreground mb-1">AI Insight</p>
              <p className="text-foreground italic">
                "This option is best for a single professional who wants rent savings and an acceptable commute. 
                School access is weaker, so not ideal for families with school-going children."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-3xl p-8 card-glow"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">City Fit AI™</h3>
              <div className="score-gradient text-primary-foreground text-2xl font-extrabold px-4 py-2 rounded-xl">
                87%
              </div>
            </div>

            <div className="space-y-5">
              {scores.map((score, i) => (
                <motion.div
                  key={score.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{score.label}</span>
                    <span className="text-sm font-bold">{score.value}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${score.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                      className={`h-full rounded-full ${score.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Overall City Fit</p>
              <p className="text-lg font-bold text-accent">Strong Match ✓</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CityFitSection;
