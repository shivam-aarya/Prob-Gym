/**
 * Parser for CogGym instruction.jsonl files
 */

import { readFile } from 'fs/promises';
import { join } from 'path';
import { InstructionContent } from '../types';

/**
 * Parse an instruction.jsonl file from a CogGym experiment
 * JSONL format: one JSON object per line
 * Returns empty array if file doesn't exist (instructions are optional)
 */
export async function parseInstructions(experimentPath: string): Promise<InstructionContent[]> {
  const instructionPath = join(experimentPath, 'instruction.jsonl');

  try {
    const content = await readFile(instructionPath, 'utf-8');
    return parseInstructionsFromString(content);
  } catch (error) {
    // If file doesn't exist, return empty array (instructions are optional)
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }

    if (error instanceof Error) {
      throw new Error(`Failed to parse instruction.jsonl: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Parse instructions from a string (for in-memory processing)
 */
export function parseInstructionsFromString(content: string): InstructionContent[] {
  try {
    const lines = content.split('\n').map(line => line.trim());

    const instructions: InstructionContent[] = [];
    let buffer = '';
    let lineStart = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.length === 0) continue; // Skip empty lines

      buffer += line;

      try {
        // Try to parse the accumulated buffer
        const instruction = JSON.parse(buffer) as InstructionContent;
        validateInstruction(instruction, lineStart + 1);
        instructions.push(instruction);

        // Reset buffer for next object
        buffer = '';
        lineStart = i + 1;
      } catch (error) {
        // Not a complete JSON object yet, continue accumulating
        // Only throw if we're at the last line and still can't parse
        if (i === lines.length - 1) {
          throw new Error(`Failed to parse instruction starting at line ${lineStart + 1}: ${(error as Error).message}`);
        }
      }
    }

    return instructions;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse instructions: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Validate instruction module
 */
function validateInstruction(
  instruction: any,
  lineNumber: number
): asserts instruction is InstructionContent {
  if (!('type' in instruction)) {
    throw new Error(`Line ${lineNumber}: Missing required field: type`);
  }

  const validTypes = ['instruction', 'test_trial', 'comprehension_quiz'];
  if (!validTypes.includes(instruction.type)) {
    throw new Error(`Line ${lineNumber}: type must be one of: ${validTypes.join(', ')}`);
  }

  // Type-specific validation
  switch (instruction.type) {
    case 'instruction':
      if (!instruction.text) {
        throw new Error(`Line ${lineNumber}: instruction type requires text field`);
      }
      break;

    case 'test_trial':
      if (!instruction.stimuli_id) {
        throw new Error(`Line ${lineNumber}: test_trial type requires stimuli_id field`);
      }
      break;

    case 'comprehension_quiz':
      if (!instruction.queries || !Array.isArray(instruction.queries)) {
        throw new Error(`Line ${lineNumber}: comprehension_quiz type requires queries array`);
      }
      if (instruction.queries.length === 0) {
        throw new Error(`Line ${lineNumber}: comprehension_quiz queries cannot be empty`);
      }

      // Validate stimuli if present
      if (instruction.stimuli) {
        if (!Array.isArray(instruction.stimuli) || instruction.stimuli.length === 0) {
          throw new Error(`Line ${lineNumber}: stimuli must be a non-empty array if provided`);
        }

        const validInputTypes = ['img', 'video', 'text'];
        for (let i = 0; i < instruction.stimuli.length; i++) {
          const stimulusItem = instruction.stimuli[i];

          if (!('input_type' in stimulusItem)) {
            throw new Error(`Line ${lineNumber}, Stimulus ${i + 1}: Missing required field: input_type`);
          }

          if (!('media_url' in stimulusItem)) {
            throw new Error(`Line ${lineNumber}, Stimulus ${i + 1}: Missing required field: media_url`);
          }

          if (!Array.isArray(stimulusItem.media_url)) {
            throw new Error(`Line ${lineNumber}, Stimulus ${i + 1}: media_url must be an array`);
          }

          if (!validInputTypes.includes(stimulusItem.input_type)) {
            throw new Error(`Line ${lineNumber}, Stimulus ${i + 1}: input_type must be one of: ${validInputTypes.join(', ')}`);
          }
        }
      }

      // Validate queries - text-instruction type doesn't need answer field
      for (let i = 0; i < instruction.queries.length; i++) {
        const query = instruction.queries[i];
        if (query.type !== 'text-instruction' && !('answer' in query)) {
          throw new Error(
            `Line ${lineNumber}, Query ${i + 1}: comprehension_quiz questions must have answer field (except text-instruction type)`
          );
        }
      }
      break;
  }
}
