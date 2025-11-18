/**
 * Conversion Library for In-Memory CogGym → Prob-Gym Conversion
 *
 * This module provides conversion functions that work with in-memory data
 * (uploaded files) rather than the file system. Used by the admin preview API.
 */

import { StudyMetadata } from '@/studies/types';
import { StudyConfig } from '@/types/study';

// Re-export types from the coggym-adapter
export type {
  CogGymConfig,
  CogGymStimulus,
  InstructionContent,
  Query as CogGymQuery,
} from '../../../scripts/coggym-adapter/types';

// Import conversion and parsing functions
import { parseConfigFromString } from '../../../scripts/coggym-adapter/parsers/config';
import { parseStimuliFromString } from '../../../scripts/coggym-adapter/parsers/stimuli';
import { parseInstructionsFromString } from '../../../scripts/coggym-adapter/parsers/instructions';
import { validateExperiment } from '../../../scripts/coggym-adapter/utils/validation';
import { convertToMetadata } from '../../../scripts/coggym-adapter/converters/metadata';
import { convertToScenarios } from '../../../scripts/coggym-adapter/converters/scenarios';
import { convertToConfig } from '../../../scripts/coggym-adapter/converters/config';
import { updateAssetPaths } from '../../../scripts/coggym-adapter/generators/assets';
import type { InstructionContent } from '../../../scripts/coggym-adapter/types';

export interface UploadedFile {
  name: string;
  content: string | ArrayBuffer; // Text content or binary data
  path: string; // Relative path in the uploaded folder
}

export interface ConversionLogs {
  info: string[];
  warnings: string[];
  errors: string[];
}

export interface ConversionResult {
  success: boolean;
  studySlug: string;
  metadata?: StudyMetadata;
  scenarios?: StudyConfig[];
  assets?: Map<string, { path: string; data: string; mimeType: string }>; // Base64-encoded assets
  logs: ConversionLogs;
}

/**
 * Convert uploaded CogGym files to Cog-Gym format
 */
