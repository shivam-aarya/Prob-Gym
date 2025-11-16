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
 * Convert uploaded CogGym files to Prob-Gym format
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
    const configFile = files.find(f => f.path.endsWith('config.json') || f.name === 'config.json');
    const stimuliFile = files.find(f => f.path.endsWith('stimuli.jsonl') || f.name === 'stimuli.jsonl');
    const instructionFile = files.find(f => f.path.endsWith('instruction.jsonl') || f.name === 'instruction.jsonl');

    if (!configFile) {
      logs.errors.push('Missing required file: config.json');
      return { success: false, studySlug: '', logs };
    }

    if (!stimuliFile) {
      logs.errors.push('Missing required file: stimuli.jsonl');
      return { success: false, studySlug: '', logs };
    }

    logs.info.push('📖 Parsing experiment files...');

    // Parse config
    const config = parseConfigFromString(configFile.content as string);
    logs.info.push(`   ✓ Config: ${config.experimentName}`);

    // Parse stimuli
    const stimuli = parseStimuliFromString(stimuliFile.content as string);
    logs.info.push(`   ✓ Stimuli: ${stimuli.length} trials`);

    // Parse instructions (optional)
    let instructions: InstructionContent[] = [];
    if (instructionFile) {
      instructions = parseInstructionsFromString(instructionFile.content as string);
      logs.info.push(`   ✓ Instructions: ${instructions.length} modules`);
    }

    // Validate experiment
    logs.info.push('');
    logs.info.push('🔍 Validating experiment...');
    const validation = validateExperiment(config, stimuli, instructions);

    if (validation.warnings.length > 0) {
      logs.warnings.push(...validation.warnings);
    }

    if (!validation.valid) {
      logs.errors.push(...validation.errors);
      return { success: false, studySlug: '', logs };
    }

    logs.info.push('   ✓ Validation passed');

    // Generate study slug from experiment name
    const studySlug = `TEST_${Date.now()}_${config.experimentName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')}`;

    // Convert to Prob-Gym format
    logs.info.push('');
    logs.info.push('🔧 Converting to Prob-Gym format...');

    const metadata = convertToMetadata(config, stimuli, instructions, studySlug);
    const { scenarios } = convertToScenarios(stimuli);

    logs.info.push('   ✓ Metadata generated');
    logs.info.push(`   ✓ Scenarios: ${scenarios.length} (split from ${stimuli.length} trials)`);

    // Process assets
    logs.info.push('');
    logs.info.push('📦 Processing assets...');

    const assets = new Map<string, { path: string; data: string; mimeType: string }>();
    // Find assets - they can be in 'assets/', './assets/', or 'folder/assets/'
    const assetFiles = files.filter(f =>
      f.path.includes('/assets/') || f.path.startsWith('assets/')
    );

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
      } else {
        logs.warnings.push(`Asset ${assetFile.name} is not binary data, skipping`);
      }
    }

    logs.info.push(`   ✓ Processed ${assets.size} assets`);

    // Update asset paths in scenarios to use test study slug
    // The actual URLs will be served by the API route
    const assetPath = `/api/admin/assets/${studySlug}`;
    const scenariosWithAssets = updateAssetPaths(scenarios, assetPath);

    // Update metadata asset path
    metadata.assetPath = assetPath;

    logs.info.push('');
    logs.info.push('✅ Conversion complete!');

    return {
      success: true,
      studySlug,
      metadata,
      scenarios: scenariosWithAssets,
      assets,
      logs,
    };
  } catch (error) {
    logs.errors.push(error instanceof Error ? error.message : String(error));
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
