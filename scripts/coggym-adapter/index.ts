#!/usr/bin/env node

/**
 * CogGym to Prob-Gym Adapter CLI
 *
 * Commands:
 *   list - List available CogGym experiments
 *   import <experiment-path> - Import a CogGym experiment
 */

import { readdir, access, constants } from 'fs/promises';
import { join, basename, resolve } from 'path';
import { parseConfig } from './parsers/config';
import { parseStimuli } from './parsers/stimuli';
import { parseInstructions } from './parsers/instructions';
import { validateExperiment } from './utils/validation';
import { convertToMetadata } from './converters/metadata';
import { convertToScenarios } from './converters/scenarios';
import { convertToConfig } from './converters/config';
import { createStudyDirectory, generateStudyFiles } from './generators/typescript';
import { copyAssets, updateAssetPaths } from './generators/assets';
import { registerStudy } from './utils/registry-updater';
import { ConversionOptions, ConversionResult } from './types';

// Default paths
const DEFAULT_DATASETS_PATH = resolve(__dirname, '../../../cog-gym-datasets/processed');
const DEFAULT_OUTPUT_PATH = resolve(__dirname, '../../src/studies');
const PUBLIC_PATH = resolve(__dirname, '../../public');

/**
 * Main CLI entry point
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'list':
      await listExperiments();
      break;

    case 'import':
      const experimentPath = args[1];
      if (!experimentPath) {
        console.error('Error: Please specify experiment path');
        console.error('Usage: npm run coggym:import <experiment-path>');
        console.error('Example: npm run coggym:import gerstenberg2012ping/exp1');
        process.exit(1);
      }

      const options: ConversionOptions = {
        datasetsPath: DEFAULT_DATASETS_PATH,
        outputPath: DEFAULT_OUTPUT_PATH,
        dryRun: args.includes('--dry-run'),
        overwrite: args.includes('--overwrite'),
        verbose: args.includes('--verbose') || args.includes('-v'),
      };

      await importExperiment(experimentPath, options);
      break;

    case 'help':
    case '--help':
    case '-h':
      printHelp();
      break;

    default:
      console.error(`Unknown command: ${command}`);
      printHelp();
      process.exit(1);
  }
}

/**
 * List all available CogGym experiments
 */
async function listExperiments() {
  console.log('📚 Available CogGym Experiments\n');

  try {
    const studyDirs = await readdir(DEFAULT_DATASETS_PATH);

    for (const studyDir of studyDirs) {
      const studyPath = join(DEFAULT_DATASETS_PATH, studyDir);

      try {
        const experiments = await readdir(studyPath);
        const expDirs = experiments.filter(e => e.startsWith('exp'));

        console.log(`\n${studyDir}/`);

        for (const expDir of expDirs) {
          const expPath = join(studyPath, expDir);

          try {
            const config = await parseConfig(expPath);
            console.log(`  ${expDir}: ${config.experimentName}`);
            console.log(`    Trials: ${config.stimuli_count}`);
          } catch (error) {
            console.log(`  ${expDir}: [Unable to parse config]`);
          }
        }
      } catch (error) {
        // Skip if not a directory
      }
    }

    console.log('\n✨ To import an experiment, run:');
    console.log('   npm run coggym:import <study>/<experiment>');
    console.log('   Example: npm run coggym:import gerstenberg2012ping/exp1');
  } catch (error) {
    console.error('❌ Error listing experiments:', error);
    process.exit(1);
  }
}

/**
 * Import a CogGym experiment
 */
