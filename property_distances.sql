-- Run this SQL in your Supabase SQL Editor to create the property_distances table

CREATE TABLE public.property_distances (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id text NOT NULL,
  office_time_minutes numeric,
  office_distance_km numeric,
  nearest_bus_stop_distance numeric,
  nearest_school_distance numeric,
  nearest_hospital_distance numeric,
  nearest_station_distance numeric
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.property_distances ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access for all users
CREATE POLICY "Enable read access for all users" ON public.property_distances
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert distances
CREATE POLICY "Enable insert for authenticated users" ON public.property_distances
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
