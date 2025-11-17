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

export interface OriginalFile {
  name: string; // Filename with path (e.g., "config.json", "assets/video.mp4")
  data: string; // Base64-encoded file data
  type: string; // MIME type
  size: number; // File size in bytes
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

export interface TestStudyVersion extends TestStudy {
  versionNumber: number; // Sequential version number (1, 2, 3...)
  versionNote?: string; // Optional note/tag for this version
  experimentName: string; // Name from config.json used for grouping
  originalFiles: Map<string, OriginalFile>; // Store original uploaded files for download
}

export interface StudyVersionGroup {
  experimentName: string; // Unique experiment name from config.json
  versions: TestStudyVersion[]; // All versions, sorted by versionNumber descending
  latestVersionId: string; // ID of the latest version
  createdAt: Date; // When the first version was created
  lastAccessedAt: Date; // When any version was last accessed
}

class TestStudyRegistry {
  private versionGroups: Map<string, StudyVersionGroup> = new Map();
  // Legacy storage for backward compatibility (temporarily keep both)
  private studies: Map<string, TestStudy> = new Map();

  // Constants for cleanup thresholds
  private readonly INACTIVITY_THRESHOLD_MS = 30 * 60 * 1000; // 30 minutes
  private readonly MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

  /**
   * Add a new test study to the registry (legacy method, now creates a version group)
   */
  addStudy(study: TestStudy): void {
    // Extract experiment name from metadata
    const experimentName = study.metadata.title || study.metadata.slug;

    // Convert to TestStudyVersion
    const version: TestStudyVersion = {
      ...study,
      versionNumber: 1,
      experimentName,
      originalFiles: new Map(), // Empty for legacy studies
    };

    // Create a new version group
    const group: StudyVersionGroup = {
      experimentName,
      versions: [version],
      latestVersionId: study.id,
      createdAt: study.createdAt,
      lastAccessedAt: study.lastAccessedAt,
    };

    this.versionGroups.set(experimentName, group);
    this.studies.set(study.id, study); // Keep legacy storage for now
    console.log(`[TestStudyRegistry] Added test study: ${study.slug} (ID: ${study.id})`);
  }

  /**
   * Get a test study by ID (searches all versions)
   */
  getStudy(id: string): TestStudy | undefined {
    // First check legacy storage
    const legacyStudy = this.studies.get(id);
    if (legacyStudy) {
      legacyStudy.lastAccessedAt = new Date();
      return legacyStudy;
    }

    // Search through version groups
    for (const group of this.versionGroups.values()) {
      const version = group.versions.find(v => v.id === id);
      if (version) {
        // Update last accessed time for both version and group
        version.lastAccessedAt = new Date();
        group.lastAccessedAt = new Date();
        return version;
      }
    }
    return undefined;
  }

  /**
   * Get a test study by slug (searches all versions)
   */
  getStudyBySlug(slug: string): TestStudy | undefined {
    // First check legacy storage
    for (const study of this.studies.values()) {
      if (study.slug === slug) {
        study.lastAccessedAt = new Date();
        return study;
      }
    }

    // Search through version groups
    for (const group of this.versionGroups.values()) {
      const version = group.versions.find(v => v.slug === slug);
      if (version) {
        // Update last accessed time for both version and group
        version.lastAccessedAt = new Date();
        group.lastAccessedAt = new Date();
        return version;
      }
    }
    return undefined;
  }

  /**
   * Get all test studies (returns latest version of each group + legacy studies)
   */
  getAllStudies(): TestStudy[] {
    const allStudies: TestStudy[] = [];

    // Add legacy studies
    allStudies.push(...Array.from(this.studies.values()));

    // Add latest version from each group
    for (const group of this.versionGroups.values()) {
      const latestVersion = group.versions.find(v => v.id === group.latestVersionId);
      if (latestVersion) {
        allStudies.push(latestVersion);
      }
    }

    return allStudies;
  }

  /**
   * Get all version groups
   */
  getAllVersionGroups(): StudyVersionGroup[] {
    return Array.from(this.versionGroups.values());
  }

