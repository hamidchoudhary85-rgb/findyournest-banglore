-- Run this SQL in your Supabase SQL Editor to create the scores table

CREATE TABLE public.property_scores (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id text NOT NULL,
  user_id text,
  budget_score numeric,
  commute_score numeric,
  safety_score numeric,
  landmark_score numeric,
  family_fit_score numeric,
  final_match_score numeric,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.property_scores ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert a score submission
CREATE POLICY "Enable public inserts" ON public.property_scores
  FOR INSERT
  WITH CHECK (true);
