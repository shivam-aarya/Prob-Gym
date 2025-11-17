/**
 * API endpoint for fetching study metadata
 * Supports both regular studies and test studies
 */

import { NextRequest, NextResponse } from 'next/server';
import { loadStudyMetadata } from '@/studies/loader';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ studySlug: string }> }
) {
  const { studySlug } = await params;

  console.log(`[API /metadata] Fetching metadata for study: ${studySlug}`);

  try {
    const metadata = await loadStudyMetadata(studySlug);

    if (!metadata) {
      console.error(`[API /metadata] Study not found: ${studySlug}`);
      return NextResponse.json(
        { success: false, error: 'Study not found' },
        { status: 404 }
      );
    }

    console.log(`[API /metadata] Successfully loaded metadata for: ${studySlug}`);
    return NextResponse.json({ success: true, metadata });
  } catch (error) {
    console.error(`[API /metadata] Error loading metadata:`, error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
