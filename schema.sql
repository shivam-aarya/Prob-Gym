-- Create tables for storing multi-study platform data

-- Studies table (study metadata and configuration)
CREATE TABLE IF NOT EXISTS studies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  config JSONB NOT NULL,
  metadata JSONB,
  status TEXT DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED')),
  version TEXT DEFAULT '1.0.0',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Table for storing participant data (multi-tenant with study_id)
CREATE TABLE IF NOT EXISTS participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  study_id UUID REFERENCES studies(id) ON DELETE CASCADE,
  participant_id TEXT NOT NULL,
  responses JSONB,
  demographic_data JSONB,
  consent_timestamp TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  total_completion_time_ms BIGINT,
  session_data JSONB,
  UNIQUE(study_id, participant_id)
);

-- Plugin registry table
CREATE TABLE IF NOT EXISTS study_plugins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  version TEXT NOT NULL,
  component_path TEXT NOT NULL,
  config_schema JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_participants_study_id ON participants(study_id);
CREATE INDEX IF NOT EXISTS idx_participants_created_at ON participants(created_at);
CREATE INDEX IF NOT EXISTS idx_studies_slug ON studies(slug);
CREATE INDEX IF NOT EXISTS idx_studies_status ON studies(status);

-- Enable Row Level Security (RLS)
ALTER TABLE studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_plugins ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON participants;
DROP POLICY IF EXISTS "Allow read access for anonymous users" ON participants;

-- Create policies that allow all operations for anonymous users
-- Note: In a production environment with sensitive data, you should implement proper authentication

-- Studies policies (public read, authenticated write)
CREATE POLICY "Allow read access for studies" ON studies
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "Allow all operations on studies for authenticated users" ON studies
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Participants policies (all operations allowed for anonymous)
CREATE POLICY "Allow all operations for anonymous users" ON participants
  FOR ALL TO anon
  USING (true)
  WITH CHECK (true);

-- Plugins policies (public read)
CREATE POLICY "Allow read access for plugins" ON study_plugins
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "Allow all operations on plugins for authenticated users" ON study_plugins
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true); 