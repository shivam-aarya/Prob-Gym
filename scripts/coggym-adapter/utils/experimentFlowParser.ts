/**
 * Utility to parse and preserve nested block structures from CogGym experimentFlow
 * Replaces the flattening logic to maintain experimental design integrity
 */

import { ExperimentFlow as CogGymExperimentFlow } from '../types';
import type {
  ExperimentItem,
  ExperimentalCondition,
  ExperimentBlock
} from '@/types/study';

/**
 * Parse experiment flow into structured conditions with preserved block structure
 *
 * @param experimentFlow - Array of flow definitions from CogGym config.json
 * @param stimuliMap - Maps CogGym trial IDs to Prob-Gym scenario IDs
 * @param instructionsMap - Maps instruction IDs to ExperimentItem objects
 * @returns Array of experimental conditions with blocks and items
 */
export function parseExperimentFlow(
  experimentFlow: CogGymExperimentFlow[],
  stimuliMap: Map<string, number>,
  instructionsMap: Map<string, ExperimentItem>
): ExperimentalCondition[] {
  const conditions: ExperimentalCondition[] = [];

  for (const flow of experimentFlow) {
    const conditionName = flow.experimental_condition || 'default';

    const condition: ExperimentalCondition = {
      name: conditionName,
      blocks: [],
      randomizeBlocks: flow.block_randomization
    };

    // Process each block in this condition
    flow.blocks.forEach((block, blockIdx) => {
      // Separate instructions/quizzes from trials
      const instructionItems: ExperimentItem[] = [];
      const trialItems: ExperimentItem[] = [];

      // Process each item ID in the block
      for (const itemId of block) {
        // Check if it's a trial (from stimuli.jsonl)
        if (stimuliMap.has(itemId)) {
          trialItems.push({
            type: 'trial',
            id: `trial_${itemId}`,
            scenarioId: stimuliMap.get(itemId)!,
            originalTrialId: itemId
          });
        }
        // Check if it's an instruction/quiz/test_trial (from instruction.jsonl)
        else if (instructionsMap.has(itemId)) {
          instructionItems.push(instructionsMap.get(itemId)!);
        }
        // Unknown ID - log warning but continue
        else {
          console.warn(`[ExperimentFlow Parser] Unknown item ID in experimentFlow: ${itemId}`);
        }
      }

      // If there are both instructions and trials, create two sub-blocks
      // This ensures instructions stay in order while trials can be randomized
      if (instructionItems.length > 0 && trialItems.length > 0) {
        // First block: instructions (not randomized)
        condition.blocks.push({
          id: `${conditionName}_block_${blockIdx}_instructions`,
          items: instructionItems,
          randomizeItems: false
        });

        // Second block: trials (randomized if stimuli_randomization is true)
        condition.blocks.push({
          id: `${conditionName}_block_${blockIdx}_trials`,
          items: trialItems,
          randomizeItems: flow.stimuli_randomization
        });
      }
      // If only instructions/quizzes, don't randomize
      else if (instructionItems.length > 0) {
        condition.blocks.push({
          id: `${conditionName}_block_${blockIdx}`,
          items: instructionItems,
          randomizeItems: false
        });
      }
      // If only trials, apply randomization setting
      else if (trialItems.length > 0) {
        condition.blocks.push({
          id: `${conditionName}_block_${blockIdx}`,
          items: trialItems,
          randomizeItems: flow.stimuli_randomization
        });
      }
    });

    conditions.push(condition);
  }

  return conditions;
}

/**
 * Extract all unique stimuli IDs from experimentFlow
 * Useful for validation and counting
 *
 * @param experimentFlow - Array of flow definitions
 * @returns Array of unique stimuli IDs (excluding instructions)
 */
export function extractStimuliIds(experimentFlow: CogGymExperimentFlow[]): string[] {
  const stimuliIds = new Set<string>();

  for (const flow of experimentFlow) {
    for (const block of flow.blocks) {
      for (const itemId of block) {
        // Add all IDs - we'll filter for stimuli vs instructions later
        stimuliIds.add(itemId);
      }
    }
  }

  return Array.from(stimuliIds);
}

/**
 * Check if experimentFlow contains multiple experimental conditions
 *
 * @param experimentFlow - Array of flow definitions
 * @returns True if there are multiple conditions with different names
 */
export function hasMultipleConditions(experimentFlow: CogGymExperimentFlow[]): boolean {
  const conditions = new Set(
    experimentFlow
      .map(f => f.experimental_condition)
      .filter(Boolean) // Remove undefined
  );
  return conditions.size > 1;
}

/**
 * Count total number of items across all blocks and conditions
 *
 * @param experimentFlow - Array of flow definitions
 * @returns Total item count
 */
export function countTotalItems(experimentFlow: CogGymExperimentFlow[]): number {
  let count = 0;
  for (const flow of experimentFlow) {
    for (const block of flow.blocks) {
      count += block.length;
    }
  }
  return count;
}

/**
 * Validate experimentFlow structure
 * Ensures all required fields are present and IDs reference valid items
 *
 * @param experimentFlow - Array of flow definitions
 * @param validStimuliIds - Set of valid stimuli IDs from trial.jsonl
 * @param validInstructionIds - Set of valid instruction IDs from instruction.jsonl
 * @returns Validation result with errors and warnings
 */
export function validateExperimentFlow(
  experimentFlow: CogGymExperimentFlow[],
  validStimuliIds: Set<string>,
  validInstructionIds: Set<string>
): { valid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!experimentFlow || experimentFlow.length === 0) {
    errors.push('experimentFlow is empty or undefined');
    return { valid: false, errors, warnings };
  }

  for (let i = 0; i < experimentFlow.length; i++) {
    const flow = experimentFlow[i];

    // Check blocks exist
    if (!flow.blocks || flow.blocks.length === 0) {
      errors.push(`Flow ${i}: blocks array is empty or undefined`);
      continue;
    }

    // Validate each block
    for (let j = 0; j < flow.blocks.length; j++) {
      const block = flow.blocks[j];

      if (!Array.isArray(block) || block.length === 0) {
        warnings.push(`Flow ${i}, Block ${j}: block is empty`);
        continue;
      }

      // Validate each item ID in block
      for (const itemId of block) {
        const isValidStimulus = validStimuliIds.has(itemId);
        const isValidInstruction = validInstructionIds.has(itemId);

        if (!isValidStimulus && !isValidInstruction) {
          errors.push(
            `Flow ${i}, Block ${j}: Invalid item ID "${itemId}" - not found in stimuli or instructions`
          );
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
