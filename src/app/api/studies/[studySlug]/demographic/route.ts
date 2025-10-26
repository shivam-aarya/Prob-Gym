import { NextResponse } from 'next/server';
import { db } from '@/services/database';
import { getStudy } from '@/studies/registry';

export async function POST(
  request: Request,
  context: { params: Promise<{ studySlug: string }> }
) {
  try {
    const { studySlug } = await context.params;
    const body = await request.json();
    const { participantId, demographicData, totalCompletionTime } = body;

    // Validate study exists
    const study = getStudy(studySlug);
    if (!study) {
      return NextResponse.json(
        { success: false, message: `Study "${studySlug}" not found` },
        { status: 404 }
      );
    }

    // Validate participant ID
    if (!participantId) {
      return NextResponse.json(
        { success: false, message: 'Missing participant ID' },
        { status: 400 }
      );
    }

    // Validate demographic data
    if (!demographicData) {
      return NextResponse.json(
        { success: false, message: 'Missing demographic data' },
        { status: 400 }
      );
    }

    const studyId = study.id;

    // Submit demographic data
    const { error: demoError } = await db.submitDemographicData(
      studyId,
      participantId,
      demographicData
    );

    if (demoError) {
      console.error('Error storing demographic data:', demoError);
      return NextResponse.json(
        { success: false, message: 'Error storing demographic data' },
        { status: 500 }
      );
    }

    // Update total completion time if provided
    if (totalCompletionTime) {
      const { error: timeError } = await db.updateTotalCompletionTime(
        studyId,
        participantId,
        totalCompletionTime
      );

      if (timeError) {
        console.error('Error updating completion time:', timeError);
        // Don't fail the request if this fails, just log it
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Demographic data recorded successfully',
    });
  } catch (error) {
    console.error('Error processing demographic submission:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing demographic submission' },
      { status: 500 }
    );
  }
}
