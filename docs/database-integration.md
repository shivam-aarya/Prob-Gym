# Database Integration Guide

This guide explains how to set up and use the database integration with Supabase in this application.

## Overview

The application uses an abstraction layer for database operations that allows:

1. Easy switching between database implementations
2. Clean separation of concerns
3. Testability with mock implementations
4. Ability to develop locally without a database

## Setting Up Supabase

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new Supabase project
3. In the SQL Editor, run the SQL code from the `schema.sql` file in this project:

```sql
-- Run this in the Supabase SQL Editor
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
  age INTEGER,
  gender TEXT,
  education_level TEXT,
  technical_background TEXT,
  additional_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE demographics ENABLE ROW LEVEL SECURITY;

-- Create policies that allow all operations for authenticated users
CREATE POLICY "Allow all operations for authenticated users" ON responses
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations for authenticated users" ON demographics
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Optionally, create policies for anonymous access if needed
CREATE POLICY "Allow read access for anonymous users" ON responses
  FOR SELECT TO anon
  USING (true);
```

4. Go to Project Settings > API and copy the URL and anon key
5. Create a `.env.local` file in the project root with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Architecture

The database abstraction layer consists of the following components:

### 1. Database Service Interface (`src/services/database/types.ts`)

This defines the interface that all database implementations must implement.

```typescript
export interface DatabaseService {
  submitResponse(response: UserResponse): Promise<{ id?: string; error?: Error }>;
  getResponsesByScenario(scenarioId: number): Promise<{ data?: UserResponse[]; error?: Error }>;
  submitDemographicData(data: any): Promise<{ id?: string; error?: Error }>;
}
```

### 2. Supabase Implementation (`src/services/database/supabase.ts`)

This implements the database service interface using Supabase.

### 3. In-Memory Implementation (`src/services/database/memory.ts`)

This provides an in-memory implementation for development and testing.

### 4. Database Factory (`src/services/database/index.ts`)

This factory provides a convenient way to switch between implementations.

## Usage in Code

### API Routes

The API routes use the database service to store and retrieve data:

```typescript
import { db } from '@/services/database';

// Example: Storing a response
const { id, error } = await db.submitResponse(response);

// Example: Retrieving responses
const { data, error } = await db.getResponsesByScenario(scenarioId);
```

### Client-Side API Utilities

Client-side components interact with the backend through utility functions:

```typescript
import { submitResponse, submitDemographicData, getResponsesByScenario } from '@/utils/api';

// Example: Submitting a response
const result = await submitResponse(response);

// Example: Submitting demographic data
const result = await submitDemographicData(data);

// Example: Getting responses for a scenario
const result = await getResponsesByScenario(scenarioId);
```

## Switching Database Implementations

To switch database implementations, you can modify the factory:

```typescript
// src/services/database/index.ts
static getService(implementation?: DatabaseImplementation): DatabaseService {
  // Change this line to use a different implementation
  const useImplementation = implementation || 'memory'; // or 'supabase'
  
  // Rest of the method
}
```

Or use environment variables to control which implementation is used.

## Local Development

For local development, the system automatically uses the in-memory database implementation if Supabase credentials are not configured in the environment variables. This allows for easy development without requiring a database setup.

## Adding New Database Implementations

To add a new database implementation:

1. Create a new file in `src/services/database/` (e.g., `firebase.ts`)
2. Implement the `DatabaseService` interface
3. Update the factory to include the new implementation option
4. Use the new implementation by updating the factory or environment variables 