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

  // Collect all unique media URLs from stimuli
  const mediaUrls = new Set<string>();
  for (const stimulus of stimuli) {
    if (stimulus.media_url) {
      for (const url of stimulus.media_url) {
        mediaUrls.add(url);
      }
    }
  }

  // Also collect media URLs from instructions
  for (const instruction of instructions) {
    if (instruction.media_url) {
      for (const url of instruction.media_url) {
        mediaUrls.add(url);
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
 * Converts: "assets/cards/image.png" → "/studies/[slug]/assets/cards/image.png"
 * Preserves subdirectory structure from original path
 */
export function updateAssetPaths(scenarios: any[], assetPath: string): any[] {
  return scenarios.map(scenario => {
    if (scenario.source_link) {
      // Preserve relative path structure from "assets/" onwards
      // Example: "assets/cards/card_00.png" → "cards/card_00.png"
      const relativePath = scenario.source_link.replace(/^assets\//, '');
      scenario.source_link = `${assetPath}/${relativePath}`;
    }
    return scenario;
  });
}

/**
 * Get all media files referenced in experiment
 */
export function getReferencedMedia(stimuli: CogGymStimulus[]): string[] {
  const media: string[] = [];

  for (const stimulus of stimuli) {
    if (stimulus.media_url) {
      media.push(...stimulus.media_url);
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
