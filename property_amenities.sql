-- Run this SQL in your Supabase SQL Editor to create the property_amenities table

CREATE TABLE public.property_amenities (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id text NOT NULL,
  water_supply text,
  power_backup text,
  security boolean DEFAULT false,
  lift boolean DEFAULT false,
  school_nearby boolean DEFAULT false,
  bus_stop_nearby boolean DEFAULT false,
  metro_nearby boolean DEFAULT false,
  station_nearby boolean DEFAULT false,
  hospital_nearby boolean DEFAULT false
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.property_amenities ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access for all users
CREATE POLICY "Enable read access for all users" ON public.properties
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert amenities
CREATE POLICY "Enable insert for authenticated users" ON public.property_amenities
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
