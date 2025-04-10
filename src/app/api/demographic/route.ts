import { NextResponse } from 'next/server';
import { db } from '@/services/database';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { participantId, demographicData } = body;
    
    // Validate the data
    if (!participantId) {
      return NextResponse.json(
        { success: false, message: 'Missing participant ID' },
        { status: 400 }
      );
    }
    
    if (!demographicData) {
      return NextResponse.json(
        { success: false, message: 'Missing demographic data' },
        { status: 400 }
      );
    }
    
    // Ensure the participant exists
    await db.createOrUpdateParticipant(participantId);
    
    // Store the demographic data using our database service
    const { error } = await db.submitDemographicData(participantId, demographicData);
    
    if (error) {
      console.error('Error storing demographic data:', error);
      return NextResponse.json(
        { success: false, message: 'Error storing demographic data' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Demographic data recorded successfully'
    });
  } catch (error) {
    console.error('Error processing demographic submission:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing demographic submission' },
      { status: 500 }
    );
  }
} 