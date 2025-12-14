/**
 * Validation utilities for CogGym experiment data
 */

import { CogGymConfig, CogGymStimulus, InstructionContent } from '../types';

/**
 * Validate that all IDs referenced in experimentFlow exist in either stimuli or instructions
 */
export function validateStimuliReferences(
  config: CogGymConfig,
  stimuli: CogGymStimulus[],
  instructions: InstructionContent[] = []
): { valid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const stimuliIds = new Set(stimuli.map(s => s.id));
  const instructionIds = new Set(instructions.map(i => i.id));

  for (const flow of config.experimentFlow) {
    for (const block of flow.blocks) {
      for (const id of block) {
        // Check if ID exists in either stimuli or instructions
        if (!stimuliIds.has(id) && !instructionIds.has(id)) {
          errors.push(
            `ID "${id}" referenced in experimentFlow but not found in trial.jsonl or instruction.jsonl`
          );
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings: [],
  };
}

/**
 * Validate instruction references
 * Note: test_trial types now have embedded stimuli arrays, so no validation needed
 */
export function validateInstructionReferences(
  instructions: InstructionContent[],
  stimuli: CogGymStimulus[]
): { valid: boolean; errors: string[]; warnings: string[] } {
  // No validation needed - test_trial types have embedded stimuli
  // instead of references to external stimuli
  return {
    valid: true,
    errors: [],
    warnings: [],
  };
}

/**
 * Validate consistency between config counts and actual data
 */
export function validateCounts(
  config: CogGymConfig,
  stimuli: CogGymStimulus[]
): { valid: boolean; errors: string[]; warnings: string[] } {
  const warnings: string[] = [];

  // Check stimuli count
  const uniqueStimuli = new Set(stimuli.map(s => s.id)).size;
  if (config.stimuli_count !== uniqueStimuli) {
    warnings.push(
      `Config specifies ${config.stimuli_count} stimuli but found ${uniqueStimuli} unique stimuli`
    );
  }

  return {
    valid: warnings.length === 0,
    errors: [],
    warnings,
  };
}

/**
 * Validate that query tags are unique within each stimulus
 */
export function validateQueryTags(
  stimuli: CogGymStimulus[]
): { valid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];

  for (const stimulus of stimuli) {
    const tags = stimulus.queries.map(q => q.tag);
    const uniqueTags = new Set(tags);

    if (tags.length !== uniqueTags.size) {
      const duplicates = tags.filter((tag, index) => tags.indexOf(tag) !== index);
      errors.push(
        `Stimulus "${stimulus.id}" has duplicate query tags: ${duplicates.join(', ')}`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings: [],
  };
}

/**
 * Run all validations and return combined results
 */
export function validateExperiment(
  config: CogGymConfig,
  stimuli: CogGymStimulus[],
  instructions: InstructionContent[]
): { valid: boolean; errors: string[]; warnings: string[] } {
  const results = [
    validateStimuliReferences(config, stimuli, instructions),
    validateInstructionReferences(instructions, stimuli),
    validateCounts(config, stimuli),
    validateQueryTags(stimuli),
  ];

  const allErrors = results.flatMap(r => r.errors || []);
  const allWarnings = results.flatMap(r => r.warnings || []);

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
  };
}
