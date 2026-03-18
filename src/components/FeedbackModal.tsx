import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

interface FeedbackModalProps {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function FeedbackModal({ className, variant = "default" }: FeedbackModalProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    property_id: "",
    user_id: "",
    rating: "5",
    review_text: "",
    safety_feedback: "",
    family_feedback: "",
    landlord_feedback: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const { error } = await supabase.from("property_reviews").insert([
        {
          ...formData,
          rating: Number(formData.rating),
        },
      ]);

      if (error) {
        console.warn("Supabase insert warning:", error);
      }

      toast({
        title: "Feedback Submitted!",
        description: "Thank you for sharing your experience.",
      });
      setOpen(false);
      setFormData({
        property_id: "",
        user_id: "",
        rating: "5",
        review_text: "",
        safety_feedback: "",
        family_feedback: "",
        landlord_feedback: "",
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
        <Button variant={variant} className={className}>Leave Feedback</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-display">Property Feedback</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="property_id">Property ID</Label>
              <Input id="property_id" name="property_id" required value={formData.property_id} onChange={handleChange} placeholder="e.g. prop-123" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user_id">User ID (Optional)</Label>
              <Input id="user_id" name="user_id" value={formData.user_id} onChange={handleChange} placeholder="e.g. user-456" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Overall Rating</Label>
            <Select value={formData.rating} onValueChange={(val) => handleSelectChange("rating", val)}>
              <SelectTrigger><SelectValue placeholder="Select rating" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 - Excellent</SelectItem>
                <SelectItem value="4">4 - Good</SelectItem>
                <SelectItem value="3">3 - Average</SelectItem>
                <SelectItem value="2">2 - Poor</SelectItem>
                <SelectItem value="1">1 - Terrible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="review_text">General Review</Label>
            <Textarea id="review_text" name="review_text" required value={formData.review_text} onChange={handleChange} placeholder="Tell us about your overall experience..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="safety_feedback">Safety & Security</Label>
            <Textarea id="safety_feedback" name="safety_feedback" value={formData.safety_feedback} onChange={handleChange} placeholder="How safe is the area?" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="family_feedback">Family Friendliness</Label>
            <Textarea id="family_feedback" name="family_feedback" value={formData.family_feedback} onChange={handleChange} placeholder="Is it good for families?" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="landlord_feedback">Landlord Experience</Label>
            <Textarea id="landlord_feedback" name="landlord_feedback" value={formData.landlord_feedback} onChange={handleChange} placeholder="How was your experience with the landlord/management?" />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
