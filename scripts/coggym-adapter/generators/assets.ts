/**
 * Asset organizer: Copy media files from CogGym experiment to Prob-Gym study
 */

import { copyFile, mkdir, access } from 'fs/promises';
import { join, basename, dirname } from 'path';
import { CogGymStimulus, InstructionContent } from '../types';

/**
 * Copy all media files from experiment to study assets directory
 */
export async function copyAssets(
  experimentPath: string,
  outputPath: string,
  stimuli: CogGymStimulus[],
  instructions: InstructionContent[] = []
): Promise<{ copiedCount: number; errors: string[] }> {
  const assetsPath = join(outputPath, 'assets');
  await mkdir(assetsPath, { recursive: true });

  const errors: string[] = [];
  let copiedCount = 0;

  // Collect all unique media URLs from stimuli (CogGym v2 schema)
  const mediaUrls = new Set<string>();
  for (const stimulus of stimuli) {
    // Extract from stimuli array
    if (stimulus.stimuli) {
      for (const stimulusItem of stimulus.stimuli) {
        // Only process media stimuli (img/video), skip text stimuli
        if (stimulusItem.input_type !== 'text' && stimulusItem.media_url) {
          for (const url of stimulusItem.media_url) {
            mediaUrls.add(url);
          }
        }
      }
    }
  }

  // Also collect media URLs from instructions
  for (const instruction of instructions) {
    // Handle instruction pages with media_url
    if (instruction.type === 'instruction' && instruction.media_url) {
      for (const url of instruction.media_url) {
        mediaUrls.add(url);
      }
    }
    // Handle test_trial with embedded stimuli
    if (instruction.type === 'test_trial' && instruction.stimuli) {
      for (const stimulusItem of instruction.stimuli) {
        // Only process media stimuli (img/video), skip text stimuli
        if (stimulusItem.input_type !== 'text' && stimulusItem.media_url) {
          for (const url of stimulusItem.media_url) {
            mediaUrls.add(url);
          }
        }
      }
    }
  }

  // Copy each media file
  for (const url of mediaUrls) {
    try {
      // Media URL is relative to experiment directory
      const sourcePath = join(experimentPath, url);

      // Preserve subdirectory structure from "assets/" onwards
      // Example: "assets/cards/card_00.png" → "cards/card_00.png"
      const relativePath = url.replace(/^assets\//, '');
      const destPath = join(assetsPath, relativePath);

      // Check if source file exists
      try {
        await access(sourcePath);
      } catch {
        errors.push(`Media file not found: ${url}`);
        continue;
      }

      // Ensure destination directory exists (including subdirectories)
      await mkdir(dirname(destPath), { recursive: true });

      // Copy file
      await copyFile(sourcePath, destPath);
      copiedCount++;
    } catch (error) {
      if (error instanceof Error) {
        errors.push(`Failed to copy ${url}: ${error.message}`);
      } else {
        errors.push(`Failed to copy ${url}: Unknown error`);
      }
    }
  }

  return { copiedCount, errors };
}

/**
 * Update media URLs in scenarios to point to new asset location
 * Note: source_link is now handled by converter (strips "assets/" prefix)
 * and Layout component uses getAssetUrl() to prepend study path, so we
 * don't need to modify it here anymore.
 */
export function updateAssetPaths(scenarios: any[], assetPath: string): any[] {
  // This function is kept for backward compatibility but no longer modifies scenarios
  // since the converter now strips "assets/" prefix and Layout uses getAssetUrl()
  return scenarios;
}

/**
 * Get all media files referenced in experiment
 */
export function getReferencedMedia(stimuli: CogGymStimulus[]): string[] {
  const media: string[] = [];

  for (const stimulus of stimuli) {
    // Extract from stimuli array (CogGym v2 schema)
    if (stimulus.stimuli) {
      for (const stimulusItem of stimulus.stimuli) {
        // Only process media stimuli (img/video), skip text stimuli
        if (stimulusItem.input_type !== 'text' && stimulusItem.media_url) {
          media.push(...stimulusItem.media_url);
        }
      }
    }
  }

  return media;
}

/**
 * Validate that all media files exist
 */
export async function validateMediaFiles(
  experimentPath: string,
  stimuli: CogGymStimulus[]
): Promise<{ valid: boolean; missing: string[] }> {
  const missing: string[] = [];
  const mediaUrls = getReferencedMedia(stimuli);

  for (const url of mediaUrls) {
    const sourcePath = join(experimentPath, url);
    try {
      await access(sourcePath);
    } catch {
      missing.push(url);
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  };
}
