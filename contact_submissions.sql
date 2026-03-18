-- Run this SQL in your Supabase SQL Editor to create the table

CREATE TABLE public.contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  mobile text NOT NULL,
  email text NOT NULL,
  city text NOT NULL,
  salary_band text,
  rent_band text,
  family_type text,
  children_count integer DEFAULT 0,
  office_location_lat numeric,
  office_location_lng numeric,
  preferred_landmark_type text,
  max_commute_minutes integer,
  transport_mode text,
  safety_priority text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert a contact submission (needed for the public form)
CREATE POLICY "Enable public inserts" ON public.contact_submissions
  FOR INSERT
  WITH CHECK (true);
