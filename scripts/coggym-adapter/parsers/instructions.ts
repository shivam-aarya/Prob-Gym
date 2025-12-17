/**
 * Parser for CogGym instruction.jsonl files
 */

import { readFile } from 'fs/promises';
import { join } from 'path';
import { InstructionContent } from '../types';
import type { ExperimentItem } from '@/types/study';

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
    // Trim content to normalize files with/without trailing newlines
    const lines = content.trim().split('\n').map(line => line.trim());

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
        // Will validate any remaining buffer content after the loop
      }
    }

    // Check for any unparsed content remaining in buffer
    if (buffer.trim().length > 0) {
      try {
        JSON.parse(buffer);
        throw new Error(`Failed to parse instruction starting at line ${lineStart + 1}: validation failed`);
      } catch (parseError) {
        throw new Error(`Failed to parse instruction starting at line ${lineStart + 1}: ${(parseError as Error).message}`);
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
  if (!('id' in instruction)) {
    throw new Error(`Line ${lineNumber}: Missing required field: id`);
  }

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
      if (!instruction.stimuli_id || typeof instruction.stimuli_id !== 'string') {
        throw new Error(`Line ${lineNumber}: test_trial type requires stimuli_id field (string)`);
      }
      break;

    case 'comprehension_quiz':
      if (!instruction.queries || !Array.isArray(instruction.queries)) {
        throw new Error(`Line ${lineNumber}: comprehension_quiz type requires queries array`);
      }
      if (instruction.queries.length === 0) {
        throw new Error(`Line ${lineNumber}: comprehension_quiz queries cannot be empty`);
      }

      // Validate that all queries have answer field (required for quiz feedback)
      for (let i = 0; i < instruction.queries.length; i++) {
        const query = instruction.queries[i];
        if (!('answer' in query)) {
          throw new Error(
            `Line ${lineNumber}, Query ${i + 1}: comprehension_quiz questions must have answer field for feedback`
          );
        }
      }
      break;
  }
}

/**
 * Convert CogGym instruction modules to ExperimentItems
 * Transforms instruction.jsonl content into items that can be rendered in experimentFlow
 *
 * @param instructions - Array of parsed instruction modules from instruction.jsonl
 * @param stimuliMap - Maps CogGym trial IDs to Prob-Gym scenario IDs (for resolving test_trial references)
 * @returns Map of instruction ID to ExperimentItem
 */
export function convertInstructionsToItems(
  instructions: InstructionContent[],
  stimuliMap: Map<string, number>
): Map<string, ExperimentItem> {
  const itemsMap = new Map<string, ExperimentItem>();

  for (const instruction of instructions) {
    switch (instruction.type) {
      case 'instruction': {
        const item: ExperimentItem = {
          type: 'instruction',
          id: instruction.id,
          text: instruction.text
        };

        // Add media if present
        if (instruction.media_url && instruction.media_url.length > 0) {
          item.media = instruction.media_url.map(url => {
            // Determine media type from file extension
            const isVideo = /\.(mp4|webm|mov|avi)$/i.test(url);

            return {
              type: isVideo ? 'video' : 'image',
              url: url.replace(/^assets\//, '') // Strip "assets/" prefix
            };
          });
        }

        itemsMap.set(instruction.id, item);
        break;
      }

      case 'test_trial': {
        const scenarioId = stimuliMap.get(instruction.stimuli_id);

        if (scenarioId === undefined) {
          console.warn(
            `[Instructions Parser] test_trial "${instruction.id}" references unknown stimuli_id "${instruction.stimuli_id}" - skipping`
          );
          break;
        }

        const item: ExperimentItem = {
          type: 'test_trial',
          id: instruction.id,
          scenarioId,
          feedback: instruction.feedback
        };

        itemsMap.set(instruction.id, item);
        break;
      }

      case 'comprehension_quiz': {
        const item: ExperimentItem = {
          type: 'comprehension_quiz',
          id: instruction.id,
          text: instruction.text,
          questions: instruction.queries.map(query => ({
            question: query.prompt,
            options: query.option || [],
            correctAnswer: query.answer || 0
          }))
        };

        itemsMap.set(instruction.id, item);
        break;
      }
    }
  }

  return itemsMap;
}
