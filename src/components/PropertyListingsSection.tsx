import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Train, Shield, Home, IndianRupee, User, BadgeCheck, GitCompareArrows, X, Check, Search } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const PropertyCard = ({ property, index, isSelected, onToggleCompare }: { property: Property; index: number; isSelected: boolean; onToggleCompare: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
  >
    <Card className={`h-full bg-card border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group relative ${isSelected ? "ring-2 ring-primary border-primary" : ""}`}>
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

        {/* Compare Button */}
        <button
          onClick={onToggleCompare}
          className={`w-full mt-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
            isSelected
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border"
          }`}
        >
          {isSelected ? <Check className="w-3.5 h-3.5" /> : <GitCompareArrows className="w-3.5 h-3.5" />}
          {isSelected ? "Added to Compare" : "Compare"}
        </button>
      </CardContent>
    </Card>
  </motion.div>
);

const ComparePanel = ({ properties, onRemove, onClose }: { properties: Property[]; onRemove: (index: number) => void; onClose: () => void }) => (
  <motion.div
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 100, opacity: 0 }}
    className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-2xl"
  >
    <div className="container py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GitCompareArrows className="w-5 h-5 text-primary" />
          <span className="font-bold text-foreground">Compare Properties ({properties.length})</span>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border">
              <th className="pb-2 pr-4 font-medium">Property</th>
              <th className="pb-2 pr-4 font-medium">Source</th>
              <th className="pb-2 pr-4 font-medium">Rent</th>
              <th className="pb-2 pr-4 font-medium">BHK</th>
              <th className="pb-2 pr-4 font-medium">Sq Ft</th>
              <th className="pb-2 pr-4 font-medium">Commute</th>
              <th className="pb-2 pr-4 font-medium">Safety</th>
              <th className="pb-2 pr-4 font-medium">Match</th>
              <th className="pb-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p, i) => (
              <tr key={i} className="border-b border-border/50 last:border-0">
                <td className="py-2 pr-4 font-semibold text-foreground">{p.title}</td>
                <td className="py-2 pr-4">
                  <Badge variant="outline" className={`text-xs ${p.source === "ChatGPT" ? "border-emerald-500/50 text-emerald-400" : "border-blue-500/50 text-blue-400"}`}>
                    {p.source}
                  </Badge>
                </td>
                <td className="py-2 pr-4 font-bold text-foreground">{p.rent}</td>
                <td className="py-2 pr-4 text-muted-foreground">{p.bhk}</td>
                <td className="py-2 pr-4 text-muted-foreground">{p.sqft}</td>
                <td className="py-2 pr-4 text-muted-foreground">{p.commute}</td>
                <td className={`py-2 pr-4 font-semibold ${safetyColor(p.safety)}`}>{p.safety}</td>
                <td className="py-2 pr-4 font-bold text-primary">{p.matchScore}</td>
                <td className="py-2">
                  <button onClick={() => onRemove(i)} className="text-muted-foreground hover:text-destructive">
                    <X className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </motion.div>
);

interface Props {
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

const PropertyListingsSection = ({ searchQuery = "", setSearchQuery }: Props) => {
  const [activeTab, setActiveTab] = useState<"all" | "chatgpt" | "perplexity">("all");
  const [compareList, setCompareList] = useState<Property[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const displayProperties = (
    activeTab === "chatgpt"
      ? chatGPTProperties
      : activeTab === "perplexity"
      ? perplexityProperties
      : [...chatGPTProperties, ...perplexityProperties]
  ).filter((p) => {
    if (!searchQuery.trim()) return true;
    const lowerQuery = searchQuery.toLowerCase();
    
    const rentVal = parseInt(p.rent.replace(/\D/g, "") || "0", 10);
    let cleanedQuery = lowerQuery
      .replace(/budget/g, "")
      .replace(/price/g, "")
      .replace(/rent/g, "")
      .replace(/between/g, "")
      .replace(/rupees/g, "")
      .replace(/rs/g, "")
      .replace(/₹/g, "");

    let isRangeMatch = true;
    let isBudgetMatch = true;

    // Match patterns like "5000 to 15000" or "5000-15000"
    const rangeMatch = cleanedQuery.match(/(\d+)\s*(?:to|-)\s*(\d+)/);
    if (rangeMatch) {
      const min = parseInt(rangeMatch[1], 10);
      const max = parseInt(rangeMatch[2], 10);
      isRangeMatch = rentVal >= min && rentVal <= max;
      cleanedQuery = cleanedQuery.replace(rangeMatch[0], "").trim();
    } 
    // Match single numbers (budget max) like "15000"
    else {
      // Find standalone number > 1000
      const singleNumMatch = cleanedQuery.match(/\b(\d{4,})\b/);
      if (singleNumMatch) {
        const target = parseInt(singleNumMatch[1], 10);
        isBudgetMatch = rentVal <= target;
        cleanedQuery = cleanedQuery.replace(singleNumMatch[0], "").trim();
      }
    }

    if (!isRangeMatch || !isBudgetMatch) return false;
    if (!cleanedQuery.trim()) return true;

    // Combine all property values into a single searchable string
    const searchableText = Object.values(p).map(val => 
      typeof val === 'string' ? val.replace(/,/g, '') : val
    ).join(" ").toLowerCase();

    return searchableText.includes(cleanedQuery.replace(/,/g, '').trim());
  });

  const toggleCompare = (property: Property) => {
    setCompareList((prev) => {
      const exists = prev.find((p) => p.title === property.title && p.source === property.source);
      if (exists) return prev.filter((p) => !(p.title === property.title && p.source === property.source));
      if (prev.length >= 4) return prev;
      const updated = [...prev, property];
      if (updated.length >= 2) setShowCompare(true);
      return updated;
    });
  };

  const isSelected = (property: Property) =>
    compareList.some((p) => p.title === property.title && p.source === property.source);

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

        {/* Search Bar */}
        <div className="relative w-full max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search categories (e.g. 1BHK, 2BHK) or location..."
            className="pl-9 w-full rounded-full border-primary/20 focus-visible:ring-primary shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery?.(e.target.value)}
          />
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
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
          {compareList.length > 0 && (
            <Button
              size="sm"
              onClick={() => setShowCompare(!showCompare)}
              className="rounded-full gap-1.5"
            >
              <GitCompareArrows className="w-4 h-4" />
              Compare ({compareList.length})
            </Button>
          )}
        </div>

        {displayProperties.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            No properties found for "{searchQuery}". Try searching for something else like "1BHK" or "Kengeri".
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayProperties.map((property, index) => (
            <PropertyCard
              key={`${property.source}-${property.title}-${index}`}
              property={property}
              index={index}
              isSelected={isSelected(property)}
              onToggleCompare={() => toggleCompare(property)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showCompare && compareList.length > 0 && (
          <ComparePanel
            properties={compareList}
            onRemove={(i) => setCompareList((prev) => prev.filter((_, idx) => idx !== i))}
            onClose={() => setShowCompare(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default PropertyListingsSection;
