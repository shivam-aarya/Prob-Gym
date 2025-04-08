import { NextResponse } from 'next/server';
import { db } from '@/services/database';

export async function POST(request: Request) {
  try {
    const demographicData = await request.json();
    
    // Basic validation could be added here
    
    // Store the demographic data using our database service
    const { id, error } = await db.submitDemographicData(demographicData);
    
    if (error) {
      console.error('Error storing demographic data:', error);
      return NextResponse.json(
        { success: false, message: 'Error storing demographic data' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Demographic data recorded successfully',
      id
    });
  } catch (error) {
    console.error('Error processing demographic submission:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing demographic submission' },
      { status: 500 }
    );
  }
} 