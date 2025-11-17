/**
 * In-Memory Test Study Registry
 *
 * Manages temporary test studies uploaded via admin preview page.
 * Studies are automatically cleaned up based on:
 * - Inactivity: Deleted after 30 minutes of no access
 * - Age: Deleted after 24 hours regardless of activity
 */

import { StudyMetadata } from '@/studies/types';
import { StudyConfig } from '@/types/study';

export interface TestStudyAsset {
  path: string; // Original path in the uploaded folder
  data: string; // Base64-encoded asset data
  mimeType: string; // e.g., 'image/png', 'video/mp4'
}

export interface TestStudy {
  id: string; // Unique UUID
  slug: string; // TEST_{uuid}_{original-slug}
  sessionId: string; // Session ID of uploader
  metadata: StudyMetadata;
  scenarios: StudyConfig[];
  assets: Map<string, TestStudyAsset>; // Path -> Asset data
  createdAt: Date;
  lastAccessedAt: Date;
  conversionLogs: string[]; // Logs from conversion process
}

class TestStudyRegistry {
  private studies: Map<string, TestStudy> = new Map();

  // Constants for cleanup thresholds
  private readonly INACTIVITY_THRESHOLD_MS = 30 * 60 * 1000; // 30 minutes
  private readonly MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

  /**
   * Add a new test study to the registry
   */
  addStudy(study: TestStudy): void {
    this.studies.set(study.id, study);
    console.log(`[TestStudyRegistry] Added test study: ${study.slug} (ID: ${study.id})`);
  }

  /**
   * Get a test study by ID
   */
  getStudy(id: string): TestStudy | undefined {
    const study = this.studies.get(id);
    if (study) {
      // Update last accessed time
      study.lastAccessedAt = new Date();
    }
    return study;
  }

  /**
   * Get a test study by slug
   */
  getStudyBySlug(slug: string): TestStudy | undefined {
    for (const study of this.studies.values()) {
      if (study.slug === slug) {
        // Update last accessed time
        study.lastAccessedAt = new Date();
        return study;
      }
    }
    return undefined;
  }

  /**
   * Get all test studies
   */
  getAllStudies(): TestStudy[] {
    return Array.from(this.studies.values());
  }

  /**
   * Get all test studies for a specific session
   */
  getStudiesBySession(sessionId: string): TestStudy[] {
    return Array.from(this.studies.values()).filter(
      study => study.sessionId === sessionId
    );
  }

  /**
   * Delete a specific test study
   */
  deleteStudy(id: string): boolean {
    const deleted = this.studies.delete(id);
    if (deleted) {
      console.log(`[TestStudyRegistry] Deleted test study: ${id}`);
    }
    return deleted;
  }

  /**
   * Get an asset by study slug and asset path
   */
  getAsset(slug: string, assetPath: string): TestStudyAsset | undefined {
    const study = this.getStudyBySlug(slug);
    if (!study) return undefined;

    return study.assets.get(assetPath);
  }

  /**
   * Check if a slug is a test study
   */
  isTestStudy(slug: string): boolean {
    return slug.startsWith('TEST_');
  }

  /**
   * Clean up expired test studies
   * Returns the number of studies deleted
   */
  cleanup(): number {
    const now = Date.now();
    let deletedCount = 0;

    for (const [id, study] of this.studies.entries()) {
      const age = now - study.createdAt.getTime();
      const inactivity = now - study.lastAccessedAt.getTime();

      const isExpired = age > this.MAX_AGE_MS;
      const isInactive = inactivity > this.INACTIVITY_THRESHOLD_MS;

      if (isExpired || isInactive) {
        const reason = isExpired ? 'age > 24h' : 'inactive > 30min';
        console.log(`[TestStudyRegistry] Cleaning up study ${study.slug} (${reason})`);
        this.studies.delete(id);
        deletedCount++;
      }
    }

    if (deletedCount > 0) {
      console.log(`[TestStudyRegistry] Cleanup complete: ${deletedCount} studies removed`);
    }

    return deletedCount;
  }

  /**
   * Get statistics about the registry
   */
  getStats() {
    const now = Date.now();
    const studies = Array.from(this.studies.values());

    return {
      totalStudies: studies.length,
      studiesBySession: studies.reduce((acc, study) => {
        acc[study.sessionId] = (acc[study.sessionId] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      oldestStudy: studies.length > 0
        ? Math.min(...studies.map(s => s.createdAt.getTime()))
        : null,
      newestStudy: studies.length > 0
        ? Math.max(...studies.map(s => s.createdAt.getTime()))
        : null,
      studiesNearExpiration: studies.filter(s => {
        const age = now - s.createdAt.getTime();
        const inactivity = now - s.lastAccessedAt.getTime();
        const remainingTime = Math.min(
          this.MAX_AGE_MS - age,
          this.INACTIVITY_THRESHOLD_MS - inactivity
        );
        return remainingTime < 5 * 60 * 1000; // Less than 5 minutes remaining
      }).length,
    };
  }

  /**
   * Get time until expiration for a study (in milliseconds)
   */
  getTimeUntilExpiration(id: string): number | null {
    const study = this.studies.get(id);
    if (!study) return null;

    const now = Date.now();
    const age = now - study.createdAt.getTime();
    const inactivity = now - study.lastAccessedAt.getTime();

    const timeUntilMaxAge = this.MAX_AGE_MS - age;
    const timeUntilInactive = this.INACTIVITY_THRESHOLD_MS - inactivity;

    return Math.max(0, Math.min(timeUntilMaxAge, timeUntilInactive));
  }

  /**
   * Clear all test studies (use with caution)
   */
  clearAll(): void {
    const count = this.studies.size;
    this.studies.clear();
    console.log(`[TestStudyRegistry] Cleared all test studies (${count} removed)`);
  }
}

// Singleton instance - use global to ensure it's shared across all server contexts
// This is necessary because Next.js can have multiple server instances
declare global {
  // eslint-disable-next-line no-var
  var testStudyRegistry: TestStudyRegistry | undefined;
}

export const testStudyRegistry = global.testStudyRegistry ?? new TestStudyRegistry();

if (process.env.NODE_ENV !== 'production') {
  global.testStudyRegistry = testStudyRegistry;
}
