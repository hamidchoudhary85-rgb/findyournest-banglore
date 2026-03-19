import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, MapPin } from "lucide-react";
import logo from "@/assets/nearnest-logo.png";

interface NavbarProps {
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}
import { ContactUsModal } from "./ContactUsModal";
import { AddPropertyModal } from "./AddPropertyModal";
import { AddAmenitiesModal } from "./AddAmenitiesModal";
import { AddDistanceTableModal } from "./AddDistanceTableModal";
import { FeedbackModal } from "./FeedbackModal";
import { ScoreTableModal } from "./ScoreTableModal";

const Navbar = ({ searchQuery, setSearchQuery }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = () => {
    document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Affordability", href: "#affordability" },
    { label: "City Fit", href: "#city-fit" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/95 backdrop-blur-md shadow-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between gap-4 h-16 md:h-20">
        <a href="#" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="NearNest" className="w-8 h-8" />
          <span className={`text-xl font-bold font-display ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
            NearNest
          </span>
        </a>

        {/* Desktop search bar - centered */}
        <div className="hidden md:flex flex-1 justify-center max-w-xl mx-4">
          <div className="relative w-full">
            <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${scrolled ? "text-muted-foreground" : "text-primary-foreground/70"}`} />
            <input
              type="text"
              value={searchQuery || ""}
              onChange={(e) => setSearchQuery?.(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search by area, landmark or office location..."
              className={`w-full h-9 pl-9 pr-20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                scrolled
                  ? "bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground"
                  : "bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              }`}
            />
            <button
              onClick={handleSearch}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-6 px-3 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 shrink-0">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                scrolled ? "text-muted-foreground" : "text-primary-foreground/70"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-card border-b border-border p-6 space-y-4"
        >
          {/* Mobile search */}
          <div className="relative pb-2">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery || ""}
              onChange={(e) => setSearchQuery?.(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (handleSearch(), setOpen(false))}
              placeholder="Search by area, landmark or office..."
              className="w-full h-10 pl-9 pr-24 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={() => (handleSearch(), setOpen(false))}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 px-3 rounded-md bg-primary text-primary-foreground text-xs font-semibold"
            >
              Search
            </button>
          </div>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-foreground font-medium py-2"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <ContactUsModal className="w-full rounded-lg font-semibold h-10 px-4 flex justify-center items-center text-center text-sm" />
            <AddPropertyModal className="w-full rounded-lg font-semibold h-10 px-4 flex justify-center items-center text-center text-sm" />
            <AddAmenitiesModal className="w-full rounded-lg font-semibold h-10 px-4 flex justify-center items-center text-center text-sm" />
            <AddDistanceTableModal className="w-full rounded-lg font-semibold h-10 px-4 flex justify-center items-center text-center text-sm" />
            <ScoreTableModal className="w-full rounded-lg font-semibold h-10 px-4 flex justify-center items-center text-center text-sm" variant="secondary" />
            <FeedbackModal className="w-full rounded-lg font-semibold h-10 px-4 flex justify-center items-center text-center text-sm" variant="outline" />
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
