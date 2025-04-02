import { NextResponse } from 'next/server';
import { UserResponse } from '@/types/study';

export async function POST(request: Request) {
  try {
    const response: UserResponse = await request.json();
    
    // For demo purposes, we'll just log the response
    console.log('Received response:', response);
    
    // In a production environment, you would:
    // 1. Validate the response data
    // 2. Store it in a database
    // 3. Handle any errors appropriately
    
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