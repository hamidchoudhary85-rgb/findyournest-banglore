import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import emailjs from '@emailjs/browser';

export function ContactUsModal({ className }: { className?: string }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    salary_band: "",
    rent_band: "",
    family_type: "",
    children_count: 0,
    office_location_lat: "",
    office_location_lng: "",
    preferred_landmark_type: "",
    max_commute_minutes: 30,
    transport_mode: "",
    safety_priority: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Assuming 'profiles' or another relevant table exists, or simulating submission
      const { error } = await supabase.from("contact_submissions").insert([
        {
          ...formData,
          children_count: Number(formData.children_count),
          office_location_lat: Number(formData.office_location_lat) || null,
          office_location_lng: Number(formData.office_location_lng) || null,
          max_commute_minutes: Number(formData.max_commute_minutes),
        },
      ]);

      if (error) {
        console.warn("Supabase insert warning:", error);
      }

      // Send welcome email to user
      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

        if (serviceId && templateId && publicKey && publicKey !== "YOUR_EMAILJS_PUBLIC_KEY") {
          await emailjs.send(
            serviceId,
            templateId,
            {
              email: formData.email,
              name: formData.name,
            },
            publicKey
          );
        } else {
          console.warn("EmailJS credentials are not configured. Welcome email was not sent.");
        }
      } catch (emailError: any) {
        console.error("Failed to send welcome email:", emailError?.text || emailError);
        alert("EmailJS is rejecting the email with this exact error: " + (emailError?.text || JSON.stringify(emailError)));
      }

      toast({
        title: "Success!",
        description: "Your details have been submitted. We will contact you soon.",
      });
      setOpen(false);
      setFormData({
        name: "", mobile: "", email: "", city: "", salary_band: "",
        rent_band: "", family_type: "", children_count: 0,
        office_location_lat: "", office_location_lng: "",
        preferred_landmark_type: "", max_commute_minutes: 30,
        transport_mode: "", safety_priority: ""
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className}>Contact Us</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-display">Contact Us</DialogTitle>
          <DialogDescription className="sr-only">
            Please provide your details below to get in touch with NearNest.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required value={formData.name} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input id="mobile" name="mobile" type="tel" required value={formData.mobile} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" required value={formData.city} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="salary_band">Salary Band</Label>
              <Select value={formData.salary_band} onValueChange={(val) => handleSelectChange("salary_band", val)}>
                <SelectTrigger><SelectValue placeholder="Select band" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-5L">0 - 5 LPA</SelectItem>
                  <SelectItem value="5-10L">5 - 10 LPA</SelectItem>
                  <SelectItem value="10-20L">10 - 20 LPA</SelectItem>
                  <SelectItem value="20L+">20+ LPA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rent_band">Rent Band</Label>
              <Select value={formData.rent_band} onValueChange={(val) => handleSelectChange("rent_band", val)}>
                <SelectTrigger><SelectValue placeholder="Select band" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-10k">Under 10k</SelectItem>
                  <SelectItem value="10k-20k">10k - 20k</SelectItem>
                  <SelectItem value="20k-30k">20k - 30k</SelectItem>
                  <SelectItem value="30k+">30k+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="family_type">Family Type</Label>
              <Select value={formData.family_type} onValueChange={(val) => handleSelectChange("family_type", val)}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="bachelor">Bachelor</SelectItem>
                  <SelectItem value="couple">Couple</SelectItem>
                  <SelectItem value="family">Family with kids</SelectItem>
                  <SelectItem value="joint">Joint Family</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="children_count">Children Count</Label>
              <Input id="children_count" name="children_count" type="number" min="0" value={formData.children_count} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="office_location_lat">Office Location Lat</Label>
              <Input id="office_location_lat" name="office_location_lat" type="number" step="0.000001" value={formData.office_location_lat} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="office_location_lng">Office Location Lng</Label>
              <Input id="office_location_lng" name="office_location_lng" type="number" step="0.000001" value={formData.office_location_lng} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferred_landmark_type">Preferred Landmark</Label>
              <Select value={formData.preferred_landmark_type} onValueChange={(val) => handleSelectChange("preferred_landmark_type", val)}>
                <SelectTrigger><SelectValue placeholder="Select landmark" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="park">Park</SelectItem>
                  <SelectItem value="metro">Metro Station</SelectItem>
                  <SelectItem value="school">School</SelectItem>
                  <SelectItem value="hospital">Hospital</SelectItem>
                  <SelectItem value="mall">Mall</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="max_commute_minutes">Max Commute (mins)</Label>
              <Input id="max_commute_minutes" name="max_commute_minutes" type="number" min="0" value={formData.max_commute_minutes} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transport_mode">Transport Mode</Label>
              <Select value={formData.transport_mode} onValueChange={(val) => handleSelectChange("transport_mode", val)}>
                <SelectTrigger><SelectValue placeholder="Select mode" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public Transport</SelectItem>
                  <SelectItem value="private">Private Vehicle</SelectItem>
                  <SelectItem value="walking">Walking</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="safety_priority">Safety Priority</Label>
              <Select value={formData.safety_priority} onValueChange={(val) => handleSelectChange("safety_priority", val)}>
                <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
