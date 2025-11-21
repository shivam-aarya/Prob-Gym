/**
 * Utility to map between CogGym stimuli_id (string) and Prob-Gym scenario_id (number)
 * Handles multi-query scenarios by creating separate IDs for each query
 */

import { CogGymStimulus, IdMapping } from '../types';

/**
 * Create ID mappings for all stimuli and their queries
 *
 * Since we're splitting multi-query trials into separate scenarios,
 * each query gets its own sequential scenario_id.
 *
 * Example:
 *   stimulus "trial_1" with 2 queries → scenario_id 0, 1
 *   stimulus "trial_2" with 3 queries → scenario_id 2, 3, 4
 */
export function createIdMappings(stimuli: CogGymStimulus[]): IdMapping[] {
  const mappings: IdMapping[] = [];
  let scenarioId = 0;

  for (const stimulus of stimuli) {
    for (let queryIndex = 0; queryIndex < stimulus.queries.length; queryIndex++) {
      const query = stimulus.queries[queryIndex];
      mappings.push({
        stimuliId: stimulus.stimuli_id,
        queryTag: query.tag,
        scenarioId: scenarioId++,
        queryIndex,
      });
    }
  }

  return mappings;
}

/**
 * Get scenario ID for a specific stimulus and query
 */
export function getScenarioId(
  mappings: IdMapping[],
  stimuliId: string,
  queryTag: string
): number | undefined {
  const mapping = mappings.find(
    m => m.stimuliId === stimuliId && m.queryTag === queryTag
  );
  return mapping?.scenarioId;
}

/**
 * Get all scenario IDs for a stimulus (one per query)
 */
export function getStimulusScenarioIds(
  mappings: IdMapping[],
  stimuliId: string
): number[] {
  return mappings
    .filter(m => m.stimuliId === stimuliId)
    .map(m => m.scenarioId);
}

/**
 * Get original stimuli_id from scenario_id
 */
export function getStimuliId(
  mappings: IdMapping[],
  scenarioId: number
): string | undefined {
  const mapping = mappings.find(m => m.scenarioId === scenarioId);
  return mapping?.stimuliId;
}

/**
 * Get query index within stimulus from scenario_id
 */
export function getQueryIndex(
  mappings: IdMapping[],
  scenarioId: number
): number | undefined {
  const mapping = mappings.find(m => m.scenarioId === scenarioId);
  return mapping?.queryIndex;
}

/**
 * Count total number of scenarios (one per trial, even if trial has multiple queries)
 */
export function countTotalScenarios(stimuli: CogGymStimulus[]): number {
  return stimuli.length;
}

/**
 * Generate a human-readable scenario identifier
 * Example: "trial_1_q0" for first query of trial_1
 */
export function generateScenarioIdentifier(stimuliId: string, queryIndex: number): string {
  return `${stimuliId}_q${queryIndex}`;
}