async function importExperiment(
  experimentPath: string,
  options: ConversionOptions
): Promise<ConversionResult> {
  const fullPath = join(options.datasetsPath, experimentPath);

  console.log('🔄 Importing CogGym experiment...\n');
  console.log(`Source: ${fullPath}`);

  if (options.dryRun) {
    console.log('⚠️  DRY RUN MODE - No files will be created\n');
  }

  try {
    // Check if experiment exists
    await access(fullPath, constants.R_OK);

    // Parse experiment files
    console.log('📖 Parsing experiment files...');
    const config = await parseConfig(fullPath);
    const stimuli = await parseStimuli(fullPath);
    const instructions = await parseInstructions(fullPath);

    console.log(`   ✓ Config: ${config.experimentName}`);
    console.log(`   ✓ Trials: ${stimuli.length} trials`);
    console.log(`   ✓ Instructions: ${instructions.length} modules`);

    // Validate experiment
    console.log('\n🔍 Validating experiment...');
    const validation = validateExperiment(config, stimuli, instructions);

    if (validation.warnings.length > 0) {
      console.log('   ⚠️  Warnings:');
      for (const warning of validation.warnings) {
        console.log(`      - ${warning}`);
      }
    }

    if (!validation.valid) {
      console.log('   ❌ Errors:');
      for (const error of validation.errors) {
        console.log(`      - ${error}`);
      }
      return {
        success: false,
        studySlug: '',
        errors: validation.errors,
        warnings: validation.warnings,
      };
    }

    console.log('   ✓ Validation passed');

    // Generate study slug
    const studySlug = experimentPath.replace(/\//g, '-');

    // Convert to Prob-Gym format
    console.log('\n🔧 Converting to Prob-Gym format...');
    const metadata = convertToMetadata(config, stimuli, instructions, studySlug);
    const { scenarios } = convertToScenarios(stimuli);
    // Calculate total queries from stimuli
    const totalQueries = stimuli.reduce((sum, s) => sum + s.queries.length, 0);
    const probGymConfig = convertToConfig(config, instructions, studySlug, totalQueries);

    console.log(`   ✓ Metadata generated`);
    console.log(`   ✓ Scenarios: ${scenarios.length} (split from ${stimuli.length} trials)`);
    console.log(`   ✓ Config generated`);

    if (options.dryRun) {
      console.log('\n✨ Dry run complete - no files created');
      return {
        success: true,
        studySlug,
        scenarioCount: scenarios.length,
      };
    }

    // Create study directory (for code files)
    console.log('\n📁 Creating study directory...');
    const outputPath = await createStudyDirectory(options.outputPath, studySlug);
    console.log(`   ✓ Created: ${outputPath}`);

    // Create public assets directory and copy assets
    console.log('\n📦 Copying assets...');
    const publicAssetsPath = join(PUBLIC_PATH, 'studies', studySlug);
    const { copiedCount, errors: assetErrors } = await copyAssets(
      fullPath,
      publicAssetsPath,
      stimuli,
      instructions
    );

    console.log(`   ✓ Copied ${copiedCount} media files`);
    if (assetErrors.length > 0) {
      console.log('   ⚠️  Asset errors:');
      for (const error of assetErrors) {
        console.log(`      - ${error}`);
      }
    }

    // Update asset paths in scenarios
    const scenariosWithAssets = updateAssetPaths(scenarios, metadata.assetPath);

    // Generate TypeScript files
    console.log('\n📝 Generating TypeScript files...');
    await generateStudyFiles(outputPath, metadata, scenariosWithAssets, probGymConfig, {
      experimentName: config.experimentName,
      sourcePath: experimentPath,
      scenarioCount: scenarios.length,
      paperDOI: config.paperDOI,
    });

    console.log('   ✓ metadata.ts');
    console.log('   ✓ scenarios.ts');
    console.log('   ✓ config.json');
    console.log('   ✓ index.ts');
    console.log('   ✓ README.md');

    // Auto-register the study
    const projectRoot = resolve(__dirname, '../..');
    await registerStudy(projectRoot, studySlug);

    console.log('\n✅ Import complete!');
    console.log(`\n📚 Study created at: src/studies/${studySlug}`);
    console.log(`\n🔗 Next steps:`);
    console.log(`   1. Review generated files in src/studies/${studySlug}/`);
    console.log(`   2. Restart dev server (npm run dev)`);
    console.log(`   3. Test the study at /studies/${studySlug}/consent`);

    return {
      success: true,
      studySlug,
      outputPath,
      scenarioCount: scenarios.length,
      warnings: validation.warnings.concat(assetErrors),
    };
  } catch (error) {
    console.error('\n❌ Import failed:', error);
    return {
      success: false,
      studySlug: '',
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
}

/**
 * Print help message
 */
function printHelp() {
  console.log(`
CogGym to Prob-Gym Adapter

USAGE:
  npm run coggym:list                     List available experiments
  npm run coggym:import <path>            Import an experiment
  npm run coggym:import <path> [options]  Import with options

OPTIONS:
  --dry-run       Preview import without creating files
  --overwrite     Overwrite existing study if it exists
  --verbose, -v   Show detailed output

EXAMPLES:
  npm run coggym:list
  npm run coggym:import gerstenberg2012ping/exp1
  npm run coggym:import jern2017people/exp2 --dry-run
  npm run coggym:import wu2024whodunnit/exp1 --verbose
  `);
}

// Run CLI
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { importExperiment, listExperiments };