  /**
   * Get all test studies for a specific session (includes all versions)
   */
  getStudiesBySession(sessionId: string): TestStudy[] {
    const studies: TestStudy[] = [];

    // Add legacy studies for this session
    studies.push(...Array.from(this.studies.values()).filter(
      study => study.sessionId === sessionId
    ));

    // Add all versions from all groups for this session
    for (const group of this.versionGroups.values()) {
      studies.push(...group.versions.filter(v => v.sessionId === sessionId));
    }

    return studies;
  }

  /**
   * Get version groups for a specific session
   */
  getVersionGroupsBySession(sessionId: string): StudyVersionGroup[] {
    return Array.from(this.versionGroups.values()).filter(group =>
      group.versions.some(v => v.sessionId === sessionId)
    );
  }

  /**
   * Delete a specific test study (legacy method, still works)
   */
  deleteStudy(id: string): boolean {
    // Try legacy storage first
    const deleted = this.studies.delete(id);
    if (deleted) {
      console.log(`[TestStudyRegistry] Deleted legacy test study: ${id}`);
      return true;
    }

    // Search version groups
    for (const [experimentName, group] of this.versionGroups.entries()) {
      const versionIndex = group.versions.findIndex(v => v.id === id);
      if (versionIndex !== -1) {
        group.versions.splice(versionIndex, 1);

        // If no versions left, delete the group
        if (group.versions.length === 0) {
          this.versionGroups.delete(experimentName);
          console.log(`[TestStudyRegistry] Deleted last version, removing group: ${experimentName}`);
        } else {
          // If we deleted the latest version, promote the next one
          if (group.latestVersionId === id) {
            group.latestVersionId = group.versions[0].id; // Versions are sorted descending
            console.log(`[TestStudyRegistry] Promoted version ${group.versions[0].versionNumber} to latest`);
          }
        }

        console.log(`[TestStudyRegistry] Deleted version from study: ${experimentName}`);
        return true;
      }
    }

    return false;
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

  // ========== VERSION MANAGEMENT METHODS ==========

  /**
   * Check if an experiment name already exists (for duplicate detection)
   */
  detectDuplicate(experimentName: string): StudyVersionGroup | undefined {
    return this.versionGroups.get(experimentName);
  }

  /**
   * Get a version group by experiment name
   */
  getVersionGroup(experimentName: string): StudyVersionGroup | undefined {
    return this.versionGroups.get(experimentName);
  }

  /**
   * Add a new version to an existing study or create a new version group
   */
  addVersion(
    experimentName: string,
    study: TestStudy,
    versionNote?: string,
    originalFiles?: Map<string, OriginalFile>
  ): TestStudyVersion {
    const existingGroup = this.versionGroups.get(experimentName);

    if (existingGroup) {
      // Add new version to existing group
      const newVersionNumber = Math.max(...existingGroup.versions.map(v => v.versionNumber)) + 1;

      const newVersion: TestStudyVersion = {
        ...study,
        versionNumber: newVersionNumber,
        versionNote,
        experimentName,
        originalFiles: originalFiles || new Map(),
      };

      // Add to front of array (versions sorted descending)
      existingGroup.versions.unshift(newVersion);
      existingGroup.latestVersionId = study.id;
      existingGroup.lastAccessedAt = new Date();

      console.log(`[TestStudyRegistry] Added version ${newVersionNumber} to ${experimentName}`);
      return newVersion;
    } else {
      // Create new version group
      const newVersion: TestStudyVersion = {
        ...study,
        versionNumber: 1,
        versionNote,
        experimentName,
        originalFiles: originalFiles || new Map(),
      };

      const group: StudyVersionGroup = {
        experimentName,
        versions: [newVersion],
        latestVersionId: study.id,
        createdAt: study.createdAt,
        lastAccessedAt: study.lastAccessedAt,
      };

      this.versionGroups.set(experimentName, group);
      console.log(`[TestStudyRegistry] Created new version group: ${experimentName}`);
      return newVersion;
    }
  }

  /**
   * Replace the latest version with a new one (for "replace" action)
   */
  replaceLatestVersion(
    experimentName: string,
    study: TestStudy,
    versionNote?: string,
    originalFiles?: Map<string, OriginalFile>
  ): TestStudyVersion | undefined {
    const group = this.versionGroups.get(experimentName);
    if (!group) return undefined;

    // Find and remove the latest version
    const latestVersionIndex = group.versions.findIndex(v => v.id === group.latestVersionId);
    if (latestVersionIndex === -1) return undefined;

    const oldVersion = group.versions[latestVersionIndex];
    group.versions.splice(latestVersionIndex, 1);

    // Create new version with the same version number
    const newVersion: TestStudyVersion = {
      ...study,
      versionNumber: oldVersion.versionNumber,
      versionNote: versionNote || oldVersion.versionNote,
      experimentName,
      originalFiles: originalFiles || new Map(),
    };

    // Add to front of array
    group.versions.unshift(newVersion);
    group.latestVersionId = study.id;
    group.lastAccessedAt = new Date();

    console.log(`[TestStudyRegistry] Replaced version ${newVersion.versionNumber} of ${experimentName}`);
    return newVersion;
  }

  /**
   * Update version metadata (note/tag)
   */
  updateVersionMetadata(experimentName: string, versionId: string, note: string): boolean {
    const group = this.versionGroups.get(experimentName);
    if (!group) return false;

    const version = group.versions.find(v => v.id === versionId);
    if (!version) return false;

    version.versionNote = note;
    console.log(`[TestStudyRegistry] Updated metadata for version ${version.versionNumber} of ${experimentName}`);
    return true;
  }

  /**
   * Get original files for a specific version
   */
  getOriginalFiles(experimentName: string, versionId: string): Map<string, OriginalFile> | undefined {
    const group = this.versionGroups.get(experimentName);
    if (!group) return undefined;

    const version = group.versions.find(v => v.id === versionId);
    return version?.originalFiles;
  }

  /**
   * Delete a specific version from a group
   */
  deleteVersion(experimentName: string, versionId: string): boolean {
    const group = this.versionGroups.get(experimentName);
    if (!group) return false;

    const versionIndex = group.versions.findIndex(v => v.id === versionId);
    if (versionIndex === -1) return false;

    group.versions.splice(versionIndex, 1);

    // If no versions left, delete the group
    if (group.versions.length === 0) {
      this.versionGroups.delete(experimentName);
      console.log(`[TestStudyRegistry] Deleted last version, removing group: ${experimentName}`);
      return true;
    }

    // If we deleted the latest version, promote the next one
    if (group.latestVersionId === versionId) {
      group.latestVersionId = group.versions[0].id; // Versions are sorted descending
      console.log(`[TestStudyRegistry] Promoted version ${group.versions[0].versionNumber} to latest`);
    }

    console.log(`[TestStudyRegistry] Deleted version from ${experimentName}`);
    return true;
  }

  /**
   * Clean up expired test studies
   * Returns the number of studies deleted
   */
  cleanup(): number {
    const now = Date.now();
    let deletedCount = 0;

    // Clean up legacy studies
    for (const [id, study] of this.studies.entries()) {
      const age = now - study.createdAt.getTime();
      const inactivity = now - study.lastAccessedAt.getTime();

      const isExpired = age > this.MAX_AGE_MS;
      const isInactive = inactivity > this.INACTIVITY_THRESHOLD_MS;

      if (isExpired || isInactive) {
        const reason = isExpired ? 'age > 24h' : 'inactive > 30min';
        console.log(`[TestStudyRegistry] Cleaning up legacy study ${study.slug} (${reason})`);
        this.studies.delete(id);
        deletedCount++;
      }
    }

    // Clean up version groups (based on group's lastAccessedAt)
    for (const [experimentName, group] of this.versionGroups.entries()) {
      const age = now - group.createdAt.getTime();
      const inactivity = now - group.lastAccessedAt.getTime();

      const isExpired = age > this.MAX_AGE_MS;
      const isInactive = inactivity > this.INACTIVITY_THRESHOLD_MS;

      if (isExpired || isInactive) {
        const reason = isExpired ? 'age > 24h' : 'inactive > 30min';
        console.log(`[TestStudyRegistry] Cleaning up version group ${experimentName} with ${group.versions.length} versions (${reason})`);
        this.versionGroups.delete(experimentName);
        deletedCount += group.versions.length;
      }
    }

    if (deletedCount > 0) {
      console.log(`[TestStudyRegistry] Cleanup complete: ${deletedCount} studies/versions removed`);
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
global.testStudyRegistry = testStudyRegistry;
