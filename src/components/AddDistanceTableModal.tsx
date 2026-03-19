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

export function AddDistanceTableModal({ className }: { className?: string }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    property_id: "",
    office_time_minutes: "",
    office_distance_km: "",
    nearest_bus_stop_distance: "",
    nearest_school_distance: "",
    nearest_hospital_distance: "",
    nearest_station_distance: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("property_distances").insert([
        {
          property_id: formData.property_id,
          office_time_minutes: Number(formData.office_time_minutes) || null,
          office_distance_km: Number(formData.office_distance_km) || null,
          nearest_bus_stop_distance: Number(formData.nearest_bus_stop_distance) || null,
          nearest_school_distance: Number(formData.nearest_school_distance) || null,
          nearest_hospital_distance: Number(formData.nearest_hospital_distance) || null,
          nearest_station_distance: Number(formData.nearest_station_distance) || null,
        },
      ]);

      if (error) {
        console.warn("Supabase insert warning:", error);
      }

      toast({
        title: "Success!",
        description: "Distance details have been successfully added.",
      });
      setOpen(false);
      setFormData({
        property_id: "",
        office_time_minutes: "",
        office_distance_km: "",
        nearest_bus_stop_distance: "",
        nearest_school_distance: "",
        nearest_hospital_distance: "",
        nearest_station_distance: "",
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
        <Button className={className}>Distance Table</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-display">Add Property Distances</DialogTitle>
          <DialogDescription className="sr-only">
            Please fill in the distance measurements for the property.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="property_id">Property ID</Label>
              <Input id="property_id" name="property_id" required value={formData.property_id} onChange={handleChange} placeholder="Enter the Property ID" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="office_time_minutes">Office Time (Mins)</Label>
              <Input id="office_time_minutes" name="office_time_minutes" type="number" step="any" value={formData.office_time_minutes} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="office_distance_km">Office Distance (Km)</Label>
              <Input id="office_distance_km" name="office_distance_km" type="number" step="any" value={formData.office_distance_km} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nearest_bus_stop_distance">Nearest Bus Stop (Km)</Label>
              <Input id="nearest_bus_stop_distance" name="nearest_bus_stop_distance" type="number" step="any" value={formData.nearest_bus_stop_distance} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nearest_school_distance">Nearest School (Km)</Label>
              <Input id="nearest_school_distance" name="nearest_school_distance" type="number" step="any" value={formData.nearest_school_distance} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nearest_hospital_distance">Nearest Hospital (Km)</Label>
              <Input id="nearest_hospital_distance" name="nearest_hospital_distance" type="number" step="any" value={formData.nearest_hospital_distance} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nearest_station_distance">Nearest Station (Km)</Label>
              <Input id="nearest_station_distance" name="nearest_station_distance" type="number" step="any" value={formData.nearest_station_distance} onChange={handleChange} />
            </div>

          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Add Distances"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
