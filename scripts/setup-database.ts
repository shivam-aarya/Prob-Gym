/**
 * Database Setup Script
 * Initializes Supabase with the multi-study schema and seeds the Prob-Gym study
 *
 * Usage: npx tsx scripts/setup-database.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { createClient } from '@supabase/supabase-js';
import { probGymMetadata } from '../src/studies/prob-gym/metadata';

// Load environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL in .env.local');
  process.exit(1);
}

// Prefer service role key for setup (bypasses RLS), fall back to anon key
const SUPABASE_KEY = SUPABASE_SERVICE_KEY || SUPABASE_ANON_KEY;

if (!SUPABASE_KEY) {
  console.error('❌ Missing Supabase key in .env.local');
  console.error('   Required: SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

if (!SUPABASE_SERVICE_KEY) {
  console.log('⚠️  Using ANON key (RLS policies will apply)');
  console.log('   For setup, it\'s recommended to use SERVICE_ROLE_KEY');
  console.log('   Add to .env.local: SUPABASE_SERVICE_ROLE_KEY=your_service_key\n');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function setupDatabase() {
  console.log('🚀 Starting database setup...\n');

  try {
    // Step 1: Check if schema exists
    console.log('📋 Checking database schema...');
    const { data: tables, error: schemaError } = await supabase
      .from('studies')
      .select('*')
      .limit(1);

    if (schemaError) {
      console.error('\n❌ Schema not found or invalid!');
      console.error('   Error:', schemaError.message);
      console.error('\n📖 Please apply the schema first:');
      console.error('   1. Go to your Supabase project dashboard');
      console.error('   2. Navigate to SQL Editor');
      console.error('   3. Copy and paste the contents of schema.sql');
      console.error('   4. Run the SQL');
      console.error('   5. Then run this script again\n');
      process.exit(1);
    }

    console.log('✅ Schema exists\n');

    // Step 2: Check if Prob-Gym study already exists
    console.log('🔍 Checking for existing Prob-Gym study...');
    const { data: existingStudy } = await supabase
      .from('studies')
      .select('*')
      .eq('slug', 'prob-gym')
      .single();

    if (existingStudy) {
      console.log('⚠️  Prob-Gym study already exists');
      console.log('   ID:', existingStudy.id);
      console.log('   Status:', existingStudy.status);

      const shouldUpdate = process.argv.includes('--force');
      if (!shouldUpdate) {
        console.log('\n✨ Database is already set up!');
        console.log('   Use --force flag to update existing study\n');
        return;
      }

      console.log('   Updating existing study...');
      const { error: updateError } = await supabase
        .from('studies')
        .update({
          title: probGymMetadata.title,
          config: probGymMetadata.settings,
          metadata: probGymMetadata,
          status: probGymMetadata.status,
          version: probGymMetadata.version,
        })
        .eq('slug', 'prob-gym');

      if (updateError) {
        console.error('❌ Failed to update study:', updateError.message);
        process.exit(1);
      }

      console.log('✅ Study updated successfully\n');
      return;
    }

    // Step 3: Insert Prob-Gym study
    console.log('📝 Inserting Prob-Gym study...');
    const { data: newStudy, error: insertError } = await supabase
      .from('studies')
      .insert({
        id: probGymMetadata.id,
        slug: probGymMetadata.slug,
        title: probGymMetadata.title,
        config: probGymMetadata.settings,
        metadata: probGymMetadata,
        status: probGymMetadata.status,
        version: probGymMetadata.version,
      })
      .select()
      .single();

    if (insertError) {
      console.error('❌ Failed to insert study:', insertError.message);
      process.exit(1);
    }

    console.log('✅ Prob-Gym study created successfully!');
    console.log('   ID:', newStudy.id);
    console.log('   Slug:', newStudy.slug);
    console.log('   Title:', newStudy.title);
    console.log('   Status:', newStudy.status);

    // Step 4: Verify setup
    console.log('\n🔍 Verifying setup...');
    const { data: verification, error: verifyError } = await supabase
      .from('studies')
      .select('*')
      .eq('slug', 'prob-gym')
      .single();

    if (verifyError || !verification) {
      console.error('❌ Verification failed');
      process.exit(1);
    }

    console.log('✅ Verification successful!\n');
    console.log('🎉 Database setup complete!\n');
    console.log('📊 Summary:');
    console.log('   - Schema: ✅ Applied');
    console.log('   - Prob-Gym study: ✅ Created');
    console.log('   - Status: Ready for participants\n');

  } catch (error) {
    console.error('\n❌ Setup failed:', error);
    process.exit(1);
  }
}

// Run setup
setupDatabase();
