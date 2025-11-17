/**
 * Study-scoped localStorage utilities
 *
 * These utilities ensure that localStorage keys are properly scoped by study slug,
 * preventing data contamination between different studies.
 */

/**
 * Get a study-scoped localStorage item
 * @param studySlug - The study identifier
 * @param key - The key to retrieve
 * @returns The stored value or null if not found
 */
export function getStudyItem(studySlug: string, key: string): string | null {
  if (!studySlug) {
    console.warn('getStudyItem called without studySlug, this may cause cross-study contamination');
  }
  return localStorage.getItem(`${studySlug}_${key}`);
}

/**
 * Set a study-scoped localStorage item
 * @param studySlug - The study identifier
 * @param key - The key to store
 * @param value - The value to store
 */
export function setStudyItem(studySlug: string, key: string, value: string): void {
  if (!studySlug) {
    console.error('setStudyItem called without studySlug, refusing to store unscoped data');
    return;
  }
  localStorage.setItem(`${studySlug}_${key}`, value);
}

/**
 * Remove a study-scoped localStorage item
 * @param studySlug - The study identifier
 * @param key - The key to remove
 */
export function removeStudyItem(studySlug: string, key: string): void {
  if (!studySlug) {
    console.warn('removeStudyItem called without studySlug');
  }
  localStorage.removeItem(`${studySlug}_${key}`);
}

/**
 * Clear all localStorage items for a specific study
 * @param studySlug - The study identifier
 */
export function clearStudyStorage(studySlug: string): void {
  if (!studySlug) {
    console.error('clearStudyStorage called without studySlug');
    return;
  }

  const prefix = `${studySlug}_`;
  const keysToRemove: string[] = [];

  // Find all keys that belong to this study
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      keysToRemove.push(key);
    }
  }

  // Remove all study-scoped keys
  keysToRemove.forEach(key => localStorage.removeItem(key));
}

/**
 * Get a study-scoped participant ID
 * @param studySlug - The study identifier
 * @returns The participant ID or null if not found
 */
export function getParticipantId(studySlug: string): string | null {
  return getStudyItem(studySlug, 'participantId');
}

/**
 * Set a study-scoped participant ID
 * @param studySlug - The study identifier
 * @param participantId - The participant ID to store
 */
export function setParticipantId(studySlug: string, participantId: string): void {
  setStudyItem(studySlug, 'participantId', participantId);
}
