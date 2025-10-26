import { NextResponse } from 'next/server';
import { db } from '@/services/database';
import { getStudy } from '@/studies/registry';

export async function GET(
  request: Request,
  context: { params: Promise<{ studySlug: string; id: string }> }
) {
  try {
    const { studySlug, id: participantId } = await context.params;

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

    const studyId = study.id;

    // Get participant data
    const { data, error } = await db.getParticipantData(studyId, participantId);

    if (error) {
      console.error('Error fetching participant data:', error);
      return NextResponse.json(
        { success: false, message: 'Error fetching participant data', error: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { success: false, message: 'Participant not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error fetching participant:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching participant data' },
      { status: 500 }
    );
  }
}
