import { NextResponse } from 'next/server';
import { UserResponse } from '@/types/study';
import { db } from '@/services/database';

export async function POST(request: Request) {
  try {
    const response: UserResponse = await request.json();
    
    // Validate the response data (basic validation)
    if (!response.task_name || !response.scenario_id || !response.response_data) {
      return NextResponse.json(
        { success: false, message: 'Invalid response data' },
        { status: 400 }
      );
    }
    
    // Store the response using our database service
    const { id, error } = await db.submitResponse(response);
    
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
      id
    });
  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing submission' },
      { status: 500 }
    );
  }
} 