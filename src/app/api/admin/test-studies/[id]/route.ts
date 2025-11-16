/**
 * Admin API: Get/Delete Individual Test Study
 */

import { NextRequest, NextResponse } from 'next/server';
import { testStudyRegistry } from '@/services/testStudyRegistry';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/admin/test-studies/[id]
 *
 * Get details for a specific test study
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const study = testStudyRegistry.getStudy(id);

    if (!study) {
      return NextResponse.json(
        { success: false, error: 'Test study not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      study: {
        id: study.id,
        slug: study.slug,
        metadata: study.metadata,
        scenarios: study.scenarios,
        assetCount: study.assets.size,
        createdAt: study.createdAt.toISOString(),
        lastAccessedAt: study.lastAccessedAt.toISOString(),
        timeUntilExpiration: testStudyRegistry.getTimeUntilExpiration(study.id),
        sessionId: study.sessionId,
        conversionLogs: study.conversionLogs,
      },
    });
  } catch (error) {
    console.error('[Admin Test Study API] Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/test-studies/[id]
 *
 * Delete a specific test study
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const deleted = testStudyRegistry.deleteStudy(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Test study not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Test study deleted successfully',
    });
  } catch (error) {
    console.error('[Admin Test Study Delete API] Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
