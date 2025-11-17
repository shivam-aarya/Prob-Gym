/**
 * Admin API: Confirm Version Upload
 *
 * Handles user confirmation after duplicate detection.
 * User can choose to create new version or replace latest version.
 */

import { NextRequest, NextResponse } from 'next/server';
import { testStudyRegistry } from '@/services/testStudyRegistry';
import { pendingUploads } from '../route';

/**
 * POST /api/admin/upload/confirm
 *
 * Expects JSON body:
 * {
 *   tempId: string,
 *   action: 'new-version' | 'replace',
 *   versionNote?: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tempId, action, versionNote } = body;

    // Validate request
    if (!tempId || !action) {
      return NextResponse.json(
        { success: false, error: 'Missing tempId or action' },
        { status: 400 }
      );
    }

    if (action !== 'new-version' && action !== 'replace') {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Must be "new-version" or "replace"' },
        { status: 400 }
      );
    }

    // Get pending upload
    const pending = pendingUploads.get(tempId);
    if (!pending) {
      return NextResponse.json(
        { success: false, error: 'Upload not found or expired (10 minute limit)' },
        { status: 404 }
      );
    }

    // Remove from pending uploads
    pendingUploads.delete(tempId);

    const { study, originalFiles, experimentName } = pending;

    let version;

    if (action === 'new-version') {
      // Create new version
      version = testStudyRegistry.addVersion(
        experimentName,
        study,
        versionNote,
        originalFiles
      );

      console.log(`[Admin Confirm] Created new version ${version.versionNumber} for ${experimentName}`);

      return NextResponse.json({
        success: true,
        action: 'new-version',
        versionNumber: version.versionNumber,
        studyId: study.id,
        studySlug: study.slug,
        experimentName,
        previewUrl: `/studies/${study.slug}/consent`,
      });
    } else {
      // Replace latest version
      version = testStudyRegistry.replaceLatestVersion(
        experimentName,
        study,
        versionNote,
        originalFiles
      );

      if (!version) {
        return NextResponse.json(
          { success: false, error: 'Failed to replace latest version' },
          { status: 500 }
        );
      }

      console.log(`[Admin Confirm] Replaced version ${version.versionNumber} for ${experimentName}`);

      return NextResponse.json({
        success: true,
        action: 'replace',
        versionNumber: version.versionNumber,
        studyId: study.id,
        studySlug: study.slug,
        experimentName,
        previewUrl: `/studies/${study.slug}/consent`,
      });
    }
  } catch (error) {
    console.error('[Admin Confirm API] Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
