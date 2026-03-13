import logo from "@/assets/nearnest-logo.png";
import { MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-secondary text-secondary-foreground">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="NearNest logo" className="w-10 h-10" />
            <span className="text-xl font-bold font-display">NearNest</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-secondary-foreground/60">
            <MapPin className="w-4 h-4" />
            <span>AI-powered rental intelligence for Bangalore</span>
          </div>
          <p className="text-sm text-secondary-foreground/40">
            © 2026 NearNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
