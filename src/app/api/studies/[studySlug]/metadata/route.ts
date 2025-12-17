/**
 * API route to get study metadata
 */

import { NextRequest, NextResponse } from 'next/server';
import { getStudy } from '@/studies/registry';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ studySlug: string }> }
) {
  try {
    const { studySlug } = await params;

    // Load study metadata
    const metadata = getStudy(studySlug);

    if (!metadata) {
      return NextResponse.json(
        { success: false, error: 'Study not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      metadata
    });
  } catch (error) {
    console.error('[API /metadata] Error loading study metadata:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
