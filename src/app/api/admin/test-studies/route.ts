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

    return NextResponse.json({
      success: true,
      studies: studyList,
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
