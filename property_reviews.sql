-- Run this SQL in your Supabase SQL Editor to create the feedback table

CREATE TABLE public.property_reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id text NOT NULL,
  user_id text,
  rating integer NOT NULL DEFAULT 5,
  review_text text NOT NULL,
  safety_feedback text,
  family_feedback text,
  landlord_feedback text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.property_reviews ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert a feedback/review
CREATE POLICY "Enable public inserts" ON public.property_reviews
  FOR INSERT
  WITH CHECK (true);
