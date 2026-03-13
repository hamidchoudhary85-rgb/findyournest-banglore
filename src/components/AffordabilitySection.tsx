import { motion } from "framer-motion";
import { IndianRupee, AlertTriangle, Check } from "lucide-react";

const bands = [
  { salary: "₹30,000", ideal: "₹7,500 – ₹10,500", risky: "Above ₹12,000" },
  { salary: "₹40,000", ideal: "₹10,000 – ₹14,000", risky: "Above ₹16,000" },
  { salary: "₹50,000", ideal: "₹12,500 – ₹17,500", risky: "Above ₹20,000" },
];

const rentBands = ["₹5K – ₹10K", "₹10K – ₹15K", "₹15K – ₹20K", "₹20K – ₹25K"];

const AffordabilitySection = () => {
  return (
    <section className="py-24 bg-muted/50" id="affordability">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Smart Budgeting</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-4">
            Built Around <span className="text-gradient-primary">Your Salary</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We recommend 25–35% of salary for rent. Our AI ensures you never pick a house that looks cheap but murders your finances.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Salary table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl border border-border overflow-hidden"
          >
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-primary" />
                Salary-to-Rent Guide
              </h3>
            </div>
            <div className="divide-y divide-border">
              {bands.map((band, i) => (
                <motion.div
                  key={band.salary}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 grid grid-cols-3 gap-4"
                >
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Monthly Salary</p>
                    <p className="font-bold text-lg">{band.salary}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <Check className="w-3 h-3 text-accent" /> Ideal Rent
                    </p>
                    <p className="font-semibold text-accent">{band.ideal}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-destructive" /> Risky
                    </p>
                    <p className="font-semibold text-destructive">{band.risky}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Rent bands */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6">Our Rent Brackets</h3>
            <div className="grid grid-cols-2 gap-4">
              {rentBands.map((band, i) => (
                <motion.div
                  key={band}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 text-center hover:card-glow transition-all hover:-translate-y-1 cursor-pointer"
                >
                  <p className="text-2xl font-extrabold text-gradient-primary">{band}</p>
                  <p className="text-sm text-muted-foreground mt-1">per month</p>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-6 italic">
              AI warns you if your selected rent is too high relative to your salary, and estimates monthly living pressure after rent.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AffordabilitySection;
