import { NextResponse } from 'next/server';
import { db } from '@/services/database';

// @ts-expect-error - Next.js route handler types are not correctly recognized
export async function GET(request, context) {
  try {
    const participantId = context.params.id;

    if (!participantId) {
      return NextResponse.json(
        { success: false, message: 'Missing participant ID' },
        { status: 400 }
      );
    }

    const { data, error } = await db.getParticipantData(participantId);

    if (error) {
      console.error('Error retrieving participant data:', error);
      return NextResponse.json(
        { success: false, message: 'Error retrieving participant data' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error processing participant data request:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing participant data request' },
      { status: 500 }
    );
  }
}