# Database Setup Guide

This guide will help you set up your Supabase database for the multi-study platform.

## Prerequisites

✅ Supabase project created
✅ `.env.local` configured with Supabase credentials

## Setup Steps

### 1. Apply the Database Schema

First, you need to apply the multi-study schema to your Supabase database:

1. Open your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `schema.sql` from this project
5. Paste it into the SQL editor
6. Click **Run** (or press Cmd/Ctrl + Enter)

You should see success messages for each table created.

### 2. Seed the Prob-Gym Study

Once the schema is applied, run the setup script to insert the Prob-Gym study:

```bash
npm run db:setup
```

You should see output like:
```
🚀 Starting database setup...
✅ Schema exists
📝 Inserting Prob-Gym study...
✅ Prob-Gym study created successfully!
🎉 Database setup complete!
```

### 3. Verify Setup

Check your Supabase dashboard:
1. Go to **Table Editor**
2. Select the `studies` table
3. You should see one row with:
   - slug: `prob-gym`
   - title: `Interpreting Agent Behavior in a Treasure Game`
   - status: `ACTIVE`

## Troubleshooting

### Error: "Schema not found or invalid"
- Make sure you ran the SQL from `schema.sql` in your Supabase SQL Editor
- Check that all tables were created successfully (studies, participants, study_plugins)

### Error: "Study already exists"
- The Prob-Gym study is already in your database
- Use `npm run db:setup -- --force` to update it

### Error: "Missing Supabase credentials"
- Check that `.env.local` has both:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## What This Does

The setup process:
1. ✅ Creates the multi-tenant database schema (if not already applied)
2. ✅ Inserts the Prob-Gym study record into the `studies` table
3. ✅ Links participants to the correct study via foreign key relationships

After setup, your app will be able to:
- Create participant records
- Store responses linked to the correct study
- Track demographic data
- Support multiple studies in the future

## Next Steps

After successful setup:
1. Start your dev server: `npm run dev`
2. Navigate to http://localhost:3000
3. Click on the Prob-Gym study
4. Test the full flow:
   - Consent page
   - Tutorial
   - Scenarios (submit responses)
   - Demographics
   - Completion

All data will be stored in your Supabase database! 🎉
