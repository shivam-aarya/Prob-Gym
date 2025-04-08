-- Create tables for storing study data

-- Table for storing participant responses
CREATE TABLE IF NOT EXISTS responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_name TEXT NOT NULL,
  scenario_id INTEGER NOT NULL,
  response_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create an index on scenario_id for faster retrieval
CREATE INDEX IF NOT EXISTS responses_scenario_id_idx ON responses (scenario_id);

-- Table for storing demographic survey data
CREATE TABLE IF NOT EXISTS demographics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  age TEXT,
  gender TEXT,
  education TEXT,
  experience TEXT,
  additional_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE demographics ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON responses;
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON demographics;
DROP POLICY IF EXISTS "Allow read access for anonymous users" ON responses;

-- Create policies that allow all operations for anonymous users
-- Note: In a production environment with sensitive data, you should implement proper authentication
CREATE POLICY "Allow all operations for anonymous users" ON responses
  FOR ALL TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations for anonymous users" ON demographics
  FOR ALL TO anon
  USING (true)
  WITH CHECK (true);

-- If you need to relate responses to specific users, you could create a participants table
-- and add a participant_id column to responses and demographics 