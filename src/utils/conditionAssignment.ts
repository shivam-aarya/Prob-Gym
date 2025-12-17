/**
 * Experimental condition assignment utilities
 * Handles random assignment to experimental conditions and item sequence generation
 */

import {
  ExperimentalCondition,
  ParticipantAssignment
} from '@/types/study';
import { getStudyItem, setStudyItem } from './studyStorage';

/**
 * Assign participant to an experimental condition and generate item sequence
 *
 * @param studySlug - Study identifier (for scoped storage)
 * @param participantId - Participant identifier
 * @param conditions - Array of possible experimental conditions
 * @param assignmentStrategy - How to assign participants (default: 'random')
 * @returns Participant assignment with condition and item sequence
 */
export function assignCondition(
  studySlug: string,
  participantId: string,
  conditions: ExperimentalCondition[],
  assignmentStrategy: 'random' | 'sequential' | 'balanced' = 'random'
): ParticipantAssignment {
  // Check for existing assignment (study-scoped localStorage)
  const existingAssignment = getStudyItem(studySlug, 'conditionAssignment');

  if (existingAssignment) {
    try {
      const parsed = JSON.parse(existingAssignment);
      // Reconstruct as proper ParticipantAssignment object
      return {
        ...parsed,
        completedItems: parsed.completedItems || []
      };
    } catch (error) {
      console.error('[Condition Assignment] Failed to parse existing assignment:', error);
      // Continue to create new assignment
    }
  }

  // Validate inputs
  if (!conditions || conditions.length === 0) {
    throw new Error('Cannot assign condition: no conditions provided');
  }

  // Select condition based on strategy
  let selectedCondition: ExperimentalCondition;

  switch (assignmentStrategy) {
    case 'random':
      // Random selection
      const randomIndex = Math.floor(Math.random() * conditions.length);
      selectedCondition = conditions[randomIndex];
      break;

    case 'sequential':
      // Sequential assignment would require server-side counter
      // For now, default to first condition
      console.warn('[Condition Assignment] Sequential assignment not implemented, using first condition');
      selectedCondition = conditions[0];
      break;

    case 'balanced':
      // Balanced assignment would require server-side counter
      // For now, default to random
      console.warn('[Condition Assignment] Balanced assignment not implemented, using random');
      selectedCondition = conditions[Math.floor(Math.random() * conditions.length)];
      break;

    default:
      selectedCondition = conditions[0];
  }

  // Generate item sequence with randomization
  const itemSequence = generateItemSequence(selectedCondition);

  // Create assignment object
  const assignment: ParticipantAssignment = {
    participantId,
    studySlug,
    condition: selectedCondition.name,
    itemSequence,
    currentIndex: 0,
    completedItems: [],
    assignedAt: new Date().toISOString()
  };

  // Save to study-scoped localStorage
  setStudyItem(studySlug, 'conditionAssignment', JSON.stringify(assignment));

  console.log(`[Condition Assignment] Assigned participant ${participantId} to condition "${selectedCondition.name}" with ${itemSequence.length} items`);

  return assignment;
}

/**
 * Generate ordered sequence of item IDs from condition's blocks
 * Applies block randomization and within-block randomization as specified
 *
 * @param condition - Experimental condition with blocks
 * @returns Flat array of item IDs in order of presentation
 */
function generateItemSequence(condition: ExperimentalCondition): string[] {
  let blocks = [...condition.blocks];

  // Apply block randomization if specified
  if (condition.randomizeBlocks) {
    blocks = shuffleArray(blocks);
  }

  const sequence: string[] = [];

  // Process each block
  for (const block of blocks) {
    let items = [...block.items];

    // Apply within-block item randomization if specified
    if (block.randomizeItems) {
      items = shuffleArray(items);
    }

    // Add item IDs to sequence
    sequence.push(...items.map(item => item.id));
  }

  return sequence;
}

/**
 * Fisher-Yates shuffle algorithm
 * Creates a shuffled copy of the input array
 *
 * @param array - Array to shuffle
 * @returns Shuffled copy of array
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

/**
 * Get current assignment for a study
 *
 * @param studySlug - Study identifier
 * @returns Current assignment or null if none exists
 */
export function getAssignment(studySlug: string): ParticipantAssignment | null {
  const data = getStudyItem(studySlug, 'conditionAssignment');

  if (!data) {
    return null;
  }

  try {
    const parsed = JSON.parse(data);
    return {
      ...parsed,
      completedItems: parsed.completedItems || []
    };
  } catch (error) {
    console.error('[Condition Assignment] Failed to parse assignment:', error);
    return null;
  }
}

/**
 * Update assignment in storage
 *
 * @param assignment - Updated assignment object
 */
export function updateAssignment(assignment: ParticipantAssignment): void {
  setStudyItem(
    assignment.studySlug,
    'conditionAssignment',
    JSON.stringify(assignment)
  );
}

/**
 * Clear assignment for a study (useful for testing)
 *
 * @param studySlug - Study identifier
 */
export function clearAssignment(studySlug: string): void {
  const data = getStudyItem(studySlug, 'conditionAssignment');
  if (data) {
    localStorage.removeItem(`${studySlug}_conditionAssignment`);
  }
}
