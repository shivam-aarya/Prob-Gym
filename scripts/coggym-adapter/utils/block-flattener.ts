/**
 * Utility to flatten nested block structures from CogGym experimentFlow
 * into a simple array of stimuli IDs for Prob-Gym
 */

import { ExperimentFlow, FlattenedTrial } from '../types';

/**
 * Flatten experiment flow blocks into ordered trial list
 *
 * Handles:
 * - Multiple experimental conditions
 * - Nested block structures
 * - Block-level and stimuli-level randomization flags
 *
 * For Prob-Gym, we flatten everything and rely on its simple randomization.
 * We preserve the condition info but apply a single randomization setting.
 */
export function flattenBlocks(experimentFlow: ExperimentFlow[]): {
  stimuliIds: string[];
  shouldRandomize: boolean;
  conditions: string[];
} {
  const allTrials: FlattenedTrial[] = [];
  const conditions = new Set<string>();
  let anyRandomization = false;

  for (const flow of experimentFlow) {
    const condition = flow.experimental_condition;
    if (condition) {
      conditions.add(condition);
    }

    // Track if any randomization is enabled
    if (flow.block_randomization || flow.stimuli_randomization) {
      anyRandomization = true;
    }

    // Flatten blocks
    const blocks = flow.blocks;

    // If block randomization is enabled, we'd randomize block order
    // But since we're flattening, we just note it in the flag
    for (const block of blocks) {
      for (const stimuliId of block) {
        allTrials.push({
          stimuliId,
          condition,
          order: allTrials.length,
        });
      }
    }
  }

  // Extract just the stimuli IDs in order
  const stimuliIds = allTrials.map(t => t.stimuliId);

  return {
    stimuliIds,
    shouldRandomize: anyRandomization,
    conditions: Array.from(conditions),
  };
}

/**
 * Get unique stimuli IDs from flattened list (removes duplicates)
 */
export function getUniqueStimuli(stimuliIds: string[]): string[] {
  return Array.from(new Set(stimuliIds));
}

/**
 * Count total number of trials (including repeats)
 */
export function countTotalTrials(experimentFlow: ExperimentFlow[]): number {
  let count = 0;
  for (const flow of experimentFlow) {
    for (const block of flow.blocks) {
      count += block.length;
    }
  }
  return count;
}

/**
 * Detect if experiment has multiple conditions
 */
export function hasMultipleConditions(experimentFlow: ExperimentFlow[]): boolean {
  const conditions = new Set(
    experimentFlow.map(f => f.experimental_condition).filter(Boolean)
  );
  return conditions.size > 1;
}
