import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Train, Shield, Home, IndianRupee, User, BadgeCheck, GitCompareArrows, X, Check } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Property {
  title: string;
  bhk: string;
  rent: string;
  deposit: string;
  sqft: number;
  furnishing: string;
  locality: string;
  matchScore: string;
  commute: string;
  transitDist: string;
  safety: string;
  owner: string;
  verified: boolean;
  source: string;
}

const chatGPTProperties: Property[] = [
  { title: "Cozy 1BHK Near Tech Park", bhk: "1BHK", rent: "₹9,000", deposit: "₹18,000", sqft: 550, furnishing: "Semi", locality: "Electronic City Phase 2", matchScore: "92%", commute: "20 mins (cab)", transitDist: "5 mins walk", safety: "High", owner: "Rajesh K.", verified: true, source: "ChatGPT" },
  { title: "Family 2BHK Gated Apt", bhk: "2BHK", rent: "₹14,000", deposit: "₹28,000", sqft: 850, furnishing: "Unfurnished", locality: "Kengeri", matchScore: "89%", commute: "30 mins (bus)", transitDist: "8 mins metro", safety: "High", owner: "Priya M.", verified: true, source: "ChatGPT" },
  { title: "Budget 1RK Studio", bhk: "1RK", rent: "₹7,500", deposit: "₹15,000", sqft: 450, furnishing: "Furnished", locality: "KR Puram", matchScore: "87%", commute: "25 mins (bike)", transitDist: "4 mins bus", safety: "Medium", owner: "Anil S.", verified: false, source: "ChatGPT" },
  { title: "Safe 1BHK Near Hospital", bhk: "1BHK", rent: "₹11,000", deposit: "₹22,000", sqft: 600, furnishing: "Semi", locality: "Yelahanka", matchScore: "91%", commute: "35 mins (public)", transitDist: "10 mins bus", safety: "High", owner: "Lakshmi R.", verified: true, source: "ChatGPT" },
  { title: "Compact 2BHK Outskirts", bhk: "2BHK", rent: "₹12,500", deposit: "₹25,000", sqft: 750, furnishing: "Unfurnished", locality: "Whitefield Outskirts", matchScore: "85%", commute: "40 mins (metro)", transitDist: "6 mins walk", safety: "Medium", owner: "Kumar P.", verified: true, source: "ChatGPT" },
  { title: "Pro 1BHK Walkable", bhk: "1BHK", rent: "₹8,500", deposit: "₹17,000", sqft: 500, furnishing: "Furnished", locality: "BTM Layout Outskirts", matchScore: "90%", commute: "15 mins (walk)", transitDist: "3 mins metro", safety: "High", owner: "Suresh G.", verified: false, source: "ChatGPT" },
  { title: "Gated 2BHK Family Fit", bhk: "2BHK", rent: "₹18,000", deposit: "₹36,000", sqft: 900, furnishing: "Semi", locality: "Rajarajeshwari Nagar", matchScore: "88%", commute: "25 mins (car)", transitDist: "7 mins metro", safety: "Very High", owner: "Meera N.", verified: true, source: "ChatGPT" },
  { title: "Affordable 1BHK Near Rail", bhk: "1BHK", rent: "₹10,000", deposit: "₹20,000", sqft: 580, furnishing: "Unfurnished", locality: "Malleshwaram", matchScore: "86%", commute: "30 mins (train)", transitDist: "5 mins walk", safety: "High", owner: "Vijay D.", verified: true, source: "ChatGPT" },
  { title: "Starter 1RK PG Style", bhk: "1RK", rent: "₹6,500", deposit: "₹13,000", sqft: 400, furnishing: "Furnished", locality: "Hoodi", matchScore: "84%", commute: "45 mins (bus)", transitDist: "9 mins bus", safety: "Medium", owner: "Neha T.", verified: false, source: "ChatGPT" },
  { title: "2BHK Near School", bhk: "2BHK", rent: "₹16,000", deposit: "₹32,000", sqft: 800, furnishing: "Semi", locality: "Hennur", matchScore: "93%", commute: "20 mins (bike)", transitDist: "4 mins metro", safety: "High", owner: "Ramesh B.", verified: true, source: "ChatGPT" },
];

