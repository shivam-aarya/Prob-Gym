/**
 * Item sequence navigation utilities
 * Provides functions for navigating through the experiment item sequence
 */

import { ExperimentItem } from '@/types/study';
import { getAssignment, updateAssignment } from './conditionAssignment';

/**
 * Get the current item in the sequence
 *
 * @param studySlug - Study identifier
 * @param inlineItems - Array of all inline items (from metadata)
 * @returns Current item or null if sequence is complete or not initialized
 */
export function getCurrentItem(
  studySlug: string,
  inlineItems: ExperimentItem[]
): ExperimentItem | null {
  const assignment = getAssignment(studySlug);

  if (!assignment) {
    console.warn('[Item Sequence] No assignment found');
    return null;
  }

  // Check if sequence is complete
  if (assignment.currentIndex >= assignment.itemSequence.length) {
    return null;
  }

  // Get current item ID from sequence
  const currentItemId = assignment.itemSequence[assignment.currentIndex];

  // Find item in inlineItems array
  const item = inlineItems.find(item => item.id === currentItemId);

  if (!item) {
    console.error(`[Item Sequence] Item with ID "${currentItemId}" not found in inlineItems`);
    return null;
  }

  return item;
}

/**
 * Advance to the next item in the sequence
 * Marks the current item as completed
 *
 * @param studySlug - Study identifier
 * @returns True if there are more items, false if sequence is complete
 */
export function advanceToNextItem(studySlug: string): boolean {
  const assignment = getAssignment(studySlug);

  if (!assignment) {
    console.warn('[Item Sequence] No assignment found');
    return false;
  }

  // Mark current item as completed
  const currentItemId = assignment.itemSequence[assignment.currentIndex];
  if (!assignment.completedItems.includes(currentItemId)) {
    assignment.completedItems.push(currentItemId);
  }

  // Advance index
  assignment.currentIndex++;

  // Save updated assignment
  updateAssignment(assignment);

  // Return whether there are more items
  const hasMore = assignment.currentIndex < assignment.itemSequence.length;

  console.log(
    `[Item Sequence] Advanced to item ${assignment.currentIndex + 1}/${assignment.itemSequence.length} (hasMore: ${hasMore})`
  );

  return hasMore;
}

/**
 * Check if the item sequence is complete
 *
 * @param studySlug - Study identifier
 * @returns True if all items are completed
 */
export function isSequenceComplete(studySlug: string): boolean {
  const assignment = getAssignment(studySlug);

  if (!assignment) {
    return false;
  }

  return assignment.currentIndex >= assignment.itemSequence.length;
}

/**
 * Get progress information
 *
 * @param studySlug - Study identifier
 * @returns Progress object with current position and total count
 */
export function getProgress(studySlug: string): { current: number; total: number } {
  const assignment = getAssignment(studySlug);

  if (!assignment) {
    return { current: 0, total: 0 };
  }

  return {
    current: assignment.currentIndex + 1, // 1-based for display
    total: assignment.itemSequence.length
  };
}

/**
 * Get the item at a specific index in the sequence
 * (Useful for testing or preview)
 *
 * @param studySlug - Study identifier
 * @param inlineItems - Array of all inline items
 * @param index - Item index (0-based)
 * @returns Item at index or null if out of bounds
 */
export function getItemAtIndex(
  studySlug: string,
  inlineItems: ExperimentItem[],
  index: number
): ExperimentItem | null {
  const assignment = getAssignment(studySlug);

  if (!assignment) {
    return null;
  }

  if (index < 0 || index >= assignment.itemSequence.length) {
    return null;
  }

  const itemId = assignment.itemSequence[index];
  return inlineItems.find(item => item.id === itemId) || null;
}

/**
 * Get all completed item IDs
 *
 * @param studySlug - Study identifier
 * @returns Array of completed item IDs
 */
export function getCompletedItems(studySlug: string): string[] {
  const assignment = getAssignment(studySlug);
  return assignment?.completedItems || [];
}

/**
 * Check if a specific item has been completed
 *
 * @param studySlug - Study identifier
 * @param itemId - Item identifier to check
 * @returns True if item is in completed list
 */
export function isItemCompleted(studySlug: string, itemId: string): boolean {
  const completed = getCompletedItems(studySlug);
  return completed.includes(itemId);
}

/**
 * Get the full item sequence (for debugging/testing)
 *
 * @param studySlug - Study identifier
 * @returns Array of item IDs in order or empty array if no assignment
 */
export function getItemSequence(studySlug: string): string[] {
  const assignment = getAssignment(studySlug);
  return assignment?.itemSequence || [];
}
