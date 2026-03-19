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
import { Checkbox } from "@/components/ui/checkbox";

export function AddPropertyModal({ className }: { className?: string }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    city: "",
    locality: "",
    address: "",
    lat: "",
    lng: "",
    property_type: "",
    bhk_type: "",
    rent: "",
    deposit: "",
    sq_ft: "",
    furnishing: "",
    parking: false,
    gated: false,
    floor: "",
    available_from: "",
    owner_name: "",
    owner_phone: "",
    google_maps_link: "",
    verified_status: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("properties").insert([
        {
          title: formData.title,
          city: formData.city,
          locality: formData.locality,
          address: formData.address,
          lat: Number(formData.lat) || null,
          lng: Number(formData.lng) || null,
          property_type: formData.property_type,
          bhk_type: formData.bhk_type,
          rent: Number(formData.rent) || null,
          deposit: Number(formData.deposit) || null,
          sq_ft: Number(formData.sq_ft) || null,
          furnishing: formData.furnishing,
          parking: formData.parking,
          gated: formData.gated,
          floor: Number(formData.floor) || null,
          available_from: formData.available_from || null,
          owner_name: formData.owner_name,
          owner_phone: formData.owner_phone,
          google_maps_link: formData.google_maps_link,
          verified_status: formData.verified_status,
        },
      ]);

      if (error) {
        console.warn("Supabase insert warning:", error);
      }

      toast({
        title: "Success!",
        description: "Property has been successfully added.",
      });
      setOpen(false);
      setFormData({
        title: "", city: "", locality: "", address: "", lat: "", lng: "",
        property_type: "", bhk_type: "", rent: "", deposit: "", sq_ft: "",
        furnishing: "", parking: false, gated: false, floor: "", available_from: "",
        owner_name: "", owner_phone: "", google_maps_link: "", verified_status: false,
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
        <Button className={className}>Add Property</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-display">Add Property</DialogTitle>
          <DialogDescription className="sr-only">
            Please fill in the property details below to add a new listing.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required value={formData.title} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" required value={formData.city} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="locality">Locality</Label>
              <Input id="locality" name="locality" required value={formData.locality} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={formData.address} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lat">Latitude</Label>
              <Input id="lat" name="lat" type="number" step="any" value={formData.lat} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lng">Longitude</Label>
              <Input id="lng" name="lng" type="number" step="any" value={formData.lng} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="property_type">Property Type</Label>
              <Select value={formData.property_type} onValueChange={(val) => handleSelectChange("property_type", val)}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="independent_house">Independent House</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="studio">Studio / 1RK</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bhk_type">BHK Type</Label>
              <Select value={formData.bhk_type} onValueChange={(val) => handleSelectChange("bhk_type", val)}>
                <SelectTrigger><SelectValue placeholder="Select BHK" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1BHK">1 BHK</SelectItem>
                  <SelectItem value="2BHK">2 BHK</SelectItem>
                  <SelectItem value="3BHK">3 BHK</SelectItem>
                  <SelectItem value="4BHK">4+ BHK</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rent">Rent (₹)</Label>
              <Input id="rent" name="rent" type="number" value={formData.rent} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deposit">Deposit (₹)</Label>
              <Input id="deposit" name="deposit" type="number" value={formData.deposit} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sq_ft">Square Feet (Sq Ft)</Label>
              <Input id="sq_ft" name="sq_ft" type="number" value={formData.sq_ft} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="furnishing">Furnishing</Label>
              <Select value={formData.furnishing} onValueChange={(val) => handleSelectChange("furnishing", val)}>
                <SelectTrigger><SelectValue placeholder="Select furnishing" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="furnished">Furnished</SelectItem>
                  <SelectItem value="semi-furnished">Semi-Furnished</SelectItem>
                  <SelectItem value="unfurnished">Unfurnished</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="floor">Floor</Label>
              <Input id="floor" name="floor" type="number" value={formData.floor} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="available_from">Available From</Label>
              <Input id="available_from" name="available_from" type="date" value={formData.available_from} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner_name">Owner Name</Label>
              <Input id="owner_name" name="owner_name" value={formData.owner_name} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner_phone">Owner Phone</Label>
              <Input id="owner_phone" name="owner_phone" type="tel" value={formData.owner_phone} onChange={handleChange} />
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="google_maps_link">Google Maps Link</Label>
              <Input id="google_maps_link" name="google_maps_link" type="url" value={formData.google_maps_link} onChange={handleChange} />
            </div>

            {/* Checkboxes for features */}
            <div className="space-y-4 col-span-1 md:col-span-2 grid grid-cols-2 lg:grid-cols-3 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="parking" checked={formData.parking} onCheckedChange={(val) => handleCheckboxChange("parking", !!val)} />
                <Label htmlFor="parking" className="cursor-pointer">Parking Available</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="gated" checked={formData.gated} onCheckedChange={(val) => handleCheckboxChange("gated", !!val)} />
                <Label htmlFor="gated" className="cursor-pointer">Gated Community</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="verified_status" checked={formData.verified_status} onCheckedChange={(val) => handleCheckboxChange("verified_status", !!val)} />
                <Label htmlFor="verified_status" className="cursor-pointer">Verified Status</Label>
              </div>
            </div>

          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Add Property Listing"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
