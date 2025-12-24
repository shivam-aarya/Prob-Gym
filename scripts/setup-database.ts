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
import { getAllStudies } from '../src/studies/registry';

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

    // Step 2: Get all studies from registry
    const allStudies = getAllStudies();
    console.log(`📚 Found ${allStudies.length} studies in registry\n`);

    const shouldUpdate = process.argv.includes('--force');
    let createdCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;

    // Step 3: Process each study
    for (const studyMetadata of allStudies) {
      console.log(`📝 Processing study: ${studyMetadata.title} (${studyMetadata.slug})`);

      // Check if study already exists
      const { data: existingStudy } = await supabase
        .from('studies')
        .select('*')
        .eq('slug', studyMetadata.slug)
        .single();

      if (existingStudy) {
        if (shouldUpdate) {
          // Update existing study
          const { error: updateError } = await supabase
            .from('studies')
            .update({
              title: studyMetadata.title,
              config: studyMetadata.settings,
              metadata: studyMetadata,
              status: studyMetadata.status,
              version: studyMetadata.version,
            })
            .eq('slug', studyMetadata.slug);

          if (updateError) {
            console.error(`   ❌ Failed to update: ${updateError.message}`);
          } else {
            console.log(`   ✅ Updated (ID: ${existingStudy.id})`);
            updatedCount++;
          }
        } else {
          console.log(`   ⏭️  Already exists (ID: ${existingStudy.id})`);
          skippedCount++;
        }
      } else {
        // Insert new study
        const { data: newStudy, error: insertError } = await supabase
          .from('studies')
          .insert({
            id: studyMetadata.id,
            slug: studyMetadata.slug,
            title: studyMetadata.title,
            config: studyMetadata.settings,
            metadata: studyMetadata,
            status: studyMetadata.status,
            version: studyMetadata.version,
          })
          .select()
          .single();

        if (insertError) {
          console.error(`   ❌ Failed to insert: ${insertError.message}`);
        } else {
          console.log(`   ✅ Created (ID: ${newStudy.id})`);
          createdCount++;
        }
      }
    }

    // Step 4: Summary
    console.log('\n🎉 Database setup complete!\n');
    console.log('📊 Summary:');
    console.log(`   - Total studies: ${allStudies.length}`);
    console.log(`   - Created: ${createdCount}`);
    console.log(`   - Updated: ${updatedCount}`);
    console.log(`   - Skipped: ${skippedCount}`);
    if (skippedCount > 0 && !shouldUpdate) {
      console.log('\n💡 Use --force flag to update existing studies');
    }
    console.log();

  } catch (error) {
    console.error('\n❌ Setup failed:', error);
    process.exit(1);
  }
}

// Run setup
setupDatabase();
