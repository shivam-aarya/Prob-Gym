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
    const { participantId, response } = body;

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

    // Validate response data
    if (!response || !response.task_name || !response.scenario_id || !response.response_data) {
      return NextResponse.json(
        { success: false, message: 'Invalid response data' },
        { status: 400 }
      );
    }

    // Get study from database (or use study.id if available)
    // For now, we'll use the study metadata ID
    // In production, you'd query the database to get the actual study UUID
    const studyId = study.id;

    // Create or update the participant if needed
    await db.createOrUpdateParticipant(studyId, participantId);

    // Store the response using our database service
    const { error } = await db.submitResponse(studyId, participantId, response);

    if (error) {
      console.error('Error storing response:', error);
      return NextResponse.json(
        { success: false, message: 'Error storing response' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Response recorded successfully',
    });
  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing submission' },
      { status: 500 }
    );
  }
}
