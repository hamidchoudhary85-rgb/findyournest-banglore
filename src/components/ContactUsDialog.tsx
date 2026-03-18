import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface ContactFormData {
  name: string;
  mobile: string;
  email: string;
  city: string;
  salary_band: string;
  rent_band: string;
  family_type: string;
  children_count: string;
  office_location_lat: string;
  office_location_lng: string;
  preferred_landmark_type: string;
  max_commute_minutes: string;
  transport_mode: string;
  safety_priority: string;
}

const initialForm: ContactFormData = {
  name: "", mobile: "", email: "", city: "",
  salary_band: "", rent_band: "", family_type: "",
  children_count: "", office_location_lat: "", office_location_lng: "",
  preferred_landmark_type: "", max_commute_minutes: "",
  transport_mode: "", safety_priority: "",
};

const ContactUsDialog = ({ variant = "default" }: { variant?: "default" | "outline" | "nav" }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ContactFormData>(initialForm);

  const update = (field: keyof ContactFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.email) {
      toast({ title: "Please fill required fields", description: "Name, mobile and email are required.", variant: "destructive" });
      return;
    }
    toast({ title: "Thank you!", description: "We'll get back to you soon." });
    setForm(initialForm);
    setOpen(false);
  };

  const buttonClass = variant === "nav"
    ? "rounded-lg font-semibold"
    : "";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={variant === "nav" ? "sm" : "default"}
          variant={variant === "outline" ? "outline" : "default"}
          className={buttonClass}
        >
          Contact Us
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Contact Us</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name *</Label>
            <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="mobile">Mobile *</Label>
            <Input id="mobile" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} placeholder="+91 XXXXX XXXXX" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="city">City</Label>
            <Input id="city" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Bangalore" />
          </div>
          <div className="space-y-1.5">
            <Label>Salary Band</Label>
            <Select value={form.salary_band} onValueChange={(v) => update("salary_band", v)}>
              <SelectTrigger><SelectValue placeholder="Select salary band" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="20k-30k">₹20K – ₹30K</SelectItem>
                <SelectItem value="30k-40k">₹30K – ₹40K</SelectItem>
                <SelectItem value="40k-50k">₹40K – ₹50K</SelectItem>
                <SelectItem value="50k+">₹50K+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Rent Band</Label>
            <Select value={form.rent_band} onValueChange={(v) => update("rent_band", v)}>
              <SelectTrigger><SelectValue placeholder="Select rent band" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="5k-10k">₹5K – ₹10K</SelectItem>
                <SelectItem value="10k-15k">₹10K – ₹15K</SelectItem>
                <SelectItem value="15k-20k">₹15K – ₹20K</SelectItem>
                <SelectItem value="20k-25k">₹20K – ₹25K</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Family Type</Label>
            <Select value={form.family_type} onValueChange={(v) => update("family_type", v)}>
              <SelectTrigger><SelectValue placeholder="Select family type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="couple">Couple</SelectItem>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="shared">Shared / Roommates</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="children_count">Children Count</Label>
            <Input id="children_count" type="number" min="0" value={form.children_count} onChange={(e) => update("children_count", e.target.value)} placeholder="0" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="office_lat">Office Location (Lat)</Label>
            <Input id="office_lat" value={form.office_location_lat} onChange={(e) => update("office_location_lat", e.target.value)} placeholder="12.9716" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="office_lng">Office Location (Lng)</Label>
            <Input id="office_lng" value={form.office_location_lng} onChange={(e) => update("office_location_lng", e.target.value)} placeholder="77.5946" />
          </div>
          <div className="space-y-1.5">
            <Label>Preferred Landmark Type</Label>
            <Select value={form.preferred_landmark_type} onValueChange={(v) => update("preferred_landmark_type", v)}>
              <SelectTrigger><SelectValue placeholder="Select landmark type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="metro">Metro Station</SelectItem>
                <SelectItem value="hospital">Hospital</SelectItem>
                <SelectItem value="school">School</SelectItem>
                <SelectItem value="mall">Shopping Mall</SelectItem>
                <SelectItem value="park">Park / Garden</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="max_commute">Max Commute (minutes)</Label>
            <Input id="max_commute" type="number" min="0" value={form.max_commute_minutes} onChange={(e) => update("max_commute_minutes", e.target.value)} placeholder="30" />
          </div>
          <div className="space-y-1.5">
            <Label>Transport Mode</Label>
            <Select value={form.transport_mode} onValueChange={(v) => update("transport_mode", v)}>
              <SelectTrigger><SelectValue placeholder="Select transport" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="bus">Bus</SelectItem>
                <SelectItem value="metro">Metro</SelectItem>
                <SelectItem value="bike">Bike / Scooter</SelectItem>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="walk">Walking</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Safety Priority</Label>
            <Select value={form.safety_priority} onValueChange={(v) => update("safety_priority", v)}>
              <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-2 mt-4">
            <Button type="submit" className="w-full rounded-xl font-semibold" size="lg">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactUsDialog;
