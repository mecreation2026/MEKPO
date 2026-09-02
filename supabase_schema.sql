-- =============================================================================
-- MEKPO Technologies - Production Supabase Database Schema
-- Table: hire_requests (Client Inquiries, Hiring & Project Scopes)
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create table for hire requests & contact submissions
CREATE TABLE IF NOT EXISTS hire_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    mobile VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address TEXT,
    why_hire TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'New',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE hire_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts from web form (Frontend submissions)
CREATE POLICY "Allow public insert to hire_requests" 
ON hire_requests FOR INSERT 
TO anon 
WITH CHECK (true);

-- Allow authenticated users / admin to view records
CREATE POLICY "Allow authenticated read to hire_requests" 
ON hire_requests FOR SELECT 
TO authenticated 
USING (true);

-- Trigger for automatic updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = timezone('utc'::text, now());
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_hire_requests_updated_at
BEFORE UPDATE ON hire_requests
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Optional index for faster queries
CREATE INDEX IF NOT EXISTS idx_hire_requests_created_at ON hire_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_hire_requests_email ON hire_requests (email);