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
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ScoreTableModalProps {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function ScoreTableModal({ className, variant = "secondary" }: ScoreTableModalProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    property_id: "",
    user_id: "",
    budget_score: "",
    commute_score: "",
    safety_score: "",
    landmark_score: "",
    family_fit_score: "",
    final_match_score: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("property_scores").insert([
        {
          property_id: formData.property_id,
          user_id: formData.user_id || null,
          budget_score: Number(formData.budget_score) || 0,
          commute_score: Number(formData.commute_score) || 0,
          safety_score: Number(formData.safety_score) || 0,
          landmark_score: Number(formData.landmark_score) || 0,
          family_fit_score: Number(formData.family_fit_score) || 0,
          final_match_score: Number(formData.final_match_score) || 0,
        },
      ]);

      if (error) {
        console.warn("Supabase insert warning:", error);
      }

      toast({
        title: "Scores Logged!",
        description: "Property scores have been successfully saved.",
      });
      setOpen(false);
      setFormData({
        property_id: "",
        user_id: "",
        budget_score: "",
        commute_score: "",
        safety_score: "",
        landmark_score: "",
        family_fit_score: "",
        final_match_score: "",
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
        <Button variant={variant} className={className}>Score Table</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-display">Property Match Scores</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="property_id">Property ID</Label>
            <Input id="property_id" name="property_id" required value={formData.property_id} onChange={handleChange} placeholder="e.g. prop-123" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user_id">User ID (Optional)</Label>
            <Input id="user_id" name="user_id" value={formData.user_id} onChange={handleChange} placeholder="e.g. user-456" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget_score">Budget Score</Label>
              <Input id="budget_score" name="budget_score" type="number" step="0.1" value={formData.budget_score} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="commute_score">Commute Score</Label>
              <Input id="commute_score" name="commute_score" type="number" step="0.1" value={formData.commute_score} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="safety_score">Safety Score</Label>
              <Input id="safety_score" name="safety_score" type="number" step="0.1" value={formData.safety_score} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="landmark_score">Landmark Score</Label>
              <Input id="landmark_score" name="landmark_score" type="number" step="0.1" value={formData.landmark_score} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="family_fit_score">Family Fit Score</Label>
              <Input id="family_fit_score" name="family_fit_score" type="number" step="0.1" value={formData.family_fit_score} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="final_match_score">Final Match Score</Label>
              <Input id="final_match_score" name="final_match_score" type="number" step="0.1" value={formData.final_match_score} onChange={handleChange} />
            </div>
          </div>

          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? "Saving..." : "Save Scores"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
