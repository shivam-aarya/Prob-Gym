/**
 * API route to fetch study data (metadata and scenarios)
 * Supports both regular studies and test studies
 */

import { NextRequest, NextResponse } from 'next/server';
import { loadStudyMetadata, loadStudyScenarios } from '@/studies/loader';

interface RouteParams {
  params: Promise<{
    studySlug: string;
  }>;
}

/**
 * GET /api/studies/[studySlug]/data
 * Returns metadata and scenarios for a study
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { studySlug } = await params;

    // Load metadata and scenarios
    const metadata = await loadStudyMetadata(studySlug);
    const scenarios = await loadStudyScenarios(studySlug);

    if (!metadata) {
      return NextResponse.json(
        { error: 'Study not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      metadata,
      scenarios: scenarios || [],
    });
  } catch (error) {
    console.error('[Study Data API] Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
