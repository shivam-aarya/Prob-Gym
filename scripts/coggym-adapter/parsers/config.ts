/**
 * Parser for CogGym config.json files
 */

import { readFile } from 'fs/promises';
import { join } from 'path';
import { CogGymConfig } from '../types';

/**
 * Parse a config.json file from a CogGym experiment
 */
export async function parseConfig(experimentPath: string): Promise<CogGymConfig> {
  const configPath = join(experimentPath, 'config.json');

  try {
    const content = await readFile(configPath, 'utf-8');
    return parseConfigFromString(content);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse config.json: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Parse config from a string (for in-memory processing)
 */
export function parseConfigFromString(content: string): CogGymConfig {
  try {
    const config = JSON.parse(content) as CogGymConfig;

    // Validate required fields
    validateConfig(config);

    return config;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse config: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Validate that config has all required fields
 */
function validateConfig(config: any): asserts config is CogGymConfig {
  const requiredFields = [
    'experimentName',
    'description',
    'taskType',
    'responseType',
    'stimuli_count',
    'experimentFlow',
  ];

  for (const field of requiredFields) {
    if (!(field in config)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  if (!Array.isArray(config.experimentFlow) || config.experimentFlow.length === 0) {
    throw new Error('experimentFlow must be a non-empty array');
  }

  // Validate each flow
  for (const flow of config.experimentFlow) {
    if (!Array.isArray(flow.blocks) || flow.blocks.length === 0) {
      throw new Error('Each experimentFlow must have non-empty blocks array');
    }

    if (typeof flow.block_randomization !== 'boolean') {
      throw new Error('block_randomization must be a boolean');
    }

    if (typeof flow.stimuli_randomization !== 'boolean') {
      throw new Error('stimuli_randomization must be a boolean');
    }
  }
}
