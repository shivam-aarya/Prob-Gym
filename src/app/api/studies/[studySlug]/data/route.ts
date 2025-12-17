/**
 * API route to get study data (scenarios and metadata)
 */

import { NextRequest, NextResponse } from 'next/server';
import { loadStudyScenarios } from '@/studies/loader';
import { getStudy } from '@/studies/registry';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ studySlug: string }> }
) {
  try {
    const { studySlug } = await params;

    // Load study metadata
    const study = getStudy(studySlug);

    if (!study) {
      return NextResponse.json(
        { success: false, error: 'Study not found' },
        { status: 404 }
      );
    }

    // Load scenarios
    const scenarios = await loadStudyScenarios(studySlug);

    if (!scenarios || scenarios.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No scenarios found for this study' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      scenarios,
      metadata: study
    });
  } catch (error) {
    console.error('[API /data] Error loading study data:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
