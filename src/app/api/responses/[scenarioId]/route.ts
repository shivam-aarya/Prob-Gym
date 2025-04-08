import { NextResponse } from 'next/server';
import { db } from '@/services/database';

export async function GET(
  request: Request,
  { params }: { params: { scenarioId: string } }
) {
  try {
    const scenarioId = parseInt(params.scenarioId);
    
    if (isNaN(scenarioId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid scenario ID' },
        { status: 400 }
      );
    }
    
    // Get responses for this scenario
    const { data, error } = await db.getResponsesByScenario(scenarioId);
    
    if (error) {
      console.error('Error retrieving responses:', error);
      return NextResponse.json(
        { success: false, message: 'Error retrieving responses' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data
    });
  } catch (error) {
    console.error('Error retrieving responses:', error);
    return NextResponse.json(
      { success: false, message: 'Error retrieving responses' },
      { status: 500 }
    );
  }
} 