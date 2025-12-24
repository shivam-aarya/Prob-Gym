# Prob-Gym Migration: Vercel + Supabase → Google Cloud Platform

## Migration Overview

This guide provides a complete step-by-step process to migrate Prob-Gym from Vercel + Supabase to Google Cloud Platform (GCP) using:
- **Cloud Run** for serverless Next.js hosting
- **Cloud SQL for PostgreSQL** for database
- **Cloud Storage + Cloud CDN** for static assets
- **Cloud Build** for automated CI/CD
- **Application-layer authentication** (no RLS policies to migrate)

**Estimated Total Monthly Cost:** $75-150 for moderate traffic (dev: ~$50, production: ~$100-150)

---

## Progress Tracking

Use checkboxes to track your progress through each phase:

### Phase 1: GCP Project Setup & Prerequisites
- [x] 1.1 Create GCP Project
- [x] 1.2 Enable Required APIs
- [x] 1.3 Install Required Tools
- [ ] 1.4 Set Up GCP Regions

### Phase 2: Cloud SQL Database Setup & Migration
- [x] 2.1 Create Cloud SQL PostgreSQL Instance
- [ ] 2.2 Create Database and User
- [ ] 2.3 Apply Database Schema
- [ ] 2.4 Export Data from Supabase
- [ ] 2.5 Import Data to Cloud SQL
- [ ] 2.6 Configure Cloud SQL Connection for Application

### Phase 3-12: Remaining Phases
- [ ] Phase 3: Cloud Storage Setup
- [ ] Phase 4: Update Application Code
- [ ] Phase 5: Containerize Application
- [ ] Phase 6: Deploy to Cloud Run
- [ ] Phase 7: Custom Domain Configuration
- [ ] Phase 8: CI/CD with Cloud Build
- [ ] Phase 9: Monitoring & Logging
- [ ] Phase 10: Cost Optimization & Scaling
- [ ] Phase 11: Data Migration Testing & Validation
- [ ] Phase 12: Post-Migration Checklist

---

## Phase 1: GCP Project Setup & Prerequisites

### 1.1 Create GCP Project

**Steps:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a Project" → "New Project"
3. Enter project name: `prob-gym-research` (or your preferred name)
4. Select billing account (required for all services)
5. Click "Create"
6. Note your **Project ID** (format: `prob-gym-research-123456`)

### 1.2 Enable Required APIs

**Enable these APIs via Console or gcloud CLI:**

```bash
# Install gcloud CLI first: https://cloud.google.com/sdk/docs/install

# Authenticate
gcloud auth login

# Set project
gcloud config set project prob-gym-research-123456

# Enable APIs
gcloud services enable \
  sqladmin.googleapis.com \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  storage-api.googleapis.com \
  compute.googleapis.com \
  secretmanager.googleapis.com \
  cloudresourcemanager.googleapis.com \
  artifactregistry.googleapis.com
```

**What each API does:**
- `sqladmin.googleapis.com` - Cloud SQL database management
- `run.googleapis.com` - Cloud Run serverless containers
- `cloudbuild.googleapis.com` - Automated builds and deployments
- `storage-api.googleapis.com` - Cloud Storage for assets
- `secretmanager.googleapis.com` - Environment variables and secrets
- `artifactregistry.googleapis.com` - Container image storage

### 1.3 Install Required Tools

**Local development tools:**
```bash
# Google Cloud CLI (gcloud)
# Download from: https://cloud.google.com/sdk/docs/install

# Cloud SQL Proxy (for local database access)
curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.8.0/cloud-sql-proxy.darwin.amd64
chmod +x cloud-sql-proxy
sudo mv cloud-sql-proxy /usr/local/bin/

# PostgreSQL client tools (for database operations)
brew install postgresql@14
```

### 1.4 Set Up GCP Regions

**Recommended region:** `us-central1` (Iowa) for cost-effectiveness and availability

**Configure default region:**
```bash
gcloud config set compute/region us-central1
gcloud config set compute/zone us-central1-a
```

---

## Phase 2: Cloud SQL Database Setup & Migration

### 2.1 Create Cloud SQL PostgreSQL Instance

**Via Console:**
1. Navigate to **SQL** in GCP Console
2. Click "Create Instance" → "PostgreSQL"
3. Configure:
   - **Instance ID:** `prob-gym-db`
   - **Password:** Generate strong password (save in password manager)
   - **Database version:** PostgreSQL 14
   - **Region:** `us-central1`
   - **Preset:** Development (for testing) or Production (for live use)
   - **Machine type:**
     - Dev/staging: Shared core (db-f1-micro) - $10/month
     - Production: 1 vCPU, 3.75 GB RAM (db-n1-standard-1) - $50/month
   - **Storage:** 10 GB SSD (auto-increases as needed)
   - **Backups:** Enable automated backups (daily at 3 AM UTC)
   - **High availability:** Disable for dev, enable for production (+100% cost)

4. Click "Create Instance" (takes 5-10 minutes)

**Via gcloud CLI:**
```bash
# Development instance
gcloud sql instances create prob-gym-db \
  --database-version=POSTGRES_14 \
  --tier=db-f1-micro \
  --region=us-central1 \
  --storage-type=SSD \
  --storage-size=10GB \
  --backup \
  --backup-start-time=03:00 \
  --root-password=YOUR_STRONG_PASSWORD

# Production instance (better performance)
gcloud sql instances create prob-gym-db-prod \
  --database-version=POSTGRES_14 \
  --tier=db-n1-standard-1 \
  --region=us-central1 \
  --storage-type=SSD \
  --storage-size=10GB \
  --backup \
  --backup-start-time=03:00 \
  --availability-type=REGIONAL \
  --root-password=YOUR_STRONG_PASSWORD
```

### 2.2 Create Database and User

**AUTHENTICATION FIX:** Before starting the proxy, set up Application Default Credentials:

```bash
# Step 1: Authenticate with Google (opens browser)
gcloud auth login

# Step 2: Set up Application Default Credentials (THIS IS CRITICAL)
gcloud auth application-default login

# Step 3: Set your active project
gcloud config set project YOUR_PROJECT_ID

# Step 4: Get connection name
gcloud sql instances describe YOUR_INSTANCE_NAME --format="value(connectionName)"
# Output example: prob-gym-research-123456:us-central1:prob-gym-db

# Step 5: Start proxy in separate terminal window
cloud-sql-proxy YOUR_CONNECTION_NAME

# Step 6: In another terminal, connect via psql
psql "host=127.0.0.1 port=5432 user=postgres dbname=postgres"
# Enter the password you set during instance creation
```

**Create application database and user:**
```sql
-- Create database
CREATE DATABASE probgym_production;

-- Create application user
CREATE USER probgym_app WITH PASSWORD 'your_app_password_here';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE probgym_production TO probgym_app;

-- Connect to new database
\c probgym_production

-- Grant schema permissions
GRANT ALL ON SCHEMA public TO probgym_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO probgym_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO probgym_app;

-- Exit psql
\q
```

### 2.3 Apply Database Schema

**Copy schema from your local file:**
```bash
# Connect to your new database via proxy
psql "host=127.0.0.1 port=5432 user=probgym_app dbname=probgym_production"

# Paste schema contents or run from file
# Copy contents of /Users/shivam/dev/Research/Prob-Gym/schema.sql
# Or use:
\i /Users/shivam/dev/Research/Prob-Gym/schema.sql
```

**Important schema notes:**
- Your schema includes RLS policies - these will remain in PostgreSQL
- With application-layer auth, you'll bypass RLS by using the `probgym_app` user
- RLS policies are disabled by default when using service role credentials

**Verify schema creation:**
```sql
-- Check tables exist
\dt

-- Expected output:
-- public | participants   | table | probgym_app
-- public | studies        | table | probgym_app
-- public | study_plugins  | table | probgym_app

-- Check indexes
\di

-- Expected indexes on:
-- - studies: slug, status
-- - participants: study_id, created_at

-- Exit
\q
```

### 2.4 Export Data from Supabase

**Option A: Via Supabase Dashboard (Easiest)**
1. Go to Supabase Dashboard → Database → Backups
2. Download latest backup
3. Extract SQL dump file

**Option B: Via pg_dump (More control)**
```bash
# Get Supabase connection string from dashboard
# Format: postgres://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# Export schema + data
pg_dump "postgres://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres" \
  --data-only \
  --table=studies \
  --table=participants \
  --table=study_plugins \
  > supabase_data_export.sql
```

### 2.5 Import Data to Cloud SQL

**Via Cloud SQL Proxy:**
```bash
# Ensure proxy is running (see step 2.2)
# Import data
psql "host=127.0.0.1 port=5432 user=probgym_app dbname=probgym_production" \
  < supabase_data_export.sql
```

**Verify data migration:**
```bash
psql "host=127.0.0.1 port=5432 user=probgym_app dbname=probgym_production"
```

```sql
-- Check row counts
SELECT COUNT(*) FROM studies;        -- Should show 8 studies
SELECT COUNT(*) FROM participants;   -- Should match Supabase count
SELECT COUNT(*) FROM study_plugins;  -- Should show your plugins

-- Verify specific study exists
SELECT slug, title, status FROM studies WHERE slug = 'prob-gym';

-- Check sample participant data
SELECT id, study_id, participant_id, consent_timestamp
FROM participants
LIMIT 5;

-- Exit
\q
```

### 2.6 Configure Cloud SQL Connection for Application

**Get connection details:**
```bash
# Get connection name
gcloud sql instances describe prob-gym-db --format="value(connectionName)"
# Save this: prob-gym-research-123456:us-central1:prob-gym-db

# Get public IP (if using IP-based connection)
gcloud sql instances describe prob-gym-db --format="value(ipAddresses[0].ipAddress)"
```

**Connection options for Cloud Run:**
- **Option 1 (Recommended):** Unix socket via `/cloudsql/CONNECTION_NAME`
- **Option 2:** Public IP with SSL (requires allowlisting Cloud Run IPs)
- **Option 3:** Private IP via VPC connector (more complex setup)

---

[Rest of phases omitted for brevity - see complete guide in file]

---

## Quick Reference Commands

### Database Operations:
```bash
# Connect to Cloud SQL
cloud-sql-proxy YOUR_CONNECTION_NAME
psql "host=127.0.0.1 port=5432 user=probgym_app dbname=probgym_production"

# Export database
gcloud sql export sql prob-gym-db gs://backup-bucket/export-$(date +%s).sql --database=probgym_production

# Import database
gcloud sql import sql prob-gym-db gs://backup-bucket/export.sql --database=probgym_production
```

### Troubleshooting Cloud SQL Proxy Authentication:
```bash
# Fix "could not find default credentials" error
gcloud auth application-default login

# Verify credentials
gcloud auth application-default print-access-token

# Re-authenticate if needed
gcloud auth login
gcloud auth application-default login
```

---

**For complete migration guide, refer to:** `/Users/shivam/.claude/plans/stateless-doodling-karp.md`
