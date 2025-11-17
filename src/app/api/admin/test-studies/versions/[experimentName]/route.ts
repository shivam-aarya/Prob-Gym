/**
 * Admin API: Get All Versions of a Study
 *
 * Returns all versions for a given experiment name.
 */

import { NextRequest, NextResponse } from 'next/server';
import { testStudyRegistry } from '@/services/testStudyRegistry';

/**
 * GET /api/admin/test-studies/versions/[experimentName]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ experimentName: string }> }
) {
  try {
    const { experimentName } = await params;
    const decodedName = decodeURIComponent(experimentName);

    const versionGroup = testStudyRegistry.getVersionGroup(decodedName);

    if (!versionGroup) {
      return NextResponse.json(
        { success: false, error: 'Study not found' },
        { status: 404 }
      );
    }

    // Convert versions to serializable format (Map -> Object)
    const serializedVersions = versionGroup.versions.map(v => ({
      id: v.id,
      slug: v.slug,
      versionNumber: v.versionNumber,
      versionNote: v.versionNote,
      scenarioCount: v.scenarios.length,
      createdAt: v.createdAt,
      lastAccessedAt: v.lastAccessedAt,
      sessionId: v.sessionId,
      hasOriginalFiles: v.originalFiles.size > 0,
    }));

    return NextResponse.json({
      success: true,
      experimentName: versionGroup.experimentName,
      latestVersionId: versionGroup.latestVersionId,
      versionCount: versionGroup.versions.length,
      versions: serializedVersions,
      createdAt: versionGroup.createdAt,
      lastAccessedAt: versionGroup.lastAccessedAt,
    });
  } catch (error) {
    console.error('[Admin Versions API] Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
