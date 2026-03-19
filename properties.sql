-- Run this SQL in your Supabase SQL Editor to create the properties table

CREATE TABLE public.properties (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  city text NOT NULL,
  locality text NOT NULL,
  address text,
  lat double precision,
  lng double precision,
  property_type text,
  bhk_type text,
  rent numeric,
  deposit numeric,
  sq_ft numeric,
  furnishing text,
  parking boolean DEFAULT false,
  gated boolean DEFAULT false,
  floor integer,
  available_from date,
  owner_name text,
  owner_phone text,
  google_maps_link text,
  verified_status boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access for all users
CREATE POLICY "Enable read access for all users" ON public.properties
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert a property
CREATE POLICY "Enable insert for authenticated users" ON public.properties
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
