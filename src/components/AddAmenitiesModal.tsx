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
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddAmenitiesModal({ className }: { className?: string }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    property_id: "",
    water_supply: "",
    power_backup: "",
    security: false,
    lift: false,
    school_nearby: false,
    bus_stop_nearby: false,
    metro_nearby: false,
    station_nearby: false,
    hospital_nearby: false,
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
      const { error } = await supabase.from("property_amenities").insert([
        {
          property_id: formData.property_id,
          water_supply: formData.water_supply,
          power_backup: formData.power_backup,
          security: formData.security,
          lift: formData.lift,
          school_nearby: formData.school_nearby,
          bus_stop_nearby: formData.bus_stop_nearby,
          metro_nearby: formData.metro_nearby,
          station_nearby: formData.station_nearby,
          hospital_nearby: formData.hospital_nearby,
        },
      ]);

      if (error) {
        console.warn("Supabase insert warning:", error);
      }

      toast({
        title: "Success!",
        description: "Property amenities have been successfully added.",
      });
      setOpen(false);
      setFormData({
        property_id: "",
        water_supply: "",
        power_backup: "",
        security: false,
        lift: false,
        school_nearby: false,
        bus_stop_nearby: false,
        metro_nearby: false,
        station_nearby: false,
        hospital_nearby: false,
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
        <Button className={className}>Property Amenities</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-display">Add Property Amenities</DialogTitle>
          <DialogDescription className="sr-only">
            Please fill in the amenities for the property.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="property_id">Property ID</Label>
              <Input id="property_id" name="property_id" required value={formData.property_id} onChange={handleChange} placeholder="Enter the Property ID" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="water_supply">Water Supply</Label>
              <Select value={formData.water_supply} onValueChange={(val) => handleSelectChange("water_supply", val)}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="24/7">24/7</SelectItem>
                  <SelectItem value="corporation">Corporation Only</SelectItem>
                  <SelectItem value="borewell">Borewell Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="power_backup">Power Backup</Label>
              <Select value={formData.power_backup} onValueChange={(val) => handleSelectChange("power_backup", val)}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Checkboxes for boolean amenities */}
            <div className="space-y-4 col-span-1 md:col-span-2 grid grid-cols-2 lg:grid-cols-3 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="security" checked={formData.security} onCheckedChange={(val) => handleCheckboxChange("security", !!val)} />
                <Label htmlFor="security" className="cursor-pointer">Security</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="lift" checked={formData.lift} onCheckedChange={(val) => handleCheckboxChange("lift", !!val)} />
                <Label htmlFor="lift" className="cursor-pointer">Lift</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="school_nearby" checked={formData.school_nearby} onCheckedChange={(val) => handleCheckboxChange("school_nearby", !!val)} />
                <Label htmlFor="school_nearby" className="cursor-pointer">School Nearby</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="bus_stop_nearby" checked={formData.bus_stop_nearby} onCheckedChange={(val) => handleCheckboxChange("bus_stop_nearby", !!val)} />
                <Label htmlFor="bus_stop_nearby" className="cursor-pointer">Bus Stop Nearby</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="metro_nearby" checked={formData.metro_nearby} onCheckedChange={(val) => handleCheckboxChange("metro_nearby", !!val)} />
                <Label htmlFor="metro_nearby" className="cursor-pointer">Metro Nearby</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="station_nearby" checked={formData.station_nearby} onCheckedChange={(val) => handleCheckboxChange("station_nearby", !!val)} />
                <Label htmlFor="station_nearby" className="cursor-pointer">Railway Station Nearby</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="hospital_nearby" checked={formData.hospital_nearby} onCheckedChange={(val) => handleCheckboxChange("hospital_nearby", !!val)} />
                <Label htmlFor="hospital_nearby" className="cursor-pointer">Hospital Nearby</Label>
              </div>
            </div>

          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Add Amenities"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
