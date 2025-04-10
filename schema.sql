-- Create tables for storing study data

-- Table for storing participant data (consolidated approach)
CREATE TABLE IF NOT EXISTS participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  participant_id TEXT NOT NULL UNIQUE,
  responses JSONB,
  demographic_data JSONB,
  consent_timestamp TIMESTAMP WITH TIME ZONE,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  total_completion_time_ms BIGINT
);

-- Enable Row Level Security (RLS)
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON participants;
DROP POLICY IF EXISTS "Allow read access for anonymous users" ON participants;

-- Create policies that allow all operations for anonymous users
-- Note: In a production environment with sensitive data, you should implement proper authentication
CREATE POLICY "Allow all operations for anonymous users" ON participants
  FOR ALL TO anon
  USING (true)
  WITH CHECK (true);

-- If you need to relate responses to specific users, you could create a participants table
-- and add a participant_id column to responses and demographics 