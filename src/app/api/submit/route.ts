import { NextResponse } from 'next/server';
import { UserResponse } from '@/types/study';
import { db } from '@/services/database';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { participantId, response } = body;
    
    // Validate the data
    if (!participantId) {
      return NextResponse.json(
        { success: false, message: 'Missing participant ID' },
        { status: 400 }
      );
    }
    
    if (!response || !response.task_name || !response.scenario_id || !response.response_data) {
      return NextResponse.json(
        { success: false, message: 'Invalid response data' },
        { status: 400 }
      );
    }
    
    // Create or update the participant if needed
    await db.createOrUpdateParticipant(participantId);
    
    // Store the response using our database service
    const { success, error } = await db.submitResponse(participantId, response);
    
    if (error) {
      console.error('Error storing response:', error);
      return NextResponse.json(
        { success: false, message: 'Error storing response' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Response recorded successfully'
    });
  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing submission' },
      { status: 500 }
    );
  }
} 