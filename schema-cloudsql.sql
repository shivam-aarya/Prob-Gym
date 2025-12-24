-- Cloud SQL Compatible Schema for Prob-Gym
-- Multi-study platform schema adapted for Google Cloud SQL PostgreSQL

-- Enable UUID extension for uuid_generate_v4() function
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

-- Grant permissions to application user
-- Note: Replace 'coggym_app' with your actual application user if different
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO coggym_app;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO coggym_app;

-- Optional: Enable Row Level Security (RLS) for additional security layer
-- Since we're using application-layer auth, RLS is optional
-- Uncomment below if you want to enable RLS with basic policies

-- ALTER TABLE studies ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE study_plugins ENABLE ROW LEVEL SECURITY;

-- Create basic policies that allow access for the application user
-- CREATE POLICY "Allow all operations for app user" ON studies FOR ALL TO coggym_app USING (true) WITH CHECK (true);
-- CREATE POLICY "Allow all operations for app user" ON participants FOR ALL TO coggym_app USING (true) WITH CHECK (true);
-- CREATE POLICY "Allow all operations for app user" ON study_plugins FOR ALL TO coggym_app USING (true) WITH CHECK (true);
