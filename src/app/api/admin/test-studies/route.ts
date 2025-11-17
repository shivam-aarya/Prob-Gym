/**
 * Admin API: List Test Studies
 *
 * Returns all active test studies in the registry with metadata
 */

import { NextRequest, NextResponse } from 'next/server';
import { testStudyRegistry } from '@/services/testStudyRegistry';

/**
 * GET /api/admin/test-studies
 *
 * Query params (optional):
 * - sessionId: Filter by session ID
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    // Get studies (optionally filtered by session)
    const studies = sessionId
      ? testStudyRegistry.getStudiesBySession(sessionId)
      : testStudyRegistry.getAllStudies();

    // Get version groups (optionally filtered by session)
    const versionGroups = sessionId
      ? testStudyRegistry.getVersionGroupsBySession(sessionId)
      : testStudyRegistry.getAllVersionGroups();

    // Get registry stats
    const stats = testStudyRegistry.getStats();

    // Map to response format
    const studyList = studies.map(study => ({
      id: study.id,
      slug: study.slug,
      title: study.metadata.title,
      scenarioCount: study.scenarios.length,
      assetCount: study.assets.size,
      createdAt: study.createdAt.toISOString(),
      lastAccessedAt: study.lastAccessedAt.toISOString(),
      timeUntilExpiration: testStudyRegistry.getTimeUntilExpiration(study.id),
      sessionId: study.sessionId,
      previewUrl: `/studies/${study.slug}/consent`,
    }));

    // Map version groups to response format
    const versionGroupList = versionGroups.map(group => ({
      experimentName: group.experimentName,
      latestVersionId: group.latestVersionId,
      versionCount: group.versions.length,
      versions: group.versions.map(v => ({
        id: v.id,
        slug: v.slug,
        versionNumber: v.versionNumber,
        versionNote: v.versionNote,
        scenarioCount: v.scenarios.length,
        createdAt: v.createdAt,
        lastAccessedAt: v.lastAccessedAt,
        sessionId: v.sessionId,
        hasOriginalFiles: v.originalFiles.size > 0,
      })),
      createdAt: group.createdAt,
      lastAccessedAt: group.lastAccessedAt,
    }));

    return NextResponse.json({
      success: true,
      studies: studyList,
      versionGroups: versionGroupList,
      stats,
    });
  } catch (error) {
    console.error('[Admin Test Studies API] Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
