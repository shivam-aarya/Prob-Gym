/**
 * Parser for CogGym trial.jsonl files
 */

import { readFile } from 'fs/promises';
import { join } from 'path';
import { CogGymStimulus } from '../types';

/**
 * Parse a trial.jsonl file from a CogGym experiment
 * JSONL format: one JSON object per line
 */
export async function parseStimuli(experimentPath: string): Promise<CogGymStimulus[]> {
  const trialPath = join(experimentPath, 'trial.jsonl');

  try {
    const content = await readFile(trialPath, 'utf-8');
    return parseStimuliFromString(content);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse trial.jsonl: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Parse trials from a string (for in-memory processing)
 */
export function parseStimuliFromString(content: string): CogGymStimulus[] {
  try {
    const lines = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0); // Filter out empty lines

    const stimuli: CogGymStimulus[] = [];

    for (let i = 0; i < lines.length; i++) {
      try {
        const stimulus = JSON.parse(lines[i]) as CogGymStimulus;
        validateStimulus(stimulus, i + 1);
        stimuli.push(stimulus);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to parse line ${i + 1}: ${error.message}`);
        }
        throw error;
      }
    }

    return stimuli;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse trials: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Validate that stimulus has all required fields
 */
function validateStimulus(stimulus: any, lineNumber: number): asserts stimulus is CogGymStimulus {
  const requiredFields = ['stimuli_id', 'stimuli', 'queries'];

  for (const field of requiredFields) {
    if (!(field in stimulus)) {
      throw new Error(`Line ${lineNumber}: Missing required field: ${field}`);
    }
  }

  if (!Array.isArray(stimulus.stimuli) || stimulus.stimuli.length === 0) {
    throw new Error(`Line ${lineNumber}: stimuli must be a non-empty array`);
  }

  if (!Array.isArray(stimulus.queries) || stimulus.queries.length === 0) {
    throw new Error(`Line ${lineNumber}: queries must be a non-empty array`);
  }

  // Validate each stimulus item in the stimuli array
  const validInputTypes = ['img', 'video', 'text'];
  for (let i = 0; i < stimulus.stimuli.length; i++) {
    const stimulusItem = stimulus.stimuli[i];

    if (!('input_type' in stimulusItem)) {
      throw new Error(`Line ${lineNumber}, Stimulus ${i + 1}: Missing required field: input_type`);
    }

    if (!validInputTypes.includes(stimulusItem.input_type)) {
      throw new Error(`Line ${lineNumber}, Stimulus ${i + 1}: input_type must be one of: ${validInputTypes.join(', ')}`);
    }

    // Validate based on input_type
    if (stimulusItem.input_type === 'img' || stimulusItem.input_type === 'video') {
      // Media stimulus - requires media_url array
      if (!('media_url' in stimulusItem)) {
        throw new Error(`Line ${lineNumber}, Stimulus ${i + 1}: ${stimulusItem.input_type} input_type requires media_url field`);
      }
      if (!Array.isArray(stimulusItem.media_url)) {
        throw new Error(`Line ${lineNumber}, Stimulus ${i + 1}: media_url must be an array`);
      }
      if (stimulusItem.media_url.length === 0) {
        throw new Error(`Line ${lineNumber}, Stimulus ${i + 1}: media_url array cannot be empty`);
      }
    } else if (stimulusItem.input_type === 'text') {
      // Text stimulus - requires text field
      if (!('text' in stimulusItem)) {
        throw new Error(`Line ${lineNumber}, Stimulus ${i + 1}: text input_type requires text field`);
      }
      if (typeof stimulusItem.text !== 'string') {
        throw new Error(`Line ${lineNumber}, Stimulus ${i + 1}: text field must be a string`);
      }
    }
  }

  // Validate each query
  for (let i = 0; i < stimulus.queries.length; i++) {
    validateQuery(stimulus.queries[i], lineNumber, i + 1);
  }
}

/**
 * Validate query object
 */
function validateQuery(query: any, lineNumber: number, queryIndex: number): void {
  const requiredFields = ['prompt', 'type', 'tag'];

  for (const field of requiredFields) {
    if (!(field in query)) {
      throw new Error(
        `Line ${lineNumber}, Query ${queryIndex}: Missing required field: ${field}`
      );
    }
  }

  const validQueryTypes = [
    'multi-choice',
    'multi-select',
    'single-slider',
    'multi-slider',
    'textbox',
    'text-instruction',
  ];

  if (!validQueryTypes.includes(query.type)) {
    throw new Error(
      `Line ${lineNumber}, Query ${queryIndex}: type must be one of: ${validQueryTypes.join(', ')}`
    );
  }

  // Validate that choice/select types have options
  if ((query.type === 'multi-choice' || query.type === 'multi-select' || query.type === 'multi-slider') &&
      (!query.option || !Array.isArray(query.option) || query.option.length === 0)) {
    throw new Error(
      `Line ${lineNumber}, Query ${queryIndex}: ${query.type} requires non-empty option array`
    );
  }

  // Validate slider types have slider_config
  if ((query.type === 'single-slider' || query.type === 'multi-slider') &&
      !query.slider_config) {
    throw new Error(
      `Line ${lineNumber}, Query ${queryIndex}: ${query.type} requires slider_config`
    );
  }
}