export async function convertUploadedStudy(
  files: UploadedFile[]
): Promise<ConversionResult> {
  const logs: ConversionLogs = {
    info: [],
    warnings: [],
    errors: [],
  };

  try {
    // Find required files (check if path ends with filename to handle nested folders)
    logs.info.push('STEP 0: Validating uploaded files');
    logs.info.push(`  - Total files uploaded: ${files.length}`);

    const configFile = files.find(f => f.path.endsWith('config.json') || f.name === 'config.json');
    const trialFile = files.find(f => f.path.endsWith('trial.jsonl') || f.name === 'trial.jsonl');
    const instructionFile = files.find(f => f.path.endsWith('instruction.jsonl') || f.name === 'instruction.jsonl');

    if (!configFile) {
      logs.errors.push('VALIDATION FAILED: Missing required file');
      logs.errors.push('  - Required file not found: config.json');
      logs.errors.push('  - This file contains experiment configuration and metadata');
      logs.errors.push('  - Please ensure config.json is included in your upload');
      logs.errors.push('');
      logs.errors.push('Files received:');
      files.forEach(f => logs.errors.push(`  - ${f.path}`));
      return { success: false, studySlug: '', logs };
    }

    if (!trialFile) {
      logs.errors.push('VALIDATION FAILED: Missing required file');
      logs.errors.push('  - Required file not found: trial.jsonl');
      logs.errors.push('  - This file contains trial/scenario definitions');
      logs.errors.push('  - Please ensure trial.jsonl is included in your upload');
      logs.errors.push('');
      logs.errors.push('Files received:');
      files.forEach(f => logs.errors.push(`  - ${f.path}`));
      return { success: false, studySlug: '', logs };
    }

    logs.info.push(`  - Found config.json at: ${configFile.path}`);
    logs.info.push(`  - Found trial.jsonl at: ${trialFile.path}`);
    if (instructionFile) {
      logs.info.push(`  - Found instruction.jsonl at: ${instructionFile.path}`);
    }
    logs.info.push('');

    logs.info.push('STEP 1: Parsing experiment files');

    // Parse config
    const config = parseConfigFromString(configFile.content as string);
    logs.info.push(`  - Parsed config.json successfully`);
    logs.info.push(`  - Experiment name: ${config.experimentName}`);

    // Parse trials
    const stimuli = parseStimuliFromString(trialFile.content as string);
    logs.info.push(`  - Parsed trial.jsonl successfully`);
    logs.info.push(`  - Total trials: ${stimuli.length}`);
    logs.info.push(`  - Unique trial IDs: ${new Set(stimuli.map(s => s.stimuli_id)).size}`);

    // Parse instructions (optional)
    let instructions: InstructionContent[] = [];
    if (instructionFile) {
      instructions = parseInstructionsFromString(instructionFile.content as string);
      logs.info.push(`  - Parsed instruction.jsonl successfully`);
      logs.info.push(`  - Instruction modules: ${instructions.length}`);
    } else {
      logs.info.push(`  - No instruction.jsonl file found (optional)`);
    }

    // Validate experiment
    logs.info.push('');
    logs.info.push('STEP 2: Validating experiment structure and data integrity');
    const validation = validateExperiment(config, stimuli, instructions);

    if (validation.warnings.length > 0) {
      logs.info.push(`  - Validation warnings detected: ${validation.warnings.length}`);
      logs.warnings.push(...validation.warnings);
    }

    if (!validation.valid) {
      logs.info.push(`  - Validation failed with ${validation.errors.length} error(s)`);
      logs.errors.push(...validation.errors);
      return { success: false, studySlug: '', logs };
    }

    logs.info.push('  - Validation passed: all required fields present and properly formatted');

    // Generate study slug from experiment name
    const studySlug = `TEST_${Date.now()}_${config.experimentName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')}`;

    // Convert to Cog-Gym format
    logs.info.push('');
    logs.info.push('STEP 3: Converting to Cog-Gym format');
    logs.info.push(`  - Generated study slug: ${studySlug}`);

    const metadata = convertToMetadata(config, stimuli, instructions, studySlug);
    logs.info.push(`  - Created study metadata with title: "${metadata.title}"`);
    logs.info.push(`  - Study ID: ${metadata.id}`);
    logs.info.push(`  - Version: ${metadata.version}`);

    const { scenarios } = convertToScenarios(stimuli);
    logs.info.push(`  - Converted ${stimuli.length} trials into ${scenarios.length} scenarios`);
    logs.info.push(`  - Each scenario contains ${scenarios[0]?.questions?.length || 0} question(s)`);

    // Calculate total queries from stimuli
    const totalQueries = stimuli.reduce((sum, s) => sum + s.queries.length, 0);
    const probGymConfig = convertToConfig(config, instructions, studySlug, totalQueries);

    // Add consent and tutorial to metadata from config
    (metadata as any).consent = probGymConfig.consent;
    (metadata as any).tutorial = probGymConfig.tutorial;
    (metadata as any).demographic = probGymConfig.demographic;

    logs.info.push(`  - Study flow: consent=${!!probGymConfig.consent}, tutorial=${!!probGymConfig.tutorial}, demographic=${!!probGymConfig.demographic}`);

    // Process assets
    logs.info.push('');
    logs.info.push('STEP 4: Processing media assets');

    const assets = new Map<string, { path: string; data: string; mimeType: string }>();
    // Find assets - they can be in 'assets/', './assets/', or 'folder/assets/'
    const assetFiles = files.filter(f =>
      f.path.includes('/assets/') || f.path.startsWith('assets/')
    );

    logs.info.push(`  - Found ${assetFiles.length} file(s) in assets directory`);

    const assetsByType: Record<string, number> = {};
    for (const assetFile of assetFiles) {
      if (assetFile.content instanceof ArrayBuffer) {
        // Convert ArrayBuffer to base64
        const bytes = new Uint8Array(assetFile.content);
        const base64 = Buffer.from(bytes).toString('base64');
        const mimeType = getMimeType(assetFile.name);

        // Extract the assets/ path (everything from 'assets/' onward)
        const pathParts = assetFile.path.split('/');
        const assetsIndex = pathParts.indexOf('assets');
        const assetPath = assetsIndex >= 0
          ? pathParts.slice(assetsIndex).join('/')
          : assetFile.path;

        assets.set(assetPath, { path: assetPath, data: base64, mimeType });

        // Track asset types for summary
        const ext = assetFile.name.split('.').pop()?.toLowerCase() || 'unknown';
        assetsByType[ext] = (assetsByType[ext] || 0) + 1;
      } else {
        logs.warnings.push(`Asset file "${assetFile.name}" is not binary data, skipping (expected ArrayBuffer, got ${typeof assetFile.content})`);
      }
    }

    logs.info.push(`  - Successfully processed ${assets.size} asset(s)`);
    if (Object.keys(assetsByType).length > 0) {
      const typeBreakdown = Object.entries(assetsByType)
        .map(([ext, count]) => `${count} ${ext}`)
        .join(', ');
      logs.info.push(`  - Asset breakdown by type: ${typeBreakdown}`);
    }

    // Update asset paths in scenarios to use test study slug
    // The actual URLs will be served by the API route
    const assetPath = `/api/admin/assets/${studySlug}`;
    const scenariosWithAssets = updateAssetPaths(scenarios, assetPath);
    logs.info.push(`  - Updated ${scenarios.length} scenario(s) with asset path: ${assetPath}`);

    // Update metadata asset path
    metadata.assetPath = assetPath;

    logs.info.push('');
    logs.info.push('CONVERSION COMPLETE');
    logs.info.push(`  - Study ready for preview with slug: ${studySlug}`);

    return {
      success: true,
      studySlug,
      metadata,
      scenarios: scenariosWithAssets,
      assets,
      logs,
    };
  } catch (error) {
    // Provide detailed error information for debugging
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    logs.errors.push('CONVERSION FAILED');
    logs.errors.push(`Error: ${errorMessage}`);

    if (errorStack) {
      logs.errors.push('Stack trace:');
      logs.errors.push(errorStack);
    }

    // Provide helpful troubleshooting hints
    logs.errors.push('');
    logs.errors.push('Troubleshooting tips:');
    logs.errors.push('  - Verify all required files are present: config.json, trial.jsonl');
    logs.errors.push('  - Check that JSON/JSONL files are properly formatted');
    logs.errors.push('  - Ensure asset files are in an "assets/" directory');
    logs.errors.push('  - Review the CogGym format specification for required fields');

    return { success: false, studySlug: '', logs };
  }
}

/**
 * Get MIME type from file extension
 */
function getMimeType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  const mimeTypes: Record<string, string> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    webp: 'image/webp',
    mp4: 'video/mp4',
    webm: 'video/webm',
    mov: 'video/quicktime',
    avi: 'video/x-msvideo',
  };

  return mimeTypes[ext || ''] || 'application/octet-stream';
}