const perplexityProperties: Property[] = [
  { title: "Compact 1BHK Safe Zone", bhk: "1BHK", rent: "₹13,000", deposit: "₹26,000", sqft: 620, furnishing: "Furnished", locality: "Banaswadi", matchScore: "87%", commute: "35 mins (cab)", transitDist: "6 mins bus", safety: "High", owner: "Kavya L.", verified: true, source: "Perplexity AI" },
  { title: "Budget 2BHK Outpost", bhk: "2BHK", rent: "₹15,000", deposit: "₹30,000", sqft: 780, furnishing: "Unfurnished", locality: "Sarjapur Road", matchScore: "89%", commute: "30 mins (car)", transitDist: "10 mins metro", safety: "Medium", owner: "Gopal V.", verified: false, source: "Perplexity AI" },
  { title: "Night-Shift 1BHK", bhk: "1BHK", rent: "₹9,500", deposit: "₹19,000", sqft: 520, furnishing: "Semi", locality: "Bommasandra", matchScore: "85%", commute: "40 mins (public)", transitDist: "5 mins bus", safety: "Medium", owner: "Sunita J.", verified: true, source: "Perplexity AI" },
  { title: "Family 2BHK Gated", bhk: "2BHK", rent: "₹20,000", deposit: "₹40,000", sqft: 950, furnishing: "Furnished", locality: "Hoskote", matchScore: "91%", commute: "45 mins (bus)", transitDist: "8 mins walk", safety: "High", owner: "Madhu K.", verified: true, source: "Perplexity AI" },
  { title: "Quick 1BHK Metro", bhk: "1BHK", rent: "₹12,000", deposit: "₹24,000", sqft: 650, furnishing: "Unfurnished", locality: "Chandapura", matchScore: "88%", commute: "25 mins (metro)", transitDist: "2 mins walk", safety: "Medium", owner: "Arjun H.", verified: false, source: "Perplexity AI" },
  { title: "Cozy 1BHK Near Tech Park", bhk: "1BHK", rent: "₹9,000", deposit: "₹18,000", sqft: 550, furnishing: "Semi", locality: "Electronic City Phase 2", matchScore: "92%", commute: "20 mins (cab)", transitDist: "5 mins walk", safety: "High", owner: "Rajesh K.", verified: true, source: "Perplexity AI" },
  { title: "Family 2BHK Gated Apt", bhk: "2BHK", rent: "₹14,000", deposit: "₹28,000", sqft: 850, furnishing: "Unfurnished", locality: "Kengeri", matchScore: "89%", commute: "30 mins (bus)", transitDist: "8 mins metro", safety: "High", owner: "Priya M.", verified: true, source: "Perplexity AI" },
  { title: "Safe 1BHK Near Hospital", bhk: "1BHK", rent: "₹11,000", deposit: "₹22,000", sqft: 600, furnishing: "Semi", locality: "Yelahanka", matchScore: "91%", commute: "35 mins (public)", transitDist: "10 mins bus", safety: "High", owner: "Lakshmi R.", verified: true, source: "Perplexity AI" },
  { title: "Pro 1BHK Walkable", bhk: "1BHK", rent: "₹8,500", deposit: "₹17,000", sqft: 500, furnishing: "Furnished", locality: "BTM Layout Outskirts", matchScore: "90%", commute: "15 mins (walk)", transitDist: "3 mins metro", safety: "High", owner: "Suresh G.", verified: false, source: "Perplexity AI" },
  { title: "Gated 2BHK Family Fit", bhk: "2BHK", rent: "₹18,000", deposit: "₹36,000", sqft: 900, furnishing: "Semi", locality: "Rajarajeshwari Nagar", matchScore: "88%", commute: "25 mins (car)", transitDist: "7 mins metro", safety: "Very High", owner: "Meera N.", verified: true, source: "Perplexity AI" },
];

const safetyColor = (safety: string) => {
  if (safety === "Very High") return "text-emerald-400";
  if (safety === "High") return "text-green-400";
  return "text-yellow-400";
};

const PropertyCard = ({ property, index }: { property: Property; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
  >
    <Card className="h-full bg-card border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge
            variant="outline"
            className={`text-xs font-semibold ${
              property.source === "ChatGPT"
                ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10"
                : "border-blue-500/50 text-blue-400 bg-blue-500/10"
            }`}
          >
            {property.source === "ChatGPT" ? "🤖 ChatGPT" : "🔍 Perplexity AI"}
          </Badge>
          <span className="text-xs font-bold text-primary bg-primary/15 px-2.5 py-1 rounded-full">
            {property.matchScore} Match
          </span>
        </div>
        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {property.title}
        </h3>
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <MapPin className="w-3.5 h-3.5" />
          <span className="line-clamp-1">{property.locality}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {/* Rent & Type */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <IndianRupee className="w-4 h-4 text-primary" />
            <span className="text-xl font-extrabold text-foreground">{property.rent}</span>
            <span className="text-xs text-muted-foreground">/mo</span>
          </div>
          <Badge variant="secondary" className="text-xs">{property.bhk}</Badge>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Home className="w-3.5 h-3.5" />
            <span>{property.sqft} sq ft • {property.furnishing}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <IndianRupee className="w-3.5 h-3.5" />
            <span>Deposit: {property.deposit}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{property.commute}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Train className="w-3.5 h-3.5" />
            <span>{property.transitDist}</span>
          </div>
        </div>

        {/* Safety & Owner */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1.5">
            <Shield className={`w-3.5 h-3.5 ${safetyColor(property.safety)}`} />
            <span className={`text-xs font-semibold ${safetyColor(property.safety)}`}>
              {property.safety} Safety
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{property.owner}</span>
            {property.verified && <BadgeCheck className="w-3.5 h-3.5 text-primary" />}
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const PropertyListingsSection = () => {
  const [activeTab, setActiveTab] = useState<"all" | "chatgpt" | "perplexity">("all");

  const displayProperties =
    activeTab === "chatgpt"
      ? chatGPTProperties
      : activeTab === "perplexity"
      ? perplexityProperties
      : [...chatGPTProperties, ...perplexityProperties];

  return (
    <section id="listings" className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            AI-Curated <span className="text-gradient-primary">Property Listings</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            20 top-matched Bangalore rentals sourced and scored by leading AI platforms
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {[
            { key: "all" as const, label: "All (20)" },
            { key: "chatgpt" as const, label: "🤖 ChatGPT (10)" },
            { key: "perplexity" as const, label: "🔍 Perplexity AI (10)" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground border border-border hover:border-primary/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayProperties.map((property, index) => (
            <PropertyCard key={`${property.source}-${property.title}-${index}`} property={property} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyListingsSection;
